import Link from "next/link";
import { JobFitResult } from "@/types/job-fit";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SourceBadge } from "./source-badge";
import { AlertTriangle, ArrowUpRight, CheckCircle2, Info, Sparkles } from "lucide-react";

interface JobFitResultViewProps {
  result: JobFitResult;
}

export function JobFitResultView({ result }: JobFitResultViewProps) {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Visual Score Header */}
      <Card className="p-6 bg-card/80 border-border/60 backdrop-blur rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Deterministic Alignment Assessment
            </span>
            <div className="flex items-center gap-3">
              <span className="text-4xl font-extrabold tracking-tight text-foreground font-mono">
                {result.score}%
              </span>
              <Badge
                variant="outline"
                className={`py-1 px-3 text-xs font-bold border-emerald-500/40 bg-emerald-500/10 text-emerald-400`}
              >
                {result.fitBand}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-background/50 border border-border/40 p-2.5 rounded-lg">
            <Info className="h-4 w-4 text-primary shrink-0" />
            <span>Score represents alignment with verified portfolio evidence only (not candidate quality, hiring probability, or guaranteed performance).</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed pt-2 border-t border-border/40">
          {result.summary}
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Strengths */}
        <Card className="p-5 bg-card/60 border-emerald-500/30 backdrop-blur rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <h3>Verified Match Strengths</h3>
          </div>
          {result.strengths.length > 0 ? (
            <ul className="space-y-2 text-xs text-muted-foreground">
              {result.strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-emerald-500/5 p-2 rounded border border-emerald-500/10">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground italic">No direct strong matches identified for this role.</p>
          )}
        </Card>

        {/* Open Gaps / Unverified Portfolio Evidence */}
        <Card className="p-5 bg-card/60 border-amber-500/30 backdrop-blur rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-400">
            <AlertTriangle className="h-4 w-4" />
            <h3>Gaps &amp; Unverified Evidence</h3>
          </div>
          {result.gaps.length > 0 ? (
            <ul className="space-y-2 text-xs text-muted-foreground">
              {result.gaps.map((gap, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-amber-500/5 p-2 rounded border border-amber-500/10">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{gap}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground">No critical missing requirements identified for this role.</p>
          )}
        </Card>
      </div>

      {/* Relevant Case Study Projects */}
      <Card className="p-5 bg-card/60 border-border/60 backdrop-blur rounded-xl space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3>Most Relevant Case Study Projects</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {result.relevantProjects.map((project) => (
            <Link key={project.slug} href={project.url}>
              <div className="p-3.5 rounded-lg bg-background/50 border border-border/40 hover:border-primary/40 transition-colors group space-y-1.5 h-full">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {project.title}
                  </h4>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </div>
                <p className="text-[11px] text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Card>

      {/* Verified Sources & Disclaimer */}
      {result.sources.length > 0 && (
        <div className="space-y-2">
          <span className="text-[11px] font-mono text-muted-foreground block font-medium">
            Verified Evidence Citations:
          </span>
          <div className="flex flex-wrap gap-2">
            {result.sources.map((src, idx) => (
              <SourceBadge key={idx} source={src} />
            ))}
          </div>
        </div>
      )}

      <div className="text-[11px] text-muted-foreground italic bg-secondary/30 p-3 rounded-lg border border-border/40">
        {result.disclaimer}
      </div>
    </div>
  );
}
