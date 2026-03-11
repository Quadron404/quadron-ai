const res = await fetch("/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ message: input })
});

const data = await res.json();
setMessages([...messages, { role: "ai", content: data.reply }]);