#!/usr/bin/env python3
"""Bounded public-page research using the unmodified REA CLI.

No login, retries around access blocks, whole-site mirroring, or raw article
redistribution. Third-party DOM and scripts are temporary analysis inputs only.
Published evidence contains structural measurements, hashes, and viewport images.
"""
import argparse
import base64
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess
import tempfile
from urllib.parse import urljoin, urlsplit
from urllib.request import Request, urlopen
from urllib.error import HTTPError


def write(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + '\n')


def digest(data):
    return hashlib.sha256(data).hexdigest()


class Structure(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = {}
        self.scripts = []
        self.styles = []
        self.ids = []
        self.classes = set()
        self.fonts = set()
        self.title = ''
        self.in_title = False
        self.markers = {}

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        self.tags[tag] = self.tags.get(tag, 0) + 1
        if tag == 'script' and a.get('src'):
            self.scripts.append(a['src'])
        if tag == 'link' and a.get('rel') == 'stylesheet' and a.get('href'):
            self.styles.append(a['href'])
        if a.get('id') and len(self.ids) < 100:
            self.ids.append(a['id'][:100])
        self.classes.update(a.get('class', '').split())
        if tag == 'html':
            self.markers = {k: v for k, v in a.items() if k.startswith('data-')}
        if tag == 'title':
            self.in_title = True

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data[:200]

    def summary(self):
        return {'title': self.title.strip()[:200], 'tags': self.tags,
                'ids': self.ids, 'classes': sorted(self.classes)[:160],
                'script_urls': self.scripts[:30], 'stylesheet_urls': self.styles[:20],
                'html_data_markers': self.markers}


def fetch(url, limit):
    request = Request(url, headers={'User-Agent': 'WebsiteAssetsResearch/1.0 (bounded public page study)'})
    with urlopen(request, timeout=25) as response:
        data = response.read(limit + 1)
        return data[:limit], {'status': response.status, 'url': response.url,
                             'bytes_retained': min(len(data), limit), 'truncated': len(data) > limit,
                             'content_type': response.headers.get('Content-Type', ''),
                             'sha256': digest(data[:limit])}


BLOCK = re.compile(r'verify (?:that )?you are human|checking your browser|just a moment\.\.\.|automated (?:traffic|queries)|unusual traffic|cf-chl-|captcha challenge|access denied', re.I)
SIGNALS = {'gsap': r'\bgsap\b|GreenSock', 'lenis': r'\bLenis\b|lenis-smooth',
           'three': r'THREE\.REVISION|three\.module|three\.js|three/webgpu',
           'pixi': r'PIXI\.|pixi\.js|PixiJS', 'two': r'Two\.js|two\.js',
           'webflow': r'data-wf-page|webflow\.js', 'mapbox': r'mapboxgl|mapbox-gl',
           'webgl': r'getContext\([\x22\x27]webgl|WebGLRenderingContext',
           'variable-font': r'font-variation-settings|@font-face',
           'clip-path': r'clip-path|clipPath', 'requestAnimationFrame': r'requestAnimationFrame'}


def rea(command, output, name, timeout=100):
    result = subprocess.run(command, capture_output=True, timeout=timeout)
    record = {'command': command, 'exit_code': result.returncode,
              'stdout_sha256': digest(result.stdout), 'stdout_bytes': len(result.stdout),
              'stderr_tail': result.stderr.decode('utf-8', 'replace')[-1800:]}
    write(output / f'{name}-command.json', record)
    try:
        data = json.loads(result.stdout)
        if isinstance(data.get('data'), dict):
            data = data['data']
        return data, result.returncode
    except (ValueError, AttributeError):
        return {'error': 'CLI stdout was not JSON'}, result.returncode


def summarize_capture(evidence, output, url):
    normalized = evidence.get('normalized_result', {})
    steps = normalized.get('steps', [])
    measured = []
    for step in steps:
        artifacts = step.get('artifacts', {})
        dom = artifacts.get('dom', {}).get('value', {})
        html = dom.get('text', '')
        p = Structure()
        p.feed(html)
        measured.append({'step_id': step.get('step_id'), 'action': step.get('action'),
                         'status': step.get('status'), 'dom_sha256': dom.get('sha256'),
                         'dom_bytes': dom.get('bytes'), 'structure': p.summary(),
                         'url': artifacts.get('url'), 'block_marker': bool(BLOCK.search(html[:10000]))})
    blocked = any(s['block_marker'] for s in measured)
    shots = []
    if not blocked:
        for label, step in [('initial', next((s for s in steps if s.get('step_id') == 'settled'), {})),
                            ('after-page-down', steps[-1] if steps else {})]:
            image = step.get('artifacts', {}).get('screenshot', {}).get('value', {})
            if image.get('data_base64'):
                data = base64.b64decode(image['data_base64'], validate=True)
                if digest(data) != image.get('sha256'):
                    raise ValueError('Screenshot digest mismatch')
                (output / f'{label}.png').write_bytes(data)
                shots.append({'file': f'{label}.png', 'sha256': digest(data), 'bytes': len(data)})
    events = normalized.get('events', {}).get('items', [])
    summary = {'evidence_id': evidence.get('evidence_id'), 'provider': evidence.get('provider'),
               'operation': evidence.get('operation'), 'browser': normalized.get('browser'),
               'completeness': normalized.get('completeness'), 'steps': measured,
               'screenshots': shots, 'page_error_count': sum(e.get('kind') == 'page-error' for e in events),
               'site_block_observed': blocked,
               'scope': 'One public page, 1280x800 viewport, a PageDown key, no login or pointer-specific actions.'}
    write(output / 'browser-evidence.json', summary)
    return summary


def study(site, args):
    output = args.output / site['directory']
    output.mkdir(parents=True, exist_ok=True)
    report = {'id': site['id'], 'name': site['name'], 'url': site['url'],
              'observed_at': datetime.now(timezone.utc).isoformat(),
              'http': {'status': 'not-run'}, 'static': {'status': 'not-run'},
              'browser': {'status': 'not-run'}}
    try:
        with tempfile.TemporaryDirectory(prefix='website-study-') as td:
            scratch = Path(td)
            try:
                body, meta = fetch(site['url'], 450000)
                html = body.decode('utf-8', 'replace')
                p = Structure()
                p.feed(html)
                report['http'] = {**meta, 'structure': p.summary()}
                if BLOCK.search(html[:10000]):
                    report['http']['site_block_observed'] = True
                    report['browser'] = {'status': 'blocked', 'reason': 'Public HTTP response contains a security-screening marker; no browser retry.'}
                    return report
                signals = {k: bool(re.search(pattern, html, re.I)) for k, pattern in SIGNALS.items()}
                jsfiles = []
                for index, src in enumerate(p.scripts[:2]):
                    absolute = urljoin(meta['url'], src)
                    if urlsplit(absolute).hostname != urlsplit(meta['url']).hostname:
                        continue
                    try:
                        data, asset = fetch(absolute, 600000)
                        if not asset['truncated']:
                            (scratch / f'source-{index}.js').write_bytes(data)
                            jsfiles.append(asset)
                            text = data.decode('utf-8', 'replace')
                            signals = {k: v or bool(re.search(SIGNALS[k], text, re.I)) for k, v in signals.items()}
                    except Exception as error:
                        jsfiles.append({'url': absolute, 'error': type(error).__name__})
                styles = []
                for src in p.styles[:2]:
                    absolute = urljoin(meta['url'], src)
                    if urlsplit(absolute).hostname != urlsplit(meta['url']).hostname:
                        continue
                    try:
                        data, asset = fetch(absolute, 180000)
                        css = data.decode('utf-8', 'replace')
                        styles.append({**asset, 'font_families': sorted(set(re.findall(r'font-family\s*:\s*([^;}]{1,120})', css)))[:20],
                                       'custom_properties': sorted(set(re.findall(r'(--[\w-]+)\s*:', css)))[:30],
                                       'uses_sticky': 'position:sticky' in css.replace(' ', ''),
                                       'uses_clip_path': 'clip-path' in css,
                                       'uses_font_axes': 'font-variation-settings' in css})
                    except Exception as error:
                        styles.append({'url': absolute, 'error': type(error).__name__})
                report['http']['script_analysis_inputs'] = jsfiles
                report['http']['stylesheet_measurements'] = styles
                report['http']['string_signals'] = signals
                report['http']['signal_caveat'] = 'A matching identifier is a code-string observation, not proof of an active runtime dependency.'
                if list(scratch.glob('*.js')):
                    result, exit_code = rea([str(args.rea), 'analyze-javascript-application', str(scratch),
                        '--max-heap-mb', '384', '--max-semantic-nodes', '2000',
                        '--max-semantic-nodes-per-file', '1000', '--max-semantic-unknowns', '1000',
                        '--max-semantic-unknowns-per-file', '500', '--analysis-timeout-ms', '25000',
                        '--format', 'json'], output, 'static', 75)
                    normalized = result.get('normalized_result', {})
                    report['static'] = {'status': 'completed' if exit_code == 0 and result.get('evidence_id') else 'failed',
                                        'evidence_id': result.get('evidence_id'), 'exit_code': exit_code,
                                        'statistics': normalized.get('statistics'), 'error': result.get('error'),
                                        'scope': 'At most the first two same-host script references, each <=600 KB; not a full application audit.'}
            except HTTPError as error:
                report['http'] = {'status': error.code, 'error': str(error)}
                if error.code in (401, 403, 429):
                    report['browser'] = {'status': 'stopped', 'reason': 'HTTP access restriction; no alternate-client retry.'}
                    return report
            except Exception as error:
                report['http'] = {'status': 'failed', 'error': f'{type(error).__name__}: {error}'}
            scenario = {'browser': {'mode': 'launch', 'executable_path': str(args.browser), 'headless': True},
                'start_url': {'url': site['url']},
                'environment': {'viewport': {'width': 1280, 'height': 800, 'device_scale_factor': 1}, 'reduced_motion': 'no-preference'},
                'command_timeout_ms': 60000,
                'actions': [
                    {'step_id': 'settled', 'action': 'wait_for_timeout', 'duration_ms': 6000},
                    {'step_id': 'page-down', 'action': 'press', 'locator': {'kind': 'css', 'selector': 'body'}, 'key': 'PageDown', 'timeout_ms': 5000},
                    {'step_id': 'settled-after-scroll', 'action': 'wait_for_timeout', 'duration_ms': 1500}],
                'capture': {'after_each_step': ['dom', 'screenshot', 'url'], 'at_end': ['dom', 'screenshot', 'url'], 'events': ['page-errors']}}
            scenario_path = scratch / 'scenario.json'
            write(scenario_path, scenario)
            result, exit_code = rea([str(args.rea), 'capture-browser-scenario', str(scenario_path), '--format', 'json'], output, 'browser', 90)
            if result.get('normalized_result'):
                summary = summarize_capture(result, output, site['url'])
                complete = summary.get('completeness', {}).get('status') == 'complete'
                report['browser'] = {'status': 'blocked' if summary['site_block_observed'] else 'captured' if exit_code == 0 and complete else 'partial',
                                     'exit_code': exit_code, 'evidence_id': summary['evidence_id'],
                                     'completeness': summary['completeness'], 'screenshot_count': len(summary['screenshots'])}
            else:
                report['browser'] = {'status': 'failed', 'exit_code': exit_code, 'error': result.get('error', result)}
    except Exception as error:
        report['error'] = f'{type(error).__name__}: {error}'
    finally:
        write(output / 'report.json', report)
        print(f"{site['id']} {site['name']}: {report['browser']['status']}", flush=True)
    return report


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--rea', type=Path, required=True)
    p.add_argument('--browser', type=Path, required=True)
    p.add_argument('--output', type=Path, required=True)
    p.add_argument('--registry', type=Path, default=Path('sites.json'))
    args = p.parse_args()
    args.rea = args.rea.resolve()
    args.browser = args.browser.resolve()
    sites = json.loads(args.registry.read_text())['sites']
    reports = []
    with ThreadPoolExecutor(max_workers=3) as executor:
        for future in as_completed([executor.submit(study, site, args) for site in sites]):
            reports.append(future.result())
    reports.sort(key=lambda r: r['id'])
    write(args.output / 'summary.json', {'site_count': len(reports), 'reports': reports,
          'scope': 'Bounded public reference research; no full-site reconstruction claim.'})


if __name__ == '__main__':
    main()
