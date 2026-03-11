"use client";

import { useState } from "react";

export default function Home() {

  const [messages, setMessages] = useState<{role:string,content:string}[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {

      const res = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();

      const aiMessage = { role: "ai", content: data.reply };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {

      setMessages(prev => [
        ...prev,
        { role: "ai", content: "Quadron is unavailable temporarily." }
      ]);

    }

    setLoading(false);
  };

  return (

    <div className="flex flex-col h-screen bg-black text-yellow-400">

      <div className="p-4 text-xl border-b border-yellow-500">
        Quadron AI
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {messages.map((msg, i) => (

          <div key={i} className={msg.role === "user" ? "text-right" : "text-left"}>
            <span className="inline-block bg-neutral-800 p-2 rounded">
              {msg.content}
            </span>
          </div>

        ))}

        {loading && (
          <div>Quadron is thinking...</div>
        )}

      </div>

      <div className="p-4 border-t border-yellow-500 flex gap-2">

        <input
          className="flex-1 bg-neutral-900 p-2 rounded"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          onKeyDown={(e)=>{ if(e.key==="Enter") sendMessage(); }}
          placeholder="Ask Quadron something..."
        />

        <button
          onClick={sendMessage}
          className="bg-yellow-500 text-black px-4 rounded"
        >
          Send
        </button>

      </div>

      <div className="text-xs text-center p-2 text-neutral-500">
        Developed by Rawat Systems Corp. By using this you agree our Terms & Conditions
      </div>

    </div>

  );
}