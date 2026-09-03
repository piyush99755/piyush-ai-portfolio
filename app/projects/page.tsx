import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/projects/project-card";
import { projectsData } from "@/data/projects";
import { FolderKanban } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Piyush Tadvi Portfolio",
  description:
    "Explore AI-powered SaaS products, automation hubs, voice receptionist platforms, and RAG systems built by Piyush Tadvi.",
};

export default function ProjectsPage() {
  return (
    <Container className="py-16 space-y-12">
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <Badge variant="outline" className="text-primary border-primary/40 text-xs font-medium gap-1.5">
          <FolderKanban className="h-3.5 w-3.5" />
          Projects Index
        </Badge>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Engineering Case Studies & Products
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Production systems, AI integrations, voice agents, and full-stack automation platforms. Select any project to inspect its architecture blueprint.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Container>
  );
}
