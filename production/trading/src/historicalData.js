import fs from 'node:fs/promises';

export async function readCsv(file){
  const text=await fs.readFile(file,'utf8');
  const [header,...rows]=text.trim().split(/\r?\n/);
  const keys=header.split(',');
  return rows.filter(Boolean).map(line=>{
    const values=line.split(',');
    return Object.fromEntries(keys.map((key,index)=>[key,values[index]]));
  });
}
