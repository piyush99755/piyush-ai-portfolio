import { NextResponse } from "next/server";
import { JobFitApiRequest } from "@/types/job-fit";
import { extractRequirementsFromJd } from "@/lib/ai/job-fit-extractor";
import { matchAllRequirements } from "@/lib/ai/job-fit-matcher";
import { generateJobFitResult } from "@/lib/ai/job-fit-explainer";

export async function POST(req: Request) {
  try {
    const body: JobFitApiRequest = await req.json();

    // 1. Server-side Input Validation
    if (!body || typeof body.jobDescription !== "string") {
      return NextResponse.json(
        { error: "Invalid request payload. 'jobDescription' string field is required." },
        { status: 400 }
      );
    }

    const jdText = body.jobDescription.trim();
    if (!jdText) {
      return NextResponse.json(
        { error: "Job description cannot be empty." },
        { status: 400 }
      );
    }

    if (jdText.length < 50) {
      return NextResponse.json(
        { error: "Job description is too short. Please provide at least 50 characters of job text." },
        { status: 400 }
      );
    }

    if (jdText.length > 6000) {
      return NextResponse.json(
        { error: "Job description exceeds maximum length limit of 6,000 characters." },
        { status: 400 }
      );
    }

    // 2. Requirement Extraction & Normalization
    const requirements = extractRequirementsFromJd(jdText);

    // 3. Deterministic Evidence Matching
    const matches = matchAllRequirements(requirements);

    // 4. Score Calculation & Explanation Synthesis
    const result = await generateJobFitResult(matches);

    return NextResponse.json({ result });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "TimeoutError") {
        return NextResponse.json(
          { error: "The AI analyzer service is temporarily unavailable. Please try again." },
          { status: 504 }
        );
      }
      if (error.name === "ConfigurationError") {
        return NextResponse.json(
          { error: "Job-fit analyzer service is currently unconfigured." },
          { status: 503 }
        );
      }
    }

    console.error("Error in /api/ai/job-fit route:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while analyzing the job description. Please try again later.",
      },
      { status: 500 }
    );
  }
}
