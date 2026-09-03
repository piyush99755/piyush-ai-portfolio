import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { bioData } from "@/data/bio";
import { Server, Terminal, Zap } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 border-b border-border/40">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Badge variant="outline" className="text-primary border-primary/40 text-xs font-medium">
              About Piyush
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Architecting Production AI Systems & Full-Stack Applications
            </h2>

            <p className="text-muted-foreground leading-relaxed">
              {bioData.longBio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-primary/10 text-primary mt-1">
                  <Server className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Backend & APIs</h4>
                  <p className="text-xs text-muted-foreground">Express, FastAPI, Node.js, Python REST APIs</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-primary/10 text-primary mt-1">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Voice & RAG AI</h4>
                  <p className="text-xs text-muted-foreground">Retell AI, Twilio, RAG pipelines, LLM services</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <Card className="bg-card/60 backdrop-blur border-border/60 p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-primary" />
                  <span className="font-mono text-sm font-semibold">engineering_principles.json</span>
                </div>
                <Badge variant="secondary" className="text-[10px]">Production Standard</Badge>
              </div>

              <div className="space-y-4 text-xs font-mono text-muted-foreground">
                <div className="space-y-1">
                  <span className="text-primary font-semibold">{"// 1. Architecture Strategy"}</span>
                  <p className="text-foreground/90 pl-4 border-l border-primary/30">
                    Modular code separation between UI primitives, business services, and database layers.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-primary font-semibold">{"// 2. API & Integration Reliability"}</span>
                  <p className="text-foreground/90 pl-4 border-l border-primary/30">
                    Robust error boundaries, webhook validation, and explicit type checking across boundaries.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-primary font-semibold">{"// 3. Performance & DX"}</span>
                  <p className="text-foreground/90 pl-4 border-l border-primary/30">
                    Server Components by default, optimized assets, clean bundle size, and strict TypeScript types.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
