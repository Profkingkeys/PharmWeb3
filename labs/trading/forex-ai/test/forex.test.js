import test from 'node:test';
import assert from 'node:assert/strict';
import { scoreSetup, aiTradePolicy } from '../src/agent.js';

test('scores a forex setup',()=>{
  const signal=scoreSetup([{close:1},{close:1.01},{close:1.02},{close:1.03},{close:1.04}]);
  assert.equal(signal.trend,'BULLISH');
  assert.ok(signal.confidence>0.5);
});

test('returns paper trade after policy check',()=>{
  const decision=aiTradePolicy({trend:'BEARISH',confidence:0.8});
  assert.equal(decision.action,'PAPER_TRADE');
  assert.equal(decision.side,'SELL');
  assert.equal(decision.plugin,'local-forex-ai-plugin');
});
