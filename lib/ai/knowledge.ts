import { KnowledgeDocument } from "@/types/ai";
import { bioData, focusPillars } from "@/data/bio";
import { skillsData, skillCategories } from "@/data/skills";
import { experienceData } from "@/data/experience";
import { projectsData } from "@/data/projects";

export function generateKnowledgeCorpus(): KnowledgeDocument[] {
  const docs: KnowledgeDocument[] = [];

  // 1. Profile / Bio & Contact Info
  docs.push({
    id: "bio-profile-main",
    type: "profile",
    title: `${bioData.name} — Profile & Overview`,
    content: `${bioData.name} is a ${bioData.role}. ${bioData.shortBio} ${bioData.longBio} Tagline: ${bioData.tagline}. Primary Skills: ${bioData.primarySkills.join(", ")}. Availability: ${bioData.availabilityStatus}. Location: ${bioData.location}. Contact Email: ${bioData.email || "piyushtadvi4@gmail.com"}.`,
    keywords: ["piyush", "tadvi", "bio", "profile", "role", "background", "overview", "summary", "skills", "location", "availability", "email", "contact", "full-stack", "ai engineer"],
    sourceUrl: "/#about",
  });

  docs.push({
    id: "bio-contact-details",
    type: "profile",
    title: `${bioData.name} — Contact Information`,
    content: `Piyush Tadvi's official public contact email is piyushtadvi4@gmail.com. You can reach out directly via mailto:piyushtadvi4@gmail.com for remote full-time opportunities, AI consulting, and full-stack SaaS contract work. Profiles: GitHub (https://github.com/piyush99755), LinkedIn (https://linkedin.com/in/piyushtadvi).`,
    keywords: ["contact", "email", "reach out", "hire", "email address", "piyushtadvi4@gmail.com", "github", "linkedin", "message"],
    sourceUrl: "/#contact",
  });

  // 2. Qualitative Focus Pillars
  focusPillars.forEach((pillar, idx) => {
    docs.push({
      id: `bio-pillar-${idx}`,
      type: "profile",
      title: `Engineering Pillar: ${pillar.title}`,
      content: `Piyush specializes in ${pillar.title}: ${pillar.description}`,
      keywords: ["focus", "pillar", "specialization", ...pillar.title.toLowerCase().split(" ")],
      sourceUrl: "/#about",
    });
  });

  // 3. Skills Matrix
  skillCategories.forEach((cat) => {
    const categorySkills = skillsData.filter((s) => s.category === cat.name);
    if (categorySkills.length > 0) {
      docs.push({
        id: `skill-category-${cat.id}`,
        type: "skill",
        title: `Skills Category: ${cat.name}`,
        content: `${cat.name} (${cat.description}): ${categorySkills
          .map((s) => `${s.name}${s.level ? ` (${s.level})` : ""}`)
          .join(", ")}.`,
        keywords: [cat.name.toLowerCase(), "skills", "technologies", "tech stack", ...categorySkills.map((s) => s.name.toLowerCase())],
        sourceUrl: "/#skills",
      });
    }
  });

  skillsData.forEach((skill) => {
    docs.push({
      id: `skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
      type: "skill",
      title: `Skill: ${skill.name}`,
      content: `Piyush has verified expertise in ${skill.name} under the category "${skill.category}"${skill.level ? ` at ${skill.level} level` : ""}.${skill.relatedProjects ? ` Used in projects: ${skill.relatedProjects.join(", ")}.` : ""}`,
      keywords: [skill.name.toLowerCase(), skill.category.toLowerCase(), "expertise", "technology"],
      sourceUrl: "/#skills",
    });
  });

  // 4. Engineering Focus & Experience
  experienceData.forEach((exp, idx) => {
    docs.push({
      id: `experience-${idx}`,
      type: "experience",
      title: `Engineering Work: ${exp.role}`,
      content: `${exp.role} (${exp.focusArea}): ${exp.summary} Highlights: ${exp.highlights.join("; ")}. Technologies used: ${exp.technologies.join(", ")}.`,
      keywords: ["experience", "work", "role", exp.role.toLowerCase(), exp.focusArea.toLowerCase(), ...exp.technologies.map((t) => t.toLowerCase())],
      sourceUrl: "/#experience",
    });
  });

  // 5. Featured Projects
  projectsData.forEach((project) => {
    const projectUrl = `/projects/${project.slug}`;

    // Project Overview
    docs.push({
      id: `project-overview-${project.id}`,
      type: "project-overview",
      title: `Project: ${project.title}`,
      content: `${project.title} (${project.projectType}, ${project.category}, Status: ${project.status}): ${project.shortDescription} ${project.longDescription || ""} Technologies: ${project.technologies.join(", ")}. Key Highlights: ${project.highlights.join("; ")}.`,
      keywords: [project.title.toLowerCase(), project.slug, project.category.toLowerCase(), project.projectType.toLowerCase(), ...project.technologies.map((t) => t.toLowerCase())],
      projectSlug: project.slug,
      section: "Overview",
      sourceUrl: projectUrl,
    });

    if (project.responsibilities && project.responsibilities.length > 0) {
      docs.push({
        id: `project-responsibilities-${project.id}`,
        type: "project-feature",
        title: `Piyush's Contributions in ${project.title}`,
        content: `Engineering responsibilities in ${project.title}: ${project.responsibilities.join("; ")}.`,
        keywords: [project.title.toLowerCase(), project.slug, "contributions", "responsibilities", "role", "work"],
        projectSlug: project.slug,
        section: "Contributions",
        sourceUrl: projectUrl,
      });
    }

    if (project.caseStudy) {
      const cs = project.caseStudy;

      // Problem & Solution
      docs.push({
        id: `project-problem-solution-${project.id}`,
        type: "project-overview",
        title: `${project.title} — Problem & Solution`,
        content: `Problem in ${project.title}: ${cs.problem} Solution implemented: ${cs.solution}`,
        keywords: [project.title.toLowerCase(), project.slug, "problem", "solution", "architecture"],
        projectSlug: project.slug,
        section: "Problem & Solution",
        sourceUrl: projectUrl,
      });

      // Architecture
      docs.push({
        id: `project-architecture-${project.id}`,
        type: "project-architecture",
        title: `${project.title} — Architecture Flow`,
        content: `System Architecture for ${project.title}: ${cs.architectureDescription} Flow Nodes: ${cs.architectureNodes.map((n) => `${n.title} [${n.subtitle}]: ${n.items.join(", ")}`).join(" -> ")}.`,
        keywords: [project.title.toLowerCase(), project.slug, "architecture", "design", "nodes", "flow", "system"],
        projectSlug: project.slug,
        section: "Architecture",
        sourceUrl: projectUrl,
      });

      // Features
      docs.push({
        id: `project-features-${project.id}`,
        type: "project-feature",
        title: `${project.title} — Subsystems & Features`,
        content: `Features & Subsystems of ${project.title}: ${cs.features.join("; ")}.`,
        keywords: [project.title.toLowerCase(), project.slug, "features", "subsystems", "capabilities"],
        projectSlug: project.slug,
        section: "Features",
        sourceUrl: projectUrl,
      });

      // Engineering Decisions
      cs.engineeringDecisions.forEach((dec, idx) => {
        docs.push({
          id: `project-decision-${project.id}-${idx}`,
          type: "project-decision",
          title: `${project.title} Decision: ${dec.title}`,
          content: `Engineering Decision in ${project.title} (${dec.title}): Context: ${dec.context} Technical Decision: ${dec.decision} Rationale: ${dec.rationale}`,
          keywords: [project.title.toLowerCase(), project.slug, "decision", "tradeoff", "rationale", dec.title.toLowerCase()],
          projectSlug: project.slug,
          section: "Decisions",
          sourceUrl: projectUrl,
        });
      });

      // Challenges & Fixes
      cs.challenges.forEach((ch, idx) => {
        docs.push({
          id: `project-challenge-${project.id}-${idx}`,
          type: "project-challenge",
          title: `${project.title} Challenge: ${ch.title}`,
          content: `Challenge & Debugging Fix in ${project.title} (${ch.title}): Problem: ${ch.problem} ${ch.rootCause ? `Root Cause: ${ch.rootCause} ` : ""}Solution: ${ch.solution}`,
          keywords: [project.title.toLowerCase(), project.slug, "challenge", "bug", "debugging", "fix", "problem", ch.title.toLowerCase()],
          projectSlug: project.slug,
          section: "Challenges & Fixes",
          sourceUrl: projectUrl,
        });
      });

      // Reliability & Security
      docs.push({
        id: `project-security-reliability-${project.id}`,
        type: "project-security",
        title: `${project.title} — Security & Reliability`,
        content: `Reliability Patterns in ${project.title}: ${cs.reliabilityPatterns.join("; ")}. Security Considerations: ${cs.securityConsiderations.join("; ")}.`,
        keywords: [project.title.toLowerCase(), project.slug, "security", "reliability", "auth", "tokens", "validation"],
        projectSlug: project.slug,
        section: "Security & Reliability",
        sourceUrl: projectUrl,
      });

      // Integrations
      docs.push({
        id: `project-integrations-${project.id}`,
        type: "project-integration",
        title: `${project.title} — Integrations Stack`,
        content: `Integrations in ${project.title}: ${cs.integrations.map((i) => `${i.name} (${i.category}): ${i.purpose}`).join("; ")}.`,
        keywords: [project.title.toLowerCase(), project.slug, "integrations", "apis", "services", "third-party", ...cs.integrations.map((i) => i.name.toLowerCase())],
        projectSlug: project.slug,
        section: "Integrations",
        sourceUrl: projectUrl,
      });

      // Lessons Learned
      docs.push({
        id: `project-lessons-${project.id}`,
        type: "project-lesson",
        title: `${project.title} — Key Lessons Learned`,
        content: `Lessons learned from ${project.title}: ${cs.lessonsLearned.join("; ")}.`,
        keywords: [project.title.toLowerCase(), project.slug, "lessons", "takeaways"],
        projectSlug: project.slug,
        section: "Lessons",
        sourceUrl: projectUrl,
      });
    }
  });

  return docs;
}
