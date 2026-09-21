import test from 'node:test';
import assert from 'node:assert/strict';
import { findOpportunity, netSpread } from '../src/engine.js';
import { aiRiskDecision } from '../src/aiDecision.js';
import { executePaperTrade } from '../src/paperExecutor.js';

test('calculates fee and slippage aware spread', () => {
  const s=netSpread(100,100.5,10,10,5);
  assert.ok(s>0);
  assert.ok(s<0.01);
});

test('finds best qualifying venue pair', () => {
  const opp=findOpportunity('BTC/USDT',[
    {name:'A',ask:100,bid:99.9},
    {name:'B',ask:100.1,bid:100.6},
    {name:'C',ask:100.2,bid:100.3}
  ],{minNetSpread:0.002,buyFeeBps:10,sellFeeBps:10,slippageBps:5});
  assert.equal(opp.buyVenue,'A');
  assert.equal(opp.sellVenue,'B');
});

test('AI plugin selects paper trading', () => {
  const decision=aiRiskDecision({netSpread:0.004});
  assert.equal(decision.action,'PAPER_TRADE');
  assert.equal(decision.plugin,'local-ai-risk-plugin');
  const order=executePaperTrade(decision,{ticker:'BTC/USDT',buyVenue:'A',sellVenue:'B',netSpread:0.004});
  assert.equal(order.status,'simulated');
});
