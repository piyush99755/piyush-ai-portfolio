import { Bio, FocusPillar } from "@/types/portfolio";

export const bioData: Bio = {
  name: "Piyush Tadvi",
  role: "AI / Full-Stack Software Engineer",
  location: "Available for Remote & Contract Work",
  tagline: "Building production AI-powered SaaS, intelligent automation workflows, and robust full-stack applications.",
  shortBio:
    "Software engineer specializing in production AI integrations, full-stack web applications, automated business workflows, and robust backend APIs.",
  longBio:
    "I architect and build full-stack web applications and AI-driven platforms. My work spans voice & chat AI receptionists, e-commerce automation systems, and career acceleration tools. I focus on clean software architecture, reliable API integrations, scalable databases, and intuitive user experiences.",
  availabilityStatus: "Available for new projects & full-stack / AI roles",
  primarySkills: [
    "Next.js & React",
    "TypeScript",
    "Node.js & Express",
    "FastAPI & Python",
    "PostgreSQL & MongoDB",
    "LLM & RAG Systems",
    "n8n & Workflow Automation",
  ],
};

export const focusPillars: FocusPillar[] = [
  {
    title: "AI-Powered SaaS",
    description: "Voice & conversational AI agents, intelligent assistants, and LLM/RAG integrations.",
    iconName: "Bot",
  },
  {
    title: "Full-Stack Engineering",
    description: "Modern, scalable web applications with Next.js, React, TypeScript, Node.js, and FastAPI.",
    iconName: "Layers",
  },
  {
    title: "Automation Systems",
    description: "End-to-end operational, inventory, customer, and workflow automation using n8n and webhooks.",
    iconName: "Workflow",
  },
  {
    title: "APIs & Integrations",
    description: "Secure payment systems, telephony (Twilio/Retell), calendar sync, and third-party APIs.",
    iconName: "Cpu",
  },
];
