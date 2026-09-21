import { createHash } from 'node:crypto';

function arithmetic(expression) {
  const source = String(expression).replace(/\s+/g, '');
  if (!source || !/^[\d()+\-*/%.]+$/.test(source)) throw new Error('Unsafe arithmetic expression');
  return Function('"use strict"; return (' + source + ')')();
}

export function createToolRegistry() {
  const definitions = {
    calculator: {
      description: 'Evaluate constrained arithmetic.',
      run: async ({ expression }) => ({ expression, result: arithmetic(expression) })
    },
    project_search: {
      description: 'Search portfolio capabilities.',
      run: async ({ capability = 'ai' }) => {
        const projects = [
          { name: 'PharmWeb3', tags: ['ai','healthcare','web3','saas'] },
          { name: 'PharmaCare', tags: ['healthcare','frontend'] },
          { name: 'PW3QA', tags: ['android','hybrid','webview'] },
          { name: 'Trading Labs', tags: ['ai','trading','forex','arbitrage'] },
          { name: 'Chess Game', tags: ['frontend','interactive'] }
        ];
        return projects.filter(project => project.tags.includes(String(capability).toLowerCase()));
      }
    }
  };
  return {
    get(name) { return definitions[name]; },
    list() {
      return Object.entries(definitions).map(([name,value]) => ({
        name, description:value.description,
        id:createHash('sha256').update(name).digest('hex').slice(0,12)
      }));
    }
  };
}
