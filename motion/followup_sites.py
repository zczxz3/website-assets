#!/usr/bin/env python3
"""Targeted public UI follow-ups grounded in the first capture's visible controls."""
import argparse
from concurrent.futures import ThreadPoolExecutor
import json
import os
from pathlib import Path
from tempfile import TemporaryDirectory
from collect_sites import rea, summarize_capture, write


def capture(site,args):
    sid=site['id'];out=args.output/site['directory'];out.mkdir(parents=True,exist_ok=True)
    actions=[{'step_id':'settled','action':'wait_for_timeout','duration_ms':10000}]
    # Selectors were observed in the original DOM summary or viewport screenshots.
    selectors={'06':'canvas','07':'#continue','11':'.start-button','13':'#button-draw'}
    if sid in selectors:
        actions.append({'step_id':'enter-experience','action':'click','locator':{'kind':'css','selector':selectors[sid]},'timeout_ms':8000})
        actions.append({'step_id':'after-entry','action':'wait_for_timeout','duration_ms':5000})
    if sid=='10':
        actions.append({'step_id':'play-note','action':'press','locator':{'kind':'css','selector':'canvas'},'key':'a','timeout_ms':5000})
    request={'browser':{'mode':'launch','executable_path':str(args.browser),'headless':True},'start_url':{'url':site['url']},'environment':{'viewport':{'width':1280,'height':800,'device_scale_factor':1},'reduced_motion':'no-preference'},'command_timeout_ms':65000,'actions':actions,'capture':{'after_each_step':['dom','url'],'at_end':['dom','screenshot','url'],'events':['page-errors']}}
    try:
        with TemporaryDirectory() as td:
            path=Path(td)/'scenario.json';write(path,request)
            result,code=rea([str(args.rea),'capture-browser-scenario',str(path),'--format','json'],out,'followup',95)
            if not result.get('normalized_result'):
                write(out/'result.json',{'site':sid,'status':'failed','error':result.get('error')});return
            summary=summarize_capture(result,out,site['url'])
            status='complete' if summary.get('completeness',{}).get('status')=='complete' else 'partial'
            write(out/'result.json',{'site':sid,'status':status,'evidence_id':summary['evidence_id'],'scope':'Targeted entry control or longer loading observation; not full interaction coverage.'})
            print('REFERENCE_FOLLOWUP',sid,status,flush=True)
    except Exception as error:
        write(out/'result.json',{'site':sid,'status':'failed','error':str(error)});print('REFERENCE_FOLLOWUP',sid,str(error),flush=True)


def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--rea',type=Path,required=True);p.add_argument('--browser',type=Path,required=True);p.add_argument('--output',type=Path,required=True);p.add_argument('--repeat-references',action='store_true');args=p.parse_args();args.rea=args.rea.resolve();args.browser=args.browser.resolve()
    if int(os.environ.get('GITHUB_RUN_NUMBER','1'))>1 and not args.repeat_references:
        print('Reference follow-ups are already retained from run 1; component-only rerun skips public site visits.',flush=True);return
    sites=[s for s in json.loads(Path('sites.json').read_text())['sites'] if s['id'] in ['06','07','08','09','10','11','13']]
    with ThreadPoolExecutor(max_workers=2) as pool:list(pool.map(lambda site:capture(site,args),sites))


if __name__=='__main__':main()
