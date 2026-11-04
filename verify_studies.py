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
        super().__init__(); self.body={}; self.stage={}; self.nodes={}; self.buttons=[]; self.html={}
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='body': self.body=a
        if tag=='html': self.html=a
        if 'id' in a:self.nodes[a['id']]=a
        if tag=='button' and 'study-nav-item' in a.get('class',''):self.buttons.append(a)
        if a.get('id')=='stage': self.stage=a


def check(site,width,args,base,motion="reduce"):
    folder=args.output/(f"{site['id']}-{width}"+("-motion" if motion!="reduce" else ""))
    folder.mkdir(parents=True,exist_ok=True)
    scenario={'browser':{'mode':'launch','executable_path':str(args.browser),'headless':True},
      'start_url':{'url':f"{base}/sites/{site['directory']}/04-reconstruction/index.html"},
      'environment':{'viewport':{'width':width,'height':900,'device_scale_factor':1},'reduced_motion':motion},
      'command_timeout_ms':40000,
      'actions':[{'step_id':'mounted','action':'wait_for','locator':{'kind':'css','selector':f"body[data-ready='{site['id']}']"},'state':'visible','timeout_ms':12000},
                 {'step_id':'settled','action':'wait_for_timeout','duration_ms':350}],
      'capture':{'after_each_step':['dom','url'],'at_end':['dom','screenshot','url'],'events':['page-errors']}}
    control={'kind':'css','selector':'[data-layout]' if site['id']=='02' else '[data-testid="demo-control"]'}
    is_button=site['id'] in ['01','02','04','07','09','10','13']
    scenario['actions'].append({'step_id':'interaction','action':'click' if is_button else 'press','locator':control,'timeout_ms':5000,**({} if is_button else {'key':'ArrowRight'})})
    scenario['actions'].append({'step_id':'after-interaction','action':'wait_for_timeout','duration_ms':300})
    if site['id']=='01':
        scenario['actions'].append({'step_id':'close-detail','action':'click','locator':{'kind':'role','role':'button','name':'Close project'},'timeout_ms':4000})
    if site['id']=='01':
        scenario['actions'].append({'step_id':'closed','action':'wait_for','locator':{'kind':'css','selector':"#stage[data-state='closed']"},'state':'visible','timeout_ms':4000})
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
    summary={'site':site['id'],'viewport_width':width,'motion_preference':motion,'status':'passed','evidence_id':evidence['evidence_id'],
             'before_state':before.stage.get('data-state'),'after_state':after.stage.get('data-state'),
             'page_errors':0,'screenshot_sha256':image['sha256']}
    (folder/'result.json').write_text(json.dumps(summary,indent=2));print(json.dumps(summary),flush=True);return summary


def gallery_check(args,base):
    folder=args.output/'gallery-lifecycle';folder.mkdir(parents=True,exist_ok=True)
    actions=[{'step_id':'ready','action':'wait_for','locator':{'kind':'css','selector':"body[data-ready='01']"},'state':'visible','timeout_ms':10000}]
    for sid in ['04','05','08','15','01']:
        actions.extend([{'step_id':'select-'+sid,'action':'click','locator':{'kind':'css','selector':f"#study-nav button[data-id='{sid}']"},'timeout_ms':5000},
                        {'step_id':'mounted-'+sid,'action':'wait_for','locator':{'kind':'css','selector':f"body[data-ready='{sid}']"},'state':'visible','timeout_ms':5000}])
    actions.append({'step_id':'view-gallery','action':'press','locator':{'kind':'css','selector':'body'},'key':'PageDown','timeout_ms':5000})
    scenario={'browser':{'mode':'launch','executable_path':str(args.browser),'headless':True},'start_url':{'url':base+'/'},'environment':{'viewport':{'width':1280,'height':1000,'device_scale_factor':1},'reduced_motion':'reduce'},'command_timeout_ms':50000,'actions':actions,'capture':{'after_each_step':['dom','url'],'at_end':['dom','screenshot','url'],'events':['page-errors']}}
    path=folder/'scenario.json';path.write_text(json.dumps(scenario,indent=2))
    result=subprocess.run([str(args.rea),'capture-browser-scenario',str(path),'--format','json'],capture_output=True,timeout=65)
    evidence=json.loads(result.stdout);evidence=evidence.get('data',evidence);(folder/'evidence.json').write_text(json.dumps(evidence));normalized=evidence.get('normalized_result',{})
    assert result.returncode==0 and normalized.get('completeness',{}).get('status')=='complete','Gallery capture failed'
    assert not [e for e in normalized.get('events',{}).get('items',[]) if e.get('kind')=='page-error'],'Gallery page error'
    steps={s['step_id']:s for s in normalized['steps']}
    state=State();state.feed(steps['mounted-05']['artifacts']['dom']['value']['text'])
    assert 'background-color' not in state.stage.get('style','') and 'color:' not in state.stage.get('style',''),'Previous color component leaked inline style'
    assert 'color-demo' not in state.stage.get('class',''),'Previous component leaked its CSS class'
    state=State();state.feed(steps['mounted-01']['artifacts']['dom']['value']['text'])
    assert state.body.get('data-ready')=='01' and not state.body.get('data-error'),'Remount failed'
    image=normalized['steps'][-1]['artifacts']['screenshot']['value'];data=base64.b64decode(image['data_base64']);assert hashlib.sha256(data).hexdigest()==image['sha256'];(folder/'demo.png').write_bytes(data)
    return {'site':'gallery','status':'passed','evidence_id':evidence['evidence_id'],'checks':['color-style cleanup','class cleanup','WebGL mount/teardown','five successive mounts','zero page errors']}


