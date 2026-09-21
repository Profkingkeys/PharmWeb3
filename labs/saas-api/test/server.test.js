import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from '../src/server.js';

async function withServer(fn){
  const server=await createServer();
  await new Promise(r=>server.listen(0,r));
  const port=server.address().port;
  try{return await fn(`http://127.0.0.1:${port}`)} finally{await new Promise(r=>server.close(r))}
}

test('health endpoint',()=>withServer(async base=>{
  const r=await fetch(base+'/health');
  assert.equal(r.status,200);
  assert.equal((await r.json()).ok,true);
}));

test('creates SaaS project',()=>withServer(async base=>{
  const r=await fetch(base+'/api/projects',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name:'New Clinic',plan:'pro'})});
  assert.equal(r.status,201);
  assert.equal((await r.json()).name,'New Clinic');
}));
