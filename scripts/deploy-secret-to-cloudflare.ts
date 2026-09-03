import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (!fs.existsSync(envLocalPath)) {
  console.error("Error: .env.local file not found.");
  process.exit(1);
}

const envContent = fs.readFileSync(envLocalPath, "utf8");
let apiKey = "";

envContent.split("\n").forEach((line) => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
    const idx = trimmed.indexOf("=");
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    if ((key === "AI_API_KEY" || key === "GEMINI_API_KEY") && val) {
      apiKey = val;
    }
  }
});

if (!apiKey) {
  console.error("Error: Neither AI_API_KEY nor GEMINI_API_KEY found in .env.local.");
  process.exit(1);
}

console.log("Setting Cloudflare Worker secret: AI_API_KEY...");
try {
  execSync(`npx wrangler secret put AI_API_KEY`, {
    input: apiKey,
    encoding: "utf8",
    stdio: ["pipe", "inherit", "inherit"],
  });
  console.log("[SUCCESS] AI_API_KEY secret configured in Cloudflare Worker secret storage.");
} catch (err) {
  console.error("Failed to upload secret to Cloudflare:", err);
  process.exit(1);
}
