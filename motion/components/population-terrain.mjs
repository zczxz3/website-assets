import {lifecycle,canvas,loop,panel,cubeFaces,paintFaces,mix,clamp} from './core.mjs';
export function heightFromValue(value,min,max,height=3){return max===min?0:clamp((value-min)/(max-min))*height;}
export function syntheticField(n=22,variant=0){return Array.from({length:n*n},(_,i)=>{const x=i%n/n,z=Math.floor(i/n)/n;return Math.exp(-((x-.35-variant*.1)**2+(z-.43)**2)*35)*.85+Math.exp(-((x-.7)**2+(z-.65+variant*.1)**2)*75)*.65;});}
// Clone caller input and validate before allocating DOM or rendering resources.
export function prepareGrids({size=22,gridA,gridB}={}){
  if(!Number.isInteger(size)||size<2||size>128)throw new RangeError('Grid size must be an integer from 2 to 128');
  const synthetic=gridA===undefined&&gridB===undefined;
  gridA??=syntheticField(size);gridB??=synthetic?syntheticField(size,1):gridA;
  let minimum=Infinity,maximum=-Infinity;
  const grids=[gridA,gridB].map(grid=>{
    if(!grid||grid.length!==size*size)throw new RangeError('Grid dimensions must match size²');
    const copy=new Float64Array(grid.length);
    for(let i=0;i<grid.length;i++){
      const value=grid[i];if(typeof value!=='number'||!Number.isFinite(value))throw new TypeError('Grid values must be finite numbers');
      copy[i]=value;minimum=Math.min(minimum,value);maximum=Math.max(maximum,value);
    }
    return copy;
  });
  return {size,gridA:grids[0],gridB:grids[1],minimum,maximum,synthetic};
}
export function mount(host,options={}){
  const {size,gridA,gridB,minimum,maximum,synthetic}=prepareGrids(options);
  const life=lifecycle(host);host.classList.add('terrain-demo');const c=canvas(host,life);
  let blend=0,yaw=.7,targetYaw=.7,faces=[];
  const controls=panel(host,'<label>Scenario blend <input data-testid="demo-control" aria-label="Terrain scenario" type="range" min="0" max="100" value="0"></label><button aria-label="Rotate terrain">Rotate view</button><span></span>');
  controls.querySelector('span').textContent=`${synthetic?'Synthetic field':'Custom data'} · linear height scale`;
  function rebuild(){
    faces=[];
    for(let z=0;z<size;z++)for(let x=0;x<size;x++){
      const value=mix(gridA[z*size+x],gridB[z*size+x],blend),height=heightFromValue(value,minimum,maximum,4);
      if(height<=0)continue;
      const tone=height/4;
      faces.push(...cubeFaces((x/size-.5)*8,0,(z/size-.5)*8,7.7/size,height,7.7/size,[`hsl(180 24% ${58-tone*30}%)`,`hsl(189 29% ${48-tone*23}%)`,`hsl(174 32% ${78-tone*38}%)`]));
    }
  }
  life.on(controls.querySelector('input'),'input',event=>{blend=Number(event.target.value)/100;rebuild();life.state(event.target.value);});
  life.on(controls.querySelector('button'),'click',()=>{targetYaw+=Math.PI/4;life.state('rotated');});
  rebuild();
  loop(host,(time,dt,moving)=>{
    yaw=moving?mix(yaw,targetYaw,1-Math.exp(-dt*5)):targetYaw;
    const {ctx,w,h}=c;ctx.fillStyle='#edf0e8';ctx.fillRect(0,0,w,h);
    paintFaces(ctx,faces,w,h,{yaw,pitch:.75,scale:.9});
  },life);
  life.state('ready');return life;
}
