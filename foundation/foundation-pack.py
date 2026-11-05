"""Deterministic static module pack; standard library only."""
import io,json,pathlib,zipfile,hashlib,sys,html
R=pathlib.Path(__file__).resolve().parent
FILES=['foundation.html','foundation.css','foundation.mjs','foundation-modules.json','foundation-resources.json','FOUNDATION_GUIDE.md','FOUNDATION_RESEARCH.md','LICENSE','foundation-pack.py']
def asbytes(v):return v.encode() if isinstance(v,str) else v
def zipbytes(files):
    out=io.BytesIO()
    with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
        for path,data in sorted(files.items()):
            info=zipfile.ZipInfo(path,(2026,11,4,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o100644<<16
            z.writestr(info,asbytes(data))
    return out.getvalue()
def build():
    rows=json.loads((R/'foundation-modules.json').read_text());refs=json.loads((R/'foundation-resources.json').read_text());assert len(rows)==30 and len(refs)==26
    entries={f:(R/f).read_bytes() for f in FILES};manifest=[];page=[];styles=[]
    for m in rows:
        slug=m['id'].split('/')[1];study=m['study'];mod={k:v for k,v in m.items() if k!='study'};raw=json.dumps(mod,indent=2)+'\n'
        assert mod['permissions']==[] and mod['dependencies']=={}
        notice=f'# {m["name"]}\n\n{m["description"]}\n\n## Boundaries\n\n{study["limitations"]}\n\n## Edit\n\n{study["editable"]}\n\n## Interaction\n\nNative controls work with keyboard/touch. Buttons provide focus, hover, press and release styling only; bind application actions separately. Reduced-motion rules disable animation. No state persistence or remote requests are implemented.\n\n## Provenance\n\n{study["implementation"]} Original code: MIT.\n\n'
        for n in study['references']:notice+=f'- [{refs[n-1]["name"]}]({refs[n-1]["url"]}) — reference only, no source copied.\n'
        single={'module.json':raw,'LICENSE':entries['LICENSE'],'README.md':notice}
        entries['installable/'+slug+'.zip']=zipbytes(single)
        for path,data in {'module.json':raw,'component.html':mod['html']+'\n','component.css':mod['css']+'\n','README.md':notice,'LICENSE':entries['LICENSE'],'demo.html':f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{html.escape(m["name"])}</title><link rel="stylesheet" href="component.css"></head><body style="margin:32px">{mod["html"]}</body></html>'}.items():entries[f'modules/{slug}/{path}']=data
        page.append(f'<section class="showcase-item"><h2>{html.escape(m["name"])}</h2>{m["html"]}</section>');styles.append(m['css']);manifest.append(mod)
    shell='body{margin:0;padding:24px;font:15px system-ui;background:#f3f7f4;color:#193d42}.showcase-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr));gap:24px}.showcase-item{min-width:0}.showcase-item>h2{font-size:14px;font-weight:500}'
    site='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Foundation showcase</title><link rel="stylesheet" href="foundation.css"></head><body><h1>Foundation showcase</h1><p>30 editable native modules. Example values and links must be adapted for your project.</p><main class="showcase-grid">'+''.join(page)+'</main></body></html>'
    project=dict(format='mws-project',version=1,name='Foundation showcase',entry='index.html',files={'index.html':dict(kind='text',content=site),'foundation.css':dict(kind='text',content=shell+'\n'+'\n'.join(styles))},modules=manifest)
    entries['foundation-showcase.mws.json']=json.dumps(project,indent=2)+'\n';entries['showcase/index.html']=site;entries['showcase/foundation.css']=shell+'\n'+'\n'.join(styles)
    entries={k:asbytes(v) for k,v in entries.items()};packed=zipbytes(entries)
    report={'format':1,'modules':30,'resources':26,'studio_commit':'3f989b2be833f468db600c24aa49194abf5f918e','archive_sha256':hashlib.sha256(packed).hexdigest(),'archive_bytes':len(packed),'entries':{p:{'bytes':len(d),'sha256':hashlib.sha256(d).hexdigest()} for p,d in sorted(entries.items())}}
    return entries,packed,report
entries,packed,report=build()
if len(sys.argv)>1 and sys.argv[1]=='verify':
    assert (R/'foundation-pack.zip').read_bytes()==packed,'Pack is stale'
    assert json.loads((R/'foundation-pack-manifest.json').read_text())==report,'Manifest is stale'
    print('Verified',len(entries),'archive entries and 30 installable ZIPs')
else:
    (R/'foundation-pack.zip').write_bytes(packed);(R/'foundation-pack-manifest.json').write_text(json.dumps(report,indent=2)+'\n')
    (R/'foundation-showcase.mws.json').write_bytes(entries['foundation-showcase.mws.json'])
    target=R/'foundation-dist';target.mkdir(exist_ok=True)
    for path,data in entries.items():
        f=target/path;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(data)
    print(json.dumps({k:v for k,v in report.items() if k!='entries'}))
