import { RateLimiter } from './rateLimiter.js';

export class ExchangeAdapter{
  constructor(name,limiter=new RateLimiter()){this.name=name;this.limiter=limiter;}
  async ticker(){throw new Error('ticker() must be implemented');}
}

export class FixtureExchangeAdapter extends ExchangeAdapter{
  constructor(name,snapshot){super(name);this.snapshot=snapshot;}
  async ticker(symbol){
    await this.limiter.wait();
    const row=this.snapshot.find(item=>item.symbol===symbol);
    if(!row) throw new Error('Unknown fixture symbol: '+symbol);
    return {exchange:this.name,symbol,ask:Number(row.ask),bid:Number(row.bid),timestamp:row.timestamp};
  }
}
