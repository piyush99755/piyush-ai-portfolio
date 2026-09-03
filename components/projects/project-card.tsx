import Link from "next/link";
import { Project } from "@/types/portfolio";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectThumbnail } from "./project-thumbnail";
import { ArrowUpRight, CheckCircle2, ExternalLink, Code2, Lock, Layers } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden border-border/60 bg-card/60 backdrop-blur transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      {/* Visual Thumbnail */}
      <ProjectThumbnail project={project} />

      <CardHeader className="space-y-3 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="outline" className="border-primary/40 text-primary text-xs font-medium">
            {project.category}
          </Badge>
          <div className="flex items-center gap-1.5">
            {project.repositoryVisibility === "private" && (
              <Badge variant="outline" className="border-amber-800/60 bg-amber-950/30 text-amber-400 text-[11px] font-normal flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" />
                <span>Private</span>
              </Badge>
            )}
            <Badge variant="secondary" className="text-[11px] font-normal">
              {project.status}
            </Badge>
          </div>
        </div>

        <CardTitle className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
          <Link href={`/projects/${project.slug}`} className="focus:outline-none focus:underline">
            {project.title}
          </Link>
        </CardTitle>

        <p className="text-xs text-muted-foreground font-mono flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5 text-muted-foreground/80" />
          {project.projectType}
        </p>
      </CardHeader>

      <CardContent className="space-y-4 text-sm flex-1">
        <p className="text-muted-foreground leading-relaxed">
          {project.shortDescription}
        </p>

        {project.highlights && project.highlights.length > 0 && (
          <ul className="space-y-1.5 text-xs text-foreground/90">
            {project.highlights.slice(0, 3).map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-4 pt-4 border-t border-border/40">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-secondary/70 text-secondary-foreground text-[11px] font-normal"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* CTA Button Row */}
        <div className="flex flex-wrap items-center justify-between w-full gap-2 pt-1">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            <span>View Case Study</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} GitHub repository`}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border/80 bg-background shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} live demo`}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
