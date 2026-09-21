import test from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs/promises';
import { RateLimiter } from '../src/rateLimiter.js';
import { assessTrade, stopLossPrice } from '../src/risk.js';
import { createPaperLedger } from '../src/ledger.js';
import { buildPortfolio } from '../src/portfolio.js';
import { readCsv } from '../src/historicalData.js';

test('rate limiter enforces a minimum interval',async()=>{
  const limiter=new RateLimiter({minIntervalMs:5});
  const started=Date.now(); await limiter.wait(); await limiter.wait();
  assert.ok(Date.now()-started>=4);
});
test('risk engine rejects oversized orders',()=>{
  const result=assessTrade({side:'BUY',quantity:20,price:100,equity:1000});
  assert.equal(result.approved,false);
});
test('ledger persists paper fills and portfolio reconstructs state',async()=>{
  const file=path.join(os.tmpdir(),'pw3-ledger-'+Date.now()+'.jsonl');
  const ledger=createPaperLedger(file);
  await ledger.record({type:'fill',symbol:'PW3/USDT',side:'BUY',quantity:1,price:100});
  await ledger.record({type:'fill',symbol:'PW3/USDT',side:'SELL',quantity:1,price:102});
  const events=await ledger.all();
  const portfolio=buildPortfolio(events);
  assert.equal(events.length,2);
  assert.equal(portfolio.cash,10002);
  assert.equal(portfolio.positions['PW3/USDT'],0);
  await fs.rm(file,{force:true});
});
test('historical data ingestion parses rows',async()=>{
  const file=path.join(os.tmpdir(),'quotes-'+Date.now()+'.csv');
  await fs.writeFile(file,'timestamp,symbol,venue,ask,bid\n1,PW3/USDT,X,10,11\n');
  const rows=await readCsv(file);
  assert.equal(rows[0].venue,'X');
  await fs.rm(file,{force:true});
});
test('stop loss is directional',()=>{
  assert.equal(stopLossPrice(100,'BUY',0.01),99);
  assert.equal(stopLossPrice(100,'SELL',0.01),101);
});
