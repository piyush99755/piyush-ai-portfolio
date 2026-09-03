const STAGING_URL = "https://piyush-ai-portfolio.piyushtadvi4.workers.dev";

async function runLiveStagingQa() {
  console.log("====================================================");
  console.log("    CLOUDFLARE WORKERS LIVE STAGING QA              ");
  console.log(`    Target: ${STAGING_URL}`);
  console.log("====================================================\n");

  let passedCount = 0;
  let failedCount = 0;

  function assert(condition: boolean, name: string, detail?: string) {
    if (condition) {
      console.log(`[PASS] ${name}`);
      if (detail) console.log(`       ↳ ${detail}`);
      passedCount++;
    } else {
      console.error(`[FAIL] ${name}`);
      if (detail) console.error(`       ↳ ${detail}`);
      failedCount++;
    }
  }

  // 1. Route Verification
  const routesToTest = [
    "/",
    "/projects",
    "/projects/myfelipe-ai-receptionist",
    "/projects/ai-ecommerce-automation-hub",
    "/projects/career-copilot-ai",
    "/ask",
    "/api/health",
    "/robots.txt",
    "/sitemap.xml",
  ];

  console.log("--- 1. Live Route Status & Security Header Audit ---");
  for (const route of routesToTest) {
    try {
      const res = await fetch(`${STAGING_URL}${route}`);
      assert(res.ok, `GET ${route} returns HTTP ${res.status}`, `Content-Type: ${res.headers.get("content-type")}`);
      
      if (route === "/") {
        const nosniff = res.headers.get("x-content-type-options");
        const referrer = res.headers.get("referrer-policy");
        const frame = res.headers.get("x-frame-options");
        const permissions = res.headers.get("permissions-policy");
        
        assert(
          nosniff === "nosniff" && referrer === "strict-origin-when-cross-origin" && frame === "DENY",
          "Security headers active on Workers live response",
          `nosniff: ${nosniff} | Referrer: ${referrer} | X-Frame: ${frame} | Permissions: ${permissions}`
        );
      }
    } catch (err) {
      assert(false, `GET ${route} fetch failed`, String(err));
    }
  }

  // 2. Live AI Assistant Test: Grounded Positive Query
  console.log("\n--- 2. Live Ask Piyush Test (Twilio) ---");
  try {
    const res = await fetch(`${STAGING_URL}/api/ai/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Does Piyush have experience with Twilio?",
      }),
    });
    const data = await res.json();
    assert(
      res.ok && data.answer && data.answer.toLowerCase().includes("twilio"),
      "Ask Piyush returns grounded positive answer for Twilio supported by MyFelipe",
      `Answer excerpt: "${data.answer?.slice(0, 140)}..."`
    );
  } catch (err) {
    assert(false, "Live Ask Piyush Twilio request failed", String(err));
  }

  // 3. Live AI Assistant Test: Unsupported Skill Refusal
  console.log("\n--- 3. Live Unsupported Skill Test (Kubernetes) ---");
  try {
    const res = await fetch(`${STAGING_URL}/api/ai/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Does Piyush have Kubernetes experience?",
      }),
    });
    const data = await res.json();
    assert(
      res.ok && data.answer && (data.answer.includes("don't have enough verified information") || data.answer.includes("No direct portfolio evidence")),
      "Relevance gate cleanly rejects unsupported skill 'Kubernetes'",
      `Refusal answer: "${data.answer?.slice(0, 140)}..."`
    );
  } catch (err) {
    assert(false, "Live Unsupported Skill request failed", String(err));
  }

  // 4. Live Job Fit Test: Mixed Requirements
  console.log("\n--- 4. Live Job Fit Test (Mixed Requirements) ---");
  try {
    const sampleJd = "Required qualifications: React, Node.js, REST APIs, Kubernetes, AWS Cloud.";
    const res = await fetch(`${STAGING_URL}/api/ai/job-fit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobDescription: sampleJd }),
    });
    const data = await res.json();
    const result = data.result;

    const k8sGap = result?.gaps?.some((g: string) => g.toLowerCase().includes("kubernetes"));
    const awsGap = result?.gaps?.some((g: string) => g.toLowerCase().includes("aws"));

    assert(
      res.ok && result && result.score > 0 && result.score < 80 && k8sGap && awsGap,
      "Job Fit Analyzer calculates calibrated score and isolates Kubernetes/AWS gaps",
      `Score: ${result.score}% (${result.fitBand}) | Gaps: ${result.gaps?.length}`
    );
  } catch (err) {
    assert(false, "Live Job Fit Analyzer request failed", String(err));
  }

  console.log("\n====================================================");
  console.log(`QA SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
  console.log("====================================================\n");
}

runLiveStagingQa().catch(console.error);
