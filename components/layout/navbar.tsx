import Link from "next/link";
import { Container } from "./container";
import { headerNavLinks } from "@/data/navigation";
import { bioData } from "@/data/bio";
import { Badge } from "@/components/ui/badge";
import { Bot, Terminal } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <Terminal className="h-5 w-5 text-primary" />
          <span className="tracking-tight font-bold text-lg">{bioData.name.split(" ")[0]}</span>
          <span className="text-xs text-muted-foreground font-mono hidden sm:inline-block">
            / AI & Full-Stack
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          {headerNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Badge variant="outline" className="border-border text-muted-foreground gap-1.5 py-1 text-[11px]">
            <Bot className="h-3.5 w-3.5 text-primary" />
            <span>Ask AI</span>
            <span className="bg-secondary text-secondary-foreground px-1 py-0.2 rounded text-[9px]">Soon</span>
          </Badge>
        </div>
      </Container>
    </header>
  );
}
