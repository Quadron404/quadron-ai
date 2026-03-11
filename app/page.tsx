"use client";

import { useState } from "react";

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
      { role: "ai", content: "Processing sarcasm..." },
    ];

    setMessages(newMessages);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-black text-yellow-400">

      {/* Top bar */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-yellow-500">
        <h1 className="text-2xl font-bold tracking-wide">Quadron</h1>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition">
            Login
          </button>

          <button className="px-4 py-2 border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition">
            Quadron-71
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">

        {messages.length === 0 && (
          <div className="text-center text-yellow-500 opacity-70 mt-20">
            Ask Quadron something...
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xl p-3 rounded-xl ${
              msg.role === "user"
                ? "ml-auto bg-yellow-400 text-black"
                : "bg-neutral-900 border border-yellow-500"
            }`}
          >
            {msg.content}
          </div>
        ))}

      </div>

      {/* Input area */}
      <div className="border-t border-yellow-500 p-4 flex gap-3">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Quadron..."
          className="flex-1 bg-neutral-900 border border-yellow-500 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <button
          onClick={sendMessage}
          className="bg-yellow-400 text-black px-6 rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          Send
        </button>

      </div>

    </div>
  );
}