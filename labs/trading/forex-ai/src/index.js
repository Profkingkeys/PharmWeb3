import { scoreSetup, aiTradePolicy } from './agent.js';

const candles=[
  {close:1.0840},{close:1.0847},{close:1.0880},{close:1.0915},{close:1.0950},{close:1.0990}
];
const signal=scoreSetup(candles);
const decision=aiTradePolicy(signal,{minConfidence:0.501});

console.log(JSON.stringify({pair:'EUR/USD',mode:'paper',signal,decision},null,2));
