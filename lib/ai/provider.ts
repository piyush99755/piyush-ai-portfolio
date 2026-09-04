import { ChatMessage, KnowledgeDocument, SourceCitation } from "@/types/ai";
import { buildSystemPromptWithContext } from "./prompts";

export interface GenerateOptions {
  messages: ChatMessage[];
  contextDocuments: KnowledgeDocument[];
}

export interface AiProviderResult {
  answer: string;
  sources: SourceCitation[];
}

export interface AiProvider {
  name: string;
  generateChatResponse(options: GenerateOptions): Promise<AiProviderResult>;
}

// 1. Fallback Provider (Dev / Offline Mode Only)
export class FallbackProvider implements AiProvider {
  name = "FallbackProvider";

  async generateChatResponse({
    messages,
    contextDocuments,
  }: GenerateOptions): Promise<AiProviderResult> {
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const sources = extractSourcesFromDocs(contextDocuments);

    if (!contextDocuments || contextDocuments.length === 0) {
      return {
        answer: `I don't have enough verified information in Piyush's portfolio to claim experience with topic or query: "${lastUserMessage}".\n\nPiyush's verified portfolio highlights expertise in Next.js, React, TypeScript, Node.js/Express, FastAPI/Python, Retell AI, Twilio, Google Calendar, Stripe, PostgreSQL, MongoDB, Prisma, and RAG architectures.`,
        sources: [],
      };
    }

    const mainDocs = contextDocuments.slice(0, 3);
    const summaryPoints = mainDocs.map(
      (doc) => `• **${doc.title}**: ${doc.content}`
    );

    const answer = `Based on Piyush's verified portfolio evidence for "${lastUserMessage}":\n\n${summaryPoints.join(
      "\n\n"
    )}\n\n*Note: Running in local fallback mode. Configure \`AI_API_KEY\` in your environment for live LLM response synthesis.*`;

    return { answer: sanitizeAnswerUrls(answer), sources };
  }
}

export function sanitizeAnswerUrls(text: string): string {
  if (!text) return text;
  let cleaned = text;

  // 1. Strip trailing svg / .svg appended to GitHub URLs
  cleaned = cleaned.replace(
    /(https:\/\/github\.com\/piyush99755\/[a-zA-Z0-9_-]+?)\.?svg\b/gi,
    "$1"
  );

  // 2. Clean Markdown links [label](url) where label or url contains newlines, spaces, or absorbed headings
  cleaned = cleaned.replace(
    /\[([^\]]*?)\]\((https:\/\/github\.com\/piyush99755\/[a-zA-Z0-9_-]+)(?:\.svg|svg)?([\s\S]*?)\)/gi,
    (match, label, rawUrl, trailingInParens) => {
      const cleanUrl = rawUrl.trim();
      let cleanLabel = label.trim().replace(/\.?svg$/i, "");

      // If label contains newline or absorbed headings, trim label to clean URL/text
      if (cleanLabel.includes("\n") || cleanLabel.includes("#")) {
        const firstLine = cleanLabel.split("\n")[0].trim();
        cleanLabel = firstLine.startsWith("http") ? firstLine : cleanUrl;
      }
      if (!cleanLabel) cleanLabel = cleanUrl;

      const trailing = trailingInParens ? trailingInParens.trim() : "";
      return `[${cleanLabel}](${cleanUrl})${trailing ? `\n\n${trailing}` : ""}`;
    }
  );

  return cleaned;
}

// 2. Google Gemini Provider (with AbortController Timeout)
export class GeminiProvider implements AiProvider {
  name = "GeminiProvider";
  private apiKey: string;
  private model: string;
  private timeoutMs: number;

  constructor(apiKey: string, model = "gemini-3.6-flash", timeoutMs = 10000) {
    this.apiKey = apiKey;
    this.model = model;
    this.timeoutMs = timeoutMs;
  }

  async generateChatResponse({
    messages,
    contextDocuments,
  }: GenerateOptions): Promise<AiProviderResult> {
    const sources = extractSourcesFromDocs(contextDocuments);
    const systemPrompt = buildSystemPromptWithContext(contextDocuments);

    const geminiContents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const payload = {
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: geminiContents,
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 800,
      },
    };

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;

    // AbortController for web-standard timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Gemini API Error:", res.status, errorText);
        throw new Error(`Gemini Provider API returned status ${res.status}`);
      }

      const data = await res.json();
      const candidateText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm sorry, I could not generate a response from the provider.";

      return {
        answer: sanitizeAnswerUrls(candidateText.trim()),
        sources,
      };
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      if (err instanceof Error && err.name === "AbortError") {
        const timeoutError = new Error("AI provider request timed out");
        timeoutError.name = "TimeoutError";
        throw timeoutError;
      }
      throw err;
    }
  }
}

function extractSourcesFromDocs(docs: KnowledgeDocument[]): SourceCitation[] {
  const sourcesMap = new Map<string, SourceCitation>();

  docs.forEach((doc) => {
    if (doc.sourceUrl && !sourcesMap.has(doc.sourceUrl)) {
      sourcesMap.set(doc.sourceUrl, {
        title: doc.title,
        type: doc.type,
        projectSlug: doc.projectSlug,
        section: doc.section,
        href: doc.sourceUrl,
      });
    }
  });

  return Array.from(sourcesMap.values()).slice(0, 3);
}

export function getAiProvider(): AiProvider {
  const providerName = (process.env.AI_PROVIDER || "gemini").toLowerCase();
  const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY;
  const modelName = process.env.AI_MODEL || "gemini-3.6-flash";
  const isProduction =
    process.env.NODE_ENV === "production" ||
    process.env.VERCEL_ENV === "production";

  if (providerName === "gemini" && apiKey) {
    return new GeminiProvider(apiKey, modelName);
  }

  // Production environment safety check: Require valid AI config in production
  if (isProduction && providerName === "gemini" && !apiKey) {
    const configError = new Error(
      "AI_API_KEY configuration is missing in production environment."
    );
    configError.name = "ConfigurationError";
    throw configError;
  }

  // Development / Test mode fallback
  return new FallbackProvider();
}
