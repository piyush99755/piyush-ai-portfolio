"use client";

import { useState } from "react";
import { ChatInterface } from "./chat-interface";
import { JobFitInterface } from "./job-fit-interface";
import { Bot, UserCheck } from "lucide-react";

export function AskTabs() {
  const [activeTab, setActiveTab] = useState<"chat" | "job-fit">("chat");

  return (
    <div className="space-y-6">
      {/* Tab Selector */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-1.5 p-1.5 bg-card/60 border border-border/60 backdrop-blur rounded-2xl shadow-sm">
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "chat"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
            }`}
          >
            <Bot className="h-4 w-4" />
            <span>Ask Piyush AI</span>
          </button>

          <button
            onClick={() => setActiveTab("job-fit")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "job-fit"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
            }`}
          >
            <UserCheck className="h-4 w-4" />
            <span>Check Job Fit</span>
          </button>
        </div>
      </div>

      {/* Active Mode View */}
      {activeTab === "chat" ? <ChatInterface /> : <JobFitInterface />}
    </div>
  );
}
