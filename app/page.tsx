"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, "You: " + input]);

    // Temporary placeholder response
    setMessages(prev => [...prev, "You: " + input, "Quadron: Processing sarcasm..."]);

    setInput("");
  };

  return (
    <div style={{
      backgroundColor: "black",
      color: "yellow",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      fontFamily: "Arial"
    }}>

      {/* Header */}
      <div style={{
        padding: "15px",
        borderBottom: "2px solid yellow",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1 style={{fontSize:"24px"}}>Quadron</h1>

        <div>
          <button style={{
            background:"yellow",
            color:"black",
            border:"none",
            padding:"8px 14px",
            marginRight:"10px",
            cursor:"pointer"
          }}>
            Login
          </button>

          <button style={{
            background:"yellow",
            color:"black",
            border:"none",
            padding:"8px 14px",
            cursor:"pointer"
          }}>
            Quadron-71
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div style={{
        flex:1,
        overflowY:"auto",
        padding:"20px"
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{marginBottom:"10px"}}>
            {msg}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div style={{
        borderTop:"2px solid yellow",
        padding:"10px",
        display:"flex"
      }}>
        <input
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          placeholder="Ask Quadron something..."
          style={{
            flex:1,
            padding:"10px",
            background:"black",
            color:"yellow",
            border:"1px solid yellow",
            outline:"none"
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            marginLeft:"10px",
            background:"yellow",
            color:"black",
            border:"none",
            padding:"10px 16px",
            cursor:"pointer"
          }}
        >
          Send
        </button>
      </div>

    </div>
  );
}