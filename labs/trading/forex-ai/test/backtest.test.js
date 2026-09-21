import test from 'node:test';
import assert from 'node:assert/strict';
import { backtest } from '../src/backtest.js';
test('forex backtest produces a finite equity curve',()=>{
  const candles=Array.from({length:10},(_,i)=>({close:1+i/1000}));
  const result=backtest(candles,()=>({action:'PAPER_TRADE',side:'BUY'}));
  assert.ok(Number.isFinite(result.finalEquity));
  assert.equal(result.trades.length,5);
});