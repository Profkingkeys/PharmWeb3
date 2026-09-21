import { arbitrageAIPlugin } from './plugins.js';

export function aiRiskDecision(opportunity, policy={}) {
  const plugin = policy.plugin ?? arbitrageAIPlugin;
  return plugin.decide(opportunity, policy);
}
