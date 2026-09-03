import { ProjectArchitectureNode } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Code2, Server, Database, Cloud, Cpu } from "lucide-react";

interface ArchitectureDiagramProps {
  nodes: ProjectArchitectureNode[];
  description?: string;
}

const typeStyles: Record<string, { border: string; bg: string; icon: React.ReactNode }> = {
  frontend: {
    border: "border-blue-500/40 hover:border-blue-500/80",
    bg: "bg-blue-500/5",
    icon: <Code2 className="h-4 w-4 text-blue-400" />,
  },
  backend: {
    border: "border-emerald-500/40 hover:border-emerald-500/80",
    bg: "bg-emerald-500/5",
    icon: <Server className="h-4 w-4 text-emerald-400" />,
  },
  service: {
    border: "border-purple-500/40 hover:border-purple-500/80",
    bg: "bg-purple-500/5",
    icon: <Cpu className="h-4 w-4 text-purple-400" />,
  },
  database: {
    border: "border-amber-500/40 hover:border-amber-500/80",
    bg: "bg-amber-500/5",
    icon: <Database className="h-4 w-4 text-amber-400" />,
  },
  external: {
    border: "border-cyan-500/40 hover:border-cyan-500/80",
    bg: "bg-cyan-500/5",
    icon: <Cloud className="h-4 w-4 text-cyan-400" />,
  },
};

export function ArchitectureDiagram({ nodes, description }: ArchitectureDiagramProps) {
  if (!nodes || nodes.length === 0) return null;

  return (
    <div className="space-y-6">
      {description && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}

      <div className="flex flex-col gap-4">
        {nodes.map((node, index) => {
          const style = typeStyles[node.type] || typeStyles.backend;

          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-full rounded-lg border ${style.border} ${style.bg} backdrop-blur p-4 space-y-2 transition-all duration-200 shadow-sm`}
              >
                <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2">
                  <div className="flex items-center gap-2">
                    {style.icon}
                    <h4 className="text-sm font-semibold text-foreground">
                      {node.title}
                    </h4>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-mono border-border">
                    {node.subtitle}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {node.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono bg-background/60 text-muted-foreground px-2 py-0.5 rounded border border-border/40"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {index < nodes.length - 1 && (
                <div className="py-2 text-primary/60 flex items-center justify-center">
                  <ArrowDown className="h-4 w-4 animate-pulse" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
