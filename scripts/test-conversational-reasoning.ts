import fs from "node:fs";
import path from "node:path";

// Simple .env.local loader
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const value = trimmed.slice(idx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  });
}

import { retrieveKnowledge, MIN_RELEVANCE_THRESHOLD } from "../lib/ai/retrieval";
import { getAiProvider } from "../lib/ai/provider";

async function runConversationalReasoningAudit() {
  console.log("====================================================");
  console.log("    ASK PIYUSH CONVERSATIONAL REASONING AUDIT      ");
  console.log("====================================================\n");

  const testQueries = [
    "does he have HTML programming?",
    "will he be able to make teaching videos online for university students?",
    "does he have enough HTML programming experience to teach some other people?",
    "has Piyush taught university students before?",
    "does he know Kubernetes?",
  ];

  const provider = getAiProvider();
  console.log(`Active Provider: ${provider.name}\n`);

  for (let i = 0; i < testQueries.length; i++) {
    const q = testQueries[i];
    console.log(`----------------------------------------------------`);
    console.log(`[QUERY ${i + 1}]: "${q}"`);

    const retrieval = retrieveKnowledge(q);
    console.log(`  Top Score: ${retrieval.topScore} (Threshold: ${MIN_RELEVANCE_THRESHOLD})`);
    console.log(`  Sufficient Evidence: ${retrieval.hasSufficientEvidence}`);
    console.log(`  Effective Query: "${retrieval.effectiveQuery}"`);
    console.log(`  Retrieved Sources (${retrieval.documents.length}):`);
    retrieval.documents.forEach((doc, idx) => {
      console.log(`    ${idx + 1}. [${doc.type}] ${doc.title}`);
    });

    if (!retrieval.hasSufficientEvidence) {
      console.log(`\n  RELEVANCE GATE ACTION: Blocked below threshold.`);
      console.log(`  Gate Response:`);
      console.log(`  "I don't have enough verified information in Piyush's portfolio to claim experience with that topic or request."`);
    } else {
      try {
        const result = await provider.generateChatResponse({
          messages: [{ role: "user", content: q }],
          contextDocuments: retrieval.documents,
        });

        console.log(`\n  GENERATED RESPONSE:`);
        console.log(result.answer);
      } catch (err) {
        console.error(`  Error generating response:`, err);
      }
    }
    console.log(`\n`);
  }

  console.log("====================================================");
  console.log("AUDIT COMPLETE");
  console.log("====================================================");
}

runConversationalReasoningAudit()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("Test execution failed:", err);
    process.exit(1);
  });
