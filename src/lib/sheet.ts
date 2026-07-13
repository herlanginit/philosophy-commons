import {
  seedResources,
  TOPICS,
  RESOURCE_TYPES,
  LEVELS,
  TRADITIONS,
  type Resource,
  type Topic,
  type ResourceType,
  type Level,
  type Tradition,
} from "@/data/resources";
import { parseCsv, csvRowsToRecords } from "./csv";

const REVALIDATE_SECONDS = 300; // how often the site re-checks the sheet

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Deterministic pseudo-random popularity so "Most Popular" sort has
// something stable to work with without editors having to invent a number.
function popularityFromSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return 100 + (hash % 1400);
}

function matchEnum<T extends string>(value: string, options: readonly T[], fallback: T): T {
  const match = options.find((o) => o.toLowerCase() === value.trim().toLowerCase());
  return match ?? fallback;
}

function isValidDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function recordToResource(record: Record<string, string>): Resource | null {
  const title = record.title?.trim();
  const description = record.description?.trim();
  if (!title || !description) return null;

  const slug = record.slug?.trim() ? slugify(record.slug) : slugify(title);

  const body = (record.body ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const topics = (record.topics ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => matchEnum(t, TOPICS, undefined as unknown as Topic))
    .filter((t): t is Topic => Boolean(t));

  return {
    slug,
    title,
    description,
    body: body.length > 0 ? body : [description],
    type: matchEnum<ResourceType>(record.type ?? "", RESOURCE_TYPES, "Explainer"),
    topics: topics.length > 0 ? topics : ["Ethics"],
    level: matchEnum<Level>(record.level ?? "", LEVELS, "Intro / High School"),
    tradition: matchEnum<Tradition>(record.tradition ?? "", TRADITIONS, "Contemporary"),
    dateAdded: isValidDate(record.dateadded ?? "") ? record.dateadded : "2026-01-01",
    popularity: popularityFromSlug(slug),
    estMinutes: Number(record.estminutes) > 0 ? Number(record.estminutes) : 10,
    author: record.author?.trim() || "Philosophy Commons Editorial Team",
    sourceUrl: record.sourceurl?.trim() || "",
    sourceName: record.sourcename?.trim() || "",
  };
}

async function fetchSheetResources(url: string): Promise<Resource[] | null> {
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) {
      console.warn(`[sheet] fetch failed with status ${res.status}, falling back to seed data`);
      return null;
    }
    const text = await res.text();
    // Sheet columns are case-insensitive on our side; normalize header keys to lowercase.
    const records = csvRowsToRecords(parseCsv(text)).map((r) => {
      const lower: Record<string, string> = {};
      for (const key in r) lower[key.toLowerCase()] = r[key];
      return lower;
    });
    const resources = records
      .map(recordToResource)
      .filter((r): r is Resource => r !== null);

    return resources.length > 0 ? resources : null;
  } catch (err) {
    console.warn("[sheet] fetch threw, falling back to seed data:", err);
    return null;
  }
}

export async function getResources(): Promise<Resource[]> {
  const url = process.env.RESOURCES_SHEET_CSV_URL;
  if (!url) return seedResources;

  const fromSheet = await fetchSheetResources(url);
  return fromSheet ?? seedResources;
}
