export const forexAIPlugin = {
  name:'local-forex-ai-plugin',
  decide(signal,{minConfidence=0.501}={}) {
    if (signal.confidence < minConfidence) return {action:'NO_TRADE',reason:'Confidence below threshold',plugin:this.name};
    return {action:'PAPER_TRADE',side:signal.trend==='BULLISH'?'BUY':'SELL',reason:'Signal passed policy',plugin:this.name};
  }
};
