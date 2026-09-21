import test from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs/promises';
import { runProductionAgent } from '../src/agent.js';
import { createRunStore } from '../src/runStore.js';
import { createToolRegistry } from '../src/toolRegistry.js';

test('tool registry exposes stable capabilities',()=>{
  const registry=createToolRegistry();
  assert.deepEqual(registry.list().map(x=>x.name),['calculator','project_search']);
});

test('calculator handles arithmetic without dynamic code execution',async()=>{
  const registry=createToolRegistry();
  const calculator=registry.get('calculator');
  assert.equal((await calculator.run({expression:'(8+4)*2'})).result,24);
  assert.equal((await calculator.run({expression:'10/2'})).result,5);
  assert.equal((await calculator.run({expression:'10%3'})).result,1);
  await assert.rejects(()=>calculator.run({expression:'1/0'}),/Division by zero/);
});

test('production agent persists a run',async()=>{
  const file=path.join(os.tmpdir(),'pw3-agent-'+Date.now()+'.jsonl');
  const run=await runProductionAgent('Calculate 8 * 7',{store:createRunStore(file)});
  assert.equal(run.output.result.result,56);
  const stored=JSON.parse((await fs.readFile(file,'utf8')).trim());
  assert.equal(stored.output.tool,'calculator');
  await fs.rm(file,{force:true});
});
