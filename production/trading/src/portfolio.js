export function buildPortfolio(events,initialCash=10000){
  let cash=initialCash;
  const positions=new Map();
  for(const event of events){
    if(event.type!=='fill') continue;
    const signedQty=event.side==='BUY'?event.quantity:-event.quantity;
    const signedCash=event.side==='BUY'?-event.quantity*event.price:event.quantity*event.price;
    cash+=signedCash;
    positions.set(event.symbol,(positions.get(event.symbol)??0)+signedQty);
  }
  return {cash,positions:Object.fromEntries(positions),eventCount:events.length};
}
