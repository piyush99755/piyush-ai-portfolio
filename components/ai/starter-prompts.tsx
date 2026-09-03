import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface StarterPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const STARTER_PROMPTS = [
  "Which projects best demonstrate AI engineering?",
  "Does Piyush have experience with Twilio?",
  "Tell me about his backend experience.",
  "What has he built with n8n?",
  "Explain his RAG experience.",
  "Does Piyush know Kubernetes?",
];

export function StarterPrompts({ onSelectPrompt }: StarterPromptsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        <span>Suggested starter questions:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {STARTER_PROMPTS.map((prompt) => (
          <Button
            key={prompt}
            variant="outline"
            size="sm"
            onClick={() => onSelectPrompt(prompt)}
            className="text-xs border-border/60 hover:border-primary/40 bg-card/40 transition-colors"
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
}
