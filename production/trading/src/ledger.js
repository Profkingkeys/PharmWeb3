import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

export function createPaperLedger(filePath=process.env.PW3_PAPER_LEDGER_PATH ?? 'data/paper-ledger.jsonl'){
  return {
    async record(event){
      await fs.mkdir(path.dirname(filePath),{recursive:true});
      const entry={id:randomUUID(),timestamp:new Date().toISOString(),...event};
      await fs.appendFile(filePath,JSON.stringify(entry)+'\n','utf8');
      return entry;
    },
    async all(){
      try{
        return (await fs.readFile(filePath,'utf8')).trim().split('\n').filter(Boolean).map(JSON.parse);
      }catch(error){
        if(error.code==='ENOENT') return [];
        throw error;
      }
    }
  };
}
