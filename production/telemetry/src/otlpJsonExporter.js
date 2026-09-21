import { randomBytes } from 'node:crypto';

function hexId(bytes){ return randomBytes(bytes).toString('hex'); }

function attribute(key,value){
  if(typeof value==='boolean') return {key,value:{boolValue:value}};
  if(Number.isInteger(value)) return {key,value:{intValue:String(value)}};
  if(typeof value==='number') return {key,value:{doubleValue:value}};
  return {key,value:{stringValue:String(value)}};
}

export function createOtlpJsonSpan(name,{traceId=hexId(16),spanId=hexId(8),startTimeUnixNano,endTimeUnixNano,attributes={},statusCode=0,parentSpanId=''}={}){
  return {
    traceId,spanId,...(parentSpanId?{parentSpanId}:{}),name,kind:1,
    startTimeUnixNano:String(startTimeUnixNano??BigInt(Date.now())*1000000n),
    endTimeUnixNano:String(endTimeUnixNano??BigInt(Date.now())*1000000n),
    attributes:Object.entries(attributes).map(([key,value])=>attribute(key,value)),
    status:{code:statusCode}
  };
}

export async function exportSpans(spans,{endpoint=headersEndpoint(),headers={}}={}){
  const response=await fetch(endpoint,{
    method:'POST',
    headers:{'content-type':'application/json',...headers},
    body:JSON.stringify({
      resourceSpans:[{
        resource:{attributes:[
          attribute('service.name',process.env.OTEL_SERVICE_NAME??'pharmweb3-engineering-labs'),
          attribute('deployment.environment',process.env.NODE_ENV??'development')
        ]},
        scopeSpans:[{scope:{name:'pharmweb3.production',version:'1.0.0'},spans}]
      }]
    })
  });
  if(!response.ok) throw new Error('OTLP export failed: '+response.status);
  return {endpoint,status:response.status,exported:spans.length};
}

function headersEndpoint(){
  if(process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT) return process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT;
  const base=process.env.OTEL_EXPORTER_OTLP_ENDPOINT??'http://localhost:4318';
  return base.endsWith('/') ? base+'v1/traces' : base+'/v1/traces';
}
