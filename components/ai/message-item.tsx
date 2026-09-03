import { ChatMessage } from "@/types/ai";
import { SourceBadge } from "./source-badge";
import { Bot, User } from "lucide-react";

interface MessageItemProps {
  message: ChatMessage;
}

export function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-3 sm:gap-4 p-4 rounded-xl transition-colors ${
        isUser
          ? "bg-secondary/40 border border-border/40 ml-6 sm:ml-12"
          : "bg-card/70 border border-border/60 backdrop-blur mr-6 sm:mr-12"
      }`}
    >
      <div
        className={`p-2 rounded-lg h-8 w-8 flex items-center justify-center shrink-0 mt-0.5 ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-primary/10 text-primary border border-primary/20"
        }`}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      <div className="space-y-3 flex-1 overflow-hidden">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>{isUser ? "You" : "Ask Piyush AI"}</span>
        </div>

        <div className="text-xs sm:text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed space-y-2">
          {message.content}
        </div>

        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="pt-2 border-t border-border/40 space-y-1.5">
            <span className="text-[11px] font-mono text-muted-foreground font-medium block">
              Verified Portfolio Sources:
            </span>
            <div className="flex flex-wrap gap-2">
              {message.sources.map((source, idx) => (
                <SourceBadge key={idx} source={source} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
