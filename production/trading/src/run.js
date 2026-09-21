import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readCsv } from './historicalData.js';
import { FixtureExchangeAdapter } from './exchange.js';
import { createPaperLedger } from './ledger.js';
import { assessTrade } from './risk.js';
import { buildPortfolio } from './portfolio.js';
import { findOpportunity } from '../../../labs/trading/crypto-arbitrage/src/engine.js';

const here=path.dirname(fileURLToPath(import.meta.url));
const rows=await readCsv(path.join(here,'../data/historical_quotes.csv'));
const groups=new Map();
for(const row of rows){const list=groups.get(row.timestamp)??[];list.push(row);groups.set(row.timestamp,list);}
const ledger=createPaperLedger();
for(const [timestamp,snapshot] of groups){
  const venues=await Promise.all(['AlphaExchange','BetaExchange','GammaExchange'].map(name=>new FixtureExchangeAdapter(name,snapshot).ticker('PW3/USDT')));
  const opportunity=findOpportunity('PW3/USDT',venues,{buyFeeBps:10,sellFeeBps:10,slippageBps:5,minNetSpread:0.002});
  if(!opportunity) continue;
  const risk=assessTrade({side:'BUY',quantity:1,price:opportunity.buy,equity:10000});
  if(!risk.approved) continue;
  await ledger.record({type:'fill',timestamp,symbol:opportunity.ticker,side:'BUY',quantity:1,price:opportunity.buy,venue:opportunity.buyVenue,expectedNetSpread:opportunity.netSpread});
  await ledger.record({type:'fill',timestamp,symbol:opportunity.ticker,side:'SELL',quantity:1,price:opportunity.sell,venue:opportunity.sellVenue,expectedNetSpread:opportunity.netSpread});
}
const events=await ledger.all();
console.log(JSON.stringify({mode:'paper',fills:events.length,portfolio:buildPortfolio(events)},null,2));
