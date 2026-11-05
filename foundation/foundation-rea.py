#!/usr/bin/env python3
"""Two smoke scenarios through the unmodified REA CLI; detailed pointer tests use Playwright."""
import argparse,base64,hashlib,json,subprocess,threading
from functools import partial
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--browser',required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();a.output.mkdir(parents=True,exist_ok=True)
server=ThreadingHTTPServer(('127.0.0.1',0),partial(SimpleHTTPRequestHandler,directory='.'));threading.Thread(target=server.serve_forever,daemon=True).start()
results=[]
try:
 for width in [390,1280]:
  folder=a.output/str(width);folder.mkdir();scenario={'browser':{'mode':'launch','executable_path':a.browser,'headless':True},'start_url':{'url':f'http://127.0.0.1:{server.server_port}/foundation-dist/modules/accordion/demo.html'},'environment':{'viewport':{'width':width,'height':900,'device_scale_factor':1},'reduced_motion':'reduce'},'command_timeout_ms':20000,'actions':[{'step_id':'ready','action':'wait_for','locator':{'kind':'css','selector':'.mf-accordion'},'state':'visible','timeout_ms':8000},{'step_id':'open','action':'click','locator':{'kind':'css','selector':'.mf-accordion details:first-child summary'},'timeout_ms':5000},{'step_id':'opened','action':'wait_for','locator':{'kind':'css','selector':'.mf-accordion details[open]'},'state':'visible','timeout_ms':3000},{'step_id':'close','action':'press','locator':{'kind':'css','selector':'.mf-accordion details:first-child summary'},'key':'Space','timeout_ms':3000},{'step_id':'restored','action':'wait_for','locator':{'kind':'css','selector':'.mf-accordion details:first-child:not([open])'},'state':'visible','timeout_ms':3000}],'capture':{'after_each_step':['dom','url'],'at_end':['dom','url','screenshot'],'events':['page-errors']}}
  path=folder/'scenario.json';path.write_text(json.dumps(scenario));r=subprocess.run(['../node_modules/.bin/rea','capture-browser-scenario',str(path),'--format','json'],capture_output=True,timeout=60);(folder/'stderr.txt').write_bytes(r.stderr);e=json.loads(r.stdout);e=e.get('data',e);(folder/'evidence.json').write_text(json.dumps(e));n=e['normalized_result'];assert r.returncode==0 and n['completeness']['status']=='complete';assert all(s['status']=='completed' for s in n['steps']);assert not [x for x in n['events']['items'] if x['kind']=='page-error'];im=n['steps'][-1]['artifacts']['screenshot']['value'];data=base64.b64decode(im['data_base64']);assert hashlib.sha256(data).hexdigest()==im['sha256'];(folder/'demo.png').write_bytes(data);results.append({'width':width,'status':'passed','evidence_id':e['evidence_id'],'screenshot_sha256':im['sha256']})
finally:
 server.shutdown();(a.output/'summary.json').write_text(json.dumps({'status':'passed' if len(results)==2 else 'failed','scenarios':results},indent=2))
