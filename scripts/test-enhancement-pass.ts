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

import fs from "node:fs";

// 2. Verified Project Links & Repository Visibility Audit
const ecomProject = projectsData.find((p) => p.id === "ecommerce-hub");
assert(
  ecomProject?.githubUrl === "https://github.com/piyush99755/ai-ecommerce-automation-hub" &&
    ecomProject?.repositoryVisibility === "public" &&
    !ecomProject?.liveUrl,
  "AI E-commerce Hub has verified public GitHub URL and no unverified live URL",
  `GitHub URL: ${ecomProject?.githubUrl} | Live URL: ${ecomProject?.liveUrl ?? "None (verified)"}`
);

const careerProject = projectsData.find((p) => p.id === "career-copilot");
const careerThumbnailExists = fs.existsSync("public/projects/career-copilot/thumbnail.png");
assert(
  careerProject?.githubUrl === "https://github.com/piyush99755/career-copilot-ai" &&
    careerProject?.repositoryVisibility === "public" &&
    careerProject?.liveUrl === "https://career-copilot-ai-jade.vercel.app" &&
    careerThumbnailExists,
  "Career Copilot AI has verified GitHub URL, verified live URL, and thumbnail banner on disk",
  `Live URL: ${careerProject?.liveUrl} | Thumbnail file: ${careerThumbnailExists ? "exists" : "missing"}`
);

const myFelipeProject = projectsData.find((p) => p.id === "myfelipe-ai");
assert(
  myFelipeProject?.repositoryVisibility === "private" &&
    !myFelipeProject?.githubUrl &&
    myFelipeProject?.liveUrl === "https://myfelipe.ai",
  "MyFelipe AI Receptionist is private client repository with verified live URL",
  `Visibility: ${myFelipeProject?.repositoryVisibility} | Live URL: ${myFelipeProject?.liveUrl}`
);

const studyProject = projectsData.find((p) => p.id === "personal-ai-study-engine");
assert(
  studyProject !== undefined &&
    studyProject.status === "Active Development" &&
    studyProject.githubUrl === "https://github.com/piyush99755/RecallForge-AI" &&
    !studyProject.liveUrl,
  "Personal AI Study Engine (RecallForge AI) registered as Active Development with verified GitHub",
  `Status: ${studyProject?.status} | GitHub: ${studyProject?.githubUrl}`
);

// 3. Deeper Case Study Data Model Audit
const allHaveWorkflows = projectsData.every(
  (p) => p.caseStudy?.coreWorkflow && p.caseStudy.coreWorkflow.length > 0
);
assert(
  allHaveWorkflows,
  `All ${projectsData.length} projects feature detailed step-by-step Core Workflows`,
  `Workflows present across ${projectsData.length} projects`
);

const allHaveMechanisms = projectsData.every(
  (p) => p.caseStudy?.backendMechanisms && p.caseStudy.backendMechanisms.length > 0
);
assert(
  allHaveMechanisms,
  `All ${projectsData.length} projects feature Backend Mechanisms & Service Design breakdowns`,
  `Mechanisms present across ${projectsData.length} projects`
);

const persistenceProjects = projectsData.filter(
  (p) => p.caseStudy?.dataPersistence && p.caseStudy.dataPersistence.length > 0
);
assert(
  persistenceProjects.length >= 3,
  "MyFelipe, E-commerce Hub & Study Engine feature verified Data & Persistence schema models",
  `Persistence models present across ${persistenceProjects.length} projects: ${persistenceProjects.map((p) => p.id).join(", ")}`
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

// 6. Study Engine Repository Retrieval Audit
const mockStudyMessage = "Where can I see the code for the Study Engine?";
const studyRetrieval = retrieveKnowledge(mockStudyMessage);
assert(
  studyRetrieval.hasSufficientEvidence &&
    studyRetrieval.documents.some((d) => d.content.includes("https://github.com/piyush99755/RecallForge-AI")),
  "Ask Piyush retrieval finds verified GitHub URL for RecallForge Study Engine",
  `Top Score: ${studyRetrieval.topScore}`
);

// 7. Foundational Skills Retrieval Audit
console.log("\n--- FOUNDATIONAL SKILLS RETRIEVAL AUDIT ---");
const htmlQuery = retrieveKnowledge("Does Piyush have HTML experience?");
assert(
  htmlQuery.hasSufficientEvidence &&
    htmlQuery.documents.some((d) => d.title.toLowerCase().includes("html") || d.content.toLowerCase().includes("html")),
  "Ask Piyush retrieval finds verified HTML evidence",
  `Top Score: ${htmlQuery.topScore}`
);

const cssQuery = retrieveKnowledge("Does Piyush know CSS?");
assert(
  cssQuery.hasSufficientEvidence &&
    cssQuery.documents.some((d) => d.title.toLowerCase().includes("css") || d.content.toLowerCase().includes("css")),
  "Ask Piyush retrieval finds verified CSS evidence",
  `Top Score: ${cssQuery.topScore}`
);

const jsQuery = retrieveKnowledge("Does Piyush have JavaScript experience?");
assert(
  jsQuery.hasSufficientEvidence &&
    jsQuery.documents.some((d) => d.title.toLowerCase().includes("javascript") || d.content.toLowerCase().includes("javascript")),
  "Ask Piyush retrieval finds verified JavaScript experience",
  `Top Score: ${jsQuery.topScore}`
);

const frontendQuery = retrieveKnowledge("Does he have frontend fundamentals?");
assert(
  frontendQuery.hasSufficientEvidence,
  "Ask Piyush retrieval finds verified frontend fundamentals",
  `Top Score: ${frontendQuery.topScore}`
);

const restQuery = retrieveKnowledge("Has Piyush built REST APIs?");
assert(
  restQuery.hasSufficientEvidence &&
    restQuery.documents.some((d) => d.content.toLowerCase().includes("rest")),
  "Ask Piyush retrieval finds verified REST API design experience",
  `Top Score: ${restQuery.topScore}`
);

const backendQuery = retrieveKnowledge("What backend technologies does Piyush use?");
assert(
  backendQuery.hasSufficientEvidence &&
    backendQuery.documents.some((d) => d.content.toLowerCase().includes("fastapi") || d.content.toLowerCase().includes("node")),
  "Ask Piyush retrieval finds verified backend technologies",
  `Top Score: ${backendQuery.topScore}`
);

const k8sQuery = retrieveKnowledge("Does Piyush know Kubernetes?");
assert(
  !k8sQuery.hasSufficientEvidence,
  "Relevance Gate strictly refuses unsupported technology 'Kubernetes'",
  `Top Score: ${k8sQuery.topScore} (Threshold: 12)`
);

// 8. Study Engine Active Development Retrieval Audit
console.log("\n--- STUDY ENGINE (IN-PROGRESS) RETRIEVAL AUDIT ---");
const currentBuildingQuery = retrieveKnowledge("What is Piyush currently building?");
assert(
  currentBuildingQuery.hasSufficientEvidence &&
    currentBuildingQuery.documents.some((d) => d.content.includes("Active Development") || d.title.includes("Study Engine")),
  "Ask Piyush retrieval identifies Personal AI Study Engine as currently building / active development",
  `Top Score: ${currentBuildingQuery.topScore}`
);

const recallForgeQuery = retrieveKnowledge("What is RecallForge AI?");
assert(
  recallForgeQuery.hasSufficientEvidence &&
    recallForgeQuery.documents.some((d) => d.title.includes("RecallForge") || d.content.includes("RecallForge")),
  "Ask Piyush retrieval answers 'What is RecallForge AI?' with grounded project context",
  `Top Score: ${recallForgeQuery.topScore}`
);

const ragLearningQuery = retrieveKnowledge("What is Piyush learning about RAG/search?");
assert(
  ragLearningQuery.hasSufficientEvidence &&
    ragLearningQuery.documents.some((d) => d.content.toLowerCase().includes("rag")),
  "Ask Piyush retrieval answers RAG / retrieval exploration query",
  `Top Score: ${ragLearningQuery.topScore}`
);

// 9. Job Fit Consistency Audit
import { extractRequirementsFromJd } from "../lib/ai/job-fit-extractor";
import { matchAllRequirements } from "../lib/ai/job-fit-matcher";

console.log("\n--- JOB FIT CONSISTENCY AUDIT ---");
const foundationalJd = "We need an engineer skilled in HTML, CSS, JavaScript, React, and REST APIs.";
const extractedReqs = extractRequirementsFromJd(foundationalJd);
assert(
  extractedReqs.length >= 5 &&
    extractedReqs.some((r) => r.id === "html") &&
    extractedReqs.some((r) => r.id === "css") &&
    extractedReqs.some((r) => r.id === "javascript"),
  "Job Fit extractor recognizes HTML, CSS, and JavaScript as distinct job requirements",
  `Extracted: ${extractedReqs.map((r) => r.label).join(", ")}`
);

const matchResults = matchAllRequirements(extractedReqs);
const allFoundationalSupported = matchResults.every(
  (m) => m.matchState === "STRONG_MATCH" || m.matchState === "SUPPORTED"
);
assert(
  allFoundationalSupported,
  "Job Fit matcher verifies HTML, CSS, JS, React, and REST APIs without marking them missing",
  `Match states: ${matchResults.map((m) => `${m.requirement.label}: ${m.matchState}`).join("; ")}`
);

console.log("\n====================================================");
console.log(`SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("====================================================\n");

