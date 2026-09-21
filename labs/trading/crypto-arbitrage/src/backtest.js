export function backtest(snapshots,strategy){
  let trades=0,totalReturn=0;
  const equity=[1];
  for(const snapshot of snapshots){
    const decision=strategy(snapshot);
    if(decision.action==='PAPER_TRADE'){
      trades++;
      const pnl=Number(decision.expectedNetSpread||0);
      totalReturn+=pnl;
      equity.push(equity.at(-1)*(1+pnl));
    }
  }
  let peak=equity[0],maxDrawdown=0;
  for(const value of equity){peak=Math.max(peak,value);maxDrawdown=Math.max(maxDrawdown,(peak-value)/peak);}
  return {trades,totalReturn,equity,multiple:equity.at(-1),maxDrawdown};
}