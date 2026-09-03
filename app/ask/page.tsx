import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { ChatInterface } from "@/components/ai/chat-interface";
import { Bot } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask Piyush AI — Grounded Portfolio Assistant",
  description:
    "Ask natural-language questions about Piyush's engineering experience, skills, projects, and architecture decisions with verified portfolio evidence.",
  openGraph: {
    title: "Ask Piyush AI — Grounded Portfolio Assistant",
    description:
      "Interactive AI assistant for exploring Piyush's full-stack and AI software engineering portfolio.",
  },
};

export default function AskPage() {
  return (
    <Container className="py-12 md:py-16 space-y-8 max-w-4xl">
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <Badge
          variant="outline"
          className="gap-1.5 px-3 py-1 text-xs border-primary/40 text-primary font-medium"
        >
          <Bot className="h-3.5 w-3.5" />
          Interactive Portfolio AI
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Ask Piyush AI
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Query Piyush&apos;s verified engineering background, tech stack, project case studies, and architecture decisions. Grounded strictly in canonical portfolio data.
        </p>
      </div>

      <ChatInterface />
    </Container>
  );
}
