import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, FileCode2, Home } from "lucide-react";

export default function NotFound() {
  return (
    <Container className="py-24 sm:py-32 flex flex-col items-center text-center space-y-6 max-w-2xl">
      <Badge
        variant="outline"
        className="gap-1.5 px-3 py-1 text-xs border-primary/40 text-primary font-mono"
      >
        <FileCode2 className="h-3.5 w-3.5" />
        404 — Route Not Found
      </Badge>

      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground font-mono">
        404
      </h1>

      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
        The requested page or project case study could not be found. It may have been moved, renamed, or is currently unlisted.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <Link href="/">
          <Button variant="default" className="gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Link href="/projects">
          <Button variant="outline" className="gap-2 border-border/60">
            <FileCode2 className="h-4 w-4 text-primary" />
            View Projects
          </Button>
        </Link>
        <Link href="/ask">
          <Button variant="outline" className="gap-2 border-primary/40 text-primary hover:bg-primary/10">
            <Bot className="h-4 w-4" />
            Ask Piyush AI
          </Button>
        </Link>
      </div>
    </Container>
  );
}
