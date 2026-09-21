export function requireTenantHeader(headers){
  const tenantId=String(headers['x-tenant-id']??'').trim();
  if(!tenantId)throw new Error('tenant_required');
  if(!/^[a-zA-Z0-9][a-zA-Z0-9_-]{2,63}$/.test(tenantId))throw new Error('tenant_invalid');
  return tenantId;
}
export function enforceTenantOwnership(resource,tenantId){
  if(!resource||resource.tenantId!==tenantId)throw new Error('tenant_scope_violation');
  return resource;
}
