import fs from "node:fs";
import path from "node:path";

// Load .env.local if present
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

import { projectsData } from "../data/projects";
import { POST } from "../app/api/ai/chat/route";

async function runRecallForgeRegressionCheck() {
  console.log("====================================================");
  console.log("    RECALLFORGE REGRESSION CHECK                    ");
  console.log("====================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, name: string, detail?: string) {
    if (condition) {
      console.log(`[PASS] ${name}`);
      if (detail) console.log(`       ↳ ${detail}`);
      passed++;
    } else {
      console.error(`[FAIL] ${name}`);
      if (detail) console.error(`       ↳ ${detail}`);
      failed++;
    }
  }

  // 1. Data Model Verification
  const project = projectsData.find((p) => p.id === "personal-ai-study-engine");
  assert(project !== undefined, "RecallForge project exists in projectsData");
  assert(project?.status === "Deployed", "RecallForge project status is 'Deployed'", `Status: ${project?.status}`);
  assert(
    project?.liveUrl === "https://recall-forge-ai.vercel.app/review",
    "Live URL points to canonical /review entry",
    `liveUrl: ${project?.liveUrl}`
  );
  assert(
    project?.githubUrl === "https://github.com/piyush99755/RecallForge-AI",
    "GitHub URL points to public RecallForge-AI repository",
    `githubUrl: ${project?.githubUrl}`
  );

  const serialized = JSON.stringify(project);
  assert(
    !serialized.includes("not yet production-deployed") &&
      !serialized.includes("not production deployed") &&
      !serialized.includes("Active Development"),
    "No outdated 'not yet production-deployed' or 'Active Development' claims exist in project data"
  );

  // Check implemented vs future enhancements
  const hasImplemented = project?.caseStudy?.features.some((f) => f.includes("DEPLOYED SYSTEM") || f.includes("DEPLOYED CAPABILITY"));
  const hasRoadmap = project?.caseStudy?.features.some((f) => f.includes("FUTURE ENHANCEMENTS"));
  assert(
    Boolean(hasImplemented && hasRoadmap),
    "Case study distinguishes deployed systems/capabilities from future enhancements",
    `Features count: ${project?.caseStudy?.features.length}`
  );

  // 1.5 Visual Assets, Accessibility & Project Ordering Verification
  const thumbnailExists = fs.existsSync("public/projects/recallforge/thumbnail.png");
  const posterExists = fs.existsSync("public/projects/recallforge/poster.png");
  const iconExists = fs.existsSync("public/projects/recallforge/project-icon.png");
  const ogExists = fs.existsSync("public/projects/recallforge/og.png");

  assert(thumbnailExists, "RecallForge thumbnail asset exists on disk", "public/projects/recallforge/thumbnail.png");
  assert(posterExists, "RecallForge poster asset exists on disk", "public/projects/recallforge/poster.png");
  assert(iconExists, "RecallForge project icon asset exists on disk", "public/projects/recallforge/project-icon.png");
  assert(ogExists, "RecallForge OG image exists on disk", "public/projects/recallforge/og.png");

  assert(
    project?.thumbnail === "/projects/recallforge/thumbnail.png",
    "RecallForge project data uses /projects/recallforge/thumbnail.png",
    `thumbnail: ${project?.thumbnail}`
  );
  assert(
    project?.poster === "/projects/recallforge/poster.png",
    "RecallForge project data uses /projects/recallforge/poster.png",
    `poster: ${project?.poster}`
  );
  assert(
    project?.icon === "/projects/recallforge/project-icon.png",
    "RecallForge project data registers /projects/recallforge/project-icon.png",
    `icon: ${project?.icon}`
  );
  assert(
    project?.ogImage === "/projects/recallforge/og.png",
    "RecallForge project data registers /projects/recallforge/og.png",
    `ogImage: ${project?.ogImage}`
  );
  assert(
    Boolean(project?.thumbnailAlt && !project.thumbnailAlt.includes(".png")) &&
      Boolean(project?.posterAlt && !project.posterAlt.includes(".png")),
    "RecallForge thumbnail and poster have descriptive non-filename alt text",
    `thumbnailAlt: "${project?.thumbnailAlt}" | posterAlt: "${project?.posterAlt}"`
  );

  const projectIds = projectsData.map((p) => p.id);
  const expectedOrder = ["myfelipe-ai", "ecommerce-hub", "personal-ai-study-engine", "career-copilot"];
  const rfIndex = projectIds.indexOf("personal-ai-study-engine");
  const ccIndex = projectIds.indexOf("career-copilot");
  assert(
    rfIndex !== -1 && ccIndex !== -1 && rfIndex < ccIndex && JSON.stringify(projectIds) === JSON.stringify(expectedOrder),
    "Project ordering places RecallForge third, before Career Copilot (MyFelipe -> E-commerce -> RecallForge -> Career Copilot)",
    `Order: ${projectIds.join(" -> ")}`
  );

  // 2. Ask Piyush Intent Checks
  console.log("\n--- ASK PIYUSH INTENT VERIFICATION ---");
  const testIntents = [
    {
      query: "What is RecallForge AI?",
      expectedCheck: (ans: string) => ans.length > 50 && (ans.includes("study") || ans.includes("RecallForge") || ans.includes("learning")),
      label: "General project overview description",
    },
    {
      query: "Is RecallForge deployed?",
      expectedCheck: (ans: string) => (ans.includes("https://recall-forge-ai.vercel.app/review") || ans.includes("deployed") || ans.includes("live")),
      label: "Deployment status awareness",
    },
    {
      query: "Where can I try RecallForge?",
      expectedCheck: (ans: string) => ans.includes("https://recall-forge-ai.vercel.app/review"),
      label: "Deterministic live app URL link",
    },
    {
      query: "Give me the RecallForge live link",
      expectedCheck: (ans: string) => ans.includes("https://recall-forge-ai.vercel.app/review"),
      label: "Exact live link request yields canonical liveUrl",
    },
    {
      query: "Where can I see the source code for RecallForge?",
      expectedCheck: (ans: string) => ans.includes("https://github.com/piyush99755/RecallForge-AI"),
      label: "Exact repo request yields canonical GitHub URL",
    },
    {
      query: "Where can I see the source code?",
      expectedCheck: (ans: string) =>
        ans.includes("https://github.com/piyush99755") &&
        !ans.includes("https://github.com/piyush99755/"),
      label: "Generic source-code query yields canonical GitHub profile URL",
    },
    {
      query: "Where is his GitHub?",
      expectedCheck: (ans: string) =>
        ans.includes("https://github.com/piyush99755") &&
        !ans.includes("https://github.com/piyush99755/"),
      label: "Generic GitHub query yields canonical GitHub profile URL",
    },
    {
      query: "Show me his repositories",
      expectedCheck: (ans: string) =>
        ans.includes("https://github.com/piyush99755") &&
        !ans.includes("https://github.com/piyush99755/"),
      label: "Generic repositories query yields canonical GitHub profile URL",
    },
    {
      query: "Where can I see his code?",
      expectedCheck: (ans: string) =>
        ans.includes("https://github.com/piyush99755") &&
        !ans.includes("https://github.com/piyush99755/"),
      label: "Generic his-code query yields canonical GitHub profile URL",
    },
    {
      query: "Where is the Career Copilot repository?",
      expectedCheck: (ans: string) => ans.includes("https://github.com/piyush99755/career-copilot-ai"),
      label: "Career Copilot project-specific repo intent unchanged",
    },
    {
      query: "Where is the E-commerce Hub source code?",
      expectedCheck: (ans: string) => ans.includes("https://github.com/piyush99755/ai-ecommerce-automation-hub"),
      label: "E-commerce Hub project-specific repo intent unchanged",
    },
    {
      query: "Where is the MyFelipe source code?",
      expectedCheck: (ans: string) =>
        ans.toLowerCase().includes("private") && !ans.includes("github.com"),
      label: "MyFelipe private repository intent unchanged",
    },
  ];

  for (let i = 0; i < testIntents.length; i++) {
    const t = testIntents[i];
    console.log(`\n[INTENT ${i + 1}]: "${t.query}"`);
    const req = new Request("http://localhost:3000/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: t.query }),
    });

    const res = await POST(req);
    const data = await res.json();
    console.log(`  HTTP ${res.status}`);
    console.log(`  Answer Preview: ${data.answer?.slice(0, 160)}...`);
    
    const isValid = t.expectedCheck(data.answer || "");
    assert(isValid, `Intent ${i + 1}: ${t.label}`, `Full Answer: ${data.answer}`);
  }

  console.log("\n====================================================");
  console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("====================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runRecallForgeRegressionCheck().catch((err) => {
  console.error("Regression check failed:", err);
  process.exit(1);
});
