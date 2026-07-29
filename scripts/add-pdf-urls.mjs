// Adds `pdfUrl: "/lesson-plans/{slug}.pdf",` right after each matching
// resource's `sourceName:` line in src/data/resources.ts.
import { readFileSync, writeFileSync } from "fs";

const RESOURCES_PATH = new URL("../src/data/resources.ts", import.meta.url);
let text = readFileSync(RESOURCES_PATH, "utf8");

const slugs = [
  "justice",
  "introduction-to-political-philosophy",
  "ethics-a-free-online-course",
  "logic-i",
  "theory-of-knowledge",
  "death",
  "studies-in-poetry-what-s-the-use-of-beauty",
  "s-ren-kierkegaard-a-free-online-course",
];

let applied = 0;
for (const slug of slugs) {
  const slugMarker = `slug: ${JSON.stringify(slug)},`;
  const slugIdx = text.indexOf(slugMarker);
  if (slugIdx === -1) {
    console.error("MISSING slug:", slug);
    continue;
  }
  const nextSlugIdx = text.indexOf("slug:", slugIdx + slugMarker.length);
  const searchEnd = nextSlugIdx === -1 ? text.length : nextSlugIdx;
  const sourceNameRegex = /sourceName: "[^"]*",\n/;
  const chunk = text.slice(slugIdx, searchEnd);
  const match = chunk.match(sourceNameRegex);
  if (!match) {
    console.error("sourceName not found for", slug);
    continue;
  }
  const insertAt = slugIdx + match.index + match[0].length;
  const insertion = `    pdfUrl: ${JSON.stringify(`/lesson-plans/${slug}.pdf`)},\n`;
  text = text.slice(0, insertAt) + insertion + text.slice(insertAt);
  applied++;
}

writeFileSync(RESOURCES_PATH, text);
console.log(`Applied ${applied} pdfUrl fields.`);
