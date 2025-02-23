"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Markdown from "react-markdown";

const API_KEY = "AIzaSyCK2BQA2qCN8JnGKZQU98hJovhyF82ogvE";
const MODEL = "gemini-1.5-pro";

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleGenerate = async () => {
    if (!input) return;
    setLoading(true);
    setResponse("");

    const prompt = `You are an AI finance assistant. Provide clear and structured responses for finance-related queries.\n\n**User Query:** ${input}`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          }),
        }
      );
      const data = await res.json();
      console.log("API Response:", data); // Debugging line
      setResponse(data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Failed to generate response. Check the console for details.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-6 bg-gray-100">
      <Card className="w-full max-w-4xl p-6 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-2xl text-center">DhanSetu AI - Finance Chatbot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex w-full gap-4">
            <Input
              type="text"
              placeholder="Ask something related to finance..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleGenerate} disabled={loading} className="bg-green-600 hover:bg-green-700">
              {loading ? "Generating..." : "Ask AI"}
            </Button>
          </div>
          {loading && <p className="text-center text-gray-500">Loading...</p>}
          {response && (
            <div className="p-4 border rounded-lg bg-gray-50">
              <Markdown>{response}</Markdown>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
