export function backtest(candles,strategy){
  const trades=[];
  let equity=1;
  for(let i=5;i<candles.length;i++){
    const decision=strategy(candles.slice(i-5,i));
    if(decision.action==='PAPER_TRADE'){
      const direction=decision.side==='BUY'?1:-1;
      const move=(candles[i].close-candles[i-1].close)/candles[i-1].close;
      const pnl=direction*move;
      equity*=1+pnl;
      trades.push({index:i,pnl,equity,side:decision.side});
    }
  }
  return {trades,totalReturn:equity-1,finalEquity:equity};
}