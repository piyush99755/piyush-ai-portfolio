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
          <Link
            href="/ask"
            className="text-primary font-semibold transition-colors hover:text-primary/80 flex items-center gap-1.5"
          >
            <Bot className="h-4 w-4" />
            <span>Ask AI</span>
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/ask">
            <Badge variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 transition-colors gap-1.5 py-1 text-xs cursor-pointer">
              <Bot className="h-3.5 w-3.5" />
              <span>Ask Piyush AI</span>
            </Badge>
          </Link>
        </div>
      </Container>
    </header>
  );
}
