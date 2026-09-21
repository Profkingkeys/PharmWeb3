export function netSpread(buy, sell, buyFeeBps=10, sellFeeBps=10, slippageBps=5) {
  const buyCost = buy * (1 + buyFeeBps / 10000 + slippageBps / 10000);
  const sellValue = sell * (1 - sellFeeBps / 10000 - slippageBps / 10000);
  return (sellValue - buyCost) / buyCost;
}

export function findOpportunity(ticker, venues, config={}) {
  const min = config.minNetSpread ?? 0.002;
  let best = null;
  for (const buy of venues) for (const sell of venues) {
    if (buy.name === sell.name) continue;
    const spread = netSpread(buy.ask, sell.bid, config.buyFeeBps, config.sellFeeBps, config.slippageBps);
    const candidate = {ticker,buyVenue:buy.name,sellVenue:sell.name,buy:buy.ask,sell:sell.bid,netSpread:spread};
    if (spread >= min && (!best || spread > best.netSpread)) best = candidate;
  }
  return best;
}
