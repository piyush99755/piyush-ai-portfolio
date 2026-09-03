import { JobFitResult, RequirementMatchResult } from "@/types/job-fit";
import { calculateDeterministicScore } from "./job-fit-scorer";
import { getAiProvider } from "./provider";
import { SourceCitation } from "@/types/ai";

export function sanitizeProficiencyLanguage(text: string): string {
  let cleaned = text;

  // Replace prohibited hype/proficiency terms with grounded, evidence-backed language
  cleaned = cleaned.replace(/\bexpert-level\b/gi, "verified");
  cleaned = cleaned.replace(/\bexpert\b/gi, "demonstrated");
  cleaned = cleaned.replace(/\bsenior-level\b/gi, "full-stack");
  cleaned = cleaned.replace(/\bmastery of\b/gi, "verified experience with");
  cleaned = cleaned.replace(/\bhighly experienced in\b/gi, "portfolio evidence supports");
  cleaned = cleaned.replace(/\bextensive experience\b/gi, "demonstrated project evidence");
  cleaned = cleaned.replace(/\byears of experience\b/gi, "portfolio work");

  return cleaned;
}

export async function generateJobFitResult(
  matches: RequirementMatchResult[]
): Promise<JobFitResult> {
  const scoring = calculateDeterministicScore(matches);

  const strengths: string[] = [];
  const partialMatches: string[] = [];
  const gaps: string[] = [];
  const sourcesMap = new Map<string, SourceCitation>();

  matches.forEach((m) => {
    if (m.matchState === "STRONG_MATCH" || m.matchState === "SUPPORTED") {
      strengths.push(`${m.requirement.label}: ${m.explanation}`);
    } else if (m.matchState === "PARTIAL") {
      partialMatches.push(`${m.requirement.label}: ${m.explanation}`);
    } else if (m.matchState === "NO_EVIDENCE") {
      gaps.push(`${m.requirement.label}: ${m.explanation}`);
    }

    m.matchedDocuments.forEach((doc) => {
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
  });

  const relevantProjects = [
    {
      slug: "myfelipe-ai-receptionist",
      title: "MyFelipe AI Receptionist SaaS",
      description: "Voice AI, Twilio, Google Calendar, Groq LLM, Stripe billing",
      url: "/projects/myfelipe-ai-receptionist",
    },
    {
      slug: "ai-ecommerce-automation-hub",
      title: "AI E-commerce Automation Hub",
      description: "Next.js App Router, PostgreSQL, Prisma ORM, n8n workflows",
      url: "/projects/ai-ecommerce-automation-hub",
    },
    {
      slug: "career-copilot-ai",
      title: "Career Copilot AI",
      description: "FastAPI, Python, React, RAG Architecture, LLM context integration",
      url: "/projects/career-copilot-ai",
    },
  ];

  // Default grounded summary construction
  let summary = `Piyush demonstrates ${scoring.fitBand.toLowerCase()} (${scoring.score}%) based on verified portfolio evidence. Verified experience includes ${
    strengths.slice(0, 3).map((s) => s.split(":")[0]).join(", ") || "core web development"
  }.`;

  if (gaps.length > 0) {
    summary += ` Unverified portfolio gaps include: ${
      gaps.slice(0, 3).map((g) => g.split(":")[0]).join(", ")
    }.`;
  }

  // Attempt live LLM explanation synthesis if provider is active
  try {
    const provider = getAiProvider();
    if (provider.name !== "FallbackProvider") {
      const prompt = `You are "Ask Piyush AI", writing a grounded recruiter summary for candidate alignment.

COMPUTED ALIGNMENT SCORE: ${scoring.score}% (${scoring.fitBand})
VERIFIED MATCHED STRENGTHS: ${strengths.join(" | ")}
UNVERIFIED GAPS (NO EVIDENCE): ${gaps.join(" | ") || "None"}

CRITICAL WORDING & GROUNDING RULES:
1. Write a concise 2-3 sentence executive summary explaining technical alignment against verified portfolio evidence.
2. DO NOT use terms like "expert", "expert-level", "senior-level", "mastery", "highly experienced", "extensive experience", or "years of experience".
3. Use ONLY grounded phrases such as: "verified experience with", "demonstrated evidence for", "portfolio evidence supports", "directly represented in his projects".
4. DO NOT alter the score (${scoring.score}%) or upgrade unverified gaps into positive matches.`;

      const res = await provider.generateChatResponse({
        messages: [{ role: "user", content: prompt }],
        contextDocuments: matches.flatMap((m) => m.matchedDocuments),
      });

      if (res.answer && res.answer.length > 30) {
        summary = sanitizeProficiencyLanguage(res.answer);
      }
    }
  } catch (err) {
    console.error("LLM explanation synthesis fallback:", err);
  }

  return {
    score: scoring.score,
    fitBand: scoring.fitBand,
    fitColor: scoring.fitColor,
    summary,
    strengths,
    partialMatches,
    gaps,
    requirementMatches: matches,
    relevantProjects,
    sources: Array.from(sourcesMap.values()).slice(0, 4),
    disclaimer:
      "This score represents alignment with verified portfolio evidence only. It does not indicate candidate quality, hiring probability, or guaranteed job performance.",
  };
}
