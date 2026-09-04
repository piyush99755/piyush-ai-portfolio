import { socialLinks } from "../data/socials";
import { projectsData } from "../data/projects";
import { retrieveKnowledge } from "../lib/ai/retrieval";

console.log("====================================================");
console.log("    PORTFOLIO ENHANCEMENT PASS AUDIT TEST           ");
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

// 1. LinkedIn URL Audit
const linkedInLink = socialLinks.find((l) => l.platform === "LinkedIn");
assert(
  linkedInLink?.url === "https://ca.linkedin.com/in/piyush-tadvi-90b549211",
  "LinkedIn URL updated to ca.linkedin.com/in/piyush-tadvi-90b549211",
  `URL: ${linkedInLink?.url}`
);

// 2. Verified Project Links & Repository Visibility Audit
const ecomProject = projectsData.find((p) => p.id === "ecommerce-hub");
assert(
  ecomProject?.githubUrl === "https://github.com/piyush99755/ai-ecommerce-automation-hub" &&
    ecomProject?.repositoryVisibility === "public",
  "AI E-commerce Hub has verified public GitHub URL",
  `GitHub URL: ${ecomProject?.githubUrl}`
);

const careerProject = projectsData.find((p) => p.id === "career-copilot");
assert(
  careerProject?.githubUrl === "https://github.com/piyush99755/career-copilot-ai" &&
    careerProject?.repositoryVisibility === "public",
  "Career Copilot AI has verified public GitHub URL",
  `GitHub URL: ${careerProject?.githubUrl}`
);

const myFelipeProject = projectsData.find((p) => p.id === "myfelipe-ai");
assert(
  myFelipeProject?.repositoryVisibility === "private" && !myFelipeProject?.githubUrl,
  "MyFelipe AI Receptionist is flagged as private client repository",
  `Visibility: ${myFelipeProject?.repositoryVisibility}`
);

// 3. Deeper Case Study Data Model Audit
const allHaveWorkflows = projectsData.every(
  (p) => p.caseStudy?.coreWorkflow && p.caseStudy.coreWorkflow.length > 0
);
assert(
  allHaveWorkflows,
  "All 3 projects feature detailed step-by-step Core Workflows",
  `Workflows present across ${projectsData.length} projects`
);

const allHaveMechanisms = projectsData.every(
  (p) => p.caseStudy?.backendMechanisms && p.caseStudy.backendMechanisms.length > 0
);
assert(
  allHaveMechanisms,
  "All 3 projects feature Backend Mechanisms & Service Design breakdowns",
  `Mechanisms present across ${projectsData.length} projects`
);

const verifiedDataModelProjects = projectsData.filter(
  (p) => p.id === "myfelipe-ai" || p.id === "ecommerce-hub"
);
const verifiedHaveDataModels = verifiedDataModelProjects.every(
  (p) => p.caseStudy?.dataPersistence && p.caseStudy.dataPersistence.length > 0
);
assert(
  verifiedHaveDataModels,
  "MyFelipe & E-commerce Hub feature verified Data & Persistence schema models",
  `Persistence models present across ${verifiedDataModelProjects.length} verified projects`
);

// 4. AI Retrieval Accuracy for Project Code Queries & URL Sanitization Audit
import { sanitizeAnswerUrls } from "../lib/ai/provider";

const corruptedEcomUrl = "Check out https://github.com/piyush99755/ai-ecommerce-automation-hubsvg for source code.";
const sanitizedEcomUrl = sanitizeAnswerUrls(corruptedEcomUrl);
assert(
  sanitizedEcomUrl === "Check out https://github.com/piyush99755/ai-ecommerce-automation-hub for source code.",
  "sanitizeAnswerUrls successfully strips trailing 'svg' from corrupted E-commerce Hub GitHub URL",
  `Output: ${sanitizedEcomUrl}`
);

const corruptedCareerUrl = "Check out https://github.com/piyush99755/career-copilot-ai.svg for source code.";
const sanitizedCareerUrl = sanitizeAnswerUrls(corruptedCareerUrl);
assert(
  sanitizedCareerUrl === "Check out https://github.com/piyush99755/career-copilot-ai for source code.",
  "sanitizeAnswerUrls successfully strips trailing '.svg' from corrupted Career Copilot GitHub URL",
  `Output: ${sanitizedCareerUrl}`
);

// Advanced Link Absorption & Destination Newline Regression Test
const absorbedEcomLink = "[https://github.com/piyush99755/ai-ecommerce-automation-hub\n\n###](https://github.com/piyush99755/ai-ecommerce-automation-hub\n\n### About the Repository)";
const cleanedAbsorbedLink = sanitizeAnswerUrls(absorbedEcomLink);
assert(
  cleanedAbsorbedLink === "[https://github.com/piyush99755/ai-ecommerce-automation-hub](https://github.com/piyush99755/ai-ecommerce-automation-hub)\n\n### About the Repository",
  "sanitizeAnswerUrls separates absorbed newlines and Markdown headings from link destination",
  `Output: ${JSON.stringify(cleanedAbsorbedLink)}`
);

// Destination URL regex parser validation
const linkMatch = cleanedAbsorbedLink.match(/\[([^\]]+)\]\((https:\/\/[^\s)\n]+)\)/);
const parsedUrl = linkMatch ? linkMatch[2] : "";
assert(
  parsedUrl === "https://github.com/piyush99755/ai-ecommerce-automation-hub" &&
    !parsedUrl.includes("\n") &&
    !parsedUrl.includes("#") &&
    !parsedUrl.endsWith("svg"),
  "Parsed Markdown link destination is clean exact E-commerce Hub GitHub URL",
  `Parsed URL: ${parsedUrl}`
);

const ecomRetrieval = retrieveKnowledge("Where can I see the code for the E-commerce Hub?");
assert(
  ecomRetrieval.hasSufficientEvidence &&
    ecomRetrieval.documents.some((d) => d.content.includes("https://github.com/piyush99755/ai-ecommerce-automation-hub")),
  "Ask Piyush retrieval finds verified GitHub URL for E-commerce Hub",
  `Top Score: ${ecomRetrieval.topScore}`
);

console.log("\n====================================================");
console.log(`SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("====================================================\n");

