// Applies {slug, body} synopsis entries onto src/data/resources.ts, replacing
// each matching resource's `body: [],` with a properly formatted paragraph array.
// Run with: node scripts/apply-bodies.mjs scripts/synopses-batch1.json [scripts/synopses-batch2.json ...]
import { readFileSync, writeFileSync } from "fs";

const RESOURCES_PATH = new URL("../src/data/resources.ts", import.meta.url);
let text = readFileSync(RESOURCES_PATH, "utf8");

const jsonPaths = process.argv.slice(2);
if (jsonPaths.length === 0) {
  console.error("Usage: node scripts/apply-bodies.mjs <json-file> [<json-file> ...]");
  process.exit(1);
}

function tsStringArray(strings) {
  const lines = strings.map((s) => `      ${JSON.stringify(s)},`);
  return `[\n${lines.join("\n")}\n    ]`;
}

let applied = 0;
let missing = [];

for (const jsonPath of jsonPaths) {
  const entries = JSON.parse(readFileSync(jsonPath, "utf8"));
  for (const { slug, body } of entries) {
    const slugMarker = `slug: ${JSON.stringify(slug)},`;
    const slugIdx = text.indexOf(slugMarker);
    if (slugIdx === -1) {
      missing.push(slug);
      continue;
    }
    const bodyMarker = "\n    body: [],";
    const bodyIdx = text.indexOf(bodyMarker, slugIdx);
    const nextSlugIdx = text.indexOf("slug:", slugIdx + slugMarker.length);
    if (bodyIdx === -1 || (nextSlugIdx !== -1 && bodyIdx > nextSlugIdx)) {
      missing.push(slug + " (body marker not found in range)");
      continue;
    }
    const replacement = `\n    body: ${tsStringArray(body)},`;
    text = text.slice(0, bodyIdx) + replacement + text.slice(bodyIdx + bodyMarker.length);
    applied++;
  }
}

writeFileSync(RESOURCES_PATH, text);
console.log(`Applied ${applied} bodies.`);
if (missing.length > 0) {
  console.error("MISSING/UNMATCHED:\n" + missing.join("\n"));
  process.exit(1);
}
