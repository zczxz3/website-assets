// Original Button Atlas components. No upstream code or artwork is bundled.
import {buttons} from './button-catalog.mjs';
export {buttons};
export function springStep(position, velocity, target, dt) {
  const step=Math.max(0,Math.min(.032,dt));
  const v=(velocity+(target-position)*260*step)*Math.exp(-22*step);
  return [position+v*step,v];
}
export function pointerOffset(x,y,width,height,strength=14) {
  return [Math.max(-1,Math.min(1,x/Math.max(1,width)*2-1))*strength,
          Math.max(-1,Math.min(1,y/Math.max(1,height)*2-1))*strength];
}
/** Single-flight async controller. Late completions after cancellation are ignored. */
export function createTaskController(onState) {
  let generation=0, pending=null, disposed=false;
  return {
    async run(task) {
      if(disposed || pending)return false;
      const token=++generation, controller=new AbortController();pending=controller;onState('loading');
      try {await task(controller.signal);if(!disposed&&generation===token)onState('success');}
      catch(error){if(!disposed&&generation===token)onState('error',error);}
      finally{if(generation===token)pending=null;}
      return true;
    },
    cancel(){generation++;pending?.abort();pending=null;},
    destroy(){disposed=true;this.cancel();}
  };
}
let serial=0;
/** Owns one wrapper only; mount multiple instances and destroy them independently. */
export function mountButton(host, options={}) {
  const definition=buttons.find(item=>item.id===(options.effect||'fill'));
  if(!definition)throw new RangeError('Unknown button effect');
  if(!host?.append)throw new TypeError('An HTML host is required');
  const doc=host.ownerDocument, win=doc.defaultView, id=`ba-${++serial}`;
  const wrap=doc.createElement('div');wrap.className='ba-wrap';
  const button=doc.createElement('button');button.type='button';button.className='ba-button';
  button.dataset.effect=definition.id;button.dataset.state='idle';button.dataset.phase='default';
  const label=String(options.label||definition.label);button.setAttribute('aria-label',label);
  const text=doc.createElement('span');text.className='ba-label';text.setAttribute('aria-hidden','true');text.textContent=label;
  const decor=doc.createElement('span');decor.className='ba-decor';decor.setAttribute('aria-hidden','true');
  button.append(decor,text);wrap.append(button);
  const status=doc.createElement('span');status.className='ba-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');wrap.append(status);
  const effect=definition.id;
  const duration=Number(options.duration??420);
  if(!Number.isFinite(duration)||duration<80||duration>4000)throw new RangeError('duration must be 80–4000 ms');
  if(!['sm','md','lg'].includes(options.size||'md'))throw new RangeError('size must be sm, md or lg');
  wrap.dataset.motion=options.motion===false?'off':'system';wrap.dataset.size=options.size||'md';wrap.style.setProperty('--ba-duration',duration+'ms');
  for(const [key,value] of Object.entries({accent:options.accent,ink:options.ink,surface:options.surface})) {
    if(value!==undefined){if(!win.CSS.supports('color',value))throw new TypeError('Invalid theme color');wrap.style.setProperty('--ba-'+key,value);}
  }
  const abort=new AbortController(), timers=new Set(), animations=new Set();let destroyed=false, raf=0;
  const reduced=win.matchMedia('(prefers-reduced-motion: reduce)');
  const motion=()=>!reduced.matches&&options.motion!==false&&doc.documentElement.dataset.buttonMotion!=='off';
  const on=(target,event,handler)=>target.addEventListener(event,handler,{signal:abort.signal});
  const later=(fn,ms)=>{const timer=win.setTimeout(()=>{timers.delete(timer);if(!destroyed)fn();},ms);timers.add(timer);return timer;};
  const emit=(kind,detail)=>button.dispatchEvent(new win.CustomEvent(kind,{bubbles:true,detail}));
  const state=(value,message)=>{button.dataset.state=value;status.textContent=message||'';};
  let externalDisabled=!!options.disabled;
  const task=createTaskController((value)=>{
    state(value,value==='loading'?'Saving…':value==='success'?'Changes saved.':'Save failed. Try again.');
    button.setAttribute('aria-busy',String(value==='loading'));button.disabled=externalDisabled||value==='loading';
    text.textContent=value==='loading'?'Saving…':value==='success'?'Saved ✓':value==='error'?'Retry save':label;
    button.setAttribute('aria-label',text.textContent);emit('button-state',{state:value});
  });
  if(effect==='roll') {const duplicate=doc.createElement('span');duplicate.className='ba-roll-copy';duplicate.setAttribute('aria-hidden','true');duplicate.textContent=label;text.append(duplicate);}
  if(effect==='stagger') {text.replaceChildren(...Array.from(label,(char,index)=>{const span=doc.createElement('span');span.textContent=char===' '?'\u00a0':char;span.style.setProperty('--i',index);return span;}));}
  if(['wave','blob','goo'].includes(effect)){for(let i=0;i<3;i++){const bubble=doc.createElement('i');decor.append(bubble);}}
  if(effect==='goo'){
    const svg=doc.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('aria-hidden','true');svg.setAttribute('width','0');svg.setAttribute('height','0');
    svg.innerHTML=`<defs><filter id="${id}-goo"><feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"/><feColorMatrix in="blur" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"/><feComposite in="SourceGraphic" operator="atop"/></filter></defs>`;
    wrap.append(svg);decor.style.filter=`url(#${id}-goo)`;
  }
  if(effect==='back'){const arrow=doc.createElement('span');arrow.className='ba-arrow';arrow.textContent='←';arrow.setAttribute('aria-hidden','true');button.prepend(arrow);}
  let panel=null;
  if(effect==='menu'){
    panel=doc.createElement('div');panel.className='ba-panel';panel.id=id+'-panel';panel.hidden=true;
    button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls',panel.id);
    for(const name of ['New note','New collection']){const action=doc.createElement('button');action.type='button';action.textContent=name;panel.append(action);on(action,'click',()=>{status.textContent=name+' selected.';emit('button-select',{action:name});closePanel();});}
    wrap.append(panel);
  }
  const closePanel=()=>{if(!panel)return;panel.hidden=true;button.setAttribute('aria-expanded','false');state('idle');button.focus();};
  on(wrap,'keydown',event=>{if(event.key==='Escape'&&panel&&!panel.hidden){event.preventDefault();closePanel();}});
  let x=0,y=0,vx=0,vy=0,tx=0,ty=0,last=0;
  const resetPosition=()=>{tx=ty=x=y=vx=vy=0;button.style.removeProperty('transform');text.style.removeProperty('transform');win.cancelAnimationFrame(raf);raf=0;};
  const frame=time=>{
    raf=0;if(destroyed||!motion()||doc.hidden){resetPosition();return;}
    const dt=last?Math.min(.032,(time-last)/1000):1/60;last=time;
    [x,vx]=springStep(x,vx,tx,dt);[y,vy]=springStep(y,vy,ty,dt);
    button.style.transform=`translate(${x}px,${y}px)`;
    if(effect==='parallax')text.style.transform=`translate(${x*.5}px,${y*.5}px)`;
    if(Math.abs(tx-x)+Math.abs(ty-y)+Math.abs(vx)+Math.abs(vy)>.05)raf=win.requestAnimationFrame(frame);
    else if(!tx&&!ty)resetPosition();
  };
  on(button,'pointermove',event=>{
    if(!motion()||button.disabled||event.pointerType!=='mouse')return;
    const rect=wrap.getBoundingClientRect();[tx,ty]=pointerOffset(event.clientX-rect.left,event.clientY-rect.top,rect.width,button.offsetHeight);
    if(effect==='magnetic'||effect==='parallax'){if(!raf){last=0;raf=win.requestAnimationFrame(frame);}}
    if(effect==='tilt')button.style.transform=`perspective(500px) rotateX(${-ty*.5}deg) rotateY(${tx*.5}deg)`;
  });
  on(button,'pointerenter',()=>{if(!button.disabled)button.dataset.phase='hover';});
  on(button,'pointerleave',()=>{button.dataset.phase='default';tx=ty=0;if(effect==='tilt')resetPosition();if((effect==='magnetic'||effect==='parallax')&&!raf&&motion())raf=win.requestAnimationFrame(frame);});
  on(button,'pointerdown',()=>{if(!button.disabled)button.dataset.phase='pressed';});
  on(win,'pointerup',()=>{if(button.dataset.phase==='pressed')button.dataset.phase='released';});
  on(button,'pointercancel',()=>{button.dataset.phase='default';resetPosition();});
  on(button,'keydown',e=>{if([' ','Enter'].includes(e.key)&&!button.disabled)button.dataset.phase='pressed';});
  on(button,'keyup',()=>{button.dataset.phase='released';});
  on(button,'blur',()=>{button.dataset.phase='default';resetPosition();});
  on(reduced,'change',()=>{resetPosition();for(const animation of animations)animation.cancel();});
  on(doc,'visibilitychange',()=>{if(doc.hidden)resetPosition();});
  const burst=(event)=>{
    if(!motion())return;
    // Remove earlier particles before creating a bounded new burst.
    for(const a of animations)a.cancel();animations.clear();decor.replaceChildren();
    const box=button.getBoundingClientRect(), px=event.detail?event.clientX-box.left:box.width/2, py=event.detail?event.clientY-box.top:box.height/2;
    const count=effect==='ripple'?1:12;
    for(let i=0;i<count;i++){
      const node=doc.createElement('i');node.className=effect==='ripple'?'ba-ripple':'ba-spark';node.style.left=px+'px';node.style.top=py+'px';decor.append(node);
      const angle=i/count*Math.PI*2;
      const frames=effect==='ripple'?[{transform:'translate(-50%,-50%) scale(0)',opacity:.6},{transform:'translate(-50%,-50%) scale(35)',opacity:0}]:[{transform:'translate(-50%,-50%)',opacity:1},{transform:`translate(${Math.cos(angle)*55}px,${Math.sin(angle)*55}px) scale(0)`,opacity:0}];
      const a=node.animate(frames,{duration:duration*1.6,easing:'cubic-bezier(.2,.7,.2,1)'});animations.add(a);a.finished.catch(()=>{}).finally(()=>{animations.delete(a);node.remove();});
    }
  };
  let canvas=null,ctx=null;
  const drawNoise=()=>{if(!ctx||destroyed)return;const image=ctx.createImageData(100,36);for(let i=0;i<image.data.length;i+=4){image.data[i]=image.data[i+1]=image.data[i+2]=Math.random()*255;image.data[i+3]=55;}ctx.putImageData(image,0,0);};
  if(effect==='noise'){canvas=doc.createElement('canvas');canvas.width=100;canvas.height=36;canvas.setAttribute('aria-hidden','true');decor.append(canvas);ctx=canvas.getContext('2d');drawNoise();}
  on(button,'click',event=>{
    if(button.disabled||destroyed)return;
    button.dataset.activations=String(Number(button.dataset.activations||0)+1);
    if(effect==='async'){task.run(signal=>options.onAction?options.onAction({signal}):Promise.resolve());return;}
    if(effect==='undo'){const saved=button.dataset.state!=='saved';state(saved?'saved':'idle',saved?'Item saved. Activate again to undo.':'Save undone.');text.textContent=saved?'Undo save ↶':label;button.setAttribute('aria-label',text.textContent);button.setAttribute('aria-pressed',String(saved));emit('button-state',{state:button.dataset.state});return;}
    if(effect==='menu'){const expanded=panel.hidden;panel.hidden=!expanded;button.setAttribute('aria-expanded',String(expanded));state(expanded?'expanded':'idle');return;}
    if(effect==='ripple'||effect==='sparks')burst(event);
    if(effect==='noise'){for(const timer of timers)win.clearTimeout(timer);timers.clear();drawNoise();if(motion())for(let i=1;i<6;i++)later(drawNoise,i*duration/6);}
    state('activated','Activated.');emit('button-activate',{effect});options.onAction?.({event});
  });
  if(effect==='undo')button.setAttribute('aria-pressed','false');
  button.disabled=externalDisabled;host.append(wrap);
  return {element:button,wrapper:wrap,
    setDisabled(value){externalDisabled=!!value;button.disabled=externalDisabled||button.dataset.state==='loading';if(value)resetPosition();},
    destroy(){if(destroyed)return;destroyed=true;abort.abort();task.destroy();resetPosition();for(const timer of timers)win.clearTimeout(timer);for(const a of animations)a.cancel();timers.clear();animations.clear();wrap.remove();}
  };
}
