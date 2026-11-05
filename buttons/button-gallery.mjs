import {buttons,mountButton} from './buttons.mjs';
const $=id=>document.getElementById(id), grid=$('grid');
const refs=await fetch('button-resources.json').then(r=>{if(!r.ok)throw Error('Reference catalog unavailable');return r.json();});
for(const category of new Set(buttons.map(x=>x.category))){const option=document.createElement('option');option.textContent=category;$('category').append(option);}
let mounts=[];
const single=new URL(location.href).searchParams.get('button');

function render(){
 for(const mount of mounts)mount.destroy();mounts=[];grid.replaceChildren();
 const query=$('search').value.toLowerCase().trim(),family=$('category').value;
 const results=(single?buttons.filter(b=>b.id===single):buttons).filter(b=>(!query||`${b.id} ${b.name} ${b.category} ${b.principle}`.toLowerCase().includes(query))&&(family==='All'||b.category===family));
 $('count').textContent=`${String(results.length).padStart(2,'0')} / 20 STUDIES`;$('empty').hidden=results.length!==0;
 document.documentElement.dataset.buttonMotion=$('motion').checked?'on':'off';
 for(const b of results){
  const card=document.createElement('article');card.className='atlas-card';card.id='study-'+b.id;
  const head=document.createElement('div');head.className='atlas-card-head';head.textContent=String(b.number).padStart(2,'0')+' / '+b.category.toUpperCase();
  const demo=document.createElement('div');demo.className='atlas-demo';const title=document.createElement('h2');title.textContent=b.name;
  const principle=document.createElement('p');principle.textContent=b.principle;
  const foot=document.createElement('div');foot.className='atlas-card-footer';
  const ref=refs.find(r=>r.id===b.reference),link=document.createElement('a');link.href=ref.url;link.textContent='REFERENCE ↗';link.target='_blank';link.rel='noopener noreferrer';
  const permalink=document.createElement('a');permalink.href='buttons.html?button='+b.id;permalink.textContent='ISOLATE ↗';foot.append(link,permalink);card.append(head,demo,title,principle,foot);grid.append(card);
  mounts.push(mountButton(demo,{effect:b.id,accent:$('accent').value,size:$('size').value,duration:Number($('speed').value),motion:$('motion').checked,
   onAction:b.id==='async'?({signal})=>new Promise((resolve,reject)=>{const timer=setTimeout(()=>$('fail').checked?reject(Error('Demonstration failure')):resolve(),900);signal.addEventListener('abort',()=>{clearTimeout(timer);reject(new DOMException('Cancelled','AbortError'));},{once:true});}):undefined}));
 }
 document.body.dataset.ready='buttons';document.body.dataset.count=String(results.length);
}
for(const id of ['search','category','accent','size','speed','motion'])$(id).addEventListener(id==='search'||id==='accent'?'input':'change',render);
render();
