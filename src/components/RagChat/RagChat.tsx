"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Helper function to wrap the fetch request with a timeout
const fetchWithTimeout = (url: string, options: RequestInit, timeout: number) => {
  return new Promise<Response>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Request timed out")), timeout);

    fetch(url, options)
      .then((response) => {
        clearTimeout(timer); // Clear the timeout if the request succeeds
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timer); // Clear the timeout if the request fails
        reject(error);
      });
  });
};

const RagChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    // Prevent sending empty messages
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Clear input and set loading state
    setInput("");
    setLoading(true);

    // Prepare the data as a JSON object
    const requestData = {
      userId: "86f6d1e6-78d3-409a-bc99-7c03df8d5aaf", // userId
      prompt: input, // the message content
    };

    try {
      const response = await fetchWithTimeout("http://localhost:3003/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Send JSON content type
        },
        body: JSON.stringify(requestData), // Send JSON data
      }, 30000); // Set timeout to 30 seconds

      // Handle the response
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Extract the last element's response output (if available)
      const lastResponse = data?.message?.pop(); // Get the last message in the array
      const botResponse = lastResponse?.response?.output || "No response available."; // Get the 'output' field

      // Add the bot's response to the messages
      setMessages((prev) => [...prev, { role: "bot", content: botResponse }]);
    } catch (error) {
      console.error("Error fetching RAG response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: error.message || "Error fetching response." },
      ]);
    } finally {
      setLoading(false); // Always reset loading state
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-lg p-4">
      <div className="h-64 overflow-y-auto border-b p-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-2 rounded ${
              msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
            }`}
          >
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
        <Button onClick={handleSendMessage} className="ml-2" disabled={loading}>
          {loading ? "Sending..." : "Envoyer"}
        </Button>
      </div>
    </div>
  );
};

export default RagChat;
