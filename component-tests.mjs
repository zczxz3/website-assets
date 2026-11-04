import test from 'node:test';
import assert from 'node:assert/strict';
import {resample,normalize,strokeDistance} from './components/stroke-matcher.mjs';
import {orderedDither,floydSteinberg} from './components/dither-image.mjs';
import {heightFromValue} from './components/population-terrain.mjs';
import {bilinear} from './components/flow-field.mjs';
import {stepVehicle} from './components/vehicle-world.mjs';
test('stroke matching is invariant to translation, uniform scale and direction',()=>{const a=[[0,0],[1,2],[3,1],[5,4]],b=a.map(([x,y])=>[x*8+32,y*8-17]).reverse();assert.ok(strokeDistance(a,b)<1e-20);assert.ok(strokeDistance(a,[[0,0],[1,0],[2,0]])>.005);});
test('polyline resampling preserves endpoints and has uniform arc spacing on a straight segment',()=>{const p=resample([[0,0],[12,0]],7);assert.equal(p.length,7);assert.deepEqual(p.map(x=>x[0]),[0,2,4,6,8,10,12]);assert.deepEqual(resample([[4,4],[4,4]],3),[[4,4],[4,4],[4,4]]);assert.deepEqual(normalize([]),[]);});
test('both dithering algorithms preserve pure black and white and emit only two values',()=>{for(const algorithm of [orderedDither,floydSteinberg]){assert.deepEqual([...algorithm(new Uint8Array(64),8,8)],new Array(64).fill(0));assert.deepEqual([...algorithm(new Uint8Array(64).fill(255),8,8)],new Array(64).fill(255));const result=algorithm(Uint8Array.from({length:256},(_,i)=>i),16,16);assert.ok([...result].every(v=>v===0||v===255));const white=[...result].filter(v=>v===255).length;assert.ok(white>95&&white<165);}});
test('population height is linear, clamped and stable for a constant-valued dataset',()=>{assert.equal(heightFromValue(10,10,30,4),0);assert.equal(heightFromValue(20,10,30,4),2);assert.equal(heightFromValue(30,10,30,4),4);assert.equal(heightFromValue(-100,10,30,4),0);assert.equal(heightFromValue(7,7,7,4),0);});
test('bilinear interpolation reproduces a plane and wraps the longitude boundary',()=>{const grid=[0,2,2,4];assert.equal(bilinear(grid,2,2,.5,.5),2);assert.equal(bilinear(grid,2,2,1,.5),1);assert.equal(bilinear(grid,2,2,-.5,.5),2);});
test('vehicle integration is approximately independent of update rate',()=>{const simulate=dt=>{const car={x:0,z:0,speed:0,angle:0};for(let t=0;t<2-dt/2;t+=dt)stepVehicle(car,1,.3,dt);return car;};const a=simulate(1/60),b=simulate(1/120);assert.ok(Math.hypot(a.x-b.x,a.z-b.z)<.15);assert.ok(a.speed>0&&a.speed<=6);assert.ok(Number.isFinite(a.angle));});

import {createFrameScheduler} from './components/frame-scheduler.mjs';
import {filterStudies,studyFromURL,studyURL} from './catalog.mjs';
import {studies} from './registry.mjs';
import {prepareGrids} from './components/population-terrain.mjs';
function clockHarness(){
  const queue=new Map(),frames=[];let serial=0,active=true,continuous=false;
  const scheduler=createFrameScheduler({request:fn=>{queue.set(++serial,fn);return serial;},cancel:id=>queue.delete(id),draw:(time,dt)=>frames.push({time,dt}),isActive:()=>active,isContinuous:()=>continuous});
  return {scheduler,queue,frames,setActive:v=>active=v,setContinuous:v=>continuous=v,
    frame(timestamp){const jobs=[...queue.values()];queue.clear();for(const job of jobs)job(timestamp);}};
}
test('paused rendering coalesces invalidations and leaves no frame queued',()=>{const h=clockHarness();for(let i=0;i<20;i++)h.scheduler.invalidate();assert.equal(h.queue.size,1);h.frame(100);assert.equal(h.frames.length,1);assert.equal(h.queue.size,0);h.scheduler.invalidate();h.frame(50000);assert.equal(h.frames[1].dt,0);assert.equal(h.queue.size,0);});
test('offscreen suspension cancels work and resume excludes hidden elapsed time',()=>{const h=clockHarness();h.setContinuous(true);h.scheduler.invalidate();h.frame(100);h.frame(116);h.setActive(false);h.scheduler.invalidate();assert.equal(h.queue.size,0);h.setActive(true);h.scheduler.invalidate();h.frame(90000);assert.equal(h.frames.at(-1).dt,0);assert.ok(h.frames.at(-1).time<.02);});
test('continuous rendering owns one frame and clamps long frame gaps',()=>{const h=clockHarness();h.setContinuous(true);h.scheduler.invalidate();h.frame(100);h.frame(1000);assert.equal(h.frames.at(-1).dt,.04);assert.equal(h.queue.size,1);h.setContinuous(false);h.scheduler.invalidate();h.frame(1016);assert.equal(h.queue.size,0);});
test('destroyed schedulers never draw or schedule again',()=>{const h=clockHarness();h.scheduler.invalidate();h.scheduler.destroy();h.scheduler.destroy();h.scheduler.invalidate();h.frame(100);assert.equal(h.queue.size,0);assert.equal(h.frames.length,0);});
test('catalog search intersects words and category without changing the catalog',()=>{assert.deepEqual(filterStudies(studies,'  IGLOO   particle ').map(s=>s.id),['08']);assert.equal(filterStudies(studies,'igloo','Maps & science').length,0);assert.equal(filterStudies(studies,'','Maps & science').length,5);assert.equal(studies.length,15);assert.equal(filterStudies(studies,'no-such-technique').length,0);});
test('study links preserve other URL fields and unknown ids fall back predictably',()=>{const url=studyURL('https://example.test/index.html?mode=demo#study-workspace','12');assert.equal(url.searchParams.get('study'),'12');assert.equal(url.searchParams.get('mode'),'demo');assert.equal(url.hash,'#study-workspace');assert.equal(studyFromURL(studies,url.href).id,'12');assert.equal(studyFromURL(studies,'https://example.test/?study=unknown').id,'01');});
test('grid validation rejects dimensions, nonfinite values and oversized CPU scenes',()=>{for(const size of [0,1,2.5,129])assert.throws(()=>prepareGrids({size}),RangeError);assert.throws(()=>prepareGrids({size:2,gridA:[1,2,3]}),RangeError);for(const bad of [NaN,Infinity,'3',undefined])assert.throws(()=>prepareGrids({size:2,gridA:[0,1,2,bad]}),TypeError);});
test('custom grids are cloned and use the shared unclipped linear range',()=>{const input=[-10,0,10,30];const grid=prepareGrids({size:2,gridA:input,gridB:[-20,0,40,80]});input[0]=999;assert.equal(grid.gridA[0],-10);assert.equal(grid.minimum,-20);assert.equal(grid.maximum,80);assert.equal(heightFromValue(30,grid.minimum,grid.maximum,4),2);assert.equal(grid.synthetic,false);const generated=prepareGrids({size:4});assert.equal(generated.gridA.length,16);assert.equal(generated.synthetic,true);assert.deepEqual([...prepareGrids({size:2,gridA:[1,2,3,4]}).gridB],[1,2,3,4]);});
