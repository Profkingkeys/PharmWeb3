export function assessTrade({side,quantity,price,equity,dailyPnl=0},policy={}){
  const maxNotional=policy.maxNotional ?? equity*0.10;
  const maxDailyLoss=policy.maxDailyLoss ?? equity*0.02;
  const notional=quantity*price;
  const checks={
    positiveQuantity:quantity>0,
    maxNotional:notional<=maxNotional,
    dailyLoss:dailyPnl>=-maxDailyLoss,
    sideAllowed:side==='BUY'||side==='SELL'
  };
  return {approved:Object.values(checks).every(Boolean),notional,checks,policy:{maxNotional,maxDailyLoss}};
}
export function stopLossPrice(entryPrice,side,pct=0.01){
  return side==='BUY'?entryPrice*(1-pct):entryPrice*(1+pct);
}
