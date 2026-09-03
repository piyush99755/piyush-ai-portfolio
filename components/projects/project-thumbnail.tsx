"use client";

import { useState } from "react";
import Image from "next/image";
import { Project } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";
import { Bot, Layers, Workflow, Code2, Lock } from "lucide-react";

interface ProjectThumbnailProps {
  project: Project;
  className?: string;
}

export function ProjectThumbnail({ project, className = "" }: ProjectThumbnailProps) {
  const [imageError, setImageError] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "AI & Automation":
        return <Bot className="w-8 h-8 text-cyan-400" />;
      case "Full-Stack SaaS":
        return <Layers className="w-8 h-8 text-blue-400" />;
      case "AI Integration":
        return <Workflow className="w-8 h-8 text-emerald-400" />;
      default:
        return <Code2 className="w-8 h-8 text-purple-400" />;
    }
  };

  const hasImage = project.thumbnail && !imageError;

  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-t-xl bg-slate-900 border-b border-slate-800/80 group ${className}`}>
      {hasImage ? (
        <Image
          src={project.thumbnail!}
          alt={`${project.title} screenshot preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImageError(true)}
          priority={project.featured}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 p-6 flex flex-col justify-between transition-transform duration-500 group-hover:scale-[1.02]">
          {/* Subtle Grid Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25" />

          {/* Top Bar: Icon + Category Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-inner">
              {getCategoryIcon(project.category)}
            </div>
            {project.repositoryVisibility === "private" && (
              <Badge variant="outline" className="bg-amber-950/40 text-amber-300 border-amber-800/50 flex items-center gap-1.5 px-2.5 py-1">
                <Lock className="w-3 h-3 text-amber-400" />
                <span>Private Repo</span>
              </Badge>
            )}
          </div>

          {/* Bottom Info Preview */}
          <div className="relative z-10 space-y-2">
            <h4 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-1">
              {project.title}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/60 font-mono"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-1.5 py-0.5 text-xs rounded-md bg-slate-800/60 text-slate-400">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
