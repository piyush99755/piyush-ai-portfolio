import { JobRequirement, RequirementImportance } from "@/types/job-fit";

interface SkillPattern {
  id: string;
  label: string;
  category: string;
  keywords: string[];
  aliases: string[];
}

const KNOWN_SKILL_PATTERNS: SkillPattern[] = [
  // Frontend
  { id: "react", label: "React", category: "frontend", keywords: ["react", "react.js", "reactjs"], aliases: ["react"] },
  { id: "nextjs", label: "Next.js", category: "frontend", keywords: ["next.js", "nextjs", "next"], aliases: ["nextjs", "app router"] },
  { id: "typescript", label: "TypeScript", category: "frontend", keywords: ["typescript", "ts"], aliases: ["typescript"] },
  { id: "tailwind", label: "Tailwind CSS", category: "frontend", keywords: ["tailwind", "tailwindcss"], aliases: ["tailwind"] },

  // Backend
  { id: "nodejs", label: "Node.js", category: "backend", keywords: ["node.js", "nodejs", "node"], aliases: ["node", "express"] },
  { id: "fastapi", label: "FastAPI", category: "backend", keywords: ["fastapi"], aliases: ["fastapi", "python async"] },
  { id: "python", label: "Python", category: "backend", keywords: ["python", "py"], aliases: ["python"] },
  { id: "express", label: "Express", category: "backend", keywords: ["express", "express.js"], aliases: ["express"] },
  { id: "rest-api", label: "REST APIs", category: "backend", keywords: ["rest", "restful", "rest api", "apis"], aliases: ["rest api"] },
  { id: "graphql", label: "GraphQL", category: "backend", keywords: ["graphql"], aliases: ["graphql"] },
  { id: "microservices", label: "Microservices Architecture", category: "architecture", keywords: ["microservices", "service-oriented"], aliases: ["microservices"] },

  // AI & Automation
  { id: "rag", label: "RAG Architecture", category: "AI & Automation", keywords: ["rag", "retrieval augmented generation", "retrieval-augmented"], aliases: ["rag"] },
  { id: "llm", label: "LLM & Voice AI Integrations", category: "AI & Automation", keywords: ["llm", "large language model", "groq", "retell", "voice ai", "ai agent"], aliases: ["llm", "groq", "retell"] },
  { id: "n8n", label: "n8n Workflow Automation", category: "AI & Automation", keywords: ["n8n", "workflow automation", "automation workflows"], aliases: ["n8n", "automation"] },

  // APIs & Integrations
  { id: "twilio", label: "Twilio Telephony & SMS", category: "APIs & Integrations", keywords: ["twilio", "sms", "telephony"], aliases: ["twilio", "sms"] },
  { id: "stripe", label: "Stripe Payments", category: "APIs & Integrations", keywords: ["stripe", "billing", "subscriptions"], aliases: ["stripe"] },
  { id: "calendar", label: "Google Calendar API", category: "APIs & Integrations", keywords: ["google calendar", "calendar api", "oauth"], aliases: ["google calendar"] },

  // Databases
  { id: "postgresql", label: "PostgreSQL", category: "databases", keywords: ["postgresql", "postgres"], aliases: ["postgresql", "postgres"] },
  { id: "mongodb", label: "MongoDB", category: "databases", keywords: ["mongodb", "mongo"], aliases: ["mongodb"] },
  { id: "prisma", label: "Prisma ORM", category: "databases", keywords: ["prisma", "prisma orm"], aliases: ["prisma"] },

  // Cloud & DevOps (Unsupported / Gap Detections)
  { id: "kubernetes", label: "Kubernetes", category: "cloud/devops", keywords: ["kubernetes", "k8s"], aliases: ["kubernetes"] },
  { id: "aws", label: "AWS Cloud", category: "cloud/devops", keywords: ["aws", "amazon web services"], aliases: ["aws"] },
  { id: "docker", label: "Docker", category: "cloud/devops", keywords: ["docker", "containerization"], aliases: ["docker"] },
  { id: "terraform", label: "Terraform", category: "cloud/devops", keywords: ["terraform", "iac"], aliases: ["terraform"] },
  { id: "cicd", label: "CI/CD Pipelines", category: "cloud/devops", keywords: ["ci/cd", "cicd", "continuous integration"], aliases: ["ci/cd"] },

  // Certifications (Unsupported / Gap Detections)
  { id: "aws-cert", label: "AWS Solutions Architect Certification", category: "certifications", keywords: ["aws certification", "aws certified", "solutions architect certification"], aliases: ["aws cert"] },
  { id: "azure-cert", label: "Azure Certification", category: "certifications", keywords: ["azure certification", "azure certified"], aliases: ["azure cert"] },
  { id: "pmp", label: "PMP Certification", category: "certifications", keywords: ["pmp", "pmp certification"], aliases: ["pmp"] },
  { id: "security-plus", label: "Security+ Certification", category: "certifications", keywords: ["security+", "security plus"], aliases: ["security+"] },

  // Education (Unsupported / Gap Detections)
  { id: "bachelor-degree", label: "Bachelor's Degree in Computer Science", category: "education", keywords: ["bachelor's degree", "bachelors degree", "bs in computer science", "degree in computer science"], aliases: ["degree"] },
  { id: "master-degree", label: "Master's Degree", category: "education", keywords: ["master's degree", "masters degree", "ms in computer science"], aliases: ["master degree"] },

  // Years of Experience Requirements
  { id: "years-backend", label: "5+ Years Backend Experience Requirement", category: "years-of-experience", keywords: ["5+ years", "minimum 5 years", "5 years of backend"], aliases: ["5 years backend"] },
  { id: "years-k8s", label: "7+ Years Kubernetes Experience Requirement", category: "years-of-experience", keywords: ["7+ years", "minimum 7 years"], aliases: ["7 years k8s"] },

  // Soft Skills & Working Style
  { id: "stakeholder-comm", label: "Stakeholder Communication", category: "working-style", keywords: ["stakeholder communication", "stakeholder management"], aliases: ["stakeholder"] },
  { id: "leadership", label: "Engineering Leadership", category: "working-style", keywords: ["engineering leadership", "tech lead", "lead engineer"], aliases: ["leadership"] },
  { id: "mentoring", label: "Developer Mentoring", category: "working-style", keywords: ["mentoring", "mentor junior"], aliases: ["mentoring"] },
];

