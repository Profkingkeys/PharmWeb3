export const arbitrageAIPlugin = {
  name:'local-ai-risk-plugin',
  decide(opportunity) {
    if (!opportunity) return {action:'NO_TRADE',reason:'No opportunity',plugin:this.name};
    if (opportunity.netSpread < 0.002) return {action:'NO_TRADE',reason:'Below threshold',plugin:this.name};
    if (opportunity.netSpread > 0.03) return {action:'REVIEW',reason:'Unusually large spread',plugin:this.name};
    return {action:'PAPER_TRADE',reason:'Passes risk policy',plugin:this.name};
  }
};
