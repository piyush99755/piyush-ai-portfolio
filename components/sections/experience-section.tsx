import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { experienceData } from "@/data/experience";
import { Briefcase, CheckCircle2 } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 border-b border-border/40">
      <Container className="space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-primary border-primary/40 text-xs font-medium gap-1.5">
            <Briefcase className="h-3.5 w-3.5" />
            Engineering Focus & Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            What I Work On
          </h2>
          <p className="text-muted-foreground text-sm">
            Core technical domains and production engineering focus areas across full-stack and AI software development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experienceData.map((item, idx) => (
            <Card key={idx} className="bg-card/50 backdrop-blur border-border/60 flex flex-col justify-between">
              <CardHeader className="space-y-2">
                <Badge variant="secondary" className="w-fit text-[11px] font-mono">
                  {item.focusArea}
                </Badge>
                <CardTitle className="text-xl font-bold text-foreground">
                  {item.role}
                </CardTitle>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.summary}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2 pt-2 border-t border-border/40">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                    Key Deliverables
                  </p>
                  <ul className="space-y-1.5 text-xs text-foreground/90">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3">
                  {item.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="border-border text-[10px] text-muted-foreground"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