export function extractRequirementsFromJd(jdText: string): JobRequirement[] {
  const normalizedJd = jdText.toLowerCase();
  const extracted: JobRequirement[] = [];
  const seenIds = new Set<string>();

  // Determine global requirement sentiment (required vs preferred sections)
  KNOWN_SKILL_PATTERNS.forEach((pattern) => {
    const matched = pattern.keywords.some((kw) => {
      const regex = new RegExp(`\\b${kw.replace(".", "\\.").replace("+", "\\+")}\\b`, "i");
      return regex.test(normalizedJd);
    });

    if (matched && !seenIds.has(pattern.id)) {
      seenIds.add(pattern.id);

      // Determine importance based on context surrounding the keyword
      let importance: RequirementImportance = "required";

      if (
        normalizedJd.includes("nice to have") ||
        normalizedJd.includes("preferred") ||
        normalizedJd.includes("plus:") ||
        normalizedJd.includes("bonus:")
      ) {
        const preferredIdx = Math.max(
          normalizedJd.indexOf("nice to have"),
          normalizedJd.indexOf("preferred"),
          normalizedJd.indexOf("bonus")
        );
        const keywordIdx = pattern.keywords
          .map((kw) => normalizedJd.indexOf(kw))
          .filter((i) => i !== -1)[0];

        if (keywordIdx !== undefined && preferredIdx !== -1 && keywordIdx > preferredIdx) {
          importance = "preferred";
        }
      }

      extracted.push({
        id: pattern.id,
        label: pattern.label,
        category: pattern.category,
        importance,
        keywords: pattern.keywords,
      });
    }
  });

  return extracted;
}
