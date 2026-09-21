import fs from 'node:fs/promises';
import path from 'node:path';
import { runProductionAgent } from '../src/agent.js';

const cases=JSON.parse(await fs.readFile(new URL('./cases.json',import.meta.url)));
const providers=['local-deterministic'];
if(process.env.OPENAI_API_KEY) providers.push('openai-compatible');
if(process.env.GROQ_API_KEY) providers.push('groq-compatible');

const report=[];
for(const provider of providers){
  let passed=0;
  const results=[];
  for(const testCase of cases){
    try{
      const run=await runProductionAgent(testCase.input,{providerName:provider});
      const ok=testCase.expectedTool==='calculator'
        ? run.output?.tool===testCase.expectedTool && run.output?.result?.result===testCase.expectedValue
        : run.output?.tool===testCase.expectedTool && run.output?.args?.capability?.toLowerCase()===testCase.expectedCapability;
      passed+=ok?1:0;
      results.push({input:testCase.input,passed:ok,latencyMs:run.latencyMs});
    }catch(error){
      results.push({input:testCase.input,passed:false,error:error.message});
    }
  }
  const completed=results.filter(r=>r.latencyMs!=null);
  report.push({
    provider,
    passed,
    total:cases.length,
    accuracy:passed/cases.length,
    averageLatencyMs:completed.length?Number((completed.reduce((a,b)=>a+b.latencyMs,0)/completed.length).toFixed(2)):null,
    results
  });
}
const output={generatedAt:new Date().toISOString(),cases:cases.length,comparison:report};
await fs.mkdir(path.resolve('reports'),{recursive:true});
await fs.writeFile('reports/ai-provider-evaluation.json',JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify(output,null,2));
if(report.some(item=>item.accuracy<1)) process.exit(1);
