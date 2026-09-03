"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage, ChatApiResponse } from "@/types/ai";
import { MessageItem } from "./message-item";
import { StarterPrompts } from "./starter-prompts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, Bot, Loader2, Send, Sparkles } from "lucide-react";

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || isLoading) return;

    setError(null);
    if (!textToSend) setInput("");

    const newHistory: ChatMessage[] = [
      ...messages,
      { role: "user", content: queryText },
    ];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: queryText,
          history: messages.slice(-6),
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error ${res.status}`);
      }

      const data: ChatApiResponse = await res.json();
      setMessages([
        ...newHistory,
        {
          role: "assistant",
          content: data.answer,
          sources: data.sources,
        },
      ]);
    } catch (err) {
      console.error("Chat Error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to connect to assistant."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card/40 border-border/60 backdrop-blur rounded-2xl flex flex-col h-[650px] max-h-[80vh] overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-border/40 flex items-center justify-between bg-card/60">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              Ask Piyush AI
              <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Grounded Assistant
              </span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Ask questions about Piyush&apos;s experience, skills, projects, and architecture.
            </p>
          </div>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center text-center space-y-6 max-w-lg mx-auto py-8">
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 text-primary">
              <Sparkles className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-foreground">
                Grounded Portfolio Intelligence
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Ask about AI voice receptionists, e-commerce automation hubs, RAG architectures, FastAPI/Python, or Next.js experience. Answers are strictly grounded in verified portfolio evidence.
              </p>
            </div>
            <StarterPrompts onSelectPrompt={(p) => handleSendMessage(p)} />
          </div>
        ) : (
          messages.map((msg, idx) => <MessageItem key={idx} message={msg} />)
        )}

        {isLoading && (
          <div className="flex gap-3 p-4 rounded-xl bg-card/70 border border-border/60 mr-12">
            <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 h-8 w-8 flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span>Searching canonical knowledge base & synthesizing grounded response...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3.5 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border/40 bg-card/60 space-y-3">
        {messages.length > 0 && (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMessages([])}
              className="text-[11px] text-muted-foreground hover:text-foreground h-7"
            >
              Clear Conversation
            </Button>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about Piyush's skills, projects, or experience..."
            disabled={isLoading}
            maxLength={500}
            className="flex-1 bg-background/80 border border-border/60 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            size="icon"
            className="rounded-xl h-10 w-10 shrink-0"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send Message</span>
          </Button>
        </form>
      </div>
    </Card>
  );
}
