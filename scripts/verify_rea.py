#!/usr/bin/env python3
"""Verify unmodified REA with a local static artifact and browser interaction.

Only a loopback HTTP fixture is served. Each REA invocation retains its original
stdout, stderr, exit status and command record. The final verification.json is
passed only after actual static and browser Evidence satisfy the assertions.
"""

from __future__ import annotations

import argparse
from contextlib import contextmanager
from datetime import datetime, timezone
from functools import partial
import hashlib
from html.parser import HTMLParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import math
import os
from pathlib import Path
import signal
import subprocess
import sys
import threading
import time
from typing import Any, Iterator


EXPECTED_REA_VERSION = "6.8.0"
BEFORE_TEXT = "Ready to verify REA."
AFTER_TEXT = "REA browser verification passed."
FIXTURE_HTML = """<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>REA local verification</title>
<script src="app.js" defer></script></head>
<body><h1>REA local verification</h1>
<p id="message" data-state="ready">Ready to verify REA.</p>
<button id="change-button" type="button">Change message</button>
</body></html>
"""
FIXTURE_JAVASCRIPT = """function changeMessage() {
  const message = document.getElementById("message");
  message.textContent = "REA browser verification passed.";
  message.dataset.state = "changed";
}
document.getElementById("change-button").addEventListener("click", changeMessage);
"""


class VerificationFailure(RuntimeError):
    """A measured command or Evidence assertion failed."""


def timestamp() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def write_json(path: Path, value: Any) -> None:
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def require(condition: bool, message: str) -> None:
    if not condition:
        raise VerificationFailure(message)


def positive_timeout(value: str) -> float:
    result = float(value)
    if not math.isfinite(result) or result <= 0:
        raise argparse.ArgumentTypeError("timeout must be positive and finite")
    return result


def write_fixture(directory: Path) -> None:
    directory.mkdir(parents=True, exist_ok=True)
    (directory / "index.html").write_text(FIXTURE_HTML, encoding="utf-8")
    (directory / "app.js").write_text(FIXTURE_JAVASCRIPT, encoding="utf-8")
    write_json(directory / "package.json", {
        "name": "rea-local-verification-fixture", "version": "1.0.0", "private": True
    })


def browser_scenario(browser_path: Path, url: str) -> dict[str, Any]:
    return {
        "browser": {"mode": "launch", "executable_path": str(browser_path), "headless": True},
        "start_url": {"url": url},
        "environment": {"reduced_motion": "no-preference"},
        "command_timeout_ms": 30000,
        "actions": [
            {"step_id": "ready", "action": "wait_for", "timeout_ms": 10000,
             "locator": {"kind": "css", "selector": "#message[data-state='ready']"}, "state": "visible"},
            {"step_id": "click-button", "action": "click", "timeout_ms": 10000,
             "locator": {"kind": "css", "selector": "#change-button"}},
            {"step_id": "changed", "action": "wait_for", "timeout_ms": 10000,
             "locator": {"kind": "css", "selector": "#message[data-state='changed']"}, "state": "visible"},
        ],
        "capture": {"after_each_step": ["dom", "url"], "at_end": ["dom", "url"],
                    "events": ["page-errors"]},
    }


@contextmanager
def fixture_server(directory: Path, log_path: Path) -> Iterator[str]:
    with log_path.open("w", encoding="utf-8") as log:
        class FixtureHandler(SimpleHTTPRequestHandler):
            def log_message(self, format: str, *args: Any) -> None:
                log.write(format % args + "\n")
                log.flush()

        handler = partial(FixtureHandler, directory=str(directory))
        server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
        server.daemon_threads = True
        thread = threading.Thread(target=server.serve_forever, kwargs={"poll_interval": 0.1}, daemon=True)
        thread.start()
        try:
            yield f"http://127.0.0.1:{server.server_address[1]}/"
        finally:
            server.shutdown()
            server.server_close()
            thread.join(timeout=5)