def extra_check(name,width,args,base):
    folder=args.output/f"{name}-{width}";folder.mkdir(parents=True,exist_ok=True)
    def wait(step,selector):return {'step_id':step,'action':'wait_for','locator':{'kind':'css','selector':selector},'state':'visible','timeout_ms':12000}
    def action(step,kind,selector,value=None):
        item={'step_id':step,'action':kind,'locator':{'kind':'css','selector':selector},'timeout_ms':5000}
        if value is not None:item['value']={'source':'literal','value':value}
        return item
    if name=='runtime':
        actions=[wait('contracts',"body[data-result='passed'][data-checks='8']")]
        path_url='/runtime-check.html';motion='no-preference'
    else:
        actions=[wait('deep-link',"body[data-ready='04']"),
          action('search','fill','#study-search','igloo'),
          wait('filtered',"#study-nav button[data-id='08']:not([hidden])"),
          action('category','select_option','#category-filter','Maps & science'),
          wait('empty','#empty-results:not([hidden])'),
          action('reset','click','#clear-filters'),
          action('choose','click',"#study-nav button[data-id='05']"),
          wait('selected',"body[data-ready='05']"),
          action('pause','check','#motion-toggle'),
          wait('paused',"html[data-motion='paused']"),
          {'step_id':'view','action':'press','locator':{'kind':'css','selector':'body'},'key':'PageDown','timeout_ms':5000}]
        path_url='/?study=04';motion='reduce'
    scenario={'browser':{'mode':'launch','executable_path':str(args.browser),'headless':True},
      'start_url':{'url':base+path_url},'environment':{'viewport':{'width':width,'height':1000,'device_scale_factor':1},'reduced_motion':motion},
      'command_timeout_ms':60000,'actions':actions,'capture':{'after_each_step':['dom','url'],'at_end':['dom','screenshot','url'],'events':['page-errors']}}
    path=folder/'scenario.json';path.write_text(json.dumps(scenario,indent=2))
    result=subprocess.run([str(args.rea),'capture-browser-scenario',str(path),'--format','json'],capture_output=True,timeout=80)
    (folder/'stderr.txt').write_bytes(result.stderr)
    evidence=json.loads(result.stdout);evidence=evidence.get('data',evidence);(folder/'evidence.json').write_text(json.dumps(evidence));normalized=evidence.get('normalized_result',{})
    assert result.returncode==0 and normalized.get('completeness',{}).get('status')=='complete',(name,width,'incomplete evidence')
    assert not [e for e in normalized.get('events',{}).get('items',[]) if e.get('kind')=='page-error'],(name,width,'page error')
    steps={step['step_id']:step for step in normalized['steps']}
    assert all(step['status']=='completed' for step in steps.values()),(name,width,'failed action')
    if name=='gallery-ux':
        filtered=State();filtered.feed(steps['filtered']['artifacts']['dom']['value']['text'])
        assert [b['data-id'] for b in filtered.buttons if 'hidden' not in b]==['08'],'Search result mismatch'
        reset=State();reset.feed(steps['reset']['artifacts']['dom']['value']['text'])
        assert len([b for b in reset.buttons if 'hidden' not in b])==15,'Reset failed'
        selected=State();selected.feed(steps['selected']['artifacts']['dom']['value']['text'])
        assert '?study=05' in selected.nodes['study-permalink']['href'],'Permalink not updated'
        assert selected.stage['aria-busy']=='false','Mount stayed busy'
    image=normalized['steps'][-1]['artifacts']['screenshot']['value'];data=base64.b64decode(image['data_base64']);assert hashlib.sha256(data).hexdigest()==image['sha256'];(folder/'demo.png').write_bytes(data)
    summary={'site':name,'viewport_width':width,'status':'passed','evidence_id':evidence['evidence_id'],'page_errors':0,'screenshot_sha256':image['sha256']}
    if name=='runtime':summary['contract_checks']=8
    (folder/'result.json').write_text(json.dumps(summary,indent=2));return summary


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
        for sid in ['01','08']:
            try:results.append(check(next(s for s in sites if s['id']==sid),1280,args,base,'no-preference'))
            except Exception as error:failures.append({'case':sid+' active motion','error':str(error)})
        for name,width in [('gallery-ux',1280),('gallery-ux',390),('runtime',1280)]:
            try:results.append(extra_check(name,width,args,base))
            except Exception as error:failures.append({'case':f'{name}-{width}','error':str(error)})
        try:results.append(gallery_check(args,base))
        except Exception as error:failures.append({'case':'gallery lifecycle','error':str(error)})
    finally:server.shutdown();server.server_close()
    summary={'status':'failed' if failures else 'passed','passed':len(results),'total':36,'failures':failures,'results':results}
    (args.output/'summary.json').write_text(json.dumps(summary,indent=2));print('BROWSER_SUMMARY',json.dumps({k:v for k,v in summary.items() if k!='results'}),flush=True)
    return 1 if failures else 0


if __name__=='__main__':raise SystemExit(main())
