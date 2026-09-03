import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { bioData } from "@/data/bio";
import { ArrowRight, Bot } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <Container className="flex flex-col items-center text-center space-y-8 max-w-4xl">
        <Badge
          variant="outline"
          className="gap-2 px-3.5 py-1 text-xs border-primary/40 bg-primary/5 text-primary tracking-wide font-medium rounded-full"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          {bioData.availabilityStatus}
        </Badge>

        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            {bioData.name}
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-primary tracking-tight">
            {bioData.role}
          </p>
        </div>

        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {bioData.tagline}
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link href="/projects">
            <Button size="lg" className="gap-2 font-medium">
              View Projects <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <Button
            size="lg"
            variant="outline"
            disabled
            className="gap-2 border-border/80 text-muted-foreground cursor-not-allowed opacity-80"
          >
            <Bot className="h-4 w-4 text-primary" />
            Ask Piyush AI
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              Coming Soon (Phase 4)
            </Badge>
          </Button>
        </div>

        {/* Primary Stack Badges */}
        <div className="pt-8 border-t border-border/40 w-full max-w-2xl">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-3">
            Core Production Stack
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {bioData.primarySkills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="bg-secondary/60 text-secondary-foreground text-xs py-1 px-3"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
