import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skillCategories, skillsData } from "@/data/skills";
import { Cpu } from "lucide-react";

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 border-b border-border/40">
      <Container className="space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-primary border-primary/40 text-xs font-medium">
            Core Competencies
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Technologies & Engineering Capabilities
          </h2>
          <p className="text-muted-foreground text-sm">
            Categorized production stack and software engineering skills aligned with real portfolio projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => {
            const categorySkills = skillsData.filter(
              (skill) => skill.category === category.name
            );

            if (categorySkills.length === 0) return null;

            return (
              <Card
                key={category.id}
                className="bg-card/50 backdrop-blur border-border/60 flex flex-col justify-between hover:border-primary/40 transition-colors"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-primary shrink-0" />
                    {category.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {category.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-2 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <Badge
                        key={skill.name}
                        variant="secondary"
                        className="bg-secondary/70 text-secondary-foreground text-xs py-1 px-2.5 font-normal flex items-center gap-1.5"
                      >
                        <span>{skill.name}</span>
                        {skill.level && (
                          <span className="text-[10px] text-muted-foreground/80 font-mono">
                            • {skill.level}
                          </span>
                        )}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
