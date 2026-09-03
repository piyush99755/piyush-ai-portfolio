import Link from "next/link";
import { Project } from "@/types/portfolio";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, CheckCircle2, Layers } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden border-border/60 bg-card/60 backdrop-blur transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-primary/10 via-transparent to-transparent rounded-bl-full pointer-events-none" />

      <CardHeader className="space-y-3 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="outline" className="border-primary/40 text-primary text-xs font-medium">
            {project.category}
          </Badge>
          <Badge variant="secondary" className="text-[11px] font-normal">
            {project.status}
          </Badge>
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

      <CardFooter className="flex flex-col items-start gap-4 pt-2 border-t border-border/40">
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

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors group-hover:translate-x-0.5 transition-transform"
        >
          View Case Study Blueprint <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
