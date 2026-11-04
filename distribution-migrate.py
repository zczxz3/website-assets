import hashlib,json,pathlib,subprocess,tempfile,os
p=pathlib.Path('.');m=json.loads((p/'distribution-migration.json').read_text())
for group in m.values():
 for name,sha in group.items():
  assert (p/name).is_file() and hashlib.sha256((p/name).read_bytes()).hexdigest()==sha,name
tag='evidence-v0.3'
exists=subprocess.run(['gh','release','view',tag],capture_output=True).returncode==0
if not exists:
 subprocess.run(['gh','release','create',tag,*m['release'].keys(),'--target',os.environ['GITHUB_SHA'],'--title','Historical original-demo evidence','--notes','Original demonstration evidence and previews moved out of the source tree. These are not reference-fidelity measurements. Third-party reference capture archives are excluded.'],check=True)
# Verify the bytes downloaded from the Release before removing any tracked file.
with tempfile.TemporaryDirectory() as temp:
 subprocess.run(['gh','release','download',tag,'--dir',temp],check=True)
 actual={x.name for x in pathlib.Path(temp).iterdir()}
 assert actual==set(m['release']), 'Release asset inventory differs from the approved manifest'
 for name,sha in m['release'].items():
  assert hashlib.sha256((pathlib.Path(temp)/name).read_bytes()).hexdigest()==sha,name
base='https://github.com/zczxz3/website-assets/releases/download/evidence-v0.3/'
for f in p.glob('*.md'):
 s=f.read_text()
 for name in m['release']:s=s.replace(']('+name+')',']('+base+name+')')
 for name in m['remove_without_republishing']:s=s.replace(']('+name+')','](DISTRIBUTION.md)')
 f.write_text(s)
# Reflect the user's explicit migration approval and local-tool-only direction.
f=p/'DISTRIBUTION.md';s=f.read_text().replace('## Storage policy — migration pending approval','## Storage policy — migration completed').replace('are proposed to move from the default branch','have moved from the default branch').replace('are proposed for removal from the default branch without republishing as Release assets','have been removed from the default branch without republishing as Release assets')
s=s[:s.index('## Online preview')]+'''## Local use only

The user selected installable and locally runnable tools, with no online deployment. No Pages, website hosting or CDN publishing is configured by this migration. The consumer-verification workflow creates a static gallery ZIP for optional local use.

The one-time migration was explicitly approved after the initial approval block. All 15 Release assets were downloaded and SHA-256 verified before 17 files were removed from the current branch. The migration workflow deletes itself in the completion commit. Existing history remains unchanged.
''';f.write_text(s)
f=p/'LIBRARY_VERIFICATION.md';s=f.read_text().replace('Release migration and Pages deployment have not run. The active CI workflow is read-only.','Evidence migration is recorded in DISTRIBUTION.md. Online deployment was declined by the user. The consumer CI workflow is read-only.');f.write_text(s)
f=p/'library-verification.json';v=json.loads(f.read_text());v['migration']='completed; see distribution-migration-result.json';v['pages']='not deployed; local tools requested';f.write_text(json.dumps(v,indent=2)+'\n')
f=p/'README.md';s=f.read_text();s=s.replace('Artifact files are preserved in the repository as well as Actions, so the research does not rely on Actions retention.','Original-demo evidence is preserved in the evidence-v0.3 Release. Third-party capture archives are no longer distributed from the current branch. Use the package directly, or use a shallow clone for local study; no online deployment is required.')
s=s.replace('original second-batch evidence is\n`batch-two-reference-evidence.zip`','original second-batch capture distribution is discontinued; see\n`DISTRIBUTION.md`');f.write_text(s)
# Replace the unused old publishing draft with the already-active read-only CI.
(p/'publish-library.yml').write_bytes((p/'.github/workflows/publish-library.yml').read_bytes())
result={'status':'completed','release':base.removesuffix('/'),'source_commit':os.environ['GITHUB_SHA'],'release_assets_verified':len(m['release']),'removed_reference_archives':len(m['remove_without_republishing']),'history_rewritten':False,'online_deployment':False,'verified_sha256':m['release']}
(p/'distribution-migration-result.json').write_text(json.dumps(result,indent=2)+'\n')
for group in m.values():
 for name in group:subprocess.run(['git','rm','--',name],check=True)
subprocess.run(['git','rm','--','.github/workflows/migrate-evidence.yml'],check=True)
subprocess.run(['git','add','--','*.md','publish-library.yml','library-verification.json','distribution-migration-result.json'],check=True)
subprocess.run(['git','-c','user.name=github-actions[bot]','-c','user.email=41898282+github-actions[bot]@users.noreply.github.com','commit','-m','Move original evidence to Releases and remove unlicensed captures [skip ci]'],check=True)
subprocess.run(['git','push','origin','HEAD:main'],check=True)
