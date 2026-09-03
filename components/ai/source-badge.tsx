import Link from "next/link";
import { SourceCitation } from "@/types/ai";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText } from "lucide-react";

interface SourceBadgeProps {
  source: SourceCitation;
}

export function SourceBadge({ source }: SourceBadgeProps) {
  if (!source.href) return null;

  return (
    <Link href={source.href}>
      <Badge
        variant="outline"
        className="gap-1.5 py-1 px-2.5 text-xs font-normal border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
      >
        <FileText className="h-3 w-3" />
        <span className="truncate max-w-[200px]">{source.title}</span>
        {source.section && (
          <span className="text-[10px] text-muted-foreground font-mono">
            ({source.section})
          </span>
        )}
        <ExternalLink className="h-2.5 w-2.5 opacity-70" />
      </Badge>
    </Link>
  );
}
