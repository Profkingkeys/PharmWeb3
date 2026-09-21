import test from 'node:test';
import assert from 'node:assert/strict';
import { createApiKey,verifyApiKey,rotateApiKey,authorizeTenant } from '../src/apiKeys.js';
import { requireTenantHeader,enforceTenantOwnership } from '../src/tenantGuard.js';

test('API keys are hashed and verifiable',async()=>{
  const {apiKey,record}=await createApiKey({tenantId:'tenant_alpha',name:'ci'});
  assert.equal(record.hash.includes(apiKey),false);
  assert.equal(await verifyApiKey(apiKey,record),true);
  assert.equal(await verifyApiKey('pw3_invalid',record),false);
});
test('rotation revokes the old record',async()=>{
  const first=await createApiKey({tenantId:'tenant_alpha'});
  const second=await createApiKey({tenantId:'tenant_alpha'});
  const [revoked,replacement]=rotateApiKey(first.record,second.record);
  assert.ok(revoked.revokedAt);
  assert.equal(replacement.id,second.record.id);
});
test('tenant authorization blocks cross-tenant access',async()=>{
  const {record}=await createApiKey({tenantId:'tenant_a',scope:['projects:read']});
  assert.deepEqual(authorizeTenant({record,tenantId:'tenant_a',scope:'projects:read'}),{ok:true,tenantId:'tenant_a'});
  assert.equal(authorizeTenant({record,tenantId:'tenant_b',scope:'projects:read'}).ok,false);
  assert.equal(authorizeTenant({record,tenantId:'tenant_a',scope:'projects:write'}).ok,false);
});
test('tenant header and ownership are explicit',()=>{
  assert.equal(requireTenantHeader({'x-tenant-id':'tenant_a'}),'tenant_a');
  assert.throws(()=>requireTenantHeader({}),/tenant_required/);
  assert.throws(()=>enforceTenantOwnership({tenantId:'tenant_a'},'tenant_b'),/tenant_scope_violation/);
});
