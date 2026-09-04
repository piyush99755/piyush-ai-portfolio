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

// 4. AI Retrieval Accuracy for Project Code Queries & Deterministic URL Sanitization Audit
import { sanitizeAnswerUrls } from "../lib/ai/provider";

const malformedInputs = [
  "[[https://github.com/piyush99755/ai-ecommerce-automation-hub](https://github.com/piyush99755/ai-ecommerce-automation-hub) ###](https://github.com/piyush99755/ai-ecommerce-automation-hub)",
  "https://github.com/piyush99755/ai-ecommerce-automation-hub\n\n### About",
  "Check https://github.com/piyush99755/ai-ecommerce-automation-hubsvg for code",
  "Check https://github.com/piyush99755/ai-ecommerce-automation-hub.svg for code",
  "[https://github.com/piyush99755/ai-ecommerce-automation-hub](https://github.com/piyush99755/ai-ecommerce-automation-hub)",
];

const cleanedOutputs = malformedInputs.map(sanitizeAnswerUrls);

cleanedOutputs.forEach((out, idx) => {
  const isClean =
    !out.includes("[[https://") &&
    !out.includes("](https://") &&
    !out.includes("ai-ecommerce-automation-hubsvg") &&
    !out.includes("ai-ecommerce-automation-hub.svg");
  assert(
    isClean,
    `sanitizeAnswerUrls cleans malformed test case ${idx + 1} cleanly into bare URL format`,
    `Cleaned output: ${JSON.stringify(out)}`
  );
});

// URL Count & Exact Match Verification
const ecomSampleOutput = sanitizeAnswerUrls(
  "Here is the source code: [https://github.com/piyush99755/ai-ecommerce-automation-hub](https://github.com/piyush99755/ai-ecommerce-automation-hub)\n\n### Features"
);
const ecomUrls = ecomSampleOutput.match(/https:\/\/github\.com\/piyush99755\/ai-ecommerce-automation-hub/g) || [];
assert(
  ecomUrls.length === 1 && ecomUrls[0] === "https://github.com/piyush99755/ai-ecommerce-automation-hub",
  "Sanitized output contains exactly one clean E-commerce Hub GitHub URL",
  `Found ${ecomUrls.length} matches: ${ecomUrls[0]}`
);

const careerSampleOutput = sanitizeAnswerUrls(
  "Here is the source code: [https://github.com/piyush99755/career-copilot-ai](https://github.com/piyush99755/career-copilot-ai)\n\n### Overview"
);
const careerUrls = careerSampleOutput.match(/https:\/\/github\.com\/piyush99755\/career-copilot-ai/g) || [];
assert(
  careerUrls.length === 1 && careerUrls[0] === "https://github.com/piyush99755/career-copilot-ai",
  "Sanitized output contains exactly one clean Career Copilot GitHub URL",
  `Found ${careerUrls.length} matches: ${careerUrls[0]}`
);

// 5. Deterministic Repository Route Handler Assertion Audit
const mockEcomMessage = "Where can I see the source code for the E-commerce Hub project?";
const mockCareerMessage = "Where can I see Career Copilot's repository?";
const mockMyFelipeMessage = "Can I see the MyFelipe source code?";

const ecomRetrieval = retrieveKnowledge(mockEcomMessage);
assert(
  ecomRetrieval.hasSufficientEvidence &&
    ecomRetrieval.documents.some((d) => d.content.includes("https://github.com/piyush99755/ai-ecommerce-automation-hub")),
  "Ask Piyush retrieval finds verified GitHub URL for E-commerce Hub",
  `Top Score: ${ecomRetrieval.topScore}`
);

const careerRetrieval = retrieveKnowledge(mockCareerMessage);
assert(
  careerRetrieval.hasSufficientEvidence &&
    careerRetrieval.documents.some((d) => d.content.includes("https://github.com/piyush99755/career-copilot-ai")),
  "Ask Piyush retrieval finds verified GitHub URL for Career Copilot",
  `Top Score: ${careerRetrieval.topScore}`
);

const myFelipeRetrieval = retrieveKnowledge(mockMyFelipeMessage);
assert(
  myFelipeRetrieval.hasSufficientEvidence &&
    myFelipeRetrieval.documents.some((d) => d.content.includes("Private Client Repository")),
  "Ask Piyush retrieval correctly finds private repository evidence for MyFelipe",
  `Top Score: ${myFelipeRetrieval.topScore}`
);

console.log("\n====================================================");
console.log(`SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("====================================================\n");

