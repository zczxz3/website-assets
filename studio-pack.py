"""Build offline assets for Studio's existing static module v1 interface."""
import hashlib,html,io,json,pathlib,zipfile
R=pathlib.Path(__file__).resolve().parent
def pack(files):
 out=io.BytesIO()
 with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
  for name,data in sorted(files.items()):
   info=zipfile.ZipInfo(name,(2026,11,4,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o100644<<16;z.writestr(info,data)
 return out.getvalue()
rows=json.loads((R/'foundation-modules.json').read_text());entries={};modules=[];catalog=[]
for row in rows:
 m={k:v for k,v in row.items() if k!='study'};slug=m['id'].replace('/','--');modules.append(m)
 with zipfile.ZipFile(R/'foundation-pack.zip') as z:raw=z.read('installable/'+m['id'].split('/')[1]+'.zip')
 entries['installable/'+slug+'.zip']=raw
 catalog.append({'id':m['id'],'name':m['name'],'kind':'studio-static-module-v1','path':'installable/'+slug+'.zip','category':row['study']['category'],'limitations':row['study']['limitations'],'editable':row['study']['editable'],'runtime_required':False,'sha256':hashlib.sha256(raw).hexdigest()})
with zipfile.ZipFile(R/'queue-card.zip') as z:m=json.loads(z.read('module.json'))
modules.append(m);raw=(R/'queue-card.zip').read_bytes();entries['installable/queue--project-card.zip']=raw
catalog.append({'id':m['id'],'name':m['name'],'kind':'studio-static-module-v1','path':'installable/queue--project-card.zip','category':'Portfolio','limitations':'Static original project card; navigation href is editable and requires a real destination.','editable':'Heading, description, link and scoped CSS.','runtime_required':False,'sha256':hashlib.sha256(raw).hexdigest()})
files={'base.css':{'kind':'text','content':'body{margin:24px;font:16px/1.6 system-ui;color:#183d4b;background:#f7fafb}main{display:grid;gap:28px}section{min-width:0}nav{display:flex;gap:24px;margin-bottom:24px}'}}
for page,subset,prefix in [('index.html',modules[:16],''),('pages/more.html',modules[16:],'../')]:
 links=[];body=[]
 for mod in subset:
  path='modules/mws-'+mod['id'].encode().hex()+'.css';files[path]={'kind':'text','content':mod['css']};links.append(f'<link rel="stylesheet" href="{prefix}{path}">');body.append(f'<section><h2>{html.escape(mod["name"])}</h2>{mod["html"]}</section>')
 files[page]={'kind':'text','content':f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Studio component shelf</title><link rel="stylesheet" href="{prefix}base.css">'+''.join(links)+f'</head><body><nav><a href="{prefix}index.html">Foundations</a><a href="{prefix}pages/more.html">More components</a></nav><h1>Editable component shelf</h1><main>'+''.join(body)+'</main></body></html>'}
project={'format':'mws-project','version':1,'name':'Website Assets — Studio shelf','entry':'index.html','files':files,'modules':modules}
entries['studio-shelf.mws.json']=json.dumps(project,indent=2).encode()
registry=json.loads((R/'queue-registry.json').read_text())
index={'schema_version':1,'purpose':'Offline distribution index; not an additional Studio API. Install individual ZIPs or open the native project JSON.','studio_contract':'static-module-v1','modules':catalog,'runtime_library':{'path':'runtime/zczxz3-website-assets-motion-0.4.0.tgz','studio_installable':False,'reason':'Current Studio manifests reject scripts, dependencies and lifecycle hooks.'},'planned_effects':[{'id':r['id'],'name':r['name'],'status':r['status'],'studio_installable':False} for r in registry['targets'] if r['id'].startswith('E')]}
entries['studio-catalog.json']=json.dumps(index,indent=2).encode();entries['README.md']=(R/'STUDIO_INTEGRATION.md').read_bytes();entries['LICENSE']=(R/'LICENSE').read_bytes();entries[index['runtime_library']['path']]=(R/'zczxz3-website-assets-motion-0.4.0.tgz').read_bytes()
(R/'studio-catalog.json').write_bytes(entries['studio-catalog.json']);(R/'studio-shelf.mws.json').write_bytes(entries['studio-shelf.mws.json']);(R/'studio-components.zip').write_bytes(pack(entries))
out=R/'studio-dist';out.mkdir(exist_ok=True)
for name,data in entries.items():f=out/name;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(data)
(R/'studio-pack-manifest.json').write_text(json.dumps({'files':{n:hashlib.sha256(b).hexdigest() for n,b in entries.items()},'archive_bytes':(R/'studio-components.zip').stat().st_size,'archive_sha256':hashlib.sha256((R/'studio-components.zip').read_bytes()).hexdigest()},indent=2)+'\n')
print(json.dumps({'modules':len(modules),'project_files':len(files),'archive_bytes':(R/'studio-components.zip').stat().st_size}))
