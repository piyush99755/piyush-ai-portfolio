# Piyush Tadvi — AI & Full-Stack Engineering Portfolio

A production-quality personal portfolio application featuring structured project case studies, canonical evidence grounding, an interactive RAG-powered chatbot (**Ask Piyush AI**), and an inspectable recruiter **Job-Fit Analyzer**.

Built with Next.js App Router (v16), TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion, and Lucide React. Designed for seamless deployment on **Cloudflare Workers**.

---

## 🌟 Key Features

### 1. Canonical Evidence Grounding Architecture
- **Single Source of Truth:** Portfolio UI and AI features share the exact same canonical datasets (`data/bio.ts`, `data/skills.ts`, `data/experience.ts`, `data/projects.ts`).
- **Grounded Assistant Contract:** Answers are constructed strictly from verified portfolio evidence. If evidence is missing for an unverified topic (e.g. Kubernetes, AWS Certifications), the assistant explicitly reports missing evidence rather than hallucinating qualifications.

### 2. Ask Piyush AI (`/ask`)
- **Interactive Portfolio Chatbot:** Recruiters and engineering managers can ask natural-language questions about Piyush's engineering experience, skills, tech stack, and architecture decisions.
- **Local Inspectable Retrieval:** Token matching, title/keyword boosts, and technology alias maps score relevance deterministically without needing heavy vector databases.
- **Conversational Context:** Retains recent conversation history to resolve follow-up references (*"What did he do with SMS?"* after asking about MyFelipe).

### 3. Recruiter Job-Fit Analyzer (`/ask` → Check Job Fit Tab)
- **Deterministic Requirement Extraction:** Parses job descriptions into structured requirements across languages, frameworks, databases, cloud, education, certifications, and duration claims.
- **Weighted Scoring Algorithm:** Computes alignment score deterministically based on match states (`STRONG_MATCH`, `SUPPORTED`, `PARTIAL`, `NO_EVIDENCE`).
- **Open Gap Reporting:** Explicitly lists missing evidence (`NO_EVIDENCE`) under Gaps so recruiters receive an accurate assessment.
- **Sanitized Proficiency Language:** Strips unevidenced hype terms (*"expert-level"*, *"mastery"*) in favor of grounded, evidence-backed statements.

### 4. Technical Case Studies (`/projects/[slug]`)
- **Comprehensive Blueprints:** 12-section technical breakdowns covering Overview, Problem & Solution, Architecture Diagram Flow, Features, Engineering Decisions, Debugging Fixes, Reliability, Security, Integrations, and Lessons Learned.
- **Featured Projects:**
  1. *MyFelipe AI Receptionist SaaS* (React, Node.js/Express, MongoDB, Retell AI, Twilio, Google Calendar, Stripe, Groq LLM)
  2. *AI E-commerce Automation Hub* (Next.js, PostgreSQL, Prisma ORM, n8n-based automation workflows)
  3. *Career Copilot AI* (FastAPI, Python, React, RAG Architecture, LLM context integration)

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16.3.4 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`) & shadcn/ui
- **Icons & Motion:** Lucide React & Framer Motion
- **AI Integration:** Google Gemini API (`gemini-3.6-flash`) via Web Standard `fetch` & `AbortController`
- **Testing:** Automated Node test suites (`npx tsx scripts/test-ai-suite.ts`, `npx tsx scripts/test-job-fit-suite.ts`)
- **Deployment Target:** Cloudflare Workers (`https://piyushtadvi.co.uk`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/piyush99755/piyush-ai-portfolio.git
cd piyush-ai-portfolio

# Install dependencies
npm install
```

### Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure `.env.local`:
```env
# AI Provider Configuration
AI_PROVIDER=gemini
AI_MODEL=gemini-3.6-flash

# API Key (Required for live Gemini LLM response synthesis; if omitted in dev, FallbackProvider operates gracefully)
AI_API_KEY=your_gemini_api_key_here
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Verification & Testing Commands

```bash
# Code Quality Checks
npm run lint          # Run ESLint validation
npx tsc --noEmit      # Run TypeScript type check
npm run build         # Verify Next.js production compilation & static page generation

# Automated AI Test Suites
npx tsx scripts/test-ai-suite.ts       # Run Phase 4 AI Assistant Hardening Test Suite
npx tsx scripts/test-job-fit-suite.ts  # Run Phase 5 Job-Fit Analyzer Test Suite
```

---

## 🔒 Security & Privacy Principles

- **No Persisted Data:** Job descriptions and recruiter chat queries are analyzed in-memory and are never stored in databases.
- **Server/Client Boundaries:** API keys, prompt context building, and provider execution remain strictly server-side.
- **Git Protection:** `.env.local` is ignored by Git, ensuring API keys and credentials are never tracked or committed.
- **Security Headers:** Configured with `nosniff`, `strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, and `Permissions-Policy`.

---

## 📁 Repository Structure Overview

```text
piyush-AI-portfolio/
├── app/
│   ├── api/ai/
│   │   ├── chat/route.ts      # Ask Piyush AI chatbot endpoint
│   │   └── job-fit/route.ts   # Job-Fit Analyzer endpoint
│   ├── ask/page.tsx           # Interactive AI & Job Fit tabbed interface
│   ├── projects/[slug]/page.tsx # Dynamic project case study pages
│   ├── layout.tsx             # Root layout, metadataBase, & JSON-LD schema
│   ├── not-found.tsx          # Custom 404 page
│   ├── sitemap.ts             # Production sitemap generator
│   └── robots.ts              # Production robots.txt generator
├── components/
│   ├── ai/                    # Chat interface, Job Fit result, source badges
│   ├── layout/                # Container, Navbar, Footer
│   ├── projects/              # Architecture diagram, decision & challenge cards
│   └── sections/              # Hero, About, Skills, Featured Projects, Experience, AI Teaser
├── data/                      # Canonical data source of truth (bio, skills, experience, projects)
├── lib/ai/                    # Retrieval engine, knowledge generator, scoring, provider abstraction
├── scripts/                   # Automated test runners
├── types/                     # TypeScript schema definitions
└── next.config.ts             # Security headers & Turbopack configuration
```

---

## 📄 License

MIT © [Piyush Tadvi](https://piyushtadvi.co.uk)
