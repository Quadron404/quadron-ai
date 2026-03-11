export async function onRequest(context: any) {

  if (context.request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const { message } = await context.request.json();

  const replies = [
    "Fascinating input.",
    "Processing sarcasm...",
    "Humans continue to confuse me.",
    "That might require intelligence.",
    "Input acknowledged."
  ];

  const reply = replies[Math.floor(Math.random() * replies.length)];

  return new Response(
    JSON.stringify({ reply }),
    { headers: { "Content-Type": "application/json" } }
  );
}