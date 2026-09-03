import { bioData } from "../data/bio";
import { socialLinks } from "../data/socials";
import { retrieveKnowledge } from "../lib/ai/retrieval";

console.log("====================================================");
console.log("    PUBLIC CONTACT EMAIL AUDIT TEST                 ");
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

// 1. bioData email check
assert(
  bioData.email === "piyushtadvi4@gmail.com",
  "bioData.email is set to piyushtadvi4@gmail.com",
  `Email: ${bioData.email}`
);

// 2. socialLinks email link check
const emailLink = socialLinks.find((l) => l.platform === "Email");
assert(
  emailLink?.url === "mailto:piyushtadvi4@gmail.com",
  "socialLinks Email platform URL is mailto:piyushtadvi4@gmail.com",
  `URL: ${emailLink?.url}`
);

// 3. Retrieval test for contact query
const retrieval = retrieveKnowledge("What is Piyush's contact email?");
const hasContactDoc = retrieval.documents.some((d) => d.id === "bio-contact-details" || d.content.includes("piyushtadvi4@gmail.com"));

assert(
  retrieval.hasSufficientEvidence && hasContactDoc,
  "Ask Piyush AI retrieval accurately indexes piyushtadvi4@gmail.com contact document",
  `Top Score: ${retrieval.topScore} | Documents Matched: ${retrieval.documents.map((d) => d.title).join(", ")}`
);

console.log("\n====================================================");
console.log(`SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("====================================================\n");
