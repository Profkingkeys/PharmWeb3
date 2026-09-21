import { randomUUID } from 'node:crypto';

export function startSpan(name,attributes={}) {
  const traceId=randomUUID().replaceAll('-','');
  const started=Date.now();
  return {
    traceId,
    spanId:randomUUID().replaceAll('-','').slice(0,16),
    name,
    attributes,
    end(extra={}){ return {traceId,name,durationMs:Date.now()-started,attributes:{...attributes,...extra}}; }
  };
}

export async function instrument(name,fn,attributes={}) {
  const span=startSpan(name,attributes);
  try {
    const result=await fn(span);
    return {result,telemetry:span.end({status:'ok'})};
  } catch(error) {
    console.log(JSON.stringify(span.end({error:error.message,status:'error'})));
    throw error;
  }
}

if(import.meta.url===`file://${process.argv[1]}`){
  const result=await instrument('demo.ai.tool',async()=>({ok:true}),{component:'ai'});
  console.log(JSON.stringify({telemetry:'enabled',trace:result.telemetry,result:result.result}));
}
