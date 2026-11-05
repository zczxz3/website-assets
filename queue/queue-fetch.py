#!/usr/bin/env python3
"""Acquire pinned public research sources. Never runs upstream project code."""
import argparse, json, pathlib, subprocess
p=argparse.ArgumentParser();p.add_argument('--ids',nargs='+',default=['B07','B08','B09','B10']);p.add_argument('--output',type=pathlib.Path,default=pathlib.Path('references'));a=p.parse_args()
rows={r['id']:r for r in json.loads(pathlib.Path(__file__).with_name('queue-registry.json').read_text())['targets']}
selected=[]
for id in a.ids:
 r=rows.get(id)
 if not r or r['batch']!='clone' or not r['source_commit']:p.error(f'{id}: not a pinned clone candidate')
 selected.append(r)
a.output.mkdir(parents=True,exist_ok=True)
for r in selected:
 dest=a.output/r['id'];sha=r['source_commit']
 if dest.exists():
  head=subprocess.run(['git','-C',str(dest),'rev-parse','HEAD'],capture_output=True,text=True)
  if head.returncode==0 and head.stdout.strip()==sha:print(f"SKIP {r['id']} already at {sha}");continue
  raise SystemExit(f'Refusing existing nonmatching directory: {dest}')
 dest.mkdir()
 for args in [['init','--quiet'],['remote','add','origin',r['repo_url']],['fetch','--depth','1','origin',sha],['checkout','--detach','FETCH_HEAD']]:
  subprocess.run(['git','-C',str(dest),*args],check=True)
 print(f"READY {r['id']} {sha}; inspect licenses before reuse")
