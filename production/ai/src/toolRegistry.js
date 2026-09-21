import { createHash } from 'node:crypto';

function arithmetic(expression) {
  const source=String(expression).replace(/\s+/g,'');
  if(!source||source.length>200||!/^[\d()+\-*/%.]+$/.test(source)) throw new Error('Unsafe arithmetic expression');
  let index=0;

  function peek(){return source[index]??'';}
  function consume(){return source[index++];}

  function parseExpression(){
    let value=parseTerm();
    while(peek()==='+'||peek()==='-'){
      const op=consume();
      const rhs=parseTerm();
      value=op==='+'?value+rhs:value-rhs;
    }
    return value;
  }

  function parseTerm(){
    let value=parseFactor();
    while(peek()==='*'||peek()==='/'||peek()==='%'){
      const op=consume();
      const rhs=parseFactor();
      if((op==='/'||op==='%')&&rhs===0)throw new Error('Division by zero');
      value=op==='*'?value*rhs:op==='/'?value/rhs:value%rhs;
    }
    return value;
  }

  function parseFactor(){
    if(peek()==='+'||peek()==='-'){
      const sign=consume()==='-'?-1:1;
      return sign*parseFactor();
    }
    if(peek()==='('){
      consume();
      const value=parseExpression();
      if(consume()!==')')throw new Error('Unbalanced parentheses');
      return value;
    }
    const start=index;
    while(/[\d.]/.test(peek()))consume();
    const token=source.slice(start,index);
    if(!token||token==='.')throw new Error('Invalid number');
    const value=Number(token);
    if(!Number.isFinite(value))throw new Error('Invalid number');
    return value;
  }

  const result=parseExpression();
  if(index!==source.length)throw new Error('Invalid arithmetic expression');
  return result;
}

export function createToolRegistry(){
  const definitions={
    calculator:{
      description:'Evaluate constrained arithmetic.',
      run:async({expression})=>({expression,result:arithmetic(expression)})
    },
    project_search:{
      description:'Search portfolio capabilities.',
      run:async({capability='ai'})=>{
        const projects=[
          {name:'PharmWeb3',tags:['ai','healthcare','web3','saas']},
          {name:'PharmaCare',tags:['healthcare','frontend']},
          {name:'PW3QA',tags:['android','hybrid','webview']},
          {name:'Trading Labs',tags:['ai','trading','forex','arbitrage']},
          {name:'Chess Game',tags:['frontend','interactive']}
        ];
        return projects.filter(project=>project.tags.includes(String(capability).toLowerCase()));
      }
    }
  };
  return {
    get(name){return definitions[name];},
    list(){
      return Object.entries(definitions).map(([name,value])=>({
        name,description:value.description,
        id:createHash('sha256').update(name).digest('hex').slice(0,12)
      }));
    }
  };
}
