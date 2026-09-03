import { HeroSection } from "@/components/sections/hero";
import { CredibilityStrip } from "@/components/sections/credibility-strip";
import { AboutSection } from "@/components/sections/about";
import { SkillsSection } from "@/components/sections/skills-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects";
import { ExperienceSection } from "@/components/sections/experience-section";
import { AiTeaserSection } from "@/components/sections/ai-teaser";
import { ContactCtaSection } from "@/components/sections/contact-cta";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CredibilityStrip />
      <AboutSection />
      <SkillsSection />
      <FeaturedProjectsSection />
      <ExperienceSection />
      <AiTeaserSection />
      <ContactCtaSection />
    </>
  );
}