def stop_process(process: subprocess.Popen[bytes]) -> None:
    if os.name == "posix":
        try:
            os.killpg(process.pid, signal.SIGTERM)
        except ProcessLookupError:
            pass
        try:
            process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            pass
        try:
            os.killpg(process.pid, signal.SIGKILL)
        except ProcessLookupError:
            pass
    else:
        process.kill()
    process.wait()


def run_command(report_dir: Path, name: str, command: list[str], timeout: float) -> Any:
    stdout_path = report_dir / f"{name}.json"
    stderr_path = report_dir / f"{name}.stderr.log"
    record: dict[str, Any] = {"command": command, "started_at": timestamp(),
                              "timeout_seconds": timeout, "timed_out": False, "exit_code": None}
    started = time.monotonic()
    process: subprocess.Popen[bytes] | None = None
    try:
        with stdout_path.open("wb") as stdout, stderr_path.open("wb") as stderr:
            process = subprocess.Popen(command, stdout=stdout, stderr=stderr, start_new_session=os.name == "posix")
            try:
                record["exit_code"] = process.wait(timeout=timeout)
            except subprocess.TimeoutExpired:
                record["timed_out"] = True
                stop_process(process)
                record["exit_code"] = process.returncode
            except KeyboardInterrupt:
                stop_process(process)
                record["exit_code"] = process.returncode
                record["interrupted"] = True
                raise
    except OSError as error:
        record["launch_error"] = str(error)
        raise VerificationFailure(f"{name}: could not execute REA: {error}") from error
    finally:
        record["finished_at"] = timestamp()
        record["duration_seconds"] = round(time.monotonic() - started, 3)
        write_json(report_dir / f"{name}.run.json", record)
        (report_dir / f"{name}.exit-code.txt").write_text(
            str(record["exit_code"]) + "\n", encoding="utf-8"
        )
    require(not record["timed_out"], f"{name}: REA exceeded {timeout} seconds")
    require(record["exit_code"] == 0, f"{name}: REA exited {record['exit_code']}; inspect its original JSON and stderr")
    try:
        return json.loads(stdout_path.read_text(encoding="utf-8"))
    except (OSError, ValueError) as error:
        raise VerificationFailure(f"{name}: original stdout is not valid JSON: {error}") from error


def evidence_from(value: Any, operation: str) -> dict[str, Any]:
    # --format json normally returns Evidence directly; --full-output wraps it in data.
    if isinstance(value, dict) and isinstance(value.get("data"), dict):
        value = value["data"]
    require(isinstance(value, dict), f"{operation}: no Evidence object")
    require("error" not in value, f"{operation}: REA returned an error object")
    require(value.get("operation") == operation, f"{operation}: Evidence operation mismatch")
    require(isinstance(value.get("evidence_id"), str) and value["evidence_id"].startswith("ev_"),
            f"{operation}: no REA Evidence identifier")
    require(isinstance(value.get("normalized_result"), dict), f"{operation}: no normalized result")
    require(isinstance(value.get("provider"), dict) and bool(value["provider"].get("id")),
            f"{operation}: missing provider identity")
    return value


def check_static(value: Any) -> dict[str, Any]:
    evidence = evidence_from(value, "analyze_javascript_application")
    result = evidence["normalized_result"]
    statistics = result.get("statistics", {})
    require(isinstance(statistics, dict), "Static analysis statistics are missing")
    require(type(statistics.get("parse_failures")) is int and statistics["parse_failures"] == 0,
            "Static analysis did not measure zero parse failures")
    require(type(statistics.get("parsed_javascript_files")) is int and statistics["parsed_javascript_files"] >= 1,
            "Static analysis did not parse the fixture JavaScript")
    require(statistics.get("skipped_javascript_files") == 0, "Static analysis skipped JavaScript files")
    require(statistics.get("invalid_utf8_files") == 0, "Static fixture contains invalid UTF-8")
    graph = result.get("graph", {})
    require(isinstance(graph, dict) and isinstance(graph.get("nodes"), list) and len(graph["nodes"]) > 0,
            "Static Evidence has no application graph")
    require(isinstance(result.get("root_artifact_sha256"), str) and len(result["root_artifact_sha256"]) == 64,
            "Static Evidence has no artifact digest")
    return {"status": "passed", "evidence_id": evidence["evidence_id"],
            "provider": evidence["provider"], "statistics": statistics,
            "artifact_sha256": result["root_artifact_sha256"]}


class MessageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.active = False
        self.text: list[str] = []
        self.state: str | None = None

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        if tag == "p" and attributes.get("id") == "message":
            self.active = True
            self.state = attributes.get("data-state")

    def handle_endtag(self, tag: str) -> None:
        if tag == "p":
            self.active = False

    def handle_data(self, data: str) -> None:
        if self.active:
            self.text.append(data)


def check_step(step: dict[str, Any], expected_url: str, expected_text: str, expected_state: str) -> str:
    artifacts = step.get("artifacts", {})
    require(isinstance(artifacts, dict), "Browser step has no artifacts")
    dom = artifacts.get("dom", {})
    require(isinstance(dom, dict) and dom.get("state") == "captured", "Browser DOM was not captured")
    value = dom.get("value", {})
    require(isinstance(value, dict) and isinstance(value.get("text"), str), "Captured DOM has no text")
    encoded = value["text"].encode("utf-8")
    require(value.get("bytes") == len(encoded) and value.get("sha256") == hashlib.sha256(encoded).hexdigest(),
            "Captured DOM digest or length is inconsistent")
    parser = MessageParser()
    parser.feed(value["text"])
    require("".join(parser.text) == expected_text and parser.state == expected_state,
            f"Browser DOM did not contain the expected {expected_state} message")
    url = artifacts.get("url", {})
    require(isinstance(url, dict) and url.get("state") == "captured"
            and isinstance(url.get("value"), dict) and url["value"].get("url") == expected_url,
            "Browser URL was not captured or changed unexpectedly")
    return str(value["sha256"])


