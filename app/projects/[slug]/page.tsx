import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { projectsData } from "@/data/projects";
import { ArrowLeft, CheckCircle2, Cpu, Sparkles } from "lucide-react";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Piyush Tadvi",
    };
  }

  return {
    title: `${project.title} | Piyush Tadvi Portfolio`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <Container className="py-16 space-y-10 max-w-4xl">
      <Link href="/projects">
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Button>
      </Link>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-primary/40 text-primary">
            {project.category}
          </Badge>
          <Badge variant="secondary">{project.status}</Badge>
          <Badge variant="outline" className="font-mono text-xs">
            {project.projectType}
          </Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          {project.title}
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed">
          {project.shortDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 space-y-6">
          <Card className="bg-card/60 backdrop-blur border-border/60 p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Project Overview
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.longDescription || project.shortDescription}
            </p>

            <div className="pt-4 border-t border-border/40 space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Key Technical Highlights</h3>
              <ul className="space-y-2 text-xs text-foreground/90">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.responsibilities && project.responsibilities.length > 0 && (
              <div className="pt-4 border-t border-border/40 space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Engineering Responsibilities</h3>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {project.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary font-mono">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        </div>

        <div className="md:col-span-4 space-y-6">
          <Card className="bg-card/60 backdrop-blur border-border/60 p-6 space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
              <Cpu className="h-4 w-4 text-primary" />
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-secondary/80 text-secondary-foreground text-xs"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="pt-4 border-t border-border/40 space-y-2">
              <Badge variant="outline" className="w-full justify-center text-[10px] py-1 border-primary/30 text-primary">
                Detailed Case Study Phase 3 Preview
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}
