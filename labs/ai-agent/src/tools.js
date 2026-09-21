export const tools = {
  calculator: {
    description: 'Evaluate a safe arithmetic expression.',
    run: async ({ expression }) => {
      if (!/^[0-9+\-*/().%\s]+$/.test(expression)) throw new Error('Unsafe expression');
      return { expression, result: Function('"use strict"; return (' + expression + ')')() };
    }
  },
  project_search: {
    description: 'Find portfolio projects by capability.',
    run: async ({ capability }) => {
      const projects = [
        { name:'PharmaCare', tags:['frontend','healthcare'] },
        { name:'PW3QA', tags:['android','webview','hybrid'] },
        { name:'PharmWeb3 AI API', tags:['ai','fastapi'] },
        { name:'Chess Game', tags:['frontend','interactive'] },
        { name:'Trading Labs', tags:['ai','trading','automation'] }
      ];
      return projects.filter(p => p.tags.includes(String(capability).toLowerCase()));
    }
  }
};
