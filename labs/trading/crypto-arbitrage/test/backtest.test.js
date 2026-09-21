import test from 'node:test';
import assert from 'node:assert/strict';
import { backtest } from '../src/backtest.js';
test('backtest calculates trades and drawdown',()=>{
  const result=backtest([{x:1},{x:2},{x:3}],()=>({action:'PAPER_TRADE',expectedNetSpread:0.01}));
  assert.equal(result.trades,3);
  assert.ok(result.totalReturn>0);
  assert.equal(result.maxDrawdown,0);
});