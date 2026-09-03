"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Expand, X } from "lucide-react";

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  category?: string;
}

interface ProjectGalleryProps {
  items: GalleryItem[];
  title?: string;
}

export function ProjectGallery({ items, title = "Project Visuals & System Interface" }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);

  const handleOpen = (item: GalleryItem, e: React.MouseEvent<HTMLButtonElement>) => {
    setTriggerElement(e.currentTarget);
    setSelectedImage(item);
  };

  const handleClose = useCallback(() => {
    setSelectedImage(null);
    if (triggerElement) {
      triggerElement.focus();
    }
  }, [triggerElement]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, handleKeyDown]);

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-6">
      {title && (
        <div className="space-y-1">
          <Badge variant="outline" className="text-primary border-primary/40 text-xs font-mono">
            Verified Interfaces
          </Badge>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col rounded-xl overflow-hidden border border-border/60 bg-card/40 backdrop-blur transition-all duration-200 hover:border-primary/50 shadow-md"
          >
            {/* Clickable Image Preview Container */}
            <button
              type="button"
              onClick={(e) => handleOpen(item, e)}
              className="relative w-full aspect-[16/10] overflow-hidden bg-slate-950 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background cursor-pointer"
              aria-label={`Enlarge screenshot: ${item.caption}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                className="object-cover object-top transition-transform duration-300 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 text-xs font-medium text-foreground shadow-lg border border-border/80">
                  <Expand className="w-3.5 h-3.5 text-primary" /> Enlarge View
                </span>
              </div>
            </button>

            {/* Caption & Metadata Footer */}
            <div className="p-3.5 border-t border-border/40 bg-card/60 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-foreground leading-snug">
                {item.caption}
              </span>
              {item.category && (
                <Badge variant="secondary" className="text-[10px] font-mono shrink-0">
                  {item.category}
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Accessible Custom Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.caption}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl space-y-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-900/60">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">{selectedImage.caption}</span>
                {selectedImage.category && (
                  <Badge variant="outline" className="text-[10px] text-primary border-primary/40 font-mono">
                    {selectedImage.category}
                  </Badge>
                )}
              </div>
              <button
                type="button"
                onClick={handleClose}
                autoFocus
                className="p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Close modal view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Full Lightbox Image Container */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[80vh] bg-black flex items-center justify-center">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
