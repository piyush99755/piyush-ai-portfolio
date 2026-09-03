import { Skill, SkillCategory } from "@/types/portfolio";

export const skillCategories: SkillCategory[] = [
  {
    id: "ai-automation",
    name: "AI & Automation",
    description: "LLMs, RAG systems, voice AI agents, and workflow automation engines.",
  },
  {
    id: "backend",
    name: "Backend",
    description: "Scalable APIs, server architecture, microservices, and background jobs.",
  },
  {
    id: "frontend",
    name: "Frontend",
    description: "Modern, responsive component architectures and UI systems.",
  },
  {
    id: "databases",
    name: "Databases",
    description: "Relational, document, and vector data storage & ORMs.",
  },
  {
    id: "apis-integrations",
    name: "APIs & Integrations",
    description: "Third-party SaaS services, telephony, payments, and calendar integrations.",
  },
  {
    id: "tools-platforms",
    name: "Tools & Platforms",
    description: "Development tools, build systems, and source control.",
  },
];

export const skillsData: Skill[] = [
  // AI & Automation
  { name: "RAG Systems", category: "AI & Automation", level: "Expert", featured: true, relatedProjects: ["career-copilot-ai"] },
  { name: "FastAPI / Python AI Services", category: "AI & Automation", level: "Expert", featured: true, relatedProjects: ["career-copilot-ai", "northassist-ai"] },
  { name: "Retell AI (Voice Agents)", category: "AI & Automation", level: "Advanced", featured: true, relatedProjects: ["myfelipe-ai-receptionist"] },
  { name: "n8n Automation", category: "AI & Automation", level: "Advanced", featured: true, relatedProjects: ["ai-ecommerce-automation-hub"] },

  // Backend
  { name: "Node.js & Express", category: "Backend", level: "Expert", featured: true, relatedProjects: ["myfelipe-ai-receptionist"] },
  { name: "FastAPI (Python)", category: "Backend", level: "Expert", featured: true, relatedProjects: ["career-copilot-ai", "northassist-ai"] },
  { name: "REST API Design", category: "Backend", level: "Expert", featured: true },

  // Frontend
  { name: "Next.js (App Router)", category: "Frontend", level: "Expert", featured: true, relatedProjects: ["ai-ecommerce-automation-hub"] },
  { name: "React & Vite", category: "Frontend", level: "Expert", featured: true, relatedProjects: ["myfelipe-ai-receptionist", "northassist-ai", "career-copilot-ai"] },
  { name: "TypeScript", category: "Frontend", level: "Expert", featured: true },
  { name: "Tailwind CSS", category: "Frontend", level: "Advanced", featured: true },

  // Databases
  { name: "PostgreSQL", category: "Databases", level: "Advanced", featured: true, relatedProjects: ["ai-ecommerce-automation-hub"] },
  { name: "MongoDB", category: "Databases", level: "Advanced", featured: true, relatedProjects: ["myfelipe-ai-receptionist"] },
  { name: "Prisma ORM", category: "Databases", level: "Advanced", featured: true, relatedProjects: ["ai-ecommerce-automation-hub"] },

  // APIs & Integrations
  { name: "Twilio Telephony API", category: "APIs & Integrations", level: "Advanced", featured: true, relatedProjects: ["myfelipe-ai-receptionist"] },
  { name: "Stripe Payment Gateway", category: "APIs & Integrations", level: "Advanced", featured: true, relatedProjects: ["myfelipe-ai-receptionist"] },
  { name: "Google Calendar API", category: "APIs & Integrations", level: "Advanced", featured: true, relatedProjects: ["myfelipe-ai-receptionist"] },

  // Tools & Platforms
  { name: "Git & GitHub", category: "Tools & Platforms", level: "Expert", featured: true },
  { name: "Docker", category: "Tools & Platforms", level: "Proficient" },
  { name: "Postman / OpenAPI", category: "Tools & Platforms", level: "Advanced" },
];
