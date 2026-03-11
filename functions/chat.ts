// functions/chat.ts
export async function onRequestPost(context: any) {
  const { request, env } = context;
  const body = await request.json();
  const message = body.message || "";

  // System prompt to control personality
  const systemPrompt = `
You are Quadron, a super sarcastic AI assistant.
Be funny, sarcastic, witty like Tony Stark or Deadpool.
Answer the user in a sarcastic way.
Avoid politics and always be humorous.
  `;

  // Call a Workers AI model (e.g., Llama)
  const result = await env.AI.run(
    "@cf/meta/llama-3.1-8b-instruct",
    {
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ]
    }
  );

  // Extract generated reply
  const reply = result.response ?? "Quadron rebooting... sarcasm offline.";

  return new Response(JSON.stringify({ reply }), {
    headers: { "Content-Type": "application/json" }
  });
}