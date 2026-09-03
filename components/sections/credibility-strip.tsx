import { Container } from "@/components/layout/container";
import { focusPillars } from "@/data/bio";
import { Bot, Cpu, Layers, Workflow } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Bot: <Bot className="h-6 w-6 text-primary" />,
  Layers: <Layers className="h-6 w-6 text-primary" />,
  Workflow: <Workflow className="h-6 w-6 text-primary" />,
  Cpu: <Cpu className="h-6 w-6 text-primary" />,
};

export function CredibilityStrip() {
  return (
    <section className="border-y border-border/40 bg-card/30 backdrop-blur py-10">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {focusPillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex items-start gap-4 p-4 rounded-lg bg-card/40 border border-border/40 hover:border-primary/30 transition-colors"
            >
              <div className="p-2 rounded-md bg-primary/10 shrink-0">
                {iconMap[pillar.iconName] || <Cpu className="h-6 w-6 text-primary" />}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {pillar.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-normal">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
