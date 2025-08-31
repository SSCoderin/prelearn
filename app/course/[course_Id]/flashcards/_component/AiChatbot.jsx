"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, RefreshCw } from "lucide-react";

const AiChatbot = ({ gazeQuestion }) => {
  
  const [messages, setMessages] = useState([{ role: "ai", text: "Hi! I'm your AI assistant." }])   ;
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [pageText, setPageText] = useState("");

  useEffect(() => {
    const text = document.body.innerText;
    setPageText(text);
  }, []);

  

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
useEffect(() => {
    if (gazeQuestion) {
      setMessages([...messages,{ role: "ai", text: gazeQuestion }]);
    }
  }, [gazeQuestion]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chatai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: { previousmessage: messages, pagecontent : pageText,question: input },
        }),
      });

      const data = await response.json();
      console.log("AI response data:", data);
      setMessages((prev) => [...prev, { role: "ai", text: data.ans }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Sorry, I encountered an error. Please try again." },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 p-2 rounded-lg shadow-xl w-full max-w-2xl mx-auto border border-blue-200">
      <div className="flex items-center gap-2 ">
        <Bot className="text-blue-600 h-6 w-6" />
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          AI Assistant
        </h2>
      </div>
      
      <div className="h-96 overflow-y-auto scrollbar-hide bg-white bg-opacity-70 p-4 my-4 rounded-lg backdrop-blur-sm border border-blue-200 shadow-inner">
        {messages.length === 0 ? (
          <div className="flex flex-col h-full items-center justify-center text-gray-500 space-y-2">
            <Bot className="h-12 w-12 text-blue-500 opacity-70 animate-pulse" />
            <p className="text-center">Ask me anything...</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 my-2 rounded-lg shadow-md max-w-[85%] ${
                msg.role === "user"
                  ? "bg-blue-500 text-white ml-auto rounded-tr-none"
                  : "bg-indigo-100 text-gray-800 mr-auto rounded-tl-none"
              } animate-fadeIn`}
            >
              <div className={`text-sm mb-1 ${msg.role === "user" ? "text-blue-100" : "text-indigo-500"}`}>
                {msg.role === "user" ? "You" : "AI Assistant"}
              </div>
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex items-center gap-2 p-3 my-2 rounded-lg bg-indigo-100 text-gray-700 max-w-[85%] animate-fadeIn">
            <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
            <span>Generating response...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="flex gap-2 items-center bg-white bg-opacity-70 p-2 rounded-lg border border-blue-200">
        <textarea
          className="flex-1 p-2 rounded bg-white border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none h-10 max-h-32 overflow-y-auto scrollbar-hide"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          style={{ minHeight: "40px" }}
        />
        <button
          className={`p-2 rounded-full ${
            !input.trim() || loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200 shadow-lg hover:shadow-blue-500/30"
          }`}
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
      
      </div>  );
};

export default AiChatbot;