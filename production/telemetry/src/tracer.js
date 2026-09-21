import { randomBytes } from 'node:crypto';
import { createOtlpJsonSpan,exportSpans } from './otlpJsonExporter.js';

export class Tracer{
  constructor(){this.traceId=randomBytes(16).toString('hex');this.spans=[];}
  startSpan(name,attributes={},parentSpanId=''){
    const spanId=randomBytes(8).toString('hex');
    const started=process.hrtime.bigint();
    return {
      traceId:this.traceId,spanId,
      end:(extra={})=>{
        const duration=process.hrtime.bigint()-started;
        const now=BigInt(Date.now())*1000000n;
        const span=createOtlpJsonSpan(name,{
          traceId:this.traceId,spanId,parentSpanId,
          startTimeUnixNano:now,
          endTimeUnixNano:now+(duration/1000n),
          attributes:{...attributes,...(extra.attributes??{})},
          statusCode:extra.status==='error'?2:1
        });
        this.spans.push(span); return span;
      }
    };
  }
  async export(options={}){return this.spans.length?exportSpans(this.spans,options):{exported:0};}
}
