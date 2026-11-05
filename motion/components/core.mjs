import {createFrameScheduler} from './frame-scheduler.mjs';
// Original implementation. All coordinates are CSS pixels unless documented.
export const clamp = (x, low = 0, high = 1) => Math.min(high, Math.max(low, x));
export const mix = (a, b, t) => a + (b - a) * t;
export const ease = t => t < .5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2;
export function random(seed=7) { return () => { seed |= 0; seed = seed+0x6D2B79F5|0; let t=Math.imul(seed^seed>>>15,1|seed); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
export function lifecycle(host) {
  const abort=new AbortController(), clean=[], original={className:host.className,style:host.style.cssText,tabIndex:host.getAttribute('tabindex'),data:{...host.dataset}};let destroyed=false;
  const api={host, on:(node,event,fn,options={})=>node.addEventListener(event,fn,{...options,signal:abort.signal}),
    get destroyed(){return destroyed;},
    add:fn=>{if(destroyed)fn();else clean.push(fn);}, state:value=>{if(!destroyed)host.dataset.state=String(value);},
    destroy:()=>{if(destroyed)return;destroyed=true;abort.abort();const errors=[];for(const fn of clean.splice(0).reverse()){try{fn();}catch(error){errors.push(error);}}host.replaceChildren();host.className=original.className;host.style.cssText=original.style;if(original.tabIndex===null)host.removeAttribute('tabindex');else host.setAttribute('tabindex',original.tabIndex);for(const key of Object.keys(host.dataset))delete host.dataset[key];Object.assign(host.dataset,original.data);if(errors.length)throw new AggregateError(errors,'Component cleanup failed');}};
  return api;
}
export function motionAllowed() { return !matchMedia('(prefers-reduced-motion: reduce)').matches && document.documentElement.dataset.motion!=='paused'; }
export function loop(host,draw,life) {
  let visible=false;
  const pointers=new Set(),keys=new Set();
  const scheduler=createFrameScheduler({request:requestAnimationFrame,cancel:cancelAnimationFrame,
    isActive:()=>visible&&!document.hidden,
    isContinuous:()=>motionAllowed()||pointers.size>0||keys.size>0,
    draw:(time,dt)=>draw(time,dt,motionAllowed())});
  const invalidate=()=>scheduler.invalidate();
  const release=()=>{pointers.clear();keys.clear();invalidate();};
  const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;invalidate();},{rootMargin:'0px'});
  intersection.observe(host);
  const resize=new ResizeObserver(invalidate);resize.observe(host);
  const preference=matchMedia('(prefers-reduced-motion: reduce)');life.on(preference,'change',invalidate);
  const motion=new MutationObserver(invalidate);motion.observe(document.documentElement,{attributes:true,attributeFilter:['data-motion']});
  for(const event of ['input','change','click','pointermove','pointerleave'])life.on(host,event,invalidate);
  life.on(host,'pointerdown',e=>{pointers.add(e.pointerId);invalidate();});
  for(const event of ['pointerup','pointercancel'])life.on(window,event,e=>{pointers.delete(e.pointerId);invalidate();});
  life.on(host,'keydown',e=>{keys.add(e.code);invalidate();});
  life.on(window,'keyup',e=>{keys.delete(e.code);invalidate();});
  life.on(host,'focusout',e=>{if(!host.contains(e.relatedTarget))release();});
  life.on(window,'blur',release);
  life.on(document,'visibilitychange',release);
  life.on(window,'scroll',invalidate,{passive:true,capture:true});
  life.add(()=>{scheduler.destroy();intersection.disconnect();resize.disconnect();motion.disconnect();});
  return scheduler;
}
export function canvas(host,life) {
  const node=document.createElement('canvas');node.setAttribute('aria-label','Interactive visual study');host.append(node);
  const ctx=node.getContext('2d'); let w=1,h=1,dpr=1;
  const resize=()=>{const rect=node.getBoundingClientRect();w=Math.max(1,rect.width);h=Math.max(1,rect.height);dpr=Math.min(devicePixelRatio||1,2);const width=Math.round(w*dpr),height=Math.round(h*dpr);if(node.width!==width||node.height!==height){node.width=width;node.height=height;}ctx.setTransform(dpr,0,0,dpr,0,0);};
  const observer=new ResizeObserver(resize);observer.observe(node);resize();life.add(()=>observer.disconnect());
  return {node,ctx,get w(){return w;},get h(){return h;}};
}
export function panel(host,html){const node=document.createElement('div');node.className='demo-controls';node.innerHTML=html;host.append(node);return node;}
export function bindRange(life,node,fn){const update=()=>{fn(Number(node.value));life.state(node.value);};life.on(node,'input',update);update();}
export function project(point,w,h,{yaw=.65,pitch=.6,scale=1,center=[0,0,0]}={}){
  let x=point[0]-center[0],y=point[1]-center[1],z=point[2]-center[2];
  const rx=x*Math.cos(yaw)-z*Math.sin(yaw),rz=x*Math.sin(yaw)+z*Math.cos(yaw);
  const ry=y*Math.cos(pitch)-rz*Math.sin(pitch),depth=y*Math.sin(pitch)+rz*Math.cos(pitch);
  const f=scale*Math.min(w,h)/(10+depth*.25);
  return [w*.5+rx*f,h*.54-ry*f,depth];
}
export function polygon(ctx,points,color,stroke){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fillStyle=color;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=.6;ctx.stroke();}}
export function cubeFaces(x,y,z,sx,sy,sz,colors){const p=[[x,y,z],[x+sx,y,z],[x+sx,y+sy,z],[x,y+sy,z],[x,y,z+sz],[x+sx,y,z+sz],[x+sx,y+sy,z+sz],[x,y+sy,z+sz]];return [{p:[p[0],p[1],p[2],p[3]],c:colors[0]},{p:[p[1],p[5],p[6],p[2]],c:colors[1]},{p:[p[3],p[2],p[6],p[7]],c:colors[2]}];}
export function paintFaces(ctx,faces,w,h,view){const list=faces.map(f=>({...f,p:f.p.map(p=>project(p,w,h,view))}));list.sort((a,b)=>b.p.reduce((s,p)=>s+p[2],0)-a.p.reduce((s,p)=>s+p[2],0));for(const f of list)polygon(ctx,f.p,f.c);}
