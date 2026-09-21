export async function createMySQLStore(url) {
  const mysql=await import('mysql2/promise');
  const pool=mysql.createPool(url);
  return {
    async listProjects(){
      const [rows]=await pool.query('SELECT id,name,plan FROM tenants ORDER BY id');
      return rows;
    },
    async createProject(input){
      const [result]=await pool.execute('INSERT INTO tenants (name,plan) VALUES (?,?)',[String(input.name),String(input.plan||'starter')]);
      return {id:result.insertId,name:String(input.name),plan:String(input.plan||'starter')};
    }
  };
}
