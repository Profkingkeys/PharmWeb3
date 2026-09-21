import fs from 'node:fs/promises';
import { backtest } from './backtest.js';
import { scoreSetup, aiTradePolicy } from './agent.js';
const candles=JSON.parse(await fs.readFile(new URL('../fixtures/eurusd.json',import.meta.url)));
console.log(JSON.stringify({mode:'fixture-paper-backtest',pair:'EUR/USD',...backtest(candles,w=>aiTradePolicy(scoreSetup(w),{minConfidence:0.501}))},null,2));