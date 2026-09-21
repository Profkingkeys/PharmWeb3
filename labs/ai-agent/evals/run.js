import fs from 'node:fs/promises';
import { runAgent } from '../src/agent.js';
const cases=JSON.parse(await fs.readFile(new URL('./cases.json',import.meta.url)));
let passed=0;
for(const c of cases){
  const result=await runAgent(c.input);
  const ok=c.expectedTool==='calculator'
    ? result.tool===c.expectedTool && result.result.result===c.expectedValue
    : result.tool===c.expectedTool && result.args.capability.toLowerCase()===c.expectedCapability;
  passed += ok ? 1 : 0;
  console.log(JSON.stringify({input:c.input,ok}));
}
console.log(JSON.stringify({passed,total:cases.length,accuracy:passed/cases.length}));
if(passed!==cases.length) process.exit(1);
