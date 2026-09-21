export function tenantFromHeaders(headers){
  const tenant=headers['x-tenant-id'];
  if(!tenant || !/^[a-zA-Z0-9_-]{3,64}$/.test(tenant)) throw new Error('Invalid or missing tenant');
  return tenant;
}
export function scopedProject(project,tenantId){return project.tenantId===tenantId?project:null;}