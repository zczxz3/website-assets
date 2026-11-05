// Run a feature's existing tools from its own directory on Windows, macOS or Linux.
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const [area,command,...args]=process.argv.slice(2);
if(!['motion','buttons','foundation','queue','studio','library'].includes(area)||!command){
  console.error('Usage: node scripts/run.mjs <motion|buttons|foundation|queue|studio|library> <command> [...args]');process.exit(2);
}
const result=spawnSync(command==='node'?process.execPath:command,args,{cwd:fileURLToPath(new URL(`../${area}/`,import.meta.url)),stdio:'inherit',shell:false});
if(result.error){console.error(result.error.message);process.exit(1);}
process.exit(result.status??1);
