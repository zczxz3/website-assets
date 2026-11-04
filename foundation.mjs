// Original, dependency-free workbench. Exported modules contain no runtime scripts.
const $=id=>document.getElementById(id);
export function zipFile(filename,text){
 const enc=new TextEncoder(),name=enc.encode(filename),data=enc.encode(text);let crc=0xffffffff;
 for(const byte of data){crc^=byte;for(let b=0;b<8;b++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}crc=(crc^0xffffffff)>>>0;
 const out=new Uint8Array(30+name.length+data.length+46+name.length+22),v=new DataView(out.buffer);let p=0;
 const u16=n=>{v.setUint16(p,n,true);p+=2;},u32=n=>{v.setUint32(p,n,true);p+=4;};
 u32(0x04034b50);u16(20);u16(0x800);u16(0);u16(0);u16(33);u32(crc);u32(data.length);u32(data.length);u16(name.length);u16(0);out.set(name,p);p+=name.length;out.set(data,p);p+=data.length;
 const offset=p;u32(0x02014b50);u16(20);u16(20);u16(0x800);u16(0);u16(0);u16(0);u16(33);u32(crc);u32(data.length);u32(data.length);u16(name.length);u16(0);u16(0);u16(0);u16(0);u32(0);u32(0);out.set(name,p);p+=name.length;
 const size=p-offset;u32(0x06054b50);u16(0);u16(0);u16(1);u16(1);u32(size);u32(offset);u16(0);return out;
}
export function manifestOf(module){const {study,...manifest}=module;return manifest;}
if(typeof document!=='undefined'){
 const response=await fetch('foundation-modules.json');if(!response.ok)throw Error('Cannot load component registry');const modules=await response.json();let selected,markup;
 for(const category of [...new Set(modules.map(m=>m.study.category))]){$('category').add(new Option(category,category));}
 function list(){const query=$('search').value.toLowerCase(),category=$('category').value;const matches=modules.filter(m=>(category==='All'||m.study.category===category)&&`${m.name} ${m.description} ${m.study.category}`.toLowerCase().includes(query));$('list').replaceChildren();for(const m of matches){const b=document.createElement('button');b.type='button';b.className='item';b.dataset.id=m.id;b.setAttribute('aria-pressed',String(m.id===selected?.id));const number=document.createElement('span');number.textContent=String(modules.indexOf(m)+1).padStart(2,'0');b.append(number,document.createTextNode(m.name));b.onclick=()=>select(m);$('list').append(b);}$('count').textContent=matches.length+' / 30 components';}
 function css(){return selected.css+`\n${selected.study.selector}{--mf-accent:${$('accent').value};--mf-radius:${$('radius').value}px;--mf-space:${$('space').value}px;--mf-duration:${$('duration').value}ms;}`;}
 function render(){for(const [k,u]of [['radius','px'],['space','px'],['duration','ms']])$(k+'-value').value=$(k).value+u;
  // Opaque, scriptless iframe and restrictive CSP keep edited previews self-contained.
  const policy="default-src 'none'; style-src 'unsafe-inline'; form-action 'none'; base-uri 'none'";
  $('preview').srcdoc=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="${policy}"><style>body{margin:0;padding:24px;min-height:360px;display:grid;align-content:center}body>*{width:100%}${css()}</style></head><body>${markup}</body></html>`;
 }
 function select(m){selected=m;markup=m.html;$('name').textContent=m.name;$('family').textContent=m.study.category+' / '+m.id.split('/')[1];$('description').textContent=m.description;$('limits').textContent=m.study.limitations;$('html-source').value=markup;$('message').textContent='';$('accent').value='#286c70';$('radius').value='14';$('space').value='20';$('duration').value='260';list();render();}
 $('search').oninput=list;$('category').onchange=list;for(const k of ['accent','radius','space','duration'])$(k).oninput=render;
 $('apply').onclick=()=>{const html=$('html-source').value,doc=new DOMParser().parseFromString(html,'text/html');const bad=[...doc.querySelectorAll('*')].some(el=>['SCRIPT','IFRAME','OBJECT','EMBED','LINK','META','BASE','STYLE'].includes(el.tagName)||[...el.attributes].some(a=>/^on/i.test(a.name)||['srcdoc','data-mws-id'].includes(a.name)||/^\s*(javascript|vbscript):/i.test(a.value)));if(bad){$('message').textContent='Use static HTML without scripts, embedded pages or event attributes.';return;}markup=html;render();$('message').textContent='HTML applied. The preview remains scriptless.';};
 $('reset').onclick=()=>select(selected);
 $('download').onclick=()=>{const module={...manifestOf(selected),id:selected.id+'-custom',name:selected.name+' / custom',html:markup,css:css()};const blob=new Blob([zipFile('module.json',JSON.stringify(module,null,2)+'\n')],{type:'application/zip'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=selected.id.split('/')[1]+'-custom.zip';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);$('message').textContent='ZIP prepared. In Studio: Modules → Install module ZIP.';};
 const requested=new URL(location.href).searchParams.get('module');select(modules.find(m=>m.id.split('/')[1]===requested)||modules[0]);document.body.dataset.ready='foundation';
}
