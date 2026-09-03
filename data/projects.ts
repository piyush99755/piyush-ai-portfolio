import { Project } from "@/types/portfolio";

export const projectsData: Project[] = [
  {
    id: "myfelipe-ai",
    slug: "myfelipe-ai-receptionist",
    title: "MyFelipe AI Receptionist SaaS",
    shortDescription:
      "Full-stack voice AI receptionist SaaS automating phone inquiries, lead capture, Google Calendar appointment booking, and Stripe billing.",
    longDescription:
      "MyFelipe is an AI receptionist and marketing platform. Built with React, TypeScript, Node.js, Express, and MongoDB, it integrates Retell AI for conversational voice agents, Twilio for voice/SMS, Google Calendar API for appointment scheduling, and Stripe for subscription billing.",
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
      "Groq LLM",
      "Google Places API",
    ],
    highlights: [
      "Conversational AI phone receptionist integration powered by Retell AI",
      "Twilio voice and SMS workflow for booking-link delivery and notifications",
      "Google Calendar integration with tenant isolation for appointment scheduling",
      "High-ticket lead qualification pipeline using Groq LLM and Google Places API",
    ],
    responsibilities: [
      "Architected backend Express services and MongoDB database schemas",
      "Implemented Retell AI voice agent integration and Twilio SMS workflows",
      "Built provider abstraction layer via smsProvider() for truthful result handling",
      "Implemented tenant-level deduplication before Groq LLM qualification calls",
    ],
    projectType: "SaaS Product",
    featured: true,
    status: "Production",
    caseStudy: {
      overview:
        "MyFelipe AI Receptionist is an automated voice and marketing platform for service providers. It pairs conversational voice AI agents with live calendar booking, automated SMS follow-ups, lead qualification pipelines, and social marketing integrations.",
      problem:
        "Service businesses frequently miss inbound calls during peak hours or after business hours, leading to delayed scheduling and lost prospective leads.",
      solution:
        "Integrated Retell AI voice agents with Twilio telephony and Google Calendar API. When callers dial in, the voice agent conducts natural conversations, captures lead details, checks calendar availability, dispatches booking links via SMS, and records lead profiles in MongoDB.",
      architectureDescription:
        "The system uses a layered application architecture. React client applications communicate with Node.js/Express backend services, which interface with Retell AI, Twilio, Google Calendar API, Stripe, Groq LLM, and Google Places API over a MongoDB data store.",
      architectureNodes: [
        {
          title: "1. Web Client",
          subtitle: "React + TypeScript",
          items: ["Client Dashboard", "Call & Lead History", "Account Settings"],
          type: "frontend",
        },
        {
          title: "2. Application Services",
          subtitle: "Node.js + Express",
          items: ["Route Handlers", "Authentication Middleware", "smsProvider Abstraction"],
          type: "backend",
        },
        {
          title: "3. Telephony & Voice Integrations",
          subtitle: "Retell AI + Twilio",
          items: ["Voice Agent Processing", "Inbound Call Routing", "SMS Booking Delivery"],
          type: "service",
        },
        {
          title: "4. External APIs & AI",
          subtitle: "Google Calendar + Groq + Stripe",
          items: ["Google Calendar OAuth Sync", "Groq LLM Lead Scoring", "Stripe Billing", "Google Places Data"],
          type: "external",
        },
        {
          title: "5. Database",
          subtitle: "MongoDB",
          items: ["Tenant Accounts", "Lead Profiles", "Booking & Call Schemas"],
          type: "database",
        },
      ],
      features: [
        "Conversational Voice AI: Voice receptionist integration handling inbound phone inquiries.",
        "Google Calendar Integration: Appointment scheduling with tenant isolation for shared calendar fallbacks.",
        "SMS Booking Follow-Up: Direct SMS dispatch for booking links and appointment notifications.",
        "Lead Qualification Pipeline: Automated lead scoring using Groq LLM, Google Places data, and human review options.",
        "Subscription Billing: Tiered usage billing integrated with Stripe API.",
        "Marketing Integrations: Agentic marketing workflows and social media publishing integrations.",
      ],
      engineeringDecisions: [
        {
          title: "SMS Provider Abstraction Layer",
          context: "Relying on silent fallbacks masked messaging delivery failures from administrators.",
          decision: "Constructed a unified `smsProvider()` abstraction layer to handle SMS dispatches.",
          rationale: "Ensures truthful reporting of provider success and failure results without hiding delivery status behind unverified fallback assumptions.",
        },
        {
          title: "Tenant & In-Run Deduplication",
          context: "Repeated inbound events risks triggering redundant, costly LLM qualification queries.",
          decision: "Implemented tenant and in-run deduplication logic prior to executing Groq LLM requests.",
          rationale: "Prevents unnecessary external API calls and minimizes API quota consumption.",
        },
        {
          title: "Server-Side OAuth Token Protection",
          context: "Google Calendar OAuth tokens contain sensitive credentials that must never leak to frontend bundles.",
          decision: "Kept OAuth token management strictly server-side and excluded sensitive credential fields from public API responses.",
          rationale: "Maintains strong security posture while ensuring tenant isolation for calendar operations.",
        },
      ],
      challenges: [
        {
          title: "Truthful Messaging Provider Result Handling",
          problem: "Silent fallbacks previously obscured whether SMS notifications successfully reached recipients.",
          rootCause: "Unverified fallback logic swallowed provider failure codes.",
          solution: "Refactored SMS delivery handlers to capture and report explicit provider response statuses accurately.",
        },
        {
          title: "Social Media Publishing Payload Normalization",
          problem: "Different social platforms (such as Instagram Reels) require specific media payload formatting.",
          rootCause: "Platform API variations in video aspect ratios and upload metadata.",
          solution: "Implemented server-side payload normalization to format social publishing payloads prior to transmission.",
        },
      ],
      reliabilityPatterns: [
        "Truthful provider success/failure status handling",
        "Tenant isolation for shared calendar fallback resources",
        "Deduplication prior to expensive LLM qualification calls",
      ],
      securityConsiderations: [
        "OAuth refresh tokens and API secret keys remain strictly server-side",
        "Sensitive OAuth credential fields are excluded from public API responses",
        "Server-side input validation on incoming application endpoints",
      ],
      integrations: [
        { name: "Retell AI", purpose: "Voice agent speech processing and dialog flow", category: "AI / LLM" },
        { name: "Twilio API", purpose: "Voice telephony routing and SMS notification delivery", category: "Telephony" },
        { name: "Google Calendar API", purpose: "Calendar availability and appointment slot booking", category: "Calendar" },
        { name: "Stripe API", purpose: "Subscription tier billing and payment management", category: "Payments" },
        { name: "Groq LLM", purpose: "Fast lead qualification and scoring", category: "AI / LLM" },
        { name: "Google Places API", purpose: "Business location enrichment data", category: "Other" },
      ],
      lessonsLearned: [
        "Surfacing truthful provider success/failure results provides essential operational clarity.",
        "Protecting OAuth credentials server-side maintains secure tenant boundaries across third-party APIs.",
      ],
    },
  },
  {
    id: "ecommerce-hub",
    slug: "ai-ecommerce-automation-hub",
    title: "AI E-commerce Automation Hub",
    shortDescription:
      "Next.js operations hub integrating n8n-based automation workflows, PostgreSQL, and Prisma for automated order, customer, and inventory management.",
    longDescription:
      "An automated e-commerce operations hub designed to streamline order fulfillment and inventory management. Powered by Next.js App Router, TypeScript, PostgreSQL, and Prisma ORM, it connects with n8n-based automation workflows for operational tasks.",
    category: "Full-Stack SaaS",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "n8n Automation",
      "Tailwind CSS",
    ],
    highlights: [
      "Server-authoritative order creation and stock validation",
      "n8n-based automation workflows for order and inventory events",
      "Relational data model built with PostgreSQL and Prisma ORM",
      "Immutable OrderItem unit-price snapshotting",
    ],
    responsibilities: [
      "Designed PostgreSQL relational schemas for Customer, Order, and OrderItem models",
      "Implemented POST /api/orders endpoint with server-authoritative price recalculation",
      "Configured atomic Prisma transactions ($transaction) for order creation and stock validation",
      "Connected webhooks for n8n-based automation workflows",
    ],
    projectType: "SaaS Product",
    featured: true,
    status: "Active Development",
    caseStudy: {
      overview:
        "The AI E-commerce Automation Hub is a full-stack web application designed for order management and operational automation. It acts as an authoritative control center between store interfaces and background n8n-based automation workflows.",
      problem:
        "Relying on client-supplied product pricing in order submissions introduces severe price-tampering vulnerabilities, while manual inventory updating across channels causes fulfillment delays.",
      solution:
        "Built a server-authoritative Next.js backend powered by PostgreSQL and Prisma ORM. When an order is placed (`POST /api/orders`), the server reloads fresh prices directly from the database, validates stock, executes an atomic Prisma transaction, and dispatches webhooks to n8n-based automation workflows.",
      architectureDescription:
        "The system enforces server authority. Client cart submissions send product IDs and quantities. The Next.js API handler fetches current prices from PostgreSQL, validates inventory, commits a Prisma `$transaction`, stores unit-price snapshots, and dispatches webhooks to n8n-based automation workflows.",
      architectureNodes: [
        {
          title: "1. Storefront & Cart",
          subtitle: "React + Tailwind CSS",
          items: ["Product Catalog", "Client Cart Component", "Checkout Trigger"],
          type: "frontend",
        },
        {
          title: "2. Server-Authoritative API",
          subtitle: "Next.js Route Handlers",
          items: ["POST /api/orders", "Server Price Recalculation", "Stock Validation"],
          type: "backend",
        },
        {
          title: "3. Database Layer",
          subtitle: "PostgreSQL + Prisma ORM",
          items: ["Customer & Order Models", "OrderItem Price Snapshots", "Atomic $transaction Block"],
          type: "database",
        },
        {
          title: "4. Automation Workflows",
          subtitle: "n8n Integrations",
          items: ["Order Event Webhooks", "n8n-Based Automation Workflows"],
          type: "service",
        },
      ],
      features: [
        "Server-Authoritative Pricing: Recalculates order totals on the server using PostgreSQL records instead of trusting client price inputs.",
        "Atomic Prisma Transactions: Uses `$transaction` blocks to ensure customer upsert, order creation, and stock updates commit together.",
        "OrderItem Unit-Price Snapshots: Saves historical unit prices on OrderItem records at purchase time.",
        "n8n Automation Integrations: Emits event webhooks to trigger n8n-based automation workflows.",
      ],
      engineeringDecisions: [
        {
          title: "Server-Authoritative Price Reloading",
          context: "Trusting client-side cart price values creates a critical security risk (price spoofing).",
          decision: "Configured `POST /api/orders` to accept only product IDs and quantities, querying authoritative prices directly from PostgreSQL.",
          rationale: "Eliminates client-side price tampering attack vectors and ensures complete billing integrity.",
        },
        {
          title: "Atomic Prisma Transactions",
          context: "Multi-step order creation involves customer upserting, order generation, and stock checking across database tables.",
          decision: "Wrapped database operations in a single Prisma `$transaction` call.",
          rationale: "Guarantees database consistency so that all related records write successfully or roll back safely.",
        },
      ],
      challenges: [
        {
          title: "Validating Cart Payloads Server-Side",
          problem: "Malformed or out-of-stock item payloads submitted to checkout could cause database mutation errors.",
          rootCause: "Unchecked client payloads reaching query execution steps.",
          solution: "Added strict input validation and inventory checks before initiating Prisma transaction blocks.",
        },
      ],
      reliabilityPatterns: [
        "Atomic database transactions (`$transaction`) for multi-record order commits",
        "Immutable unit-price snapshotting on `OrderItem` schema records",
      ],
      securityConsiderations: [
        "Server-side price recalculation avoids trusting client-supplied pricing data",
        "Type-safe query inputs and database ORM layer via Prisma",
      ],
      integrations: [
        { name: "PostgreSQL", purpose: "Relational database for products, customers, and orders", category: "Database" },
        { name: "Prisma ORM", purpose: "Type-safe database access and migration management", category: "Database" },
        { name: "n8n", purpose: "n8n-based automation workflows", category: "Automation" },
      ],
      lessonsLearned: [
        "Server-authoritative logic is essential for financial transaction security.",
        "Storing historical unit-price snapshots protects order records against future catalog changes.",
      ],
    },
  },
  {
    id: "career-copilot",
    slug: "career-copilot-ai",
    title: "Career Copilot AI",
    shortDescription:
      "Intelligent career assistance platform utilizing RAG (Retrieval-Augmented Generation), FastAPI, and React for targeted project & role guidance.",
    longDescription:
      "Career Copilot AI is a context-aware guidance application built with FastAPI on the backend and React on the frontend. It utilizes Retrieval-Augmented Generation (RAG) to combine candidate career information with LLM reasoning for targeted guidance.",
    category: "AI Integration",
    technologies: [
      "FastAPI",
      "Python",
      "React",
      "TypeScript",
      "RAG Architecture",
      "LLM Integration",
    ],
    highlights: [
      "RAG architecture combining document context with LLM prompts",
      "FastAPI Python backend for asynchronous route execution",
      "Interactive React interface for career guidance queries",
    ],
    responsibilities: [
      "Implemented FastAPI RAG retrieval endpoints and context formatting",
      "Built interactive React frontend application for query sessions",
      "Structured prompt templates to inject candidate context into LLM calls",
    ],
    projectType: "AI System",
    featured: true,
    status: "Production",
    caseStudy: {
      overview:
        "Career Copilot AI is a RAG-powered application designed to provide context-aware career guidance by combining candidate documentation with language model reasoning.",
      problem:
        "Generic LLM prompts lack specific context regarding an individual engineer's actual project background and target role requirements.",
      solution:
        "Constructed a Retrieval-Augmented Generation pipeline using FastAPI and Python. Relevant document context is retrieved and formatted into LLM prompts to deliver grounded responses.",
      architectureDescription:
        "The application pairs a React frontend with a FastAPI Python service. User queries trigger context retrieval before passing structured context to the LLM service.",
      architectureNodes: [
        {
          title: "1. React Frontend UI",
          subtitle: "React + TypeScript",
          items: ["Query Interface", "Response Display", "Document Context Selector"],
          type: "frontend",
        },
        {
          title: "2. FastAPI Backend",
          subtitle: "Python Asynchronous Service",
          items: ["API Routes", "Context Retrieval Logic", "Prompt Formatting Engine"],
          type: "backend",
        },
        {
          title: "3. RAG Retrieval Engine",
          subtitle: "Context Matching",
          items: ["Candidate Document Index", "Prompt Context Injector"],
          type: "service",
        },
        {
          title: "4. LLM Service",
          subtitle: "Language Model Integration",
          items: ["Prompt Execution", "Response Synthesis"],
          type: "external",
        },
      ],
      features: [
        "RAG Context Retrieval: Ingests document context to inform LLM generation.",
        "FastAPI Async Endpoints: Asynchronous Python backend routes for handling query requests.",
        "Context-Bounded Prompting: Formats prompt structures to incorporate candidate document details.",
        "Interactive React Interface: Responsive client UI for Q&A interaction.",
      ],
      engineeringDecisions: [
        {
          title: "FastAPI Asynchronous Route Architecture",
          context: "LLM API interactions involve network waiting times for response streaming.",
          decision: "Selected FastAPI with Python asynchronous route handling.",
          rationale: "Provides clean asynchronous routing for non-blocking I/O handling during external API calls.",
        },
        {
          title: "Context-Bounded Prompt Formatting",
          context: "LLM outputs require relevant candidate details to produce useful career insights.",
          decision: "Structured prompt templates to inject retrieved document context directly into requests.",
          rationale: "Improves factual alignment with candidate experience details.",
        },
      ],
      challenges: [
        {
          title: "Formatting Unstructured Document Context",
          problem: "Raw document text required clean formatting before prompt insertion.",
          rootCause: "Inconsistent formatting across source candidate notes.",
          solution: "Implemented text normalization steps prior to context prompt assembly.",
        },
      ],
      reliabilityPatterns: [
        "Asynchronous route handling in Python via FastAPI",
        "Structured prompt template schemas for context injection",
      ],
      securityConsiderations: [
        "API secret keys stored securely in server environment variables",
        "Input sanitization on user query strings",
      ],
      integrations: [
        { name: "FastAPI", purpose: "Python backend API framework", category: "Backend" },
        { name: "React", purpose: "Frontend user interface framework", category: "Frontend" },
        { name: "LLM Service", purpose: "Language model generation API", category: "AI / LLM" },
      ],
      lessonsLearned: [
        "Structuring input context cleanly directly improves language model response relevance.",
        "Asynchronous Python frameworks provide an effective backend layer for AI services.",
      ],
    },
  },
];
