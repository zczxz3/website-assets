import {createRequire} from 'node:module';import {join} from 'node:path';import {mkdir,writeFile,readFile} from 'node:fs/promises';import {createHash} from 'node:crypto';import assert from 'node:assert/strict';import {spawn} from 'node:child_process';
import {buttons} from './button-catalog.mjs';
const require=createRequire(join(process.cwd(),'node_modules/rea-agents/package.json'));
const {chromium}=require('playwright-core'), output=process.argv[2]||'button-checks';await mkdir(output,{recursive:true});
const server=spawn('python3',['-m','http.server','8016','--bind','127.0.0.1'],{stdio:'ignore'}),base='http://127.0.0.1:8016';
const summary={status:'running',browser_scenarios:[],runtime_assertions:0,source_sha256:{},failures:[]};
for(const file of ['buttons.html','buttons.css','buttons.mjs','button-catalog.mjs','button-gallery.mjs','button-contracts.html','button-tests.mjs','verify_buttons.mjs','verify_buttons_rea.py','button-resources.json'])summary.source_sha256[file]=createHash('sha256').update(await readFile(file)).digest('hex');
const browser=await chromium.launch({headless:true});
async function waitReady(){for(let i=0;i<100;i++){try{if((await fetch(base+'/buttons.html')).ok)return;}catch{}await new Promise(r=>setTimeout(r,50));}throw Error('Local server failed');}
async function shot(page,name){const bytes=await page.screenshot({path:join(output,name+'.png')});return createHash('sha256').update(bytes).digest('hex');}
async function scenario(name,options,fn){const context=await browser.newContext(options),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(String(e)));try{await fn(page);assert.deepEqual(errors,[]);summary.browser_scenarios.push({name,status:'passed',screenshot_sha256:await shot(page,name)});console.log('PASS',name);}catch(e){summary.failures.push({name,error:String(e),page_errors:errors});await shot(page,name+'-failure');console.error('FAIL',name,e);}finally{await context.close();}}
try{
await waitReady();
for(const mode of ['desktop','touch'])for(const b of buttons){await scenario(`${mode}-${b.id}`,{viewport:{width:mode==='desktop'?1280:390,height:900},hasTouch:mode==='touch',isMobile:mode==='touch',reducedMotion:'no-preference'},async page=>{
 await page.goto(base+'/buttons.html?button='+b.id);await page.waitForSelector('body[data-ready=buttons]');const target=page.locator(`.ba-button[data-effect=${b.id}]`);assert.equal(await page.locator('.ba-button').count(),1);
 assert.equal(await target.getAttribute('type'),'button');assert.ok(await target.getAttribute('aria-label'));const box=await target.boundingBox();assert.ok(box.width>=44&&box.height>=44);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await target.scrollIntoViewIfNeeded();
 if(mode==='desktop'){
  await shot(page,'default-'+b.id);await target.hover({position:{x:box.width*.7,y:box.height*.4}});await page.waitForTimeout(520);await shot(page,'hover-'+b.id);
  const hovered=await target.boundingBox();await page.mouse.move(hovered.x+hovered.width/2,hovered.y+hovered.height/2);await page.mouse.down();assert.equal(await target.getAttribute('data-phase'),'pressed');await shot(page,'pressed-'+b.id);await page.mouse.up();
 }else await target.tap();
 if(b.id==='async'){await target.waitFor({state:'visible'});await page.waitForSelector('.ba-button[data-state=success]');await page.locator('#fail').check();await target.click();await page.waitForSelector('.ba-button[data-state=error]');assert.equal(await target.isEnabled(),true);await page.locator('#fail').uncheck();await target.press('Enter');await page.waitForSelector('.ba-button[data-state=success]');}
 else if(b.id==='menu'){assert.equal(await target.getAttribute('aria-expanded'),'true');await page.locator('.ba-panel button').first().focus();await page.keyboard.press('Escape');assert.equal(await target.getAttribute('aria-expanded'),'false');assert.ok(await target.evaluate(e=>document.activeElement===e));}
 else if(b.id==='undo'){assert.equal(await target.getAttribute('aria-pressed'),'true');await target.press('Space');assert.equal(await target.getAttribute('aria-pressed'),'false');}
 else{assert.equal(await target.getAttribute('data-state'),'activated');const n=Number(await target.getAttribute('data-activations'));await target.press('Enter');await target.press('Space');assert.equal(Number(await target.getAttribute('data-activations')),n+2);}
 await page.waitForTimeout(850);
 assert.equal(await page.locator('.ba-ripple,.ba-spark').count(),0);
 if(mode==='desktop'){await page.mouse.move(0,0);await page.waitForTimeout(1000);if(['magnetic','parallax','tilt'].includes(b.id))assert.equal(await target.evaluate(e=>e.style.transform),'');}
 });}
for(const width of [390,1280])for(const motion of ['reduce','no-preference'])await scenario(`gallery-${width}-${motion}`,{viewport:{width,height:1000},reducedMotion:motion},async page=>{
 await page.goto(base+'/buttons.html');await page.waitForSelector('body[data-count="20"]');assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.locator('#search').fill('missing-pattern');await page.waitForSelector('body[data-count="0"]');assert.ok(await page.locator('#empty').isVisible());await page.locator('#search').fill('');
 await page.locator('#category').selectOption('State');await page.waitForSelector('body[data-count="2"]');await page.locator('#size').selectOption('lg');assert.equal(await page.locator('.ba-wrap[data-size=lg]').count(),2);
 await page.locator('#speed').selectOption('800');assert.equal(await page.locator('.ba-wrap').first().evaluate(e=>e.style.getPropertyValue('--ba-duration')),'800ms');
 await page.locator('#category').selectOption('All');await page.locator('#motion').uncheck();assert.equal(await page.locator('html').getAttribute('data-button-motion'),'off');
 await page.locator('#motion').check();if(motion==='reduce'){const durations=await page.locator('.ba-button').evaluateAll(es=>es.map(e=>getComputedStyle(e).transitionDuration));assert.ok(durations.every(d=>d==='0s'));}
 await page.locator('#size').selectOption('md');await page.locator('#speed').selectOption('420');await page.locator('h1').scrollIntoViewIfNeeded();
});
await scenario('lifecycle-contracts',{viewport:{width:1280,height:1000}},async page=>{await page.goto(base+'/button-contracts.html');await page.waitForSelector('body[data-result=passed]',{timeout:12000});summary.runtime_assertions=Number(await page.locator('body').getAttribute('data-checks'));assert.equal(summary.runtime_assertions,13);});
summary.status=summary.failures.length?'failed':'passed';
}finally{await browser.close();server.kill();await writeFile(join(output,'summary.json'),JSON.stringify(summary,null,2));}
if(summary.failures.length)process.exitCode=1;
