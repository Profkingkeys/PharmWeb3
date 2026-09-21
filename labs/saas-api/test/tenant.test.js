import test from 'node:test';
import assert from 'node:assert/strict';
import { tenantFromHeaders, scopedProject } from '../src/tenant.js';
test('requires valid tenant id',()=>{assert.equal(tenantFromHeaders({'x-tenant-id':'clinic-01'}),'clinic-01');assert.throws(()=>tenantFromHeaders({}),/tenant/);});
test('prevents cross-tenant visibility',()=>{assert.equal(scopedProject({id:1,tenantId:'a'},'b'),null);assert.deepEqual(scopedProject({id:1,tenantId:'a'},'a'),{id:1,tenantId:'a'});});