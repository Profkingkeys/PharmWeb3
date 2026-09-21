import { forexAIPlugin } from './plugins.js';

export function scoreSetup(candles) {
  if (candles.length < 5) throw new Error('At least five candles are required');
  const closes=candles.map(c=>c.close);
  const avg=closes.reduce((a,b)=>a+b,0)/closes.length;
  const last=closes.at(-1);
  const momentum=last-closes.at(-3);
  const trend=last>=avg?'BULLISH':'BEARISH';
  const confidence=Math.min(0.99,0.5+Math.abs(momentum)/(avg*4));
  return {trend,momentum,confidence};
}

export function aiTradePolicy(signal,risk={}) { return forexAIPlugin.decide(signal,risk); }
