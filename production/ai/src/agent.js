import { randomUUID } from 'node:crypto';
import { createToolRegistry } from './toolRegistry.js';
import { configuredProviders } from './providers.js';
import { createRunStore } from './runStore.js';

export async function runProductionAgent(input,{providerName='local-deterministic',env=process.env,store=createRunStore()}={}) {
  const tools=createToolRegistry();
  const provider=configuredProviders(tools,env).find(item=>item.name===providerName);
  if (!provider) throw new Error('Provider not configured: '+providerName);
  const started=performance.now();
  let output=null;
  let error=null;
  try { output=await provider.complete({input}); }
  catch (e) { error=e; }
  const run={
    runId:randomUUID(),
    timestamp:new Date().toISOString(),
    provider:provider.name,
    input,
    output,
    error:error?.message ?? null,
    latencyMs:Number((performance.now()-started).toFixed(2))
  };
  await store.append(run);
  if (error) throw error;
  return run;
}
