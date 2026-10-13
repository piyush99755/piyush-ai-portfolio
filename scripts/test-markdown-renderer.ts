import React from "react";
import { MarkdownRenderer } from "../components/ai/markdown-renderer";
import ReactDOMServer from "react-dom/server";

console.log("====================================================");
console.log("    MARKDOWN RENDERER COMPONENT UNIT TEST           ");
console.log("====================================================\n");

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    if (detail) console.log(`       ↳ ${detail}`);
    passed++;
  } else {
    console.error(`[FAIL] ${testName}`);
    if (detail) console.error(`       ↳ ${detail}`);
    failed++;
  }
}

// 1. Heading rendering test
const headingInput = "### Project Overview\n\nSome introductory text.";
const headingHtml = ReactDOMServer.renderToStaticMarkup(
  React.createElement(MarkdownRenderer, { content: headingInput })
);
assert(
  headingHtml.includes("<h5") && headingHtml.includes("Project Overview</h5>"),
  "Headings (###) render as semantic heading elements",
  `Output: ${headingHtml}`
);

// 2. Bold text test
const boldInput = "Piyush has **hands-on HTML5** experience.";
const boldHtml = ReactDOMServer.renderToStaticMarkup(
  React.createElement(MarkdownRenderer, { content: boldInput })
);
assert(
  boldHtml.includes("<strong") && boldHtml.includes(">hands-on HTML5</strong>"),
  "Bold syntax (**text**) renders as <strong> element",
  `Output: ${boldHtml}`
);

// 3. Bullet list test
const listInput = "Key skills:\n* Semantic HTML5\n* Forms and validation\n* Accessibility (ARIA)";
const listHtml = ReactDOMServer.renderToStaticMarkup(
  React.createElement(MarkdownRenderer, { content: listInput })
);
assert(
  listHtml.includes("<ul") &&
    listHtml.includes("Semantic HTML5</li>") &&
    listHtml.includes("Forms and validation</li>"),
  "Unordered list (* item) renders as <ul> with <li> items",
  `Output: ${listHtml}`
);

// 4. Ordered list test
const orderedInput = "Steps:\n1. First step\n2. Second step";
const orderedHtml = ReactDOMServer.renderToStaticMarkup(
  React.createElement(MarkdownRenderer, { content: orderedInput })
);
assert(
  orderedHtml.includes("<ol") &&
    orderedHtml.includes("First step</li>") &&
    orderedHtml.includes("Second step</li>"),
  "Ordered list (1. item) renders as <ol> with <li> items",
  `Output: ${orderedHtml}`
);

// 5. Bare URL test
const urlInput = "Source code: https://github.com/piyush99755/ai-ecommerce-automation-hub.";
const urlHtml = ReactDOMServer.renderToStaticMarkup(
  React.createElement(MarkdownRenderer, { content: urlInput })
);
assert(
  urlHtml.includes('<a href="https://github.com/piyush99755/ai-ecommerce-automation-hub"') &&
    urlHtml.includes('target="_blank"') &&
    urlHtml.includes('rel="noopener noreferrer"'),
  "Bare URLs render as secure <a> links with target=_blank and rel=noopener noreferrer",
  `Output: ${urlHtml}`
);

// 6. Markdown Link test
const mdLinkInput = "Visit [Career Copilot](https://career-copilot-ai-jade.vercel.app) for demo.";
const mdLinkHtml = ReactDOMServer.renderToStaticMarkup(
  React.createElement(MarkdownRenderer, { content: mdLinkInput })
);
assert(
  mdLinkHtml.includes('<a href="https://career-copilot-ai-jade.vercel.app"') &&
    mdLinkHtml.includes(">Career Copilot</a>"),
  "Markdown links [label](url) render as anchor elements",
  `Output: ${mdLinkHtml}`
);

// 7. Security: Block unsafe protocols (javascript:)
const xssInput = "Bad link: [Click me](javascript:alert(1))";
const xssHtml = ReactDOMServer.renderToStaticMarkup(
  React.createElement(MarkdownRenderer, { content: xssInput })
);
assert(
  !xssHtml.includes('href="javascript:') && !xssHtml.includes("<a"),
  "Unsafe protocols (javascript:) are blocked from anchor generation",
  `Output: ${xssHtml}`
);

// 8. Escaped markdown unescaping
const escapedInput = "Literal escaped: \\*\\*HTML / HTML5\\*\\* and \\* item";
const escapedHtml = ReactDOMServer.renderToStaticMarkup(
  React.createElement(MarkdownRenderer, { content: escapedInput })
);
assert(
  escapedHtml.includes("HTML / HTML5</strong>") && !escapedHtml.includes("\\*"),
  "Escaped markdown (\\*\\*bold\\*\\*) is cleanly unescaped and formatted",
  `Output: ${escapedHtml}`
);

console.log("\n====================================================");
console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log("====================================================\n");

if (failed > 0) process.exit(1);
