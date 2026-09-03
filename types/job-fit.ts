import { KnowledgeDocument, SourceCitation } from "./ai";

export type RequirementImportance = "required" | "preferred" | "contextual";

export type MatchState =
  | "STRONG_MATCH"
  | "SUPPORTED"
  | "PARTIAL"
  | "NO_EVIDENCE"
  | "NOT_APPLICABLE";

export interface JobRequirement {
  id: string;
  label: string;
  category: string;
  importance: RequirementImportance;
  keywords: string[];
  description?: string;
  rawText?: string;
}

export interface RequirementMatchResult {
  requirement: JobRequirement;
  matchState: MatchState;
  matchScore: number; // 1.0, 0.85, 0.5, 0.0
  weight: number;     // 3.0, 1.5, 1.0
  matchedDocuments: KnowledgeDocument[];
  explanation: string;
}

export interface JobFitResult {
  score: number; // 0 to 100
  fitBand: string; // e.g. "Exceptional Alignment", "Strong Alignment"
  fitColor: string; // Tailwind color class e.g. "emerald", "blue", "amber", "rose"
  summary: string;
  strengths: string[];
  partialMatches: string[];
  gaps: string[];
  requirementMatches: RequirementMatchResult[];
  relevantProjects: {
    slug: string;
    title: string;
    description: string;
    url: string;
  }[];
  sources: SourceCitation[];
  disclaimer: string;
}

export interface JobFitApiRequest {
  jobDescription: string;
}

export interface JobFitApiResponse {
  result?: JobFitResult;
  error?: string;
}
