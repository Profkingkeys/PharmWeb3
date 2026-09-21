export function executePaperTrade(decision, opportunity) {
  if (decision.action !== 'PAPER_TRADE') return {status:'not_executed',reason:decision.reason};
  return {
    status:'simulated',
    orderId:`paper-${Date.now()}`,
    symbol:opportunity.ticker,
    buyVenue:opportunity.buyVenue,
    sellVenue:opportunity.sellVenue,
    expectedNetSpread:opportunity.netSpread
  };
}
