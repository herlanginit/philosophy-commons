// Replaces the imageUrl/imageCredit/imageCreditUrl fields already present in
// src/data/resources.ts with the diversified, per-slug picks from
// scripts/resolved_images_per_slug.json (see scripts/diversify_images.py).
import { readFileSync, writeFileSync } from "fs";

const RESOURCES_PATH = new URL("../src/data/resources.ts", import.meta.url);
const PER_SLUG_PATH = new URL("./resolved_images_per_slug.json", import.meta.url);

const perSlug = JSON.parse(readFileSync(PER_SLUG_PATH, "utf8"));
let text = readFileSync(RESOURCES_PATH, "utf8");

function cleanArtist(raw) {
  if (!raw || raw === "Unknown" || /^Unknown author/i.test(raw)) return "Unknown artist";
  const trimmed = raw.split(/,| for the| \(/)[0].trim();
  return trimmed.replace(/\.$/, "");
}

function cleanUrl(u) {
  return u.replace(/\?utm_source=.*$/, "");
}

let applied = 0;
const slugs = Object.keys(perSlug);

for (const slug of slugs) {
  const image = perSlug[slug];
  const slugMarker = `slug: ${JSON.stringify(slug)},`;
  const slugIdx = text.indexOf(slugMarker);
  if (slugIdx === -1) {
    console.error("MISSING slug in resources.ts:", slug);
    continue;
  }
  const nextSlugIdx = text.indexOf("slug:", slugIdx + slugMarker.length);
  const searchEnd = nextSlugIdx === -1 ? text.length : nextSlugIdx;
  const chunk = text.slice(slugIdx, searchEnd);

  const existingImageMatch = chunk.match(
    /imageUrl: "[^"]*",\n\s*imageCredit: "[^"]*",\n\s*imageCreditUrl: "[^"]*",\n/
  );
  if (!existingImageMatch) {
    console.error("no existing image block found for", slug);
    continue;
  }

  const credit = cleanArtist(image.artist);
  const replacement =
    `    imageUrl: ${JSON.stringify(cleanUrl(image.url))},\n` +
    `    imageCredit: ${JSON.stringify(credit)},\n` +
    `    imageCreditUrl: ${JSON.stringify(image.descriptionurl)},\n`;

  const absoluteStart = slugIdx + existingImageMatch.index;
  const absoluteEnd = absoluteStart + existingImageMatch[0].length;
  text = text.slice(0, absoluteStart) + replacement + text.slice(absoluteEnd);
  applied++;
}

writeFileSync(RESOURCES_PATH, text);
console.log(`Replaced image fields for ${applied} of ${slugs.length} resources.`);
