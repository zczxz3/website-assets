#!/usr/bin/env python3
"""Build the reproducible source ZIP or verify it against the published sources."""
from pathlib import Path, PurePosixPath
import argparse
import hashlib
import json
import zipfile

ROOT_FILES = ['index.html','index.mjs','styles.css','registry.mjs','catalog.mjs',
              'research-registry.json','component-tests.mjs','runtime-check.html',
              'verify_studies.py','followup_sites.py','package_studies.py','LICENSE','batch-two-sites.json']

def verify(root=Path('.')):
    root=root.resolve();checked=0
    with zipfile.ZipFile(root/'study-source.zip') as archive:
        names=archive.namelist()
        if len(names)!=len(set(names)):raise ValueError('Duplicate archive paths')
        for name in names:
            path=PurePosixPath(name)
            if path.is_absolute() or '..' in path.parts:raise ValueError('Unsafe archive path')
        if archive.testzip():raise ValueError('Corrupted ZIP entry')
        for name in ROOT_FILES:
            if name not in names:raise ValueError(f'Missing root source: {name}')
        modules={str(p.relative_to(root)) for p in (root/'components').glob('*.mjs')}
        archived={n for n in names if n.startswith('components/') and n.endswith('.mjs')}
        if not modules or modules!=archived:raise ValueError('Published component set differs from archive')
        for name in ROOT_FILES+sorted(modules):
            if not (root/name).is_file() or (root/name).read_bytes()!=archive.read(name):
                raise ValueError(f'Published source differs from tested archive: {name}')
            checked+=1
        sites=json.loads(archive.read('research-registry.json'))
        for site in sites:
            for section in ['01-original','02-analysis','03-assets','04-reconstruction','05-components','06-demo']:
                if not any(n.startswith(f"sites/{site['directory']}/{section}/") for n in names):
                    raise ValueError(f"Missing study section: {site['id']} {section}")
    return {'status':'passed','source_files_compared':checked,'archive_files':len(names),
            'site_directories':len(sites),'sha256':hashlib.sha256((root/'study-source.zip').read_bytes()).hexdigest()}

def build(root=Path('.')):
    root=root.resolve()
    paths=[root/n for n in ROOT_FILES]
    paths += [p for directory in ['sites','components'] for p in (root/directory).rglob('*') if p.is_file()]
    if not (root/'sites').is_dir():raise ValueError('Extract the existing study source ZIP before rebuilding')
    temporary=root/'study-source.tmp.zip'
    with zipfile.ZipFile(temporary,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=9) as archive:
        for path in sorted(paths):
            info=zipfile.ZipInfo(path.relative_to(root).as_posix(),date_time=(2026,1,1,0,0,0))
            info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o100644<<16
            archive.writestr(info,path.read_bytes())
    temporary.replace(root/'study-source.zip')
    return verify(root)

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('command',choices=['build','verify']);args=parser.parse_args()
    print(json.dumps(build() if args.command=='build' else verify(),indent=2))
