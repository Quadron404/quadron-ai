import OpenAI from '@cloudflare/workers-ai';

export async function onRequestPost(context: any) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const userMessage = body.message || '';

    const client = new OpenAI({
      apiKey: env.OPENAI_API_KEY, // from Cloudflare Pages environment variable
    });

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are Quadron, a helpful AI assistant.' },
        { role: 'user', content: userMessage },
      ],
    });

    const reply = response.choices[0].message?.content || 'Sorry, something went wrong.';

    return new Response(JSON.stringify({ reply }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Chat Worker Error:', error);
    return new Response(JSON.stringify({ reply: 'Quadron is temporarily unavailable.' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}