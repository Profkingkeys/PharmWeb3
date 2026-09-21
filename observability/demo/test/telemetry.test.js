import test from 'node:test';
import assert from 'node:assert/strict';
import { instrument } from '../src/index.js';

test('produces trace data for a successful span',async()=>{
  const trace=await instrument('test.operation',async()=>42,{component:'test'});
  assert.equal(trace.telemetry.name,'test.operation');
  assert.ok(trace.telemetry.traceId);
  assert.equal(trace.telemetry.attributes.component,'test');
  assert.equal(trace.result,42);
});

test('propagates errors',async()=>{
  await assert.rejects(()=>instrument('test.failure',async()=>{throw new Error('boom')}),/boom/);
});
