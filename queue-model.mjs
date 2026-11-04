// Original Website Assets code. MIT; see LICENSE. No upstream implementation bundled.
export const clone = value => JSON.parse(JSON.stringify(value));
export const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const sample = {
  format:'queue-portfolio', version:1, name:'Alex Morgan', role:'Designer & creative developer',
  intro:'I build thoughtful digital experiences. A small collection of experiments in motion, space and interaction.',
  social:'https://github.com/', accent:'#2463eb', showBlog:true, motion:true, layout:'grid',
  article:{title:'Small details, better experiences', body:'A clear action, a useful response, and a way back. These are the details I return to when designing for the web.\n\nThis portfolio is made from independent, editable building blocks.'},
  projects:[
    {id:'field',title:'Field notes',description:'A quiet place for ideas and observations.',cover:'#176f68'},
    {id:'orbit',title:'Orbit systems',description:'An exploration of rhythm, structure and space.',cover:'#335bce'},
    {id:'form',title:'Form & function',description:'Everyday objects seen from a different angle.',cover:'#8259a2'}
  ]
};
export function validateModel(value) {
  if(!value || value.format!=='queue-portfolio' || value.version!==1) throw Error('Choose a Queue Portfolio v1 JSON file.');
  const text=(v,n,max)=>{if(typeof v!=='string'||v.length>max||!v.trim())throw Error(n+' is missing or too long.');return v;};
  const color=v=>{if(!/^#[0-9a-f]{6}$/i.test(v))throw Error('Use a six-digit hex color.');return v;};
  const m={format:value.format,version:1,name:text(value.name,'Name',100),role:text(value.role,'Role',150),intro:text(value.intro,'Introduction',2000),social:text(value.social,'Social URL',500),accent:color(value.accent),layout:value.layout,showBlog:value.showBlog,motion:value.motion};
  if(!/^https:\/\//.test(m.social) || !new URL(m.social).hostname)throw Error('Social URL must start with https://.');
  if(!['grid','list'].includes(m.layout)||typeof m.showBlog!=='boolean'||typeof m.motion!=='boolean')throw Error('Invalid display options.');
  m.article={title:text(value.article?.title,'Article title',150),body:text(value.article?.body,'Article text',20000)};
  if(!Array.isArray(value.projects)||value.projects.length<1||value.projects.length>12)throw Error('Keep between 1 and 12 projects.');
  m.projects=value.projects.map(p=>({id:text(p.id,'Project ID',60),title:text(p.title,'Project title',150),description:text(p.description,'Description',2000),cover:color(p.cover)}));
  if(m.projects.some(p=>!/^[-a-z0-9]+$/.test(p.id))||new Set(m.projects.map(p=>p.id)).size!==m.projects.length)throw Error('Project IDs must be unique lowercase slugs.');
  return m;
}
export function moveItem(items,from,to){const next=[...items];if(from<0||from>=next.length||to<0||to>=next.length)return next;next.splice(to,0,next.splice(from,1)[0]);return next;}
export function createHistory(initial){let current=validateModel(initial),past=[],future=[];return {
  get value(){return clone(current);},get canUndo(){return past.length>0;},get canRedo(){return future.length>0;},
  commit(value){const next=validateModel(value);if(JSON.stringify(next)===JSON.stringify(current))return;past.push(current);if(past.length>50)past.shift();current=next;future=[];},
  undo(){if(past.length){future.push(current);current=past.pop();}return this.value;},
  redo(){if(future.length){past.push(current);current=future.pop();}return this.value;}
};}

export const portfolioCSS=`/*
MIT License

Copyright (c) 2026 website-assets contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

This license covers original implementation code only. Reference screenshots,
third-party sites, fonts, imagery, datasets and linked repositories retain
their own rights and licenses.
*/
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#f8fafc;color:#182434;font:16px/1.65 system-ui,sans-serif}a{color:var(--accent);text-underline-offset:4px}button,a,input{touch-action:manipulation}:focus-visible{outline:3px solid var(--accent);outline-offset:5px}a:hover{text-decoration-thickness:3px}.portfolio{max-width:920px;margin:auto;padding:64px 28px 130px}.eyebrow{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#526173}h1{font-size:clamp(36px,7vw,68px);line-height:1.08;letter-spacing:-.055em;margin:18px 0}h2{font-size:27px;line-height:1.2}h3{font-size:22px;margin:12px 0 4px}.intro{max-width:650px;color:#526173;font-size:19px}.projects{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:32px;margin-top:28px}.projects.list{grid-template-columns:1fr}.project{min-width:0}.project p{margin:4px 0 12px;color:#526173}.cover{height:230px;border-radius:16px;background:var(--cover);overflow:hidden;position:relative;isolation:isolate}.cover:before,.cover:after{content:'';position:absolute;border:1px solid #ffffff80;border-radius:50%;width:70%;aspect-ratio:1;left:15%;top:15%;transform:rotate(-25deg) scaleY(.5)}.cover:after{transform:rotate(32deg) scaleY(.5);background:linear-gradient(125deg,#ffffff45,transparent)}.cover.large{height:360px;margin:32px 0}.section{margin-top:70px;border-top:1px solid #dbe2eb;padding-top:30px}.dock{position:fixed;bottom:18px;left:50%;transform:translateX(-50%);display:flex;gap:4px;padding:7px;background:#fff;border:1px solid #dbe2eb;border-radius:18px;box-shadow:0 10px 35px #18243415;max-width:calc(100% - 24px)}.dock a{padding:9px 14px;color:#182434;border-radius:11px;text-decoration:none;min-height:44px;white-space:nowrap}.dock a:hover,.dock a[aria-current=page]{background:#eaf0fb}.prose{max-width:680px;white-space:pre-wrap}.reveal{animation:arrive .5s ease both}@keyframes arrive{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}.skip{position:fixed;left:10px;top:-100px;background:white;z-index:9}.skip:focus{top:10px}footer{margin-top:60px;color:#526173;font-size:13px}.quiet *{animation:none!important;scroll-behavior:auto!important}@media(max-width:560px){.portfolio{padding:40px 22px 120px}.projects{grid-template-columns:1fr}.cover.large{height:260px}.dock a{padding:9px 11px}.intro{font-size:17px}}@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;scroll-behavior:auto!important}}`;
export function websiteFiles(input){
 const m=validateModel(input),e=escapeHTML,files={};
 const dock=current=>`<nav class="dock" aria-label="Portfolio"><a href="index.html" ${current==='home'?'aria-current="page"':''}>Home</a><a href="index.html#projects">Work</a>${m.showBlog?`<a href="blog.html" ${current==='blog'?'aria-current="page"':''}>Journal</a>`:''}<a href="${e(m.social)}" rel="noopener noreferrer">Social ↗</a></nav>`;
 const page=(title,body,current)=>`<!doctype html><html lang="en" style="--accent:${m.accent}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${e(m.intro)}"><title>${e(title)} · ${e(m.name)}</title><link rel="stylesheet" href="portfolio.css"></head><body class="${m.motion?'':'quiet'}"><a class="skip" href="#main">Skip to content</a><main id="main" class="portfolio reveal">${body}<footer>Made with Website Assets. Original code and generated covers, MIT.</footer></main>${dock(current)}</body></html>`;
 const card=p=>`<article class="project" data-project="${p.id}"><a href="project-${p.id}.html" aria-label="Open ${e(p.title)}"><div class="cover" aria-hidden="true" style="--cover:${p.cover}"></div></a><h3><a href="project-${p.id}.html">${e(p.title)}</a></h3><p>${e(p.description)}</p></article>`;
 files['index.html']=page('Portfolio',`<p class="eyebrow">${e(m.role)}</p><h1>${e(m.name)}</h1><p class="intro">${e(m.intro)}</p><a href="#projects">View my work ↓</a><section class="section" id="projects"><p class="eyebrow">Selected work / ${String(m.projects.length).padStart(2,'0')}</p><h2>Ideas brought to life.</h2><div class="projects ${m.layout}">${m.projects.map(card).join('')}</div></section>${m.showBlog?`<section class="section"><p class="eyebrow">Journal</p><h2><a href="article.html">${e(m.article.title)}</a></h2><p>Notes on making things for the web.</p></section>`:''}`,'home');
 for(const p of m.projects)files[`project-${p.id}.html`]=page(p.title,`<a href="index.html#projects">← Back to work</a><p class="eyebrow">Selected project</p><h1>${e(p.title)}</h1><p class="intro">${e(p.description)}</p><div class="cover large" aria-hidden="true" style="--cover:${p.cover}"></div><p class="prose">${e(p.description)}</p>`,'work');
 if(m.showBlog){files['blog.html']=page('Journal',`<a href="index.html">← Home</a><p class="eyebrow">Journal</p><h1>Notes & observations.</h1><section class="section"><h2><a href="article.html">${e(m.article.title)}</a></h2></section>`,'blog');files['article.html']=page(m.article.title,`<a href="blog.html">← Back to journal</a><p class="eyebrow">Field note / 01</p><h1>${e(m.article.title)}</h1><article class="prose">${e(m.article.body)}</article>`,'blog');}
 files['portfolio.css']=portfolioCSS;return files;
}
export function studioProject(model){return {format:'mws-project',version:1,name:model.name+' — Portfolio',entry:'index.html',files:Object.fromEntries(Object.entries(websiteFiles(model)).map(([p,content])=>[p,{kind:'text',content}])),modules:[]};}
// Small uncompressed ZIP writer. UTF-8 names, CRC-32, no external dependencies.
export function zipFiles(files){const enc=new TextEncoder(),chunks=[],central=[];let offset=0;const crc=data=>{let n=0xffffffff;for(const b of data){n^=b;for(let k=0;k<8;k++)n=n>>>1^((n&1)?0xedb88320:0);}return(n^0xffffffff)>>>0;};const header=n=>{const a=new Uint8Array(n);return[a,new DataView(a.buffer)];};
 for(const [name,text]of Object.entries(files)){const path=enc.encode(name),data=enc.encode(text),sum=crc(data);const[h,v]=header(30);v.setUint32(0,0x04034b50,true);v.setUint16(4,20,true);v.setUint16(6,0x800,true);v.setUint32(14,sum,true);v.setUint32(18,data.length,true);v.setUint32(22,data.length,true);v.setUint16(26,path.length,true);chunks.push(h,path,data);const[c,w]=header(46);w.setUint32(0,0x02014b50,true);w.setUint16(4,20,true);w.setUint16(6,20,true);w.setUint16(8,0x800,true);w.setUint32(16,sum,true);w.setUint32(20,data.length,true);w.setUint32(24,data.length,true);w.setUint16(28,path.length,true);w.setUint32(42,offset,true);central.push(c,path);offset+=h.length+path.length+data.length;}
 const size=central.reduce((n,c)=>n+c.length,0),[end,v]=header(22),count=Object.keys(files).length;v.setUint32(0,0x06054b50,true);v.setUint16(8,count,true);v.setUint16(10,count,true);v.setUint32(12,size,true);v.setUint32(16,offset,true);const result=new Uint8Array(offset+size+22);let at=0;for(const c of [...chunks,...central,end]){result.set(c,at);at+=c.length;}return result;
}
