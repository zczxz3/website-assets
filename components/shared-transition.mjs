import {lifecycle,motionAllowed} from './core.mjs';
// Original FLIP geometry; cancellation never writes into a destroyed host.
export function mount(host,{duration=850}={}){
  if(!Number.isFinite(duration)||duration<0)throw new RangeError('Duration must be finite and nonnegative');
  const life=lifecycle(host);host.classList.add('editorial-demo');
  host.insertAdjacentHTML('beforeend',`<div class="editorial-grid"><button data-testid="demo-control" class="architecture-art" aria-label="Open courtyard project" aria-haspopup="dialog" aria-expanded="false"><span>COURTYARD / 01</span></button><div><p class="eyebrow">SPACE AS A STORY</p><h3>Quiet<br>geometry.</h3><p>A shared element travels between two real layouts.</p></div></div><dialog class="project-detail" aria-label="Courtyard project"><button class="detail-close" aria-label="Close project">Close ×</button><div class="detail-image architecture-art"></div><p class="eyebrow">STUDY 01</p><h3>The courtyard</h3><p>Original procedural artwork. Select Close to reverse the same transition.</p></dialog>`);
  const trigger=host.querySelector('.editorial-grid button'),dialog=host.querySelector('dialog'),target=host.querySelector('.detail-image');
  let flight=null,clone=null,phase='closed',version=0;
  function cancelFlight(){flight?.cancel();flight=null;clone?.remove();clone=null;target.style.visibility='';}
  async function travel(from,to){
    cancelFlight();
    if(!motionAllowed()||duration===0)return;
    const a=from.getBoundingClientRect(),b=to.getBoundingClientRect();
    if(!a.width||!a.height||!b.width||!b.height)return;
    const element=document.createElement('div');element.className='architecture-art flying-image';element.setAttribute('aria-hidden','true');
    Object.assign(element.style,{position:'fixed',left:`${b.left}px`,top:`${b.top}px`,width:`${b.width}px`,height:`${b.height}px`,zIndex:10,pointerEvents:'none'});
    dialog.append(element);clone=element;target.style.visibility='hidden';
    const animation=element.animate([{transform:`translate(${a.left-b.left}px,${a.top-b.top}px) scale(${a.width/b.width},${a.height/b.height})`},{transform:'none'}],{duration,easing:'cubic-bezier(.76,0,.24,1)',fill:'both'});
    flight=animation;
    try{await animation.finished;}catch{}finally{element.remove();if(flight===animation){flight=null;clone=null;target.style.visibility='';}}
  }
  life.on(trigger,'click',async()=>{
    if(phase!=='closed'||life.destroyed)return;
    const token=++version;phase='opening';dialog.showModal();trigger.setAttribute('aria-expanded','true');life.state('open');
    await travel(trigger,target);
    if(!life.destroyed&&token===version)phase='open';
  });
  async function close(){
    if(life.destroyed||phase==='closed'||phase==='closing')return;
    const token=++version;phase='closing';await travel(target,trigger);
    if(life.destroyed||token!==version)return;
    dialog.close();phase='closed';trigger.setAttribute('aria-expanded','false');trigger.focus({preventScroll:true});life.state('closed');
  }
  life.on(dialog.querySelector('button'),'click',close);
  life.on(dialog,'cancel',event=>{event.preventDefault();close();});
  life.add(()=>{++version;cancelFlight();if(dialog.open)dialog.close();dialog.remove();});
  life.state('ready');return life;
}
