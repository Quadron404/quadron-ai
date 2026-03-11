export async function onRequestPost(context: any) {
  const { request } = context;

  const body = await request.json();
  const message = body.message || "";

  const replies = [
    "Fascinating input. Truly.",
    "I will pretend that made sense.",
    "Processing sarcasm...",
    "That might be the most human thing I've seen today.",
    "Let me guess... you want intelligence?"
  ];

  const reply = replies[Math.floor(Math.random() * replies.length)];

  return new Response(
    JSON.stringify({ reply }),
    {
      headers: { "Content-Type": "application/json" }
    }
  );
}