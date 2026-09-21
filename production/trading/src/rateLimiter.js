export class RateLimiter{
  constructor({minIntervalMs=100}={}){this.minIntervalMs=minIntervalMs;this.nextAt=0;}
  async wait(){
    const now=Date.now();
    const delay=Math.max(0,this.nextAt-now);
    this.nextAt=Math.max(now,this.nextAt)+this.minIntervalMs;
    if(delay) await new Promise(resolve=>setTimeout(resolve,delay));
  }
}
