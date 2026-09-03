import Link from "next/link";
import { Project } from "@/types/portfolio";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Grid } from "lucide-react";

interface ProjectNavProps {
  prevProject?: Project;
  nextProject?: Project;
}

export function ProjectNav({ prevProject, nextProject }: ProjectNavProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 border-t border-border/40">
      {prevProject ? (
        <Link href={`/projects/${prevProject.slug}`} className="w-full sm:w-auto">
          <Button variant="outline" className="w-full justify-start gap-2 text-xs">
            <ArrowLeft className="h-4 w-4" />
            <span className="truncate">Prev: {prevProject.title}</span>
          </Button>
        </Link>
      ) : (
        <div />
      )}

      <Link href="/projects">
        <Button variant="ghost" className="gap-2 text-xs text-muted-foreground hover:text-foreground">
          <Grid className="h-4 w-4" /> All Case Studies
        </Button>
      </Link>

      {nextProject ? (
        <Link href={`/projects/${nextProject.slug}`} className="w-full sm:w-auto">
          <Button variant="outline" className="w-full justify-end gap-2 text-xs">
            <span className="truncate">Next: {nextProject.title}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
