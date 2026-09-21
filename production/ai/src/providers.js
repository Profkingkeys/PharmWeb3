import { askModel } from '../../../labs/ai-agent/src/providers/openaiCompatible.js';

export function localProvider(toolRegistry) {
  return {
    name:'local-deterministic',
    async complete({ input }) {
      const text=String(input);
      if (/calculate|math|sum|plus|minus|multiply|divide/i.test(text)) {
        const expression=text.replace(/[^0-9+\-*/().%\s]/g,'');
        return {
          mode:'tool',
          tool:'calculator',
          args:{expression},
          result:await toolRegistry.get('calculator').run({expression})
        };
      }
      const capability=text.match(/(?:frontend|healthcare|ai|android|hybrid|trading|fastapi|interactive|forex|web3|saas)/i)?.[0] ?? 'ai';
      return {
        mode:'tool',
        tool:'project_search',
        args:{capability},
        result:await toolRegistry.get('project_search').run({capability})
      };
    }
  };
}

export function openAICompatibleProvider({name,apiKey,baseUrl,model},toolRegistry) {
  return {
    name,
    async complete({input}) {
      const result=await askModel({
        apiKey,baseUrl,model,
        system:'You are a tool-routing evaluator. Return strict JSON with mode, tool and args. Use calculator for arithmetic and project_search for portfolio capability discovery.',
        user:input
      });
      if (!result.tool) return result;
      const tool=toolRegistry.get(result.tool);
      if (!tool) throw new Error('Model selected an unregistered tool');
      const toolResult=await tool.run(result.args ?? {});
      return {...result,result:toolResult};
    }
  };
}

export function configuredProviders(toolRegistry,env=process.env) {
  const providers=[localProvider(toolRegistry)];
  if (env.OPENAI_API_KEY) {
    providers.push(openAICompatibleProvider({
      name:'openai-compatible',
      apiKey:env.OPENAI_API_KEY,
      baseUrl:env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1',
      model:env.OPENAI_MODEL ?? 'gpt-4.1-mini'
    },toolRegistry));
  }
  if (env.GROQ_API_KEY) {
    providers.push(openAICompatibleProvider({
      name:'groq-compatible',
      apiKey:env.GROQ_API_KEY,
      baseUrl:env.GROQ_BASE_URL ?? 'https://api.groq.com/openai/v1',
      model:env.GROQ_MODEL ?? 'llama-3.3-70b-versatile'
    },toolRegistry));
  }
  return providers;
}
