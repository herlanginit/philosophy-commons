// One-off script: exports the seed resources into a CSV matching the Google
// Sheet schema (see src/lib/sheet.ts), so there's a ready-to-import starter
// sheet with real content instead of a blank template.
//
// Run with: node scripts/export-csv.mjs > resources-template.csv
import { seedResources } from "../src/data/resources.ts";

const COLUMNS = [
  "slug",
  "title",
  "description",
  "body",
  "type",
  "topics",
  "level",
  "tradition",
  "dateAdded",
  "estMinutes",
  "author",
  "sourceUrl",
  "sourceName",
  "pdfUrl",
  "imageUrl",
  "imageCredit",
  "imageCreditUrl",
];

function csvEscape(value) {
  const str = String(value ?? "");
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const lines = [COLUMNS.join(",")];

for (const r of seedResources) {
  const row = [
    r.slug,
    r.title,
    r.description,
    r.body.join("\n"),
    r.type,
    r.topics.join(", "),
    r.level,
    r.tradition,
    r.dateAdded,
    r.estMinutes,
    r.author,
    r.sourceUrl,
    r.sourceName,
    r.pdfUrl ?? "",
    r.imageUrl ?? "",
    r.imageCredit ?? "",
    r.imageCreditUrl ?? "",
  ].map(csvEscape);
  lines.push(row.join(","));
}

console.log(lines.join("\n"));
