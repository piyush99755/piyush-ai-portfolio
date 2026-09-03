import { ExperienceItem } from "@/types/portfolio";

export const experienceData: ExperienceItem[] = [
  {
    role: "AI & Telephony Systems Engineering",
    focusArea: "Voice Agents & Real-Time Telephony",
    summary:
      "Engineering automated voice receptionists and telephony pipelines connecting webhooks, LLMs, and real-time audio streams.",
    highlights: [
      "Integrating Retell AI voice models with Twilio telephony infrastructure",
      "Building webhook endpoints for call state events and data ingestion",
      "Syncing booking events dynamically with Google Calendar API",
    ],
    technologies: ["Retell AI", "Twilio API", "Node.js", "Express", "MongoDB", "Google Calendar API"],
  },
  {
    role: "Full-Stack SaaS & Operations Automation",
    focusArea: "Next.js & Workflow Engines",
    summary:
      "Developing production SaaS platforms and automated business operation hubs with robust database architectures.",
    highlights: [
      "Building Next.js App Router platforms with TypeScript and Tailwind CSS",
      "Designing relational PostgreSQL schemas and Prisma ORM data access layers",
      "Orchestrating automated multi-step workflows using n8n engines",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "n8n", "Tailwind CSS"],
  },
  {
    role: "RAG & Microservices Architecture",
    focusArea: "FastAPI & Python AI Backend Services",
    summary:
      "Constructing fast Python backend services utilizing Retrieval-Augmented Generation (RAG) for contextual intelligence.",
    highlights: [
      "Developing high-performance asynchronous REST endpoints with FastAPI",
      "Implementing document indexing and context injection for LLM pipelines",
      "Building intuitive React client applications connected to AI backends",
    ],
    technologies: ["FastAPI", "Python", "React", "TypeScript", "RAG Systems", "Vite"],
  },
];
