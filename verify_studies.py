#!/usr/bin/env python3
"""Run real REA browser checks against all independent local studies."""
import argparse
import base64
from concurrent.futures import ThreadPoolExecutor, as_completed
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from html.parser import HTMLParser
import json
from pathlib import Path
import subprocess
import threading
import hashlib


class State(HTMLParser):
    def __init__(self):
        super().__init__(); self.body={}; self.stage={}
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='body': self.body=a
        if a.get('id')=='stage': self.stage=a


def check(site,width,args,base):
    folder=args.output/f"{site['id']}-{width}"
    folder.mkdir(parents=True,exist_ok=True)
    scenario={'browser':{'mode':'launch','executable_path':str(args.browser),'headless':True},
      'start_url':{'url':f"{base}/sites/{site['directory']}/04-reconstruction/index.html"},
      'environment':{'viewport':{'width':width,'height':900,'device_scale_factor':1},'reduced_motion':'reduce'},
      'command_timeout_ms':40000,
      'actions':[{'step_id':'mounted','action':'wait_for','locator':{'kind':'css','selector':f"body[data-ready='{site['id']}']"},'state':'visible','timeout_ms':12000},
                 {'step_id':'settled','action':'wait_for_timeout','duration_ms':350}],
      'capture':{'after_each_step':['dom','url'],'at_end':['dom','screenshot','url'],'events':['page-errors']}}
    control={'kind':'css','selector':'[data-testid="demo-control"]'}
    is_button=site['id'] in ['01','02','07','09','10','13']
    scenario['actions'].append({'step_id':'interaction','action':'click' if is_button else 'press','locator':control,'timeout_ms':5000,**({} if is_button else {'key':'ArrowRight'})})
    scenario['actions'].append({'step_id':'after-interaction','action':'wait_for_timeout','duration_ms':300})
    if site['id']=='01':
        scenario['actions'].append({'step_id':'close-detail','action':'click','locator':{'kind':'role','role':'button','name':'Close project'},'timeout_ms':4000})
    path=folder/'scenario.json';path.write_text(json.dumps(scenario,indent=2))
    result=subprocess.run([str(args.rea),'capture-browser-scenario',str(path),'--format','json'],capture_output=True,timeout=65)
    (folder/'stderr.txt').write_bytes(result.stderr)
    (folder/'exit-code.txt').write_text(str(result.returncode))
    evidence=json.loads(result.stdout)
    if isinstance(evidence.get('data'),dict):evidence=evidence['data']
    # This is original local code and artwork, so its full test Evidence can be retained.
    (folder/'evidence.json').write_text(json.dumps(evidence))
    normalized=evidence.get('normalized_result',{})
    assert result.returncode==0,(site['id'],width,evidence.get('error'))
    assert normalized.get('completeness',{}).get('status')=='complete',(site['id'],width,'incomplete evidence')
    assert not [e for e in normalized.get('events',{}).get('items',[]) if e.get('kind')=='page-error'],(site['id'],width,'page error')
    steps={s['step_id']:s for s in normalized.get('steps',[])}
    assert all(s.get('status')=='completed' for s in steps.values()),(site['id'],width,'failed action')
    before=State();before.feed(steps['settled']['artifacts']['dom']['value']['text'])
    after=State();after.feed(steps['after-interaction']['artifacts']['dom']['value']['text'])
    assert before.body.get('data-ready')==site['id'] and not before.body.get('data-error'),(site['id'],width,'mount error')
    assert before.stage.get('data-state')!='unsupported',(site['id'],width,'WebGL not available')
    assert before.stage.get('data-state')!=after.stage.get('data-state'),(site['id'],width,'interaction had no state effect')
    final=normalized['steps'][-1]
    image=final['artifacts']['screenshot'].get('value',{})
    assert image.get('data_base64'),(site['id'],width,'missing screenshot')
    data=base64.b64decode(image['data_base64']);assert hashlib.sha256(data).hexdigest()==image['sha256']
    (folder/'demo.png').write_bytes(data)
    summary={'site':site['id'],'viewport_width':width,'status':'passed','evidence_id':evidence['evidence_id'],
             'before_state':before.stage.get('data-state'),'after_state':after.stage.get('data-state'),
             'page_errors':0,'screenshot_sha256':image['sha256']}
    (folder/'result.json').write_text(json.dumps(summary,indent=2));print(json.dumps(summary),flush=True);return summary


def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--rea',type=Path,required=True);p.add_argument('--browser',type=Path,required=True);p.add_argument('--output',type=Path,required=True);args=p.parse_args();args.rea=args.rea.resolve();args.browser=args.browser.resolve();args.output=args.output.resolve();args.output.mkdir(parents=True,exist_ok=True)
    sites=json.loads(Path('research-registry.json').read_text())
    class Quiet(SimpleHTTPRequestHandler):
        def log_message(self,*args):pass
    server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(Path.cwd())))
    thread=threading.Thread(target=server.serve_forever,daemon=True);thread.start();base=f'http://127.0.0.1:{server.server_address[1]}'
    results=[];failures=[]
    try:
        with ThreadPoolExecutor(max_workers=3) as pool:
            futures={pool.submit(check,s,width,args,base):(s['id'],width) for s in sites for width in [1280,390]}
            for future in as_completed(futures):
                try:results.append(future.result())
                except Exception as error:
                    failures.append({'case':futures[future],'error':str(error)});print('FAILED',futures[future],str(error),flush=True)
    finally:server.shutdown();server.server_close()
    summary={'status':'failed' if failures else 'passed','passed':len(results),'total':30,'failures':failures,'results':results}
    (args.output/'summary.json').write_text(json.dumps(summary,indent=2));print('BROWSER_SUMMARY',json.dumps({k:v for k,v in summary.items() if k!='results'}),flush=True)
    return 1 if failures else 0


if __name__=='__main__':raise SystemExit(main())
