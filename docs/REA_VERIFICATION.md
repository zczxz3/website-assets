# REA verification

Status: **PASSED**. This records an executed test, not an installation-only check.

- Workflow: [Verify REA, run 2](https://github.com/zczxz3/website-assets/actions/runs/41742962494)
- Tested commit: `58ecf019e99d973c61caab262324d543dd2211cf`
- REA: `6.8.0`; Node: `24.22.1`; Chromium: `145.0.7632.6`
- Platform: GitHub-hosted Ubuntu 24.04, Linux x64
- Finished: `2026-11-03T23:56:37+00:00`
- Workflow duration: 49 seconds; verification job: 45 seconds

## Measured results

| Check | Result | Evidence |
| --- | --- | --- |
| Runtime compatibility | Passed | REA reported supported runtime satisfied |
| JavaScript analysis | Passed | 1 JavaScript file parsed, 0 skipped, 0 parse failures, 38 AST nodes visited |
| Browser launch | Passed | REA owned the launched Chromium process |
| Browser interaction | Passed | Button click changed the fixture DOM from ready to changed |
| DOM integrity | Passed | Before/after text, byte length and SHA-256 checked; hashes differ |
| Browser cleanup | Passed | REA confirmed termination of its owned browser process |

Static Evidence ID: `ev_a663e5d7c977b346ab7e87558a3d9edb60c605b9ec51884059723efc24185cdc`

Browser Evidence ID: `ev_936fec92a606359070be139910c5e2a780d19671d9d0b622ac8f35f8a3e0c154`

## Original reports

The adjacent `rea-verification-2026-11-03.zip` contains the original 27 report files downloaded from the successful run, including `verification.json`, CLI JSON evidence, stderr, exit codes and command records.

Archive SHA-256: `120ae0020761665f21006b5e541cfb316d2f4e6d17b3fff42f749fc4847de6e0`.

The download digest matches the digest displayed by GitHub Actions. The Actions artifact has a seven-day retention period; the archive committed here preserves this verification result.

## Scope and limitations

This test used a small local fixture served over loopback. It proves REA static analysis and browser interaction work on this runner. It does not prove that any of the 15 public websites has been captured or reconstructed, nor that every REA capability has been tested.

The ChatGPT Work container still cannot execute the full workflow because of its process namespace and browser IPC restrictions. Working REA execution is on the GitHub runner. No process-ownership check or browser protection was disabled.

The first run failed before execution because a job-level environment expression used an unavailable runner context. The successful commit initializes these paths during the first shell step instead. GitHub reported a bundled-action Node 20 deprecation warning; the actions ran on Node 24 and all required checks passed.
