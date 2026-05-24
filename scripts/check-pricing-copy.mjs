import { readFileSync } from "node:fs";
import { relative } from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const files = execFileSync("rg", [
  "--files",
  "app",
  "components",
  "lib",
], {
  cwd: root,
  encoding: "utf8",
})
  .trim()
  .split("\n")
  .filter((file) => /\.(tsx?|jsx?)$/.test(file));

const hardcodedDailyPrice = /\$\d+(?:\.\d{1,2})?\s*\/\s*(?:day|Day|cup|Cup)\b/g;
const violations = [];

for (const file of files) {
  const contents = readFileSync(file, "utf8");
  for (const match of contents.matchAll(hardcodedDailyPrice)) {
    const before = contents.slice(0, match.index);
    const line = before.split("\n").length;
    violations.push({
      file: relative(root, file),
      line,
      value: match[0],
    });
  }
}

if (violations.length) {
  console.error("Hardcoded per-day/per-cup pricing copy found.");
  console.error("Use lib/pricing.ts constants instead so pricing stays synced.");
  for (const violation of violations) {
    console.error(
      `- ${violation.file}:${violation.line} contains ${violation.value}`,
    );
  }
  process.exit(1);
}

console.log("Pricing copy check passed.");
