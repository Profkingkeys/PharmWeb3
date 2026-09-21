import fs from 'node:fs/promises';
import path from 'node:path';

export function createRunStore(filePath=process.env.PW3_AGENT_RUNS_PATH ?? 'data/agent-runs.jsonl') {
  return {
    async append(run) {
      await fs.mkdir(path.dirname(filePath),{recursive:true});
      await fs.appendFile(filePath,JSON.stringify(run)+'\n','utf8');
      return run;
    },
    async list() {
      try {
        return (await fs.readFile(filePath,'utf8')).trim().split('\n').filter(Boolean).map(JSON.parse);
      } catch (error) {
        if (error.code==='ENOENT') return [];
        throw error;
      }
    }
  };
}
