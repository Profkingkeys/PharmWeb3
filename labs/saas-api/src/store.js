export async function createStore(){
  if(process.env.MYSQL_URL){const {createMySQLStore}=await import('./mysqlStore.js');return createMySQLStore(process.env.MYSQL_URL);}
  const projects=[{id:1,name:'PharmWeb3',plan:'founder',tenantId:'founder'}];
  return {
    async listProjects(tenantId){return projects.filter(p=>p.tenantId===tenantId);},
    async createProject(tenantId,input){const project={id:projects.length+1,name:String(input.name),plan:String(input.plan||'starter'),tenantId};projects.push(project);return project;}
  };
}