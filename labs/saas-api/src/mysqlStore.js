export async function createMySQLStore(url){
  const mysql=await import('mysql2/promise');
  const pool=mysql.createPool(url);
  return {
    async listProjects(tenantId){const [rows]=await pool.execute('SELECT id,name,plan,tenant_id AS tenantId FROM projects WHERE tenant_id=? ORDER BY id',[tenantId]);return rows;},
    async createProject(tenantId,input){const [result]=await pool.execute('INSERT INTO projects (tenant_id,name,plan) VALUES (?,?,?)',[tenantId,String(input.name),String(input.plan||'starter')]);return {id:result.insertId,name:String(input.name),plan:String(input.plan||'starter'),tenantId};}
  };
}