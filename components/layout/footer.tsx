import Link from "next/link";
import { Container } from "./container";
import { footerNavLinks } from "@/data/navigation";
import { socialLinks } from "@/data/socials";
import { bioData } from "@/data/bio";
import { Code2, Globe, Mail } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="h-4 w-4" />,
  Globe: <Globe className="h-4 w-4" />,
  Mail: <Mail className="h-4 w-4" />,
};

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 py-10 mt-auto bg-card/20">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <p className="text-sm font-semibold text-foreground">
            {bioData.name} — {bioData.role}
          </p>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-medium">
          {footerNavLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-muted-foreground">
          {socialLinks.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target={social.url.startsWith("http") ? "_blank" : undefined}
              rel={social.url.startsWith("http") ? "noreferrer" : undefined}
              className="transition-colors hover:text-foreground p-1"
              aria-label={social.label}
            >
              {iconMap[social.iconName] || <Globe className="h-4 w-4" />}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
