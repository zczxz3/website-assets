// @vitest-environment node
// Copied into the pinned Studio checkout for tests against its unmodified core.
import {test,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {moduleFromZip,installModule,validateModule} from '../src/core/modules';
import {projectFromFiles,exportWebsite,parseProjectJson,saveProject} from '../src/core/io';
import {elements,sourceText} from '../src/core/source';
import {applyCommand,ownStyle} from '../src/core/commands';
import {unzipSync,strFromU8,strToU8} from 'fflate';
const root=resolve(process.cwd(),'..');
const rows=JSON.parse(readFileSync(resolve(root,'foundation-modules.json'),'utf8'));
const blank=()=>projectFromFiles({'index.html':strToU8('<!doctype html><html lang="en"><head><title>Contract</title></head><body><!-- preserve this byte-level comment --></body></html>')},'Contract');
test.each(rows)('$id installs, repeats, edits, saves and exports',row=>{
 const slug=row.id.split('/')[1],m=moduleFromZip(new Uint8Array(readFileSync(resolve(root,'foundation-dist/installable/'+slug+'.zip'))));expect(m.id).toBe(row.id);expect(m.html).toBe(row.html);expect(m.css).toBe(row.css);
 let p=installModule(blank(),m);expect(()=>installModule(p,m)).toThrow(/已安装/);
 const body=elements(sourceText(p)).find(e=>e.tag==='body')!;
 p=applyCommand(p,{type:'insert',parentId:body.id,html:m.html});p=applyCommand(p,{type:'insert',parentId:body.id,html:m.html});
 const roots=elements(sourceText(p)).filter(e=>e.node.attrs?.some(a=>a.name==='class'&&a.value===row.study.selector.slice(1)));expect(roots).toHaveLength(2);expect(roots[0].id).not.toBe(roots[1].id);
 const first=elements(sourceText(p)).find(e=>e.loc.startOffset>=roots[0].loc.startOffset&&e.loc.endOffset<=roots[0].loc.endOffset&&e.loc.endTag&&!e.node.childNodes?.some(n=>n.tagName)&&e.node.childNodes?.some(n=>n.nodeName==='#text'&&n.value?.trim()))!;expect(first).toBeTruthy();
 p=applyCommand(p,{type:'text',id:first.id,text:'Verified editable text'});p=applyCommand(p,{type:'style',id:roots[0].id,property:'--mf-radius',value:'23px'});expect(ownStyle(p,roots[0].id,'--mf-radius')).toBe('23px');expect(sourceText(p)).toContain('<!-- preserve this byte-level comment -->');
 const saved=parseProjectJson(saveProject(p));expect(saved.modules[0].id).toBe(row.id);const files=unzipSync(exportWebsite(saved));const html=strFromU8(files['index.html']);expect(html).toContain('Verified editable text');expect(html).toContain('studio.css');expect(strFromU8(files['studio.css'])).toContain('23px');
});
test('collection project opens with all module source intact',()=>{const p=parseProjectJson(readFileSync(resolve(root,'foundation-showcase.mws.json'),'utf8'));expect(p.modules).toHaveLength(30);for(const row of rows){expect(sourceText(p)).toContain(row.study.selector.slice(1));expect(sourceText(p,'foundation.css')).toContain(row.css);}expect(Object.keys(unzipSync(exportWebsite(p)))).toEqual(expect.arrayContaining(['index.html','foundation.css']));});
test('generated gallery ZIP is compatible with the actual module parser',async()=>{
 const {zipFile,manifestOf}=await import('../../foundation.mjs');
 const row=rows[0],text=JSON.stringify({...manifestOf(row),name:'Unicode test ✓ 汉字',id:row.id+'-custom'});
 const m=moduleFromZip(zipFile('module.json',text));expect(m.name).toBe('Unicode test ✓ 汉字');expect(m.id).toBe(row.id+'-custom');
});
test('static module boundary remains enforced',()=>{const m=rows[0];expect(()=>validateModule({...m,html:'<script>alert(1)</script>'})).toThrow();expect(()=>validateModule({...m,permissions:['network']})).toThrow();expect(()=>validateModule({...m,dependencies:{react:'19'}})).toThrow();expect(()=>validateModule({...m,html:'<button onclick="alert(1)">x</button>'})).toThrow();});
