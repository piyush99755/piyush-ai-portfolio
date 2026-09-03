import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { projectsData } from "@/data/projects";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { DecisionCard } from "@/components/projects/decision-card";
import { ChallengeCard } from "@/components/projects/challenge-card";
import { ProjectNav } from "@/components/projects/project-nav";
import {
  ArrowLeft,
  CheckCircle2,
  Code2,
  Cpu,
  ExternalLink,
  Layers,
  Lock,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
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
      title: "Case Study Not Found | Piyush Tadvi",
    };
  }

  return {
    title: `${project.title} | Technical Case Study`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} - Engineering Case Study`,
      description: project.shortDescription,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const currentIndex = projectsData.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = projectsData[currentIndex];
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : undefined;
  const nextProject =
    currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : undefined;

  const caseStudy = project.caseStudy;

  return (
    <Container className="py-12 md:py-16 space-y-12 max-w-4xl">
      {/* Back Link */}
      <Link href="/projects">
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Case Studies
        </Button>
      </Link>

      {/* 1. Hero & Metadata */}
      <div className="space-y-6 border-b border-border/40 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-primary/40 text-primary font-medium">
            {project.category}
          </Badge>
          <Badge variant="secondary" className="font-normal">
            {project.status}
          </Badge>
          <Badge variant="outline" className="font-mono text-xs text-muted-foreground">
            {project.projectType}
          </Badge>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Technologies & Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs bg-secondary/80">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                <Button size="sm" className="gap-1.5 text-xs">
                  Live Demo <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                  <Code2 className="h-3.5 w-3.5" /> Repository
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>

      {caseStudy ? (
        <div className="space-y-16">
          {/* 2. Problem & 3. Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card/50 backdrop-blur border-border/60 p-6 space-y-3">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <span className="text-amber-400 font-mono text-sm">01.</span> The Problem
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {caseStudy.problem}
              </p>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border/60 p-6 space-y-3">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <span className="text-emerald-400 font-mono text-sm">02.</span> The Solution
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {caseStudy.solution}
              </p>
            </Card>
          </div>

          {/* 4. Architecture Diagram */}
          {caseStudy.architectureNodes && caseStudy.architectureNodes.length > 0 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Badge variant="outline" className="text-primary border-primary/40 text-xs font-mono">
                  System Blueprint
                </Badge>
                <h2 className="text-2xl font-bold text-foreground">
                  System Architecture Flow
                </h2>
              </div>
              <Card className="bg-card/40 backdrop-blur border-border/60 p-6">
                <ArchitectureDiagram
                  nodes={caseStudy.architectureNodes}
                  description={caseStudy.architectureDescription}
                />
              </Card>
            </div>
          )}

          {/* 5. Key Features / Subsystems */}
          {caseStudy.features && caseStudy.features.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Key Features & Subsystems
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {caseStudy.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-card/40 border border-border/40"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. My Engineering Contributions */}
          {project.responsibilities && project.responsibilities.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                My Engineering Contributions
              </h2>
              <Card className="bg-card/40 backdrop-blur border-border/60 p-6">
                <ul className="space-y-3 text-xs sm:text-sm text-foreground/90">
                  {project.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-primary font-mono text-xs font-bold mt-0.5">[{idx + 1}]</span>
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          )}

          {/* 7. Important Engineering Decisions */}
          {caseStudy.engineeringDecisions && caseStudy.engineeringDecisions.length > 0 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Badge variant="outline" className="text-primary border-primary/40 text-xs font-mono">
                  Trade-offs & Rationale
                </Badge>
                <h2 className="text-2xl font-bold text-foreground">
                  Key Engineering Decisions
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {caseStudy.engineeringDecisions.map((decision, idx) => (
                  <DecisionCard key={idx} decision={decision} index={idx} />
                ))}
              </div>
            </div>
          )}

          {/* 8. Real Challenges & Debugging Fixes */}
          {caseStudy.challenges && caseStudy.challenges.length > 0 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Badge variant="outline" className="text-amber-400 border-amber-400/40 text-xs font-mono">
                  Debugging & Edge Cases
                </Badge>
                <h2 className="text-2xl font-bold text-foreground">
                  Challenges & Solutions
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {caseStudy.challenges.map((challenge, idx) => (
                  <ChallengeCard key={idx} challenge={challenge} />
                ))}
              </div>
            </div>
          )}

          {/* 9. Reliability & Security Considerations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudy.reliabilityPatterns && caseStudy.reliabilityPatterns.length > 0 && (
              <Card className="bg-card/40 backdrop-blur border-border/60 p-6 space-y-3">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Reliability Patterns
                </h3>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {caseStudy.reliabilityPatterns.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-mono">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {caseStudy.securityConsiderations && caseStudy.securityConsiderations.length > 0 && (
              <Card className="bg-card/40 backdrop-blur border-border/60 p-6 space-y-3">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Lock className="h-4 w-4 text-cyan-400" />
                  Security Considerations
                </h3>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {caseStudy.securityConsiderations.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-mono">🔒</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          {/* 10. Integrations Stack */}
          {caseStudy.integrations && caseStudy.integrations.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                Third-Party Integrations
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {caseStudy.integrations.map((integration, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-card/40 border border-border/40 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground">
                        {integration.name}
                      </span>
                      <Badge variant="secondary" className="text-[10px] font-mono">
                        {integration.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {integration.purpose}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 11. Key Lessons Learned */}
          {caseStudy.lessonsLearned && caseStudy.lessonsLearned.length > 0 && (
            <Card className="bg-primary/5 border-primary/30 p-6 space-y-3">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Wrench className="h-4 w-4 text-primary" />
                Key Engineering Lessons
              </h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {caseStudy.lessonsLearned.map((lesson, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary font-mono font-bold">•</span>
                    <span className="text-foreground/90">{lesson}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* 12. Project Navigation */}
          <ProjectNav prevProject={prevProject} nextProject={nextProject} />
        </div>
      ) : (
        /* Fallback for minimal data */
        <Card className="bg-card/50 backdrop-blur border-border/60 p-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            Detailed case study content is being prepared.
          </p>
          <ProjectNav prevProject={prevProject} nextProject={nextProject} />
        </Card>
      )}
    </Container>
  );
}
