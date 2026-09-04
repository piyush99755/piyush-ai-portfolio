import { NextResponse } from "next/server";
import { ChatApiRequest, ChatMessage, SourceCitation } from "@/types/ai";
import { retrieveKnowledge } from "@/lib/ai/retrieval";
import { getAiProvider } from "@/lib/ai/provider";

function checkRepoIntent(message: string): {
  isRepoQuery: boolean;
  projectKey?: "ecommerce-hub" | "career-copilot" | "myfelipe-ai" | "profile";
} {
  const msgLower = message.toLowerCase();

  const repoKeywords = [
    "github",
    "repository",
    "repo",
    "source code",
    "code link",
    "where can i see the code",
    "see the code",
    "show me the code",
    "code for",
    "link to the code",
    "view the code",
    "view code",
  ];

  const hasRepoKeyword = repoKeywords.some((kw) => msgLower.includes(kw));
  if (!hasRepoKeyword) {
    return { isRepoQuery: false };
  }

  if (
    msgLower.includes("ecommerce") ||
    msgLower.includes("e-commerce") ||
    msgLower.includes("automation hub") ||
    msgLower.includes("storefront")
  ) {
    return { isRepoQuery: true, projectKey: "ecommerce-hub" };
  }

  if (
    msgLower.includes("career copilot") ||
    msgLower.includes("career-copilot") ||
    msgLower.includes("career ai")
  ) {
    return { isRepoQuery: true, projectKey: "career-copilot" };
  }

  if (
    msgLower.includes("myfelipe") ||
    msgLower.includes("receptionist") ||
    msgLower.includes("felipe")
  ) {
    return { isRepoQuery: true, projectKey: "myfelipe-ai" };
  }

  if (
    msgLower.includes("github") ||
    msgLower.includes("profile") ||
    msgLower.includes("repositories")
  ) {
    return { isRepoQuery: true, projectKey: "profile" };
  }

  return { isRepoQuery: false };
}

export async function POST(req: Request) {
  try {
    const body: ChatApiRequest = await req.json();

    // 1. Input Validation
    if (!body || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "Invalid request payload. 'message' field is required." },
        { status: 400 }
      );
    }

    const message = body.message.trim();
    if (!message) {
      return NextResponse.json(
        { error: "Message cannot be empty." },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "Message exceeds maximum length of 500 characters." },
        { status: 400 }
      );
    }

    // 2. Deterministic Repository-Intent Bypass (bypasses LLM generation entirely)
    const repoIntent = checkRepoIntent(message);
    if (repoIntent.isRepoQuery && repoIntent.projectKey) {
      if (repoIntent.projectKey === "ecommerce-hub") {
        return NextResponse.json({
          answer:
            "The source code for the AI E-commerce Automation Hub is available on GitHub:\n\nhttps://github.com/piyush99755/ai-ecommerce-automation-hub",
          sources: [
            {
              title: "AI E-commerce Automation Hub",
              type: "project-overview",
              projectSlug: "ai-ecommerce-automation-hub",
              href: "/projects/ai-ecommerce-automation-hub",
            },
          ] as SourceCitation[],
          retrievedDocsCount: 1,
        });
      }

      if (repoIntent.projectKey === "career-copilot") {
        return NextResponse.json({
          answer:
            "The source code for Career Copilot AI is available on GitHub:\n\nhttps://github.com/piyush99755/career-copilot-ai",
          sources: [
            {
              title: "Career Copilot AI",
              type: "project-overview",
              projectSlug: "career-copilot-ai",
              href: "/projects/career-copilot-ai",
            },
          ] as SourceCitation[],
          retrievedDocsCount: 1,
        });
      }

      if (repoIntent.projectKey === "myfelipe-ai") {
        return NextResponse.json({
          answer:
            "The MyFelipe source code is part of a private client repository and is not publicly available.\n\nYou can view the detailed technical case study here:\nhttps://piyushtadvi.co.uk/projects/myfelipe-ai-receptionist",
          sources: [
            {
              title: "MyFelipe AI Receptionist SaaS",
              type: "project-overview",
              projectSlug: "myfelipe-ai-receptionist",
              href: "/projects/myfelipe-ai-receptionist",
            },
          ] as SourceCitation[],
          retrievedDocsCount: 1,
        });
      }

      if (repoIntent.projectKey === "profile") {
        return NextResponse.json({
          answer:
            "Piyush's public GitHub profile and code repositories are available at:\n\nhttps://github.com/piyush99755",
          sources: [
            {
              title: "Piyush Tadvi — GitHub Profile",
              type: "profile",
              href: "/#about",
            },
          ] as SourceCitation[],
          retrievedDocsCount: 1,
        });
      }
    }

    // Process & sanitize history (max 6 recent messages)
    const sanitizedHistory: ChatMessage[] = [];
    if (Array.isArray(body.history)) {
      body.history.slice(-6).forEach((h) => {
        if (
          h &&
          (h.role === "user" || h.role === "assistant") &&
          typeof h.content === "string"
        ) {
          sanitizedHistory.push({
            role: h.role,
            content: h.content.trim().slice(0, 500),
          });
        }
      });
    }

    // Append current user message
    sanitizedHistory.push({
      role: "user",
      content: message,
    });

    // 3. Retrieval Relevance Gate
    const retrieval = retrieveKnowledge(message, sanitizedHistory, 6);

    if (!retrieval.hasSufficientEvidence) {
      return NextResponse.json({
        answer: `I don't have enough verified information in Piyush's portfolio to claim experience with that topic or request.\n\nPiyush's verified portfolio highlights expertise in Next.js, React, TypeScript, Node.js/Express, FastAPI/Python, Retell AI, Twilio, Google Calendar, Stripe, PostgreSQL, MongoDB, Prisma, and RAG architectures.`,
        sources: [],
        retrievedDocsCount: 0,
      });
    }

    // 4. Provider Execution for Evidence-Backed Queries
    const provider = getAiProvider();
    const result = await provider.generateChatResponse({
      messages: sanitizedHistory,
      contextDocuments: retrieval.documents,
    });

    return NextResponse.json({
      answer: result.answer,
      sources: result.sources,
      retrievedDocsCount: retrieval.documents.length,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "TimeoutError") {
        return NextResponse.json(
          { error: "The AI assistant is temporarily unavailable. Please try again." },
          { status: 504 }
        );
      }
      if (error.name === "ConfigurationError") {
        return NextResponse.json(
          { error: "AI assistant service is currently unconfigured." },
          { status: 503 }
        );
      }
    }

    console.error("Error in /api/ai/chat route:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while processing your request. Please try again later.",
      },
      { status: 500 }
    );
  }
}
