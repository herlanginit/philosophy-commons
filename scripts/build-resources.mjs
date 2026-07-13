// Generates the seedResources TS array from scripts/raw-resources.mjs,
// filling in slug/dateAdded/popularity/body and validating enums.
// Run with: node scripts/build-resources.mjs > /tmp/seed-array.ts
import { RAW } from "./raw-resources.mjs";
import { TOPICS, RESOURCE_TYPES, LEVELS, TRADITIONS } from "../src/data/resources.ts";

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function popularityFromSlug(slug) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return 100 + (hash % 1400);
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const slugCounts = new Map();
const startDate = "2025-01-10";
const dayStep = 4.6; // spreads ~103 items from Jan 2025 to ~Jul 2026

let errors = [];
const out = RAW.map((r, i) => {
  for (const t of r.topics) {
    if (!TOPICS.includes(t)) errors.push(`Bad topic "${t}" in "${r.title}"`);
  }
  if (!RESOURCE_TYPES.includes(r.type)) errors.push(`Bad type "${r.type}" in "${r.title}"`);
  if (!LEVELS.includes(r.level)) errors.push(`Bad level "${r.level}" in "${r.title}"`);
  if (!TRADITIONS.includes(r.tradition)) errors.push(`Bad tradition "${r.tradition}" in "${r.title}"`);

  let slug = slugify(r.title);
  const count = slugCounts.get(slug) ?? 0;
  slugCounts.set(slug, count + 1);
  if (count > 0) {
    slug = `${slug}-${slugify(r.sourceName)}`;
  }

  return {
    slug,
    title: r.title,
    description: r.description,
    body: [],
    type: r.type,
    topics: r.topics,
    level: r.level,
    tradition: r.tradition,
    dateAdded: addDays(startDate, Math.round(i * dayStep)),
    popularity: popularityFromSlug(slug),
    estMinutes: r.estMinutes,
    author: r.author,
    sourceUrl: r.sourceUrl,
    sourceName: r.sourceName,
  };
});

if (errors.length > 0) {
  console.error("VALIDATION ERRORS:\n" + errors.join("\n"));
  process.exit(1);
}

// Duplicate sourceUrl check
const urlCounts = new Map();
for (const r of out) urlCounts.set(r.sourceUrl, (urlCounts.get(r.sourceUrl) ?? 0) + 1);
const dupes = [...urlCounts.entries()].filter(([, c]) => c > 1);
if (dupes.length > 0) {
  console.error("DUPLICATE sourceUrl:\n" + dupes.map(([u, c]) => `${u} (${c}x)`).join("\n"));
  process.exit(1);
}

function tsString(str) {
  return JSON.stringify(str);
}

const lines = ["export const seedResources: Resource[] = ["];
for (const r of out) {
  lines.push("  {");
  lines.push(`    slug: ${tsString(r.slug)},`);
  lines.push(`    title: ${tsString(r.title)},`);
  lines.push(`    description: ${tsString(r.description)},`);
  lines.push(`    body: [],`);
  lines.push(`    type: ${tsString(r.type)},`);
  lines.push(`    topics: [${r.topics.map(tsString).join(", ")}],`);
  lines.push(`    level: ${tsString(r.level)},`);
  lines.push(`    tradition: ${tsString(r.tradition)},`);
  lines.push(`    dateAdded: ${tsString(r.dateAdded)},`);
  lines.push(`    popularity: ${r.popularity},`);
  lines.push(`    estMinutes: ${r.estMinutes},`);
  lines.push(`    author: ${tsString(r.author)},`);
  lines.push(`    sourceUrl: ${tsString(r.sourceUrl)},`);
  lines.push(`    sourceName: ${tsString(r.sourceName)},`);
  lines.push("  },");
}
lines.push("];");

console.log(lines.join("\n"));
console.error(`\n(generated ${out.length} resources)`);
