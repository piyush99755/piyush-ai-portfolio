import { ChatMessage, KnowledgeDocument } from "@/types/ai";
import { generateKnowledgeCorpus } from "./knowledge";

export const MIN_RELEVANCE_THRESHOLD = 12;

const STOP_WORDS = new Set([
  "a", "an", "the", "in", "on", "of", "for", "with", "and", "or", "to", "is",
  "are", "was", "were", "be", "been", "being", "have", "has", "had", "do",
  "does", "did", "can", "could", "would", "should", "what", "which", "who",
  "whom", "whose", "where", "when", "why", "how", "tell", "me", "about",
  "he", "his", "him", "piyush", "piyush's", "worked", "built", "uses",
  "ignore", "previous", "instructions", "say", "all", "prompt", "saying",
]);

const CONTEXTUAL_PRONOUNS = new Set([
  "it", "there", "that", "this", "he", "his", "him", "the project", "the system", "role", "work", "decision", "challenges", "stack"
]);

const ALIAS_MAP: Record<string, string[]> = {
  twilio: ["myfelipe", "telephony", "sms", "voice", "calls"],
  retell: ["myfelipe", "voice", "receptionist", "agent", "audio"],
  rag: ["career", "copilot", "retrieval", "augmented", "context", "llm"],
  n8n: ["ecommerce", "automation", "workflow", "hub", "triggers"],
  stripe: ["myfelipe", "billing", "payment", "subscriptions"],
  calendar: ["myfelipe", "google", "oauth", "booking", "appointments"],
  fastapi: ["python", "career", "backend", "async"],
  express: ["node", "myfelipe", "backend", "mongodb"],
  prisma: ["ecommerce", "postgresql", "transaction", "database"],
  postgres: ["postgresql", "ecommerce", "database", "relational"],
  mongodb: ["myfelipe", "database", "tenant", "schemas"],
  ai: ["rag", "voice", "retell", "llm", "copilot", "myfelipe", "groq"],
  backend: ["express", "fastapi", "node", "python", "api", "server"],
  saas: ["myfelipe", "ecommerce", "product", "stripe"],
  automation: ["n8n", "ecommerce", "workflow", "twilio", "sms"],
  email: ["contact", "piyushtadvi4@gmail.com", "reach out", "mail", "hire", "address"],
  contact: ["email", "piyushtadvi4@gmail.com", "reach out", "github", "linkedin"],
};

export interface ScoredDocument {
  document: KnowledgeDocument;
  score: number;
  matchedTerms: string[];
}

export interface RetrievalResult {
  documents: KnowledgeDocument[];
  scoredDocuments: ScoredDocument[];
  hasSufficientEvidence: boolean;
  topScore: number;
  effectiveQuery: string;
}

export function retrieveKnowledge(
  query: string,
  history?: ChatMessage[],
  topK = 6
): RetrievalResult {
  const corpus = generateKnowledgeCorpus();
  let effectiveQuery = query.toLowerCase().trim();

  // 1. Follow-up Context Enrichment
  // If query uses contextual pronouns or is short, pull project names/topics from recent history
  if (history && history.length > 0) {
    const queryTokens = effectiveQuery.split(/\s+/);
    const hasContextualRef = queryTokens.some((t) => CONTEXTUAL_PRONOUNS.has(t)) || queryTokens.length < 5;

    if (hasContextualRef) {
      const recentTurns = history.slice(-3); // Last 1-2 exchanges
      const historyText = recentTurns.map((h) => h.content).join(" ").toLowerCase();

      // Find mentioned project names/techs in history
      const mentions: string[] = [];
      if (historyText.includes("myfelipe")) mentions.push("myfelipe");
      if (historyText.includes("ecommerce") || historyText.includes("e-commerce")) mentions.push("ecommerce");
      if (historyText.includes("career") || historyText.includes("copilot")) mentions.push("career copilot");

      if (mentions.length > 0) {
        effectiveQuery = `${mentions.join(" ")} ${effectiveQuery}`;
      }
    }
  }

  // Tokenize & normalize
  const rawTokens = effectiveQuery
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  const searchTerms = rawTokens.filter((t) => !STOP_WORDS.has(t));

  const expandedTerms = new Set<string>(searchTerms);
  searchTerms.forEach((term) => {
    if (ALIAS_MAP[term]) {
      ALIAS_MAP[term].forEach((alias) => expandedTerms.add(alias));
    }
  });

  const scoredDocs: ScoredDocument[] = [];

  for (const doc of corpus) {
    let score = 0;
    const matchedTerms = new Set<string>();
    const docTitleLower = doc.title.toLowerCase();
    const docContentLower = doc.content.toLowerCase();
    const docKeywordsLower = doc.keywords.map((k) => k.toLowerCase());

    // Exact phrase match boost (+15 points)
    if (searchTerms.length >= 2 && docContentLower.includes(query.toLowerCase().trim())) {
      score += 15;
      matchedTerms.add(query.toLowerCase().trim());
    }

    // Term & Alias Scoring
    expandedTerms.forEach((term) => {
      let termMatched = false;

      if (docTitleLower.includes(term)) {
        score += 8;
        termMatched = true;
      }

      if (docKeywordsLower.some((k) => k.includes(term))) {
        score += 5;
        termMatched = true;
      }

      if (docContentLower.includes(term)) {
        score += 3;
        termMatched = true;
      }

      if (termMatched) {
        matchedTerms.add(term);
      }
    });

    if (doc.type === "project-overview" && score > 0) {
      score += 4;
    }

    if (score > 0) {
      scoredDocs.push({
        document: doc,
        score,
        matchedTerms: Array.from(matchedTerms),
      });
    }
  }

  scoredDocs.sort((a, b) => b.score - a.score);

  const topScore = scoredDocs[0]?.score || 0;
  const hasSufficientEvidence = topScore >= MIN_RELEVANCE_THRESHOLD;
  const topDocs = scoredDocs.slice(0, topK);

  return {
    documents: topDocs.map((s) => s.document),
    scoredDocuments: topDocs,
    hasSufficientEvidence,
    topScore,
    effectiveQuery,
  };
}
