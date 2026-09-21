export async function askModel({apiKey, baseUrl='https://api.openai.com/v1', model='gpt-4.1-mini', system, user}) {
  if (!apiKey) throw new Error('Missing AI API key');
  const response = await fetch(`${baseUrl.replace(/\/$/,'')}/chat/completions`, {
    method:'POST',
    headers:{'content-type':'application/json','authorization':`Bearer ${apiKey}`},
    body:JSON.stringify({model,messages:[{role:'system',content:system},{role:'user',content:user}],temperature:0.1,response_format:{type:'json_object'}})
  });
  if (!response.ok) throw new Error(`Model request failed: ${response.status}`);
  const data = await response.json();
  return JSON.parse(data.choices?.[0]?.message?.content ?? '{}');
}
