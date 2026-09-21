import { randomBytes, scrypt as _scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
const scrypt=promisify(_scrypt);
function keyPrefix(raw){return raw.slice(0,12);}
export async function createApiKey({tenantId,name='default',scope=['projects:read','projects:write']}){
  const raw='pw3_'+randomBytes(32).toString('base64url');
  const salt=randomBytes(16);
  const derived=await scrypt(raw,salt,32);
  return {
    apiKey:raw,
    record:{
      id:randomBytes(12).toString('hex'),tenantId,name,scope,prefix:keyPrefix(raw),
      salt:salt.toString('hex'),hash:Buffer.from(derived).toString('hex'),
      revokedAt:null,createdAt:new Date().toISOString()
    }
  };
}
export async function verifyApiKey(raw,record){
  if(!raw||!record||record.revokedAt)return false;
  const derived=await scrypt(raw,Buffer.from(record.salt,'hex'),32);
  const expected=Buffer.from(record.hash,'hex');
  return expected.length===derived.length&&timingSafeEqual(expected,derived);
}
export function rotateApiKey(record,replacement){
  return [{...record,revokedAt:new Date().toISOString()},replacement];
}
export function authorizeTenant({record,tenantId,scope}){
  if(!record||record.tenantId!==tenantId)return {ok:false,reason:'tenant_mismatch'};
  if(scope&&!record.scope.includes(scope))return {ok:false,reason:'scope_denied'};
  if(record.revokedAt)return {ok:false,reason:'revoked'};
  return {ok:true,tenantId:record.tenantId};
}
