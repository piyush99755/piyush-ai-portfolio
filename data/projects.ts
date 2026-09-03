import { Project } from "@/types/portfolio";

export const projectsData: Project[] = [
  {
    id: "myfelipe-ai",
    slug: "myfelipe-ai-receptionist",
    title: "MyFelipe AI Receptionist SaaS",
    shortDescription:
      "Full-stack voice AI receptionist SaaS automating phone inquiries, lead capture, Google Calendar appointment booking, and Stripe billing.",
    longDescription:
      "MyFelipe is a production voice AI receptionist platform. Built with React, TypeScript, Node.js, Express, and MongoDB, it integrates Retell AI for natural voice conversations, Twilio for inbound/outbound telephony, Google Calendar API for real-time scheduling, and Stripe for automated subscriptions.",
    category: "AI & Automation",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Retell AI",
      "Twilio API",
      "Stripe API",
      "Google Calendar API",
    ],
    highlights: [
      "Natural conversational AI phone receptionist powered by Retell AI",
      "Twilio integration for seamless call handling and lead capture",
      "Real-time calendar booking synchronization via Google Calendar API",
      "Stripe payment integration for automated SaaS tier management",
    ],
    responsibilities: [
      "Architected backend Express services and MongoDB database schemas",
      "Integrated Retell AI voice agents and Twilio webhook listeners",
      "Built responsive React management dashboard for client call logs and settings",
    ],
    projectType: "SaaS Product",
    featured: true,
    status: "Production",
  },
  {
    id: "ecommerce-hub",
    slug: "ai-ecommerce-automation-hub",
    title: "AI E-commerce Automation Hub",
    shortDescription:
      "Next.js operations hub integrating n8n automation workflows, PostgreSQL, and Prisma for automated order, customer, and inventory management.",
    longDescription:
      "An automated e-commerce operations hub designed to eliminate manual data entry across store workflows. Powered by Next.js App Router, TypeScript, PostgreSQL, and Prisma ORM, it orchestrates n8n workflows for order processing, stock level sync, and customer notifications.",
    category: "Full-Stack SaaS",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "n8n",
      "Tailwind CSS",
    ],
    highlights: [
      "Automated order, customer, and inventory operations",
      "n8n workflow engine orchestration via custom API webhooks",
      "Relational data model built on PostgreSQL and Prisma ORM",
      "Real-time operational status dashboards",
    ],
    responsibilities: [
      "Designed PostgreSQL relational schemas and Prisma data access layer",
      "Constructed n8n workflow triggers and payload parsing endpoints",
      "Developed server-rendered Next.js dashboard interfaces",
    ],
    projectType: "SaaS Product",
    featured: true,
    status: "Active Development",
  },
  {
    id: "career-copilot",
    slug: "career-copilot-ai",
    title: "Career Copilot AI",
    shortDescription:
      "Intelligent career assistance platform utilizing RAG (Retrieval-Augmented Generation), FastAPI, and React for targeted project & role guidance.",
    longDescription:
      "Career Copilot AI provides context-aware guidance for tech professionals. Built with FastAPI on the backend and React on the frontend, it uses RAG (Retrieval-Augmented Generation) to analyze career documentation, project experience, and job descriptions.",
    category: "AI Integration",
    technologies: [
      "FastAPI",
      "Python",
      "React",
      "TypeScript",
      "RAG",
      "LLM Integration",
    ],
    highlights: [
      "RAG architecture for grounded contextual career guidance",
      "FastAPI backend for fast vector and text processing endpoints",
      "Clean React interface for interactive query sessions",
    ],
    responsibilities: [
      "Implemented FastAPI RAG retrieval pipeline and context formatting",
      "Built interactive React front-end application with real-time response streaming",
    ],
    projectType: "AI System",
    featured: true,
    status: "Production",
  },
  {
    id: "northassist-ai",
    slug: "northassist-ai",
    title: "NorthAssist AI",
    shortDescription:
      "AI-powered community support and resource navigation concept connecting users to local benefits, documents, and assistance.",
    longDescription:
      "NorthAssist AI is a community assistance platform concept built with React, Vite, and FastAPI. It simplifies navigation across local public resources, benefit programs, and official document requirements.",
    category: "Full-Stack Application",
    technologies: ["React", "Vite", "FastAPI", "Python", "TypeScript"],
    highlights: [
      "Community benefit and document navigation system concept",
      "Lightweight Vite + React frontend coupled with FastAPI services",
      "Clean search and filter interface for support resources",
    ],
    responsibilities: [
      "Engineered frontend client using React, Vite, and TypeScript",
      "Designed FastAPI REST endpoints for document and benefit data retrieval",
    ],
    projectType: "Community Platform",
    featured: true,
    status: "Completed Concept",
  },
];
