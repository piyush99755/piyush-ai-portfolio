import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bot, Sparkles, UserCheck } from "lucide-react";

export function AiTeaserSection() {
  return (
    <section className="py-16 border-b border-border/40 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <Container>
        <Card className="relative overflow-hidden border-primary/30 bg-card/70 backdrop-blur p-8 md:p-12">
          <div className="absolute top-0 right-0 h-40 w-40 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="text-primary border-primary/40 text-xs font-medium gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Portfolio AI Assistant
                </Badge>
                <Badge variant="secondary" className="text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Live Feature
                </Badge>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Intelligent Portfolio Assistant
              </h2>

              <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
                Try &ldquo;Ask Piyush AI&rdquo; to query engineering experience, project architectures, API integrations, and tech stack alignment in real time with grounded portfolio evidence.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/40">
                  <Bot className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">&ldquo;Ask Piyush&rdquo; AI Chatbot</h4>
                    <p className="text-xs text-muted-foreground">Interactive Q&A on projects, APIs, and background</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/40">
                  <UserCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Recruiter Job-Fit Analyzer</h4>
                    <p className="text-xs text-muted-foreground">Automated role & tech matching (Phase 5)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-4 lg:border-l lg:border-border/40 lg:pl-8">
              <Link href="/ask" className="w-full">
                <Button variant="default" className="w-full gap-2 font-medium">
                  <Bot className="h-4 w-4" />
                  Launch Ask Piyush AI
                </Button>
              </Link>
              <p className="text-[11px] text-muted-foreground font-mono">
                Grounded in canonical portfolio knowledge.
              </p>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}
