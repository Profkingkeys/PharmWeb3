import { findOpportunity } from './engine.js';
import { aiRiskDecision } from './aiDecision.js';
export function fixtureStrategy(snapshot){
  const opportunity=findOpportunity(snapshot.ticker,snapshot.venues,{minNetSpread:0.002,buyFeeBps:10,sellFeeBps:10,slippageBps:5});
  const decision=aiRiskDecision(opportunity);
  return {...decision,expectedNetSpread:opportunity?.netSpread??0};
}