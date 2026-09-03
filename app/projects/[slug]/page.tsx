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
import { ProjectThumbnail } from "@/components/projects/project-thumbnail";
import { ProjectGallery, type GalleryItem } from "@/components/projects/project-gallery";
import {
  ArrowLeft,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Lock,
  Route,
  Server,
  ShieldCheck,
  Sparkles,
  TestTube,
  UserCheck,
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

function getProjectGalleryItems(slug: string): GalleryItem[] {
  if (slug === "myfelipe-ai-receptionist") {
    return [
      {
        src: "/projects/myfelipe/01-sms-reliability-case-study.png",
        alt: "MyFelipe smsProvider architectural case study surfacing truthful SMS delivery results without silent fallback masking",
        caption: "Booking-Link SMS Reliability Case Study",
        category: "Reliability Engineering",
      },
      {
        src: "/projects/myfelipe/02-prospecting-leads-dashboard.png",
        alt: "MyFelipe AI prospecting leads dashboard displaying lead qualification scores and review actions",
        caption: "AI Prospecting Leads Dashboard",
        category: "Lead Pipeline",
      },
      {
        src: "/projects/myfelipe/03-prospecting-leads-results.png",
        alt: "MyFelipe qualified lead review pipeline displaying caller transcripts and lead statuses",
        caption: "Qualified Lead Review Pipeline",
        category: "Lead Pipeline",
      },
      {
        src: "/projects/myfelipe/04-prospecting-run-configuration.png",
        alt: "MyFelipe prospecting run configuration panel for configuring Groq LLM lead scoring thresholds",
        caption: "Prospecting Run Configuration",
        category: "AI Scoring Setup",
      },
      {
        src: "/projects/myfelipe/05-marketing-control-center.png",
        alt: "MyFelipe agentic marketing control center managing automated social media publishing campaigns",
        caption: "Agentic Marketing Control Center",
        category: "Automation",
      },
    ];
  }

  if (slug === "ai-ecommerce-automation-hub") {
    return [
      {
        src: "/projects/ecommerce-hub/01-operations-dashboard.png",
        alt: "AI E-commerce Operations Hub main dashboard displaying system status and order metrics",
        caption: "Operations Dashboard",
        category: "Operations Center",
      },
      {
        src: "/projects/ecommerce-hub/02-inventory-operations.png",
        alt: "AI E-commerce Hub inventory operations view showing stock levels and item quantities",
        caption: "Inventory & Stock Operations",
        category: "Inventory Management",
      },
      {
        src: "/projects/ecommerce-hub/03-automation-reliability.png",
        alt: "AI E-commerce Hub automation reliability monitor tracking background process execution",
        caption: "Automation Reliability",
        category: "Workflow Engine",
      },
      {
        src: "/projects/ecommerce-hub/04-grounded-ai-support.png",
        alt: "AI E-commerce Hub grounded AI support interface answering customer inquiries",
        caption: "Grounded AI Customer Support",
        category: "AI Service",
      },
      {
        src: "/projects/ecommerce-hub/05-admin-ai-copilot.png",
        alt: "AI E-commerce Hub admin AI copilot interface providing operator safeguards and actions",
        caption: "Human-in-the-Loop Admin Copilot",
        category: "Operator Safeguards",
      },
      {
        src: "/projects/ecommerce-hub/06-customer-crm.png",
        alt: "AI E-commerce Hub customer CRM view displaying customer order history and contact details",
        caption: "Customer Operations CRM",
        category: "Customer Data",
      },
      {
        src: "/projects/ecommerce-hub/07-admin-audit-trail.png",
        alt: "AI E-commerce Hub administrative audit log tracking system events and order activities",
        caption: "Administrative Audit Trail",
        category: "Governance & Security",
      },
      {
        src: "/projects/ecommerce-hub/08-analytics-bi.png",
        alt: "AI E-commerce Hub analytics dashboard showing revenue trends and product sales",
        caption: "Business Intelligence & Analytics",
        category: "Analytics & BI",
      },
    ];
  }

  if (slug === "career-copilot-ai") {
    return [
      {
        src: "/projects/career-copilot/01-career-analysis.png",
        alt: "Career Copilot AI career analysis interface showing matched skills and role recommendations",
        caption: "AI Career Analysis",
        category: "Career Insights",
      },
      {
        src: "/projects/career-copilot/02-resume-match-analysis.png",
        alt: "Career Copilot AI resume-to-job match breakdown displaying skill coverage",
        caption: "Resume-to-Job Match Analysis",
        category: "Match Engine",
      },
      {
        src: "/projects/career-copilot/03-career-chat.png",
        alt: "Career Copilot AI interactive chat interface delivering grounded career guidance",
        caption: "Career Copilot Chat",
        category: "AI Chat Interface",
      },
      {
        src: "/projects/career-copilot/04-backend-api-overview.png",
        alt: "Career Copilot AI FastAPI OpenAPI documentation surface displaying endpoint routes",
        caption: "FastAPI API Surface",
        category: "Backend API",
      },
      {
        src: "/projects/career-copilot/05-learning-roadmap.png",
        alt: "Career Copilot AI personalized learning roadmap for targeted career growth",
        caption: "Personalized Learning Roadmap",
        category: "Growth Planning",
      },
    ];
  }

  return [];
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
  const galleryItems = getProjectGalleryItems(slug);

  return (
    <Container className="py-12 md:py-16 space-y-12 max-w-4xl">
      {/* Back Link */}
      <Link href="/projects">
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Case Studies
        </Button>
      </Link>

      {/* 1. Hero & Metadata Header */}
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
          {project.repositoryVisibility === "private" && (
            <Badge variant="outline" className="border-amber-800/60 bg-amber-950/30 text-amber-400 text-xs flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Private Client Repository</span>
            </Badge>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Banner Thumbnail */}
        <div className="rounded-xl overflow-hidden border border-border/60 shadow-md">
          <ProjectThumbnail project={project} />
        </div>

        {/* Technologies & Verified Links CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs bg-secondary/80 font-mono">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Live Demo
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border/80 bg-background shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Code2 className="h-3.5 w-3.5" /> GitHub Repository
              </a>
            )}

            {project.repositoryVisibility === "private" && !project.githubUrl && (
              <span className="text-xs text-amber-400/90 font-mono flex items-center gap-1 bg-amber-950/40 border border-amber-800/50 px-3 py-1.5 rounded-md">
                <Lock className="w-3 h-3" /> Private Client Codebase
              </span>
            )}
          </div>
        </div>
      </div>

      {caseStudy ? (
        <div className="space-y-16">
          {/* 2. Problem & Solution */}
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

          {/* 3. My Role & Engineering Ownership */}
          {caseStudy.roleDescription && (
            <Card className="bg-primary/5 border-primary/30 p-6 space-y-3">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                My Role & Engineering Ownership
              </h2>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                {caseStudy.roleDescription}
              </p>
            </Card>
          )}

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

          {/* 5. Core Request Workflow */}
          {caseStudy.coreWorkflow && caseStudy.coreWorkflow.length > 0 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Badge variant="outline" className="text-cyan-400 border-cyan-400/40 text-xs font-mono">
                  Execution Sequence
                </Badge>
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Route className="h-5 w-5 text-cyan-400" />
                  Core Request Workflow
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {caseStudy.coreWorkflow.map((step) => (
                  <Card key={step.stepNumber} className="bg-card/40 border-border/50 p-4 space-y-2">
                    <div className="flex items-center justify-between gap-2 border-b border-border/30 pb-2">
                      <span className="text-xs font-bold text-cyan-400 font-mono">
                        Step {step.stepNumber}: {step.title}
                      </span>
                      <Badge variant="secondary" className="text-[10px] font-mono">
                        {step.actor}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-foreground/90 font-medium">
                      {step.action}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono leading-relaxed bg-slate-900/60 p-2 rounded border border-slate-800">
                      {step.technicalDetail}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* 6. Key Features / Subsystems */}
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

          {/* 7. Backend Mechanisms */}
          {caseStudy.backendMechanisms && caseStudy.backendMechanisms.length > 0 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Badge variant="outline" className="text-purple-400 border-purple-400/40 text-xs font-mono">
                  Service Design
                </Badge>
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Server className="h-5 w-5 text-purple-400" />
                  Backend Mechanisms & Data Flow
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseStudy.backendMechanisms.map((mechanism, idx) => (
                  <Card key={idx} className="bg-card/40 border-border/50 p-5 space-y-2">
                    <h3 className="text-sm font-bold text-foreground">{mechanism.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {mechanism.description}
                    </p>
                    <div className="pt-2 border-t border-border/30 text-[11px] text-purple-300/90 font-mono">
                      Takeaway: {mechanism.keyTakeaway}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* 8. Data Persistence & Models */}
          {caseStudy.dataPersistence && caseStudy.dataPersistence.length > 0 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Badge variant="outline" className="text-emerald-400 border-emerald-400/40 text-xs font-mono">
                  Schema Blueprint
                </Badge>
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Database className="h-5 w-5 text-emerald-400" />
                  Data & Persistence Schema
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseStudy.dataPersistence.map((model, idx) => (
                  <Card key={idx} className="bg-card/40 border-border/50 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-emerald-400 font-mono">{model.modelName}</span>
                      <Badge variant="outline" className="text-[10px]">Model Schema</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{model.purpose}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {model.keyFieldsOrPatterns.map((field) => (
                        <span key={field} className="px-2 py-0.5 text-[10px] rounded bg-slate-900 text-slate-300 font-mono border border-slate-800">
                          {field}
                        </span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* 9. Key Engineering Decisions */}
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

          {/* 10. Real Challenges & Debugging Fixes */}
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

          {/* 11. Reliability & Security Considerations */}
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

          {/* 12. Testing Approach */}
          {caseStudy.testingApproach && caseStudy.testingApproach.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <TestTube className="h-5 w-5 text-cyan-400" />
                Testing & Quality Assurance
              </h2>
              <Card className="bg-card/40 border-border/50 p-5 space-y-2">
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {caseStudy.testingApproach.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-mono font-bold">•</span>
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          )}

          {/* 13. Integrations Stack */}
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

          {/* 14. Key Lessons Learned */}
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

          {/* 15. Verified Screenshot Gallery */}
          {galleryItems.length > 0 && (
            <ProjectGallery items={galleryItems} title={`${project.title} Interface & System Gallery`} />
          )}

          {/* 16. Project Navigation */}
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
