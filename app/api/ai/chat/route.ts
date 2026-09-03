import { NextResponse } from "next/server";
import { ChatApiRequest, ChatMessage } from "@/types/ai";
import { retrieveKnowledge } from "@/lib/ai/retrieval";
import { getAiProvider } from "@/lib/ai/provider";

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

    // 2. Retrieval Relevance Gate
    const retrieval = retrieveKnowledge(message, sanitizedHistory, 6);

    if (!retrieval.hasSufficientEvidence) {
      return NextResponse.json({
        answer: `I don't have enough verified information in Piyush's portfolio to claim experience with that topic or request.\n\nPiyush's verified portfolio highlights expertise in Next.js, React, TypeScript, Node.js/Express, FastAPI/Python, Retell AI, Twilio, Google Calendar, Stripe, PostgreSQL, MongoDB, Prisma, and RAG architectures.`,
        sources: [],
        retrievedDocsCount: 0,
      });
    }

    // 3. Provider Execution for Evidence-Backed Queries
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
