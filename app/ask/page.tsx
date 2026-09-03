import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { AskTabs } from "@/components/ai/ask-tabs";
import { Bot } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask Piyush AI & Job-Fit Analyzer",
  description:
    "Ask natural-language questions about Piyush's engineering experience or paste a job description to perform a grounded technical alignment analysis.",
  openGraph: {
    title: "Ask Piyush AI & Job-Fit Analyzer",
    description:
      "Interactive AI assistant & recruiter job-fit analyzer for Piyush's software engineering portfolio.",
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
          Interactive Portfolio Intelligence
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Ask Piyush AI &amp; Job Fit
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Ask natural-language questions about Piyush&apos;s background or paste a job description to inspect candidate alignment against verified portfolio evidence.
        </p>
      </div>

      <AskTabs />
    </Container>
  );
}
