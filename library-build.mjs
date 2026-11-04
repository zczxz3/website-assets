import {mkdir,readFile,writeFile,copyFile,rm} from 'node:fs/promises';
const dir='library-dist';await rm(dir,{recursive:true,force:true});await mkdir(dir);
for(const f of ['buttons.mjs','button-catalog.mjs','buttons.css','queue-components.mjs','LICENSE'])await copyFile(f,`${dir}/${f}`);
await copyFile('library.d.ts',`${dir}/index.d.ts`);
await copyFile('LIBRARY.md',`${dir}/README.md`);
await writeFile(`${dir}/index.mjs`,"export {mountButton} from './buttons.mjs';\nexport {bindMenu,bindAsync,bindReorder} from './queue-components.mjs';\n");
await writeFile(`${dir}/package.json`,JSON.stringify({name:'@zczxz3/website-assets-motion',version:'0.4.0',description:'Original native button effects and DOM interaction bindings. Experimental browser library.',type:'module',license:'MIT',repository:{type:'git',url:'https://github.com/zczxz3/website-assets.git'},main:'./index.mjs',types:'./index.d.ts',exports:{'.':{types:'./index.d.ts',import:'./index.mjs'},'./buttons.css':'./buttons.css'},files:['*.mjs','*.css','*.d.ts','LICENSE','README.md'],sideEffects:['*.css'],dependencies:{}},null,2));
console.log('Built original-code-only package in library-dist');
