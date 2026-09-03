import { ProjectChallenge } from "@/types/portfolio";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Wrench } from "lucide-react";

interface ChallengeCardProps {
  challenge: ProjectChallenge;
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <Card className="bg-card/50 backdrop-blur border-border/60 p-5 space-y-4 hover:border-primary/40 transition-colors">
      <div className="flex items-center gap-2 border-b border-border/40 pb-2">
        <Wrench className="h-4 w-4 text-amber-400 shrink-0" />
        <h4 className="text-base font-semibold text-foreground">
          {challenge.title}
        </h4>
      </div>

      <div className="space-y-3 text-xs leading-relaxed">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 font-mono text-amber-400 font-semibold">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>Problem & Symptoms</span>
          </div>
          <p className="text-muted-foreground pl-5">{challenge.problem}</p>
        </div>

        {challenge.rootCause && (
          <div className="space-y-1">
            <div className="font-mono text-muted-foreground font-semibold pl-5">
              Root Cause:
            </div>
            <p className="text-foreground/90 pl-5 font-mono text-[11px] bg-secondary/30 p-2 rounded">
              {challenge.rootCause}
            </p>
          </div>
        )}

        <div className="space-y-1 pt-1 border-t border-border/40">
          <div className="flex items-center gap-1.5 font-mono text-emerald-400 font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Engineering Solution & Fix</span>
          </div>
          <p className="text-foreground/90 pl-5">{challenge.solution}</p>
        </div>
      </div>
    </Card>
  );
}
