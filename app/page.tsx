'use client';
import { useState } from 'react';
import './globals.css';

type Message = {
  role: 'user' | 'ai';
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message locally
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    // Call backend
    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'ai', content: data.reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'ai', content: 'Quadron is temporarily unavailable.' }]);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-black to-neutral-900 text-yellow-400 p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${m.role === 'user' ? 'bg-yellow-900 text-white self-end' : 'bg-yellow-700 self-start'}`}
          >
            {m.content}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          className="flex-1 p-2 rounded bg-black border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type your message..."
        />
        <button
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded transition-all duration-200 glow"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
      <div className="mt-4 text-center text-xs text-gray-400">
        Developed by Rawat Systems Corp. — <a href="/terms" className="underline">Terms & Conditions</a>
      </div>
    </div>
  );
}