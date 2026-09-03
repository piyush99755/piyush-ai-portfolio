export type KnowledgeDocumentType =
  | "profile"
  | "skill"
  | "experience"
  | "project-overview"
  | "project-feature"
  | "project-architecture"
  | "project-decision"
  | "project-challenge"
  | "project-security"
  | "project-reliability"
  | "project-integration"
  | "project-lesson";

export interface KnowledgeDocument {
  id: string;
  type: KnowledgeDocumentType;
  title: string;
  content: string;
  keywords: string[];
  projectSlug?: string;
  section?: string;
  sourceUrl?: string;
}

export interface SourceCitation {
  title: string;
  type: string;
  projectSlug?: string;
  section?: string;
  href?: string;
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  sources?: SourceCitation[];
}

export interface ChatApiRequest {
  message: string;
  history?: ChatMessage[];
}

export interface ChatApiResponse {
  answer: string;
  sources: SourceCitation[];
  retrievedDocsCount?: number;
}
