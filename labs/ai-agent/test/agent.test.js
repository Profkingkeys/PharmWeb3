import test from 'node:test';
import assert from 'node:assert/strict';
import { runAgent, chooseTool } from '../src/agent.js';

test('selects calculator tool', async () => {
  assert.equal(chooseTool('calculate 4 + 5'), 'calculator');
  const result = await runAgent('calculate 4 + 5');
  assert.equal(result.result.result, 9);
  assert.equal(result.trace.at(-1).event, 'tool.completed');
});

test('selects project search tool', async () => {
  const result = await runAgent('show me AI projects');
  assert.equal(result.tool, 'project_search');
  assert.ok(result.result.some(p => p.name.includes('AI API')));
});
