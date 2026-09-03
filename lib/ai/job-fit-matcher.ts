import { JobRequirement, MatchState, RequirementMatchResult } from "@/types/job-fit";
import { retrieveKnowledge } from "./retrieval";

const UNSUPPORTED_IDS = new Set([
  "kubernetes",
  "aws",
  "aws-cert",
  "azure-cert",
  "pmp",
  "security-plus",
  "bachelor-degree",
  "master-degree",
  "years-backend",
  "years-k8s",
  "stakeholder-comm",
  "leadership",
  "mentoring",
  "docker",
  "terraform",
  "cicd",
  "graphql",
]);

export function matchRequirementAgainstPortfolio(
  requirement: JobRequirement
): RequirementMatchResult {
  const weight = requirement.importance === "required" ? 3.0 : requirement.importance === "preferred" ? 1.5 : 1.0;

  // Hard refusal for known unevidenced technologies, degrees, certifications, and duration claims
  if (UNSUPPORTED_IDS.has(requirement.id)) {
    return {
      requirement,
      matchState: "NO_EVIDENCE",
      matchScore: 0.0,
      weight,
      matchedDocuments: [],
      explanation: `No verified ${requirement.label} experience is currently represented in Piyush's canonical portfolio data.`,
    };
  }

  // Retrieve evidence from canonical knowledge corpus
  const searchString = `${requirement.label} ${requirement.keywords.join(" ")}`;
  const retrieval = retrieveKnowledge(searchString, undefined, 4);

  if (!retrieval.hasSufficientEvidence || retrieval.documents.length === 0) {
    return {
      requirement,
      matchState: "NO_EVIDENCE",
      matchScore: 0.0,
      weight,
      matchedDocuments: [],
      explanation: `No verified ${requirement.label} evidence was found in the portfolio dataset.`,
    };
  }

  // Evaluate match strength based on score and document types
  const topScore = retrieval.topScore;
  let matchState: MatchState = "SUPPORTED";
  let matchScore = 0.85;

  if (topScore >= 20) {
    matchState = "STRONG_MATCH";
    matchScore = 1.0;
  } else if (topScore >= 12) {
    matchState = "SUPPORTED";
    matchScore = 0.85;
  } else if (topScore >= 8) {
    matchState = "PARTIAL";
    matchScore = 0.5;
  } else {
    matchState = "NO_EVIDENCE";
    matchScore = 0.0;
  }

  const topDocs = retrieval.documents.slice(0, 2);
  const docTitles = topDocs.map((d) => d.title).join(", ");
  const explanation =
    matchState === "STRONG_MATCH" || matchState === "SUPPORTED"
      ? `Verified experience supported by: ${docTitles}.`
      : matchState === "PARTIAL"
      ? `Partial context available in portfolio data (${docTitles}).`
      : `No direct verified evidence found for ${requirement.label}.`;

  return {
    requirement,
    matchState,
    matchScore,
    weight,
    matchedDocuments: topDocs,
    explanation,
  };
}

export function matchAllRequirements(
  requirements: JobRequirement[]
): RequirementMatchResult[] {
  return requirements.map(matchRequirementAgainstPortfolio);
}
