import { tools } from './tools.js';

export function chooseTool(input) {
  const text = String(input).toLowerCase();
  if (/calculate|math|sum|plus|minus|multiply|divide/.test(text)) return 'calculator';
  if (/project|portfolio|show me|github/.test(text)) return 'project_search';
  return null;
}

export async function runAgent(input) {
  const tool = chooseTool(input);
  if (!tool) return { mode:'answer', message:'No tool is required for this request.', trace:[] };

  const args = tool === 'calculator'
    ? { expression: input.replace(/[^0-9+\-*/().%\s]/g, '') }
    : { capability: input.match(/(?:frontend|healthcare|ai|android|hybrid|trading|fastapi|interactive)/i)?.[0] ?? 'frontend' };

  const result = await tools[tool].run(args);
  return {
    mode:'tool',
    tool,
    args,
    result,
    trace:[{event:'tool.selected',tool},{event:'tool.completed',tool}]
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const input = process.argv.slice(2).join(' ') || 'Show me AI projects';
  console.log(JSON.stringify(await runAgent(input), null, 2));
}
