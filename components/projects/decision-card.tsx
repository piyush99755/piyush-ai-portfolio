import { ProjectDecision } from "@/types/portfolio";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitCommit } from "lucide-react";

interface DecisionCardProps {
  decision: ProjectDecision;
  index: number;
}

export function DecisionCard({ decision, index }: DecisionCardProps) {
  return (
    <Card className="bg-card/50 backdrop-blur border-border/60 p-5 space-y-3 hover:border-primary/40 transition-colors">
      <div className="flex items-center justify-between border-b border-border/40 pb-2">
        <div className="flex items-center gap-2">
          <GitCommit className="h-4 w-4 text-primary" />
          <h4 className="text-base font-semibold text-foreground">
            {decision.title}
          </h4>
        </div>
        <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary">
          Decision #{index + 1}
        </Badge>
      </div>

      <div className="space-y-2 text-xs leading-relaxed">
        <div>
          <span className="font-semibold text-muted-foreground font-mono">Context: </span>
          <span className="text-foreground/90">{decision.context}</span>
        </div>

        <div>
          <span className="font-semibold text-primary font-mono">Technical Decision: </span>
          <span className="text-foreground font-medium">{decision.decision}</span>
        </div>

        <div className="bg-primary/5 border-l-2 border-primary/40 p-2.5 rounded-r mt-1">
          <span className="font-semibold text-primary font-mono block mb-0.5">Rationale:</span>
          <span className="text-muted-foreground">{decision.rationale}</span>
        </div>
      </div>
    </Card>
  );
}
