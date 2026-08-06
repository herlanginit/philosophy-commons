// Adds imageUrl/imageCredit/imageCreditUrl fields to every resource in
// src/data/resources.ts, based on scripts/resolved_images.json (Wikimedia
// Commons images resolved by scripts/finalize_images.py) and the group
// mapping in scripts/slug-image-groups.mjs.
import { readFileSync, writeFileSync } from "fs";
import { SLUG_TO_GROUP } from "./slug-image-groups.mjs";

const RESOURCES_PATH = new URL("../src/data/resources.ts", import.meta.url);
const IMAGES_PATH = new URL("./resolved_images.json", import.meta.url);

const resolvedImages = JSON.parse(readFileSync(IMAGES_PATH, "utf8"));
let text = readFileSync(RESOURCES_PATH, "utf8");

function cleanArtist(raw) {
  if (!raw || raw === "Unknown" || /^Unknown author/i.test(raw)) return "Unknown artist";
  // Trim overly long institutional/committee attributions down to the first clause.
  const trimmed = raw.split(/,| for the| \(/)[0].trim();
  return trimmed.replace(/\.$/, "");
}

let applied = 0;
const slugs = Object.keys(SLUG_TO_GROUP);

for (const slug of slugs) {
  const group = SLUG_TO_GROUP[slug];
  const image = resolvedImages[group];
  if (!image) {
    console.error("NO IMAGE for group", group, "(slug:", slug + ")");
    continue;
  }

  const slugMarker = `slug: ${JSON.stringify(slug)},`;
  const slugIdx = text.indexOf(slugMarker);
  if (slugIdx === -1) {
    console.error("MISSING slug in resources.ts:", slug);
    continue;
  }
  const nextSlugIdx = text.indexOf("slug:", slugIdx + slugMarker.length);
  const searchEnd = nextSlugIdx === -1 ? text.length : nextSlugIdx;
  const chunk = text.slice(slugIdx, searchEnd);

  // Insert after pdfUrl if present, else after sourceName.
  const pdfMatch = chunk.match(/pdfUrl: "[^"]*",\n/);
  const sourceNameMatch = chunk.match(/sourceName: "[^"]*",\n/);
  const anchor = pdfMatch ?? sourceNameMatch;
  if (!anchor) {
    console.error("no anchor field found for", slug);
    continue;
  }
  const insertAt = slugIdx + anchor.index + anchor[0].length;

  const credit = cleanArtist(image.artist);
  const insertion =
    `    imageUrl: ${JSON.stringify(image.url)},\n` +
    `    imageCredit: ${JSON.stringify(credit)},\n` +
    `    imageCreditUrl: ${JSON.stringify(image.descriptionurl)},\n`;

  text = text.slice(0, insertAt) + insertion + text.slice(insertAt);
  applied++;
}

writeFileSync(RESOURCES_PATH, text);
console.log(`Applied image fields to ${applied} of ${slugs.length} resources.`);
