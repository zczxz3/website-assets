import hashlib,json,pathlib,subprocess
p=pathlib.Path('.');m=json.loads((p/'distribution-migration.json').read_text())
for group in m.values():
 for name,sha in group.items():
  assert (p/name).is_file() and hashlib.sha256((p/name).read_bytes()).hexdigest()==sha,name
subprocess.run(['gh','release','create','evidence-v0.3',*m['release'].keys(),'--title','Historical original-demo evidence','--notes','Original demonstration evidence and previews moved out of the source tree. These are not reference-fidelity measurements. Third-party reference capture archives are excluded.'],check=True)
base='https://github.com/zczxz3/website-assets/releases/download/evidence-v0.3/'
for f in p.glob('*.md'):
 s=f.read_text()
 for name in m['release']:s=s.replace(']('+name+')',']('+base+name+')')
 for name in m['remove_without_republishing']:s=s.replace(']('+name+')','](DISTRIBUTION.md)')
 f.write_text(s)
for group in m.values():
 for name in group:subprocess.run(['git','rm','--',name],check=True)
subprocess.run(['git','add','--','*.md'],check=True)
subprocess.run(['git','-c','user.name=github-actions[bot]','-c','user.email=41898282+github-actions[bot]@users.noreply.github.com','commit','-m','Move original evidence to Releases and remove unlicensed captures [skip ci]'],check=True)
subprocess.run(['git','push','origin','HEAD:main'],check=True)
