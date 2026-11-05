import {studies} from './registry.mjs';
import {filterStudies,studyFromURL,studyURL} from './catalog.mjs';

const nav=document.querySelector('#study-nav'),stage=document.querySelector('#stage');
const search=document.querySelector('#study-search'),category=document.querySelector('#category-filter');
const resultCount=document.querySelector('#result-count'),status=document.querySelector('#study-status');
let current=null,selected=null,serial=0;

for(const name of new Set(studies.map(site=>site.category))){
  const option=document.createElement('option');option.value=name;option.textContent=name;category.append(option);
}
for(const site of studies){
  const button=document.createElement('button');button.className='study-nav-item';button.dataset.id=site.id;
  button.innerHTML=`<span>${site.id}</span><strong>${site.name}</strong><small>${site.kind}</small>`;
  button.addEventListener('click',()=>select(site,{historyMode:'push'}));nav.append(button);
}
function filter(){
  const matches=new Set(filterStudies(studies,search.value,category.value).map(site=>site.id));
  for(const button of nav.children)button.hidden=!matches.has(button.dataset.id);
  resultCount.textContent=`${matches.size} of ${studies.length} studies`;
  document.querySelector('#empty-results').hidden=matches.size!==0;
}
search.addEventListener('input',filter);category.addEventListener('change',filter);
document.querySelector('#clear-filters').addEventListener('click',()=>{search.value='';category.value='all';filter();search.focus();});

async function select(site,{historyMode='none'}={}){
  if(selected?.id===site.id&&current)return;
  const token=++serial;document.body.dataset.ready='';document.body.dataset.error='';
  current?.destroy();current=null;selected=site;
  stage.replaceChildren();stage.className='demo-stage';stage.removeAttribute('data-state');stage.removeAttribute('tabindex');
  stage.dataset.site=site.id;stage.setAttribute('aria-busy','true');
  document.querySelector('#study-title').textContent=site.title;
  document.querySelector('#study-category').textContent=`${site.id} / ${site.category}`;
  document.querySelector('#study-description').textContent=site.description;
  document.querySelector('#study-tech').textContent=site.tech;
  document.querySelector('#scope-note').textContent=site.scope;
  document.querySelector('#original-link').href=site.url;
  document.querySelector('#module-link').href=`components/${site.module}.mjs`;
  document.querySelector('#study-permalink').href=studyURL(location.href,site.id).href;
  document.title=`${site.name} — Motion Atlas`;
  for(const button of nav.children)button.setAttribute('aria-pressed',String(button.dataset.id===site.id));
  if(historyMode!=='none'&&new URL(location.href).searchParams.get('study')!==site.id)
    history[historyMode==='push'?'pushState':'replaceState']({},'',studyURL(location.href,site.id));
  status.textContent=`Loading ${site.name}…`;
  try{
    const module=await import(`./components/${site.module}.mjs`);
    if(token!==serial)return;
    current=module.mount(stage);document.body.dataset.ready=site.id;
    stage.setAttribute('aria-busy','false');status.textContent=`${site.name} ready`;
  }catch(error){
    if(token!==serial)return;
    stage.textContent='This study could not initialize. Choose another study to continue.';
    stage.setAttribute('aria-busy','false');document.body.dataset.error=error.message;
    status.textContent=`${site.name} unavailable`;console.error(error);
  }
}
const toggle=document.querySelector('#motion-toggle');
try{toggle.checked=localStorage.getItem('motion-atlas:paused')==='true';}catch{}
function setMotion(){document.documentElement.dataset.motion=toggle.checked?'paused':'running';}
setMotion();
toggle.addEventListener('change',()=>{setMotion();try{localStorage.setItem('motion-atlas:paused',String(toggle.checked));}catch{}});
window.addEventListener('popstate',()=>{
  search.value='';category.value='all';filter();select(studyFromURL(studies,location.href));
});
window.addEventListener('pagehide',()=>{++serial;current?.destroy();current=null;});
window.addEventListener('pageshow',event=>{if(event.persisted)select(studyFromURL(studies,location.href));});
filter();select(studyFromURL(studies,location.href),{historyMode:'replace'});
