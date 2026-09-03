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

async function runMixedLiveTest() {
  console.log("====================================================");
  console.log("    MIXED LIVE GEMINI JOB FIT SMOKE TEST            ");
  console.log("====================================================\n");

  const mixedJd = `Required qualifications:
- React
- Node.js
- REST APIs
- Kubernetes
- Terraform
- AWS
- Candidate must hold AWS Solutions Architect certification
- Requires 7+ years Kubernetes experience`;

  const reqs = extractRequirementsFromJd(mixedJd);
  const matches = matchAllRequirements(reqs);
  const result = await generateJobFitResult(matches);

  console.log(`Extracted Requirements Count: ${reqs.length}`);
  console.log(`Extracted Labels: ${reqs.map((r) => r.label).join(" | ")}`);
  console.log(`Deterministic Score: ${result.score}% (${result.fitBand})`);
  console.log(`Executive Summary: ${result.summary}`);
  console.log(`Verified Strengths (${result.strengths.length}): ${result.strengths.join(" | ")}`);
  console.log(`Gaps (${result.gaps.length}): ${result.gaps.join(" | ")}`);
  console.log("\n====================================================");
}

runMixedLiveTest().catch(console.error);
