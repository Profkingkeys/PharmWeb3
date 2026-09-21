import { Tracer } from './src/tracer.js';

const tracer=new Tracer();
async function stage(name,attributes,fn,parent=''){
  const span=tracer.startSpan(name,attributes,parent);
  try{return {result:await fn(),span:span.end({status:'ok'})};}
  catch(error){span.end({status:'error',attributes:{error_type:error.name}});throw error;}
}
const ai=await stage('ai.agent.run',{component:'ai',operation:'tool-selection'},async()=>({tool:'project_search'}));
const saas=await stage('saas.request',{component:'saas',tenant_id:'demo_tenant'},async()=>({status:'authorized'}),ai.span.spanId);
const trading=await stage('trading.paper.order',{component:'trading',mode:'paper'},async()=>({status:'simulated'}),saas.span.spanId);
await stage('database.persist',{component:'database',operation:'append-ledger'},async()=>({rows:2}),trading.span.spanId);

let exported;
if(process.env.OTEL_EXPORTER_OTLP_ENDPOINT||process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT){
  exported=await tracer.export();
}else{
  exported={exported:tracer.spans.length,transport:'local-buffer',note:'Set OTEL_EXPORTER_OTLP_ENDPOINT to send OTLP/JSON HTTP traces.'};
}
console.log(JSON.stringify({pipeline:'ai -> saas -> trading -> database',traceId:tracer.traceId,spans:tracer.spans,export:exported},null,2));
