export async function onRequest(context: any) {

  if (context.request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const body = await context.request.json();
  const message = body.message || "";

  const replies = [
    "Fascinating input. Truly.",
    "Processing sarcasm...",
    "Humans continue to confuse me.",
    "I will pretend that made sense.",
    "Intelligence not detected."
  ];

  const reply = replies[Math.floor(Math.random() * replies.length)];

  return new Response(
    JSON.stringify({ reply }),
    {
      headers: { "Content-Type": "application/json" }
    }
  );
}