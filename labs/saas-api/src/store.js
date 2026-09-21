export async function createStore() {
  if (process.env.MYSQL_URL) {
    const { createMySQLStore } = await import('./mysqlStore.js');
    return createMySQLStore(process.env.MYSQL_URL);
  }
  const projects=[{id:1,name:'PharmWeb3',plan:'founder'}];
  return {
    async listProjects(){ return projects; },
    async createProject(input){ const project={id:projects.length+1,name:String(input.name),plan:String(input.plan||'starter')}; projects.push(project); return project; }
  };
}
