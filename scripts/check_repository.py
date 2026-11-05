"""Check relocated source links, syntax, catalogs and distribution integrity offline."""
from pathlib import Path, PurePosixPath
import ast, hashlib, json, re, subprocess, sys, zipfile, tarfile
from urllib.parse import unquote, urlsplit

ROOT=Path(__file__).resolve().parents[1]
AREAS=['motion','buttons','foundation','queue','studio','library','docs','scripts','maintenance']
SKIP={'node_modules','studio-fixture','foundation-dist','queue-dist','studio-dist','library-dist','consumer','gallery','sites','__pycache__'}
files=[p for area in AREAS for p in (ROOT/area).rglob('*') if p.is_file() and not SKIP.intersection(p.relative_to(ROOT).parts)]
files += [ROOT/'README.md',ROOT/'index.html']
errors=[];links=0;modules=0;python=0;archives=0;module_paths=[]
def check_link(p,value):
    global links
    value=unquote(value)
    url=urlsplit(value)
    if url.scheme or url.netloc or not url.path or '${' in value:return
    target=(p.parent/url.path).resolve()
    links+=1
    if not target.exists():errors.append(f'{p.relative_to(ROOT)}: missing {value}')
for p in files:
    if p.suffix in ['.html','.md','.mjs','.py','.json','.yml','.css','.ts']:
        text=p.read_text()
        if p.suffix=='.md' and 'maintenance' not in p.parts:
            for value in re.findall(r'\]\(([^\s)]+)\)',text):check_link(p,value)
        if p.suffix=='.html':
            # Consumer fixture resolves these only after installation in its isolated app.
            for value in re.findall(r'(?:href|src)=["\']([^"\']+)["\']',text):
                if not value.startswith('node_modules/'):check_link(p,value)
        if p.suffix=='.mjs':
            modules+=1
            module_paths.append(str(p))
        if p.suffix=='.py':
            python+=1
            try:ast.parse(text,filename=str(p))
            except SyntaxError as e:errors.append(str(e))
    if p.suffix=='.zip':
        archives+=1
        with zipfile.ZipFile(p) as z:
            if z.testzip():errors.append(f'Corrupt archive: {p.name}')
            names=z.namelist()
            if len(names)!=len(set(names)):errors.append(f'Duplicate archive paths: {p.name}')
            for name in names:
                parts=PurePosixPath(name)
                if parts.is_absolute() or '..' in parts.parts:errors.append(f'Unsafe archive path: {p.name}/{name}')
    if p.suffix=='.tgz':
        archives+=1
        with tarfile.open(p) as t:
            for m in t.getmembers():
                parts=PurePosixPath(m.name)
                if parts.is_absolute() or '..' in parts.parts:errors.append(f'Unsafe tarball path: {m.name}')
# Parse actual modules instead of mistaking generated export source strings for imports.
parser="""const fs=require('node:fs'),vm=require('node:vm');const paths=JSON.parse(fs.readFileSync(0,'utf8'));const result=[];for(const path of paths){try{const m=new vm.SourceTextModule(fs.readFileSync(path,'utf8'));result.push({path,imports:m.dependencySpecifiers});}catch(e){result.push({path,error:String(e)});}}process.stdout.write(JSON.stringify(result));"""
parsed=subprocess.run(['node','--experimental-vm-modules','-e',parser],input=json.dumps(module_paths),capture_output=True,text=True,check=True)
for module in json.loads(parsed.stdout):
    if 'error' in module:errors.append(f"{module['path']}: {module['error']}")
    for value in module.get('imports',[]):
        if value.startswith('.'):check_link(Path(module['path']),value)
# The atlas dynamically imports one of these modules on selection.
for study in json.loads((ROOT/'motion/research-registry.json').read_text()):
    if 'module' in study:check_link(ROOT/'motion/index.mjs','components/'+study['module']+'.mjs')
mapping=json.loads((ROOT/'docs/path-migration.json').read_text())['paths']
for new in mapping.values():
    if not (ROOT/new).is_file():errors.append(f'Migration lost tracked file: {new}')
for area in AREAS[:6]:
    if (ROOT/area/'LICENSE').read_bytes()!=(ROOT/'LICENSE').read_bytes():errors.append(f'License mismatch: {area}')
for area in ['foundation','queue','studio']:
    manifest=json.loads((ROOT/area/f'{area}-pack-manifest.json').read_text())
    filename={'foundation':'foundation-pack.zip','queue':'queue-source.zip','studio':'studio-components.zip'}[area]
    if hashlib.sha256((ROOT/area/filename).read_bytes()).hexdigest()!=manifest['archive_sha256']:errors.append(f'Stale archive manifest: {filename}')
result={'status':'failed' if errors else 'passed','local_links_and_imports':links,'javascript_modules':modules,'python_files':python,'archives':archives,'preserved_tracked_files':len(mapping),'errors':errors}
print(json.dumps(result,indent=2));sys.exit(bool(errors))