def check_browser(value: Any, expected_url: str) -> dict[str, Any]:
    evidence = evidence_from(value, "capture_browser_scenario")
    result = evidence["normalized_result"]
    browser = result.get("browser", {})
    require(isinstance(browser, dict) and browser.get("mode") == "launch"
            and browser.get("process_ownership") == "provider-owned"
            and browser.get("cleanup") == "terminated-owned-process", "Browser launch or cleanup was not confirmed")
    require(bool(browser.get("version")), "Browser version was not observed")
    require(result.get("completeness", {}).get("status") == "complete", "Browser capture is incomplete")
    parameters = evidence.get("parameters", {})
    require(parameters.get("environment", {}).get("reduced_motion") == "no-preference",
            "Browser scenario did not retain the requested motion setting")
    steps = result.get("steps", [])
    require(isinstance(steps, list) and len(steps) == 4, "Browser Evidence has an unexpected step count")
    require(all(isinstance(step, dict) and step.get("status") == "completed" for step in steps),
            "A browser scenario step did not complete")
    require(all(step.get("artifacts", {}).get("screenshot", {}).get("state") == "not_requested" for step in steps),
            "This verification must not request screenshots")
    by_id = {step["step_id"]: step for step in steps}
    require({"ready", "click-button", "changed"}.issubset(by_id), "Browser action Evidence is missing")
    require(by_id["click-button"].get("action") == "click", "Button-click action was not observed")
    before_hash = check_step(by_id["ready"], expected_url, BEFORE_TEXT, "ready")
    after_hash = check_step(by_id["changed"], expected_url, AFTER_TEXT, "changed")
    require(before_hash != after_hash, "DOM did not change after the button click")
    events = result.get("events", {}).get("items", [])
    require(not any(event.get("kind") == "page-error" for event in events), "Fixture JavaScript raised a page error")
    return {"status": "passed", "evidence_id": evidence["evidence_id"], "browser": browser,
            "url": expected_url, "before_dom_sha256": before_hash, "after_dom_sha256": after_hash,
            "before_message": BEFORE_TEXT, "after_message": AFTER_TEXT, "screenshots_requested": False}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--rea-bin", type=Path, required=True)
    parser.add_argument("--browser-path", type=Path, required=True)
    parser.add_argument("--report-dir", type=Path, default=Path("reports/rea"))
    parser.add_argument("--timeout", type=positive_timeout, default=180.0)
    args = parser.parse_args()
    report_dir = args.report_dir.expanduser().resolve()
    report_dir.mkdir(parents=True, exist_ok=True)
    rea_bin = args.rea_bin.expanduser().resolve()
    browser_path = args.browser_path.expanduser().resolve()
    summary: dict[str, Any] = {"status": "running", "started_at": timestamp(),
                              "checks": {"static_analysis": {"status": "not-run"},
                                         "browser_interaction": {"status": "not-run"}},
                              "scope": "Local fixture only; no public website collection."}
    summary_path = report_dir / "verification.json"
    for name in ("rea-version", "static-analysis", "browser-capture"):
        for suffix in (".json", ".stderr.log", ".exit-code.txt", ".run.json"):
            (report_dir / f"{name}{suffix}").unlink(missing_ok=True)
    write_json(summary_path, summary)
    exit_code = 1
    active_check: str | None = None
    try:
        require(rea_bin.is_file() and os.access(rea_bin, os.X_OK), "REA executable is missing")
        fixture = report_dir / "fixture"
        write_fixture(fixture)
        version = run_command(report_dir, "rea-version", [str(rea_bin), "--version", "--format", "json"], 15)
        require(isinstance(version, dict) and version.get("version") == EXPECTED_REA_VERSION, "REA version does not match 6.8.0")
        require(version.get("supported_runtime", {}).get("satisfied") is True, "REA runtime version is unsupported")
        summary["rea_runtime"] = version
        active_check = "static_analysis"
        summary["checks"][active_check] = {"status": "running"}
        write_json(summary_path, summary)
        static_command = [str(rea_bin), "analyze-javascript-application", str(fixture),
                          "--max-heap-mb", "384", "--max-semantic-nodes", "2000",
                          "--max-semantic-nodes-per-file", "500", "--max-semantic-unknowns", "1000",
                          "--max-semantic-unknowns-per-file", "250", "--analysis-timeout-ms", "30000",
                          "--format", "json"]
        summary["checks"]["static_analysis"] = check_static(run_command(report_dir, "static-analysis", static_command, args.timeout))
        active_check = "browser_interaction"
        summary["checks"][active_check] = {"status": "running"}
        write_json(summary_path, summary)
        require(browser_path.is_file() and os.access(browser_path, os.X_OK), "Matching Playwright Chromium executable is missing")
        with fixture_server(fixture, report_dir / "fixture-http.log") as url:
            scenario_path = report_dir / "browser-scenario.json"
            write_json(scenario_path, browser_scenario(browser_path, url))
            # Capture validates this request before browser acquisition. The
            # released 6.8.0 CLI does not register a separate validate command.
            capture = run_command(report_dir, "browser-capture", [str(rea_bin), "capture-browser-scenario", str(scenario_path), "--format", "json"], args.timeout)
            summary["checks"]["browser_interaction"] = check_browser(capture, url)
        summary["status"] = "passed"
        exit_code = 0
    except KeyboardInterrupt:
        summary["status"] = "failed"
        summary["error"] = "Verification was interrupted."
        exit_code = 130
    except Exception as error:
        summary["status"] = "failed"
        summary["error"] = f"{type(error).__name__}: {error}"
    finally:
        if active_check and summary["checks"][active_check].get("status") == "running":
            summary["checks"][active_check] = {"status": "failed", "error": summary.get("error", "Verification did not finish.")}
        summary["finished_at"] = timestamp()
        write_json(summary_path, summary)
    print(f"REA verification: {summary['status']}; report: {summary_path}")
    if summary.get("error"):
        print(summary["error"], file=sys.stderr)
    return exit_code


if __name__ == "__main__":
    raise SystemExit(main())
