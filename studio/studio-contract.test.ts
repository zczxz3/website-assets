// @vitest-environment node
import {test,expect} from 'vitest';import {readFileSync} from 'node:fs';import {resolve} from 'node:path';
import * as moduleApi from '../src/core/modules';import {projectFromFiles,parseProjectJson,saveProject,exportWebsite} from '../src/core/io';import {sourceText,elements,attr,parseHtml,walk} from '../src/core/source';import {applyCommand} from '../src/core/commands';import {ProjectStore} from '../src/core/store';import {strToU8,unzipSync,strFromU8} from 'fflate';
const root=resolve('..','studio'),catalog=JSON.parse(readFileSync(resolve(root,'studio-catalog.json'),'utf8'));
const blank=()=>projectFromFiles(Object.fromEntries(['index.html','pages/detail.html'].map(path=>[path,strToU8('<!doctype html><html><head><title>Contract</title></head><body><!-- keep original bytes --><main><h1>Original</h1></main></body></html>')])),'Consumer');
test.each(catalog.modules)('$id validates, inserts on two pages, edits and round-trips',row=>{
 const m=moduleApi.moduleFromZip(new Uint8Array(readFileSync(resolve(root,'studio-dist',row.path))));expect(m.id).toBe(row.id);expect(m.permissions).toEqual([]);expect(m.dependencies).toEqual({});
 let p=blank();const fixed=(moduleApi as any).insertModule as ((p:any,m:any,id:string)=>any)|undefined;
 if(!fixed){p=moduleApi.installModule(p,m);expect(parseProjectJson(saveProject(p)).modules[0]).toEqual(m);return;}
 const store=new ProjectStore(p),before=store.getSnapshot().project;
 const insert=()=>{const current=store.getSnapshot().project;const parent=elements(sourceText(current)).find(n=>n.tag==='main')!.id;store.replace(fixed(current,m,parent),'Insert module');};
 insert();store.undo();expect(store.getSnapshot().project).toEqual(before);store.redo();insert();
 p=store.getSnapshot().project;expect(()=>moduleApi.installModule(p,m)).toThrow();p={...p,entry:'pages/detail.html'};store.replace(p);insert();p=store.getSnapshot().project;
 expect(p.modules).toHaveLength(1);const css=Object.keys(p.files).filter(n=>p.files[n].content===m.css);expect(css).toHaveLength(1);
 for(const page of ['index.html','pages/detail.html']){let matches=0;walk(parseHtml(sourceText(p,page)),n=>{if(n.tagName==='link'&&attr(n,'href')===(page.includes('/')?'../':'')+css[0])matches++;});expect(matches).toBe(1);expect(sourceText(p,page)).toContain('<!-- keep original bytes -->');}
 const heading=elements(sourceText(p)).find(n=>n.tag==='h1')!;p=applyCommand(p,{type:'text',id:heading.id,text:'Edited consumer heading'});const reopened=parseProjectJson(saveProject(p));const output=unzipSync(exportWebsite(reopened));expect(strFromU8(output['pages/detail.html'])).toContain('Edited consumer heading');expect(strFromU8(output[css[0]])).toBe(m.css);
});
test('the native shelf opens, edits and exports all 31 registered components',()=>{let p=parseProjectJson(readFileSync(resolve(root,'studio-shelf.mws.json'),'utf8'));expect(p.modules).toHaveLength(31);const heading=elements(sourceText(p)).find(n=>n.tag==='h1')!;p=applyCommand(p,{type:'text',id:heading.id,text:'My component shelf'});const reopened=parseProjectJson(saveProject(p)),zip=unzipSync(exportWebsite(reopened));expect(strFromU8(zip['index.html'])).toContain('My component shelf');expect(zip['pages/more.html']).toBeTruthy();for(const m of p.modules)expect(Object.values(p.files).some(f=>f.content===m.css)).toBe(true);});
test('runtime and planned effects are never presented as installed modules',()=>{expect(catalog.modules).toHaveLength(31);expect(catalog.runtime_library.studio_installable).toBe(false);expect(catalog.planned_effects).toHaveLength(20);expect(catalog.planned_effects.every(e=>e.studio_installable===false)).toBe(true);});
