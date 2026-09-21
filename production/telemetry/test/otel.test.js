import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createOtlpJsonSpan,exportSpans } from '../src/otlpJsonExporter.js';
import { Tracer } from '../src/tracer.js';

test('trace spans preserve parent-child relationships',()=>{
  const tracer=new Tracer();
  const parent=tracer.startSpan('ai');
  const child=tracer.startSpan('saas',{},parent.spanId);
  parent.end({status:'ok'});
  child.end({status:'ok'});
  assert.equal(tracer.spans.length,2);
  assert.equal(tracer.spans[1].parentSpanId,parent.spanId);
  assert.equal(tracer.spans[1].traceId,tracer.traceId);
});

test('OTLP JSON exporter sends a trace payload over HTTP',async()=>{
  let payload=null;
  const server=http.createServer((req,res)=>{
    let body=''; req.on('data',chunk=>body+=chunk);
    req.on('end',()=>{payload=JSON.parse(body);res.statusCode=200;res.end('{}');});
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const endpoint='http://127.0.0.1:'+server.address().port+'/v1/traces';
  const span=createOtlpJsonSpan('unit.test',{attributes:{component:'test'},statusCode:1});
  const result=await exportSpans([span],{endpoint});
  server.close();
  assert.equal(result.exported,1);
  assert.equal(payload.resourceSpans[0].scopeSpans[0].spans[0].name,'unit.test');
});
