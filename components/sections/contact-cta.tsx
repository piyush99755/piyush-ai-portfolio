import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { socialLinks } from "@/data/socials";
import { Code2, Globe, Mail, MessageSquare } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="h-4 w-4" />,
  Globe: <Globe className="h-4 w-4" />,
  Mail: <Mail className="h-4 w-4" />,
};

export function ContactCtaSection() {
  return (
    <section id="contact" className="py-20">
      <Container>
        <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
          <Badge variant="outline" className="text-primary border-primary/40 text-xs font-medium gap-1.5">
            <MessageSquare className="h-3.5 w-3.5" />
            Let&apos;s Build Together
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Have an AI, Full-Stack, or Automation Project in Mind?
          </h2>

          <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
            I am available for remote full-time roles, contract engineering, and building custom AI SaaS & automation systems for founders and engineering teams.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noreferrer" : undefined}
              >
                <Button variant={link.platform === "Email" ? "default" : "outline"} className="gap-2">
                  {iconMap[link.iconName] || <Mail className="h-4 w-4" />}
                  {link.platform === "Email" ? "Get in Touch via Email" : link.platform}
                </Button>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
