import { findOpportunity } from './engine.js';
import { aiRiskDecision } from './aiDecision.js';
import { executePaperTrade } from './paperExecutor.js';

const venues=[
  {name:'AlphaExchange',ask:100.00,bid:99.90},
  {name:'BetaExchange',ask:100.12,bid:100.52},
  {name:'GammaExchange',ask:100.05,bid:99.98}
];

const opportunity=findOpportunity('PW3/USDT',venues,{buyFeeBps:10,sellFeeBps:10,slippageBps:5,minNetSpread:0.002});
const decision=aiRiskDecision(opportunity);
const paperOrder=executePaperTrade(decision,opportunity);

console.log(JSON.stringify({mode:'paper',opportunity,aiDecision:decision,paperOrder},null,2));
