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
  const r=await fetch(base+'/api/projects',{method:'POST',headers:{'content-type':'application/json','x-tenant-id':'clinic-a'},body:JSON.stringify({name:'New Clinic',plan:'pro'})});
  assert.equal(r.status,201);
  assert.equal((await r.json()).name,'New Clinic');
}));

test('HTTP tenant boundary hides another clinic projects',()=>withServer(async base=>{
  const created=await fetch(base+'/api/projects',{method:'POST',headers:{'content-type':'application/json','x-tenant-id':'clinic-a'},body:JSON.stringify({name:'Private clinic project'})});
  assert.equal(created.status,201);
  const own=await fetch(base+'/api/projects',{headers:{'x-tenant-id':'clinic-a'}});
  assert.equal((await own.json()).projects.length,1);
  const other=await fetch(base+'/api/projects',{headers:{'x-tenant-id':'clinic-b'}});
  assert.deepEqual((await other.json()).projects,[]);
  const missing=await fetch(base+'/api/projects');
  assert.equal(missing.status,400);
}));
