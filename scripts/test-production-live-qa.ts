const PROD_ROOT_URL = "https://piyushtadvi.co.uk";
const PROD_WWW_URL = "https://www.piyushtadvi.co.uk";

async function runProductionLiveQa() {
  console.log("====================================================");
  console.log("    CLOUDFLARE WORKERS PRODUCTION LIVE QA           ");
  console.log(`    Target Root: ${PROD_ROOT_URL}`);
  console.log(`    Target WWW:  ${PROD_WWW_URL}`);
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

  // 1. Root & WWW SSL / Domain Resolution Check
  console.log("--- 1. SSL & Custom Domain Resolution ---");
  for (const domainUrl of [PROD_ROOT_URL, PROD_WWW_URL]) {
    try {
      const res = await fetch(domainUrl);
      assert(res.ok, `GET ${domainUrl} resolves over HTTPS with status HTTP ${res.status}`, `Content-Type: ${res.headers.get("content-type")}`);
    } catch (err) {
      assert(false, `GET ${domainUrl} resolution failed`, String(err));
    }
  }

  // 2. Production Route & Security Header Audit
  console.log("\n--- 2. Production Route Status & Security Headers ---");
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

  for (const route of routesToTest) {
    try {
      const res = await fetch(`${PROD_ROOT_URL}${route}`);
      assert(res.ok, `GET ${PROD_ROOT_URL}${route} returns HTTP ${res.status}`, `Type: ${res.headers.get("content-type")}`);

      if (route === "/") {
        const nosniff = res.headers.get("x-content-type-options");
        const referrer = res.headers.get("referrer-policy");
        const frame = res.headers.get("x-frame-options");
        const permissions = res.headers.get("permissions-policy");

        assert(
          nosniff === "nosniff" && referrer === "strict-origin-when-cross-origin" && frame === "DENY",
          "Production Security Headers Active",
          `nosniff: ${nosniff} | Referrer: ${referrer} | X-Frame: ${frame} | Permissions: ${permissions}`
        );
      }

      if (route === "/sitemap.xml") {
        const xmlText = await res.text();
        assert(
          xmlText.includes("https://piyushtadvi.co.uk"),
          "Sitemap contains canonical production domain https://piyushtadvi.co.uk",
          `Length: ${xmlText.length} bytes`
        );
      }
    } catch (err) {
      assert(false, `GET ${route} failed`, String(err));
    }
  }

  // 3. Live AI Production Test: Grounded Positive Query
  console.log("\n--- 3. Live Production AI Test (Twilio) ---");
  try {
    const res = await fetch(`${PROD_ROOT_URL}/api/ai/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Does Piyush have experience with Twilio?" }),
    });
    const data = await res.json();
    assert(
      res.ok && data.answer && data.answer.toLowerCase().includes("twilio"),
      "Production Ask Piyush returns grounded answer for Twilio supported by MyFelipe",
      `Answer excerpt: "${data.answer?.slice(0, 140)}..."`
    );
  } catch (err) {
    assert(false, "Production Ask Piyush Twilio request failed", String(err));
  }

  // 4. Live AI Production Test: Unsupported Skill Refusal
  console.log("\n--- 4. Live Production Unsupported Skill Test (Kubernetes) ---");
  try {
    const res = await fetch(`${PROD_ROOT_URL}/api/ai/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Does Piyush have Kubernetes experience?" }),
    });
    const data = await res.json();
    assert(
      res.ok && data.answer && (data.answer.includes("don't have enough verified information") || data.answer.includes("No direct portfolio evidence")),
      "Production Relevance Gate cleanly rejects unsupported skill 'Kubernetes'",
      `Refusal answer: "${data.answer?.slice(0, 140)}..."`
    );
  } catch (err) {
    assert(false, "Production Unsupported Skill request failed", String(err));
  }

  // 5. Live Production Job Fit Test
  console.log("\n--- 5. Live Production Job Fit Test (Mixed Requirements) ---");
  try {
    const sampleJd = "Required qualifications: React, Node.js, REST APIs, Kubernetes, AWS Cloud.";
    const res = await fetch(`${PROD_ROOT_URL}/api/ai/job-fit`, {
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
      "Production Job Fit Analyzer calculates calibrated score and isolates Kubernetes/AWS gaps",
      `Score: ${result.score}% (${result.fitBand}) | Gaps: ${result.gaps?.length}`
    );
  } catch (err) {
    assert(false, "Production Job Fit Analyzer request failed", String(err));
  }

  console.log("\n====================================================");
  console.log(`PRODUCTION QA SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
  console.log("====================================================\n");
}

runProductionLiveQa().catch(console.error);
