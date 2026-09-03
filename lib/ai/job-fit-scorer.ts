import { RequirementMatchResult } from "@/types/job-fit";

export interface ScoreCalculationResult {
  score: number;
  fitBand: string;
  fitColor: string;
  totalWeight: number;
  earnedWeight: number;
}

export function calculateDeterministicScore(
  matches: RequirementMatchResult[]
): ScoreCalculationResult {
  if (!matches || matches.length === 0) {
    return {
      score: 50,
      fitBand: "Moderate Alignment",
      fitColor: "indigo",
      totalWeight: 1.0,
      earnedWeight: 0.5,
    };
  }

  let totalWeight = 0;
  let earnedWeight = 0;

  matches.forEach((m) => {
    if (m.matchState !== "NOT_APPLICABLE") {
      totalWeight += m.weight;
      earnedWeight += m.weight * m.matchScore;
    }
  });

  const rawScore = totalWeight > 0 ? (earnedWeight / totalWeight) * 100 : 50;
  const score = Math.min(100, Math.max(0, Math.round(rawScore)));

  let fitBand = "Limited Verified Alignment";
  let fitColor = "rose";

  if (score >= 85) {
    fitBand = "Exceptional Alignment";
    fitColor = "emerald";
  } else if (score >= 70) {
    fitBand = "Strong Alignment";
    fitColor = "blue";
  } else if (score >= 55) {
    fitBand = "Moderate Alignment";
    fitColor = "indigo";
  } else if (score >= 40) {
    fitBand = "Partial Alignment";
    fitColor = "amber";
  } else {
    fitBand = "Limited Verified Alignment";
    fitColor = "rose";
  }

  return {
    score,
    fitBand,
    fitColor,
    totalWeight,
    earnedWeight,
  };
}
