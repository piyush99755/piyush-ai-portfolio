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
    repositoryVisibility: "private",
    thumbnail: "/projects/myfelipe/thumbnail.png",
    screenshots: [
      "/projects/myfelipe/01-sms-reliability-case-study.png",
      "/projects/myfelipe/02-prospecting-leads-dashboard.png",
      "/projects/myfelipe/03-prospecting-leads-results.png",
      "/projects/myfelipe/04-prospecting-run-configuration.png",
      "/projects/myfelipe/05-marketing-control-center.png",
    ],
    caseStudy: {
      overview:
        "MyFelipe AI Receptionist is an automated voice and marketing platform for service providers. It pairs conversational voice AI agents with live calendar booking, automated SMS follow-ups, lead qualification pipelines, and social marketing integrations.",
      problem:
        "Service businesses frequently miss inbound calls during peak hours or after business hours, leading to delayed scheduling, uncaptured prospective leads, and lost revenue.",
      solution:
        "Integrated Retell AI voice agents with Twilio telephony and Google Calendar API. When callers dial in, the voice agent conducts natural conversations, captures lead details, triggers booking-link dispatches via SMS, and records structured lead profiles in MongoDB.",
      roleDescription:
        "Full-stack web application development, voice AI integration, SMS workflow engineering, third-party API integration, and database architecture.",
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
          items: ["Voice Agent Processing", "Phone Call Workflow", "send_booking_link Tool"],
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
          items: ["Tenant Settings", "Lead Profiles", "Booking & Call Schemas"],
          type: "database",
        },
      ],
      coreWorkflow: [
        {
          stepNumber: 1,
          title: "Phone Call Connection",
          actor: "Customer Phone Caller",
          action: "Dials business phone number",
          technicalDetail: "Caller reaches the Twilio-connected business number and is connected to the Retell AI voice receptionist.",
        },
        {
          stepNumber: 2,
          title: "Retell AI Voice Intake",
          actor: "Retell AI Voice Agent",
          action: "Conducts natural speech dialog with caller",
          technicalDetail: "Collects caller details and booking intent through the voice conversation.",
        },
        {
          stepNumber: 3,
          title: "send_booking_link Tool Trigger",
          actor: "Retell Agent Tool Execution",
          action: "Invokes send_booking_link tool handler on Node.js backend",
          technicalDetail: "Passes the caller information required by the backend to generate and send the booking link.",
        },
        {
          stepNumber: 4,
          title: "SMS Booking URL Delivery",
          actor: "smsProvider Abstraction Layer",
          action: "Dispatches SMS containing personalized booking URL",
          technicalDetail: "The shared smsProvider abstraction reports provider success or failure truthfully instead of silently falling back and reporting a false success.",
        },
        {
          stepNumber: 5,
          title: "Web Booking & Calendar Synchronization",
          actor: "User Browser & Google Calendar",
          action: "User completes public web booking page",
          technicalDetail: "User selects an appointment slot on the public booking page, after which the booking is persisted and synchronized with the appropriate Google Calendar workflow.",
        },
      ],
      features: [
        "Conversational Voice AI: Voice receptionist integration handling inbound phone inquiries.",
        "Google Calendar Integration: Appointment scheduling with tenant isolation for shared calendar fallbacks.",
        "SMS Booking Follow-Up: Direct SMS dispatch for booking links and appointment notifications.",
        "Lead Qualification Pipeline: Automated lead scoring using Groq LLM, Google Places data, and human review options.",
        "Subscription Billing: Tiered usage billing integrated with Stripe API.",
        "Agentic Marketing System: Social media publishing integrations and automated campaign workflows.",
      ],
      backendMechanisms: [
        {
          title: "Truthful smsProvider Abstraction",
          description: "Constructed a unified messaging provider abstraction that reports provider success or failure truthfully instead of silently falling back and reporting a false success.",
          keyTakeaway: "Eliminates silent delivery failures and guarantees delivery status visibility.",
        },
        {
          title: "Tenant OAuth & Calendar Fallback",
          description: "Manages tenant-isolated Google Calendar OAuth refresh tokens with secondary fallback account support.",
          keyTakeaway: "Prevents calendar sync outages while maintaining strict server-side credential boundaries.",
        },
        {
          title: "Groq LLM Lead Qualification Pipeline",
          description: "Combines Google Places API business data with Groq LLM prompts to score prospective leads before human review.",
          keyTakeaway: "Automates high-value lead discovery while providing human override controls.",
        },
        {
          title: "Social Payload Normalization",
          description: "Normalizes video aspect ratios and upload metadata server-side prior to transmitting Instagram Reel publishing payloads.",
          keyTakeaway: "Resolves platform API rejection errors caused by unformatted media metadata.",
        },
      ],
      dataPersistence: [
        {
          modelName: "Tenant Settings & OAuth Credentials",
          purpose: "Stores organization settings, Retell agent IDs, Stripe customer IDs, and OAuth tokens.",
          keyFieldsOrPatterns: ["tenantId", "retellAgentId", "stripeSubscriptionId", "googleOAuthTokens"],
        },
        {
          modelName: "Lead Records & Call Summary Logs",
          purpose: "Tracks caller details, qualification scores, call transcripts, and booking states.",
          keyFieldsOrPatterns: ["callerPhone", "qualificationScore", "status", "callSummary"],
        },
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
        "Truthful provider success/failure status handling without silent fallback masking",
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
    repositoryVisibility: "public",
    githubUrl: "https://github.com/piyush99755/ai-ecommerce-automation-hub",
    thumbnail: "/projects/ecommerce-hub/thumbnail.png",
    screenshots: [
      "/projects/ecommerce-hub/01-operations-dashboard.png",
      "/projects/ecommerce-hub/02-inventory-operations.png",
      "/projects/ecommerce-hub/03-automation-reliability.png",
      "/projects/ecommerce-hub/04-grounded-ai-support.png",
      "/projects/ecommerce-hub/05-admin-ai-copilot.png",
      "/projects/ecommerce-hub/06-customer-crm.png",
      "/projects/ecommerce-hub/07-admin-audit-trail.png",
      "/projects/ecommerce-hub/08-analytics-bi.png",
    ],
    caseStudy: {
      overview:
        "The AI E-commerce Automation Hub is a full-stack web application designed for order management and operational automation. It acts as an authoritative control center between store interfaces and background n8n-based automation workflows.",
      problem:
        "Relying on client-supplied product pricing in order submissions introduces severe price-tampering vulnerabilities, while manual inventory updating across channels causes fulfillment delays.",
      solution:
        "Built a server-authoritative Next.js backend powered by PostgreSQL and Prisma ORM. When an order is placed (`POST /api/orders`), the server reloads fresh prices directly from the database, validates stock, and executes an atomic Prisma transaction.",
      roleDescription:
        "Full-stack application development, database schema design, and server-authoritative API route implementation.",
      architectureDescription:
        "The system enforces server authority. Client cart submissions send product IDs and quantities. The Next.js API handler fetches current prices from PostgreSQL, validates inventory stock availability, commits a Prisma `$transaction`, and stores unit-price snapshots.",
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
          title: "4. Operational Automation",
          subtitle: "n8n Integration",
          items: ["n8n-Based Automation Workflows"],
          type: "service",
        },
      ],
      coreWorkflow: [
        {
          stepNumber: 1,
          title: "Client Cart Submission",
          actor: "Browser Client Cart",
          action: "Triggers checkout submit to POST /api/orders",
          technicalDetail: "Sends payload containing product IDs and quantities. Client price values are strictly ignored.",
        },
        {
          stepNumber: 2,
          title: "Payload Validation & Price Reload",
          actor: "Next.js Route Handler",
          action: "Fetches current Product records from PostgreSQL",
          technicalDetail: "Reloads authoritative prices and verifies inventory stock levels for each requested line item.",
        },
        {
          stepNumber: 3,
          title: "Atomic Transaction Execution",
          actor: "Prisma ORM ($transaction)",
          action: "Executes multi-record database transaction block",
          technicalDetail: "Upserts Customer record, creates Order record, and generates OrderItem unit-price snapshots.",
        },
        {
          stepNumber: 4,
          title: "Operational Workflows",
          actor: "n8n Automation Engine",
          action: "n8n-based automation workflows",
          technicalDetail: "n8n-based automation workflows are integrated with the broader e-commerce operations project.",
        },
      ],
      features: [
        "Server-Authoritative Pricing: Recalculates order totals on the server using PostgreSQL records instead of trusting client price inputs.",
        "Atomic Prisma Transactions: Uses `$transaction` blocks to ensure customer upsert, order creation, and unit-price snapshots commit together.",
        "OrderItem Unit-Price Snapshots: Saves historical unit prices on OrderItem records at purchase time.",
        "n8n Automation Integrations: n8n-based automation workflows are integrated with the broader e-commerce operations project.",
      ],
      backendMechanisms: [
        {
          title: "Server-Authoritative Price Recalculation",
          description: "Disregards client cart prices and calculates order totals using live PostgreSQL records.",
          keyTakeaway: "Completely eliminates client-side price tampering attack vectors.",
        },
        {
          title: "Atomic Prisma Transactions",
          description: "Wraps customer upserting, order generation, and unit-price snapshotting in a single `$transaction` call.",
          keyTakeaway: "Guarantees complete database consistency across multi-record writes.",
        },
        {
          title: "Immutable Unit Price Snapshots",
          description: "Stores historical unit prices on OrderItem records at checkout.",
          keyTakeaway: "Protects financial audit trail against future product catalog price changes.",
        },
      ],
      dataPersistence: [
        {
          modelName: "Customer",
          purpose: "Stores customer contact information, email, and order history relationships.",
          keyFieldsOrPatterns: ["id", "email", "name", "orders"],
        },
        {
          modelName: "Product",
          purpose: "Authoritative catalog data, live unit price, SKU, and available inventory stock.",
          keyFieldsOrPatterns: ["id", "title", "price", "stockQuantity"],
        },
        {
          modelName: "Order",
          purpose: "Header order record containing calculated total, status, customer relation, and timestamp.",
          keyFieldsOrPatterns: ["id", "customerId", "totalAmount", "status", "createdAt"],
        },
        {
          modelName: "OrderItem",
          purpose: "Line item snapshot capturing historical unit price and quantity at time of purchase.",
          keyFieldsOrPatterns: ["id", "orderId", "productId", "quantity", "unitPriceSnapshot"],
        },
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
          context: "Multi-step order creation involves customer upserting, order generation, and stock validation across database tables.",
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
    repositoryVisibility: "public",
    githubUrl: "https://github.com/piyush99755/career-copilot-ai",
    thumbnail: "/projects/career-copilot/thumbnail.png",
    screenshots: [
      "/projects/career-copilot/01-career-analysis.png",
      "/projects/career-copilot/02-resume-match-analysis.png",
      "/projects/career-copilot/03-career-chat.png",
      "/projects/career-copilot/04-backend-api-overview.png",
      "/projects/career-copilot/05-learning-roadmap.png",
    ],
    caseStudy: {
      overview:
        "Career Copilot AI is a RAG-powered application designed to provide context-aware career guidance by combining candidate documentation with language model reasoning.",
      problem:
        "Generic LLM prompts lack specific context regarding an individual engineer's actual project background and target role requirements.",
      solution:
        "Constructed a Retrieval-Augmented Generation pipeline using FastAPI and Python. Relevant document context is retrieved through RAG and formatted into LLM prompts to deliver grounded responses.",
      roleDescription:
        "Frontend and backend development for AI-assisted career guidance application.",
      architectureDescription:
        "The application pairs a React frontend with a FastAPI Python service. User queries trigger context retrieval through RAG before passing grounded context to the LLM service.",
      architectureNodes: [
        {
          title: "1. React Frontend UI",
          subtitle: "React + TypeScript",
          items: ["Query Interface", "Response Display"],
          type: "frontend",
        },
        {
          title: "2. FastAPI Backend",
          subtitle: "Python Asynchronous Service",
          items: ["API Routes", "Context Retrieval Logic"],
          type: "backend",
        },
        {
          title: "3. RAG Retrieval Engine",
          subtitle: "Context Retrieval",
          items: ["Relevant Context Retrieval"],
          type: "service",
        },
        {
          title: "4. LLM Service",
          subtitle: "Language Model Integration",
          items: ["Grounded Context Reasoning", "Response Synthesis"],
          type: "external",
        },
      ],
      coreWorkflow: [
        {
          stepNumber: 1,
          title: "User Query Input",
          actor: "React Frontend UI",
          action: "Submits career inquiry to FastAPI backend",
          technicalDetail: "Sends user query to Python backend endpoint.",
        },
        {
          stepNumber: 2,
          title: "FastAPI Backend Intake",
          actor: "FastAPI / Python Backend",
          action: "Receives request and initiates RAG context retrieval",
          technicalDetail: "Executes non-blocking asynchronous route handler.",
        },
        {
          stepNumber: 3,
          title: "RAG Context Retrieval",
          actor: "RAG Architecture",
          action: "Retrieves relevant background context",
          technicalDetail: "Fetches candidate background context relevant to query.",
        },
        {
          stepNumber: 4,
          title: "LLM Response Synthesis",
          actor: "LLM Integration",
          action: "Language model receives grounded context and returns career-oriented response",
          technicalDetail: "Returns synthesized response to React UI.",
        },
      ],
      features: [
        "RAG Context Retrieval: Combines document context with LLM prompts to inform response generation.",
        "FastAPI Async Endpoints: Asynchronous Python backend routes for handling query requests.",
        "Context-Grounded Prompting: Formats prompt structures to incorporate relevant background context.",
        "Interactive React Interface: Responsive client UI for Q&A interaction.",
      ],
      backendMechanisms: [
        {
          title: "Asynchronous FastAPI Backend",
          description: "Utilizes Python async route handlers for non-blocking I/O execution during external LLM API calls.",
          keyTakeaway: "Maintains responsive server behavior under concurrent user query sessions.",
        },
        {
          title: "Grounded Context Assembly",
          description: "Incorporate relevant background context into system prompt templates.",
          keyTakeaway: "Ensures LLM responses remain grounded in candidate experience details.",
        },
      ],
      engineeringDecisions: [
        {
          title: "FastAPI Asynchronous Route Architecture",
          context: "LLM API interactions involve network waiting times for response streaming.",
          decision: "Selected FastAPI with Python asynchronous route handling.",
          rationale: "Provides clean asynchronous routing for non-blocking I/O handling during external API calls.",
        },
        {
          title: "Context-Grounded Prompt Formatting",
          context: "LLM outputs require relevant candidate details to produce useful career insights.",
          decision: "Structured prompt templates to inject retrieved background context directly into requests.",
          rationale: "Improves factual alignment with candidate experience details.",
        },
      ],
      challenges: [
        {
          title: "Formatting Background Context",
          problem: "Raw background text required clean formatting before prompt insertion.",
          rootCause: "Inconsistent formatting across source notes.",
          solution: "Implemented text formatting steps prior to context prompt assembly.",
        },
      ],
      reliabilityPatterns: [
        "Asynchronous route handling in Python via FastAPI",
        "Structured prompt templates for context injection",
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
