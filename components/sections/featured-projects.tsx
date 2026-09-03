import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";
import { projectsData } from "@/data/projects";
import { ArrowRight, FolderKanban } from "lucide-react";

export function FeaturedProjectsSection() {
  const featuredProjects = projectsData.filter((p) => p.featured);

  return (
    <section id="projects" className="py-20 border-b border-border/40 bg-card/10">
      <Container className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <Badge variant="outline" className="text-primary border-primary/40 text-xs font-medium gap-1.5">
              <FolderKanban className="h-3.5 w-3.5" />
              Featured Engineering Projects
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              AI Systems, Full-Stack SaaS & Automation Hubs
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Production-grade applications and intelligent workflow systems engineered with modern web stacks, RAG pipelines, and third-party APIs.
            </p>
          </div>

          <Link href="/projects">
            <Button variant="outline" className="gap-2 shrink-0">
              View All Projects <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
