"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RagChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });
      const data = await response.json();

      setMessages((prev) => [...prev, { role: "bot", content: data.answer }]);
    } catch (error) {
      console.error("Error fetching RAG response:", error);
      setMessages((prev) => [...prev, { role: "bot", content: "Error fetching response." }]);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-lg p-4">
      <div className="h-64 overflow-y-auto border-b p-2">
        {messages.map((msg, index) => (
          <div key={index} className={`my-2 p-2 rounded ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="flex mt-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Besoin d'aide ?"
        />
        <Button onClick={handleSendMessage} className="ml-2">Envoyer</Button>
      </div>
    </div>
  );
};

export default RagChat;
