import http from 'node:http';
import { URL } from 'node:url';
import { createStore } from './store.js';

export async function createServer() {
  const store=await createStore();
  return http.createServer(async (req,res)=>{
    const url=new URL(req.url,`http://${req.headers.host||'localhost'}`);
    res.setHeader('content-type','application/json; charset=utf-8');

    if(req.method==='GET'&&url.pathname==='/health') return send(res,200,{ok:true,service:'pharmweb3-saas-lab',storage:process.env.MYSQL_URL?'mysql':'memory'});
    if(req.method==='GET'&&url.pathname==='/api/projects') return send(res,200,{projects:await store.listProjects()});
    if(req.method==='POST'&&url.pathname==='/api/projects'){
      const body=await readJson(req);
      if(!body.name) return send(res,400,{error:'name is required'});
      return send(res,201,await store.createProject(body));
    }
    send(res,404,{error:'not found'});
  });
}
function send(res,status,body){res.statusCode=status;res.end(JSON.stringify(body));}
function readJson(req){return new Promise((resolve,reject)=>{let raw='';req.on('data',c=>raw+=c);req.on('end',()=>{try{resolve(JSON.parse(raw||'{}'))}catch(e){reject(e)}});});}

if(import.meta.url===`file://${process.argv[1]}`){
  const server=await createServer();
  const port=Number(process.env.PORT||8787);
  server.listen(port,()=>console.log(`SaaS API listening on ${port}`));
}
