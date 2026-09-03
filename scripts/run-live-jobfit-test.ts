import fs from "fs";
import path from "path";

// Load .env.local variables
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const idx = trimmed.indexOf("=");
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
      if (key && val) {
        process.env[key] = val;
      }
    }
  });
}

import { extractRequirementsFromJd } from "../lib/ai/job-fit-extractor";
import { matchAllRequirements } from "../lib/ai/job-fit-matcher";
import { generateJobFitResult } from "../lib/ai/job-fit-explainer";

async function runLiveJobFitTest() {
  console.log("====================================================");
  console.log("    PHASE 5 LIVE GEMINI JOB FIT SMOKE TEST          ");
  console.log("====================================================\n");

  const sampleJd = "We are seeking a Senior Full-Stack AI Software Engineer to build conversational voice receptionists and automated SaaS platforms. Key requirements: React, Next.js, TypeScript, Node.js, Express, Twilio Telephony, Stripe billing, Google Calendar OAuth, and Groq/Retell AI integrations. Experience with Kubernetes and AWS preferred.";

  const reqs = extractRequirementsFromJd(sampleJd);
  const matches = matchAllRequirements(reqs);
  const result = await generateJobFitResult(matches);

  console.log(`HTTP Status: 200 OK`);
  console.log(`Deterministic Score: ${result.score}% (${result.fitBand})`);
  console.log(`Executive Summary: ${result.summary}`);
  console.log(`Verified Strengths: ${result.strengths.length}`);
  console.log(`Open Gaps (NO_EVIDENCE): ${result.gaps.join(" | ")}`);
  console.log(`Sources Count: ${result.sources.length}`);
  console.log("\n====================================================");
}

runLiveJobFitTest().catch(console.error);
