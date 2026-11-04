import {lifecycle,motionAllowed,panel} from './core.mjs';
// A FLIP transition between an editorial card and an actual dialog destination.
export function mount(host){
  const life=lifecycle(host);host.classList.add('editorial-demo');
  host.insertAdjacentHTML('beforeend',`<div class="editorial-grid"><button data-testid="demo-control" class="architecture-art" aria-label="Open courtyard project"><span>COURTYARD / 01</span></button><div><p class="eyebrow">SPACE AS A STORY</p><h3>Quiet<br>geometry.</h3><p>A shared element travels between two real layouts.</p></div></div><dialog class="project-detail"><button class="detail-close" aria-label="Close project">Close ×</button><div class="detail-image architecture-art"></div><p class="eyebrow">STUDY 01</p><h3>The courtyard</h3><p>Original procedural artwork. Select Close to reverse the same transition.</p></dialog>`);
  const trigger=host.querySelector('.editorial-grid button'),dialog=host.querySelector('dialog'),target=host.querySelector('.detail-image');let flight=null;
  async function travel(from,to){flight?.cancel();if(!motionAllowed())return;const a=from.getBoundingClientRect(),b=to.getBoundingClientRect();const clone=document.createElement('div');clone.className='architecture-art flying-image';Object.assign(clone.style,{position:'fixed',left:`${b.left}px`,top:`${b.top}px`,width:`${b.width}px`,height:`${b.height}px`,zIndex:10,pointerEvents:'none'});dialog.append(clone);target.style.visibility='hidden';flight=clone.animate([{transform:`translate(${a.left-b.left}px,${a.top-b.top}px) scale(${a.width/b.width},${a.height/b.height})`},{transform:'none'}],{duration:850,easing:'cubic-bezier(.76,0,.24,1)',fill:'both'});try{await flight.finished;}catch{}finally{clone.remove();target.style.visibility='';}}
  life.on(trigger,'click',async()=>{dialog.showModal();life.state('open');await travel(trigger,target);});
  async function close(){await travel(target,trigger);dialog.close();trigger.focus();life.state('closed');}
  life.on(dialog.querySelector('button'),'click',close);life.on(dialog,'cancel',e=>{e.preventDefault();close();});
  life.add(()=>{flight?.cancel();dialog.close();dialog.remove();});life.state('ready');return life;
}
