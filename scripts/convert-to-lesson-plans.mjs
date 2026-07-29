// Converts the 44 selected resources' `type` to "Lesson Plan" and adds a
// `pdfUrl` pointing to their generated PDF, in src/data/resources.ts.
import { readFileSync, writeFileSync } from "fs";

const RESOURCES_PATH = new URL("../src/data/resources.ts", import.meta.url);
let text = readFileSync(RESOURCES_PATH, "utf8");

const slugs = [
  "consequentialism", "kant-s-moral-philosophy", "virtue-ethics", "utilitarianism",
  "the-nicomachean-ethics", "groundwork-for-the-metaphysic-of-morals",
  "john-rawls", "leviathan", "second-treatise-of-government",
  "the-social-contract-discourses", "the-republic", "war",
  "the-problem-of-evil", "pascal-s-wager", "ontological-arguments",
  "dialogues-concerning-natural-religion",
  "personal-identity", "identity-over-time", "free-will", "meditations-on-first-philosophy",
  "the-analysis-of-knowledge", "the-problem-of-induction",
  "an-enquiry-concerning-human-understanding", "epistemology",
  "the-chinese-room-argument", "dualism", "qualia-the-knowledge-argument",
  "aristotle-logic", "validity-and-soundness", "symbolic-logic",
  "symbolic-logic-a-free-online-course",
  "beauty", "aesthetic-experience", "the-poetics", "critique-of-judgement",
  "existentialism", "camus-albert", "kierkegaard-s-ren", "sartre-jean-paul-existentialism",
  "daoism", "zhuangzi", "confucius", "nagarjuna",
  "the-tao-teh-king-or-the-tao-and-its-characteristics",
];

let converted = 0;
for (const slug of slugs) {
  const slugMarker = `slug: ${JSON.stringify(slug)},`;
  const slugIdx = text.indexOf(slugMarker);
  if (slugIdx === -1) {
    console.error("MISSING slug:", slug);
    continue;
  }
  const nextSlugIdx = text.indexOf("slug:", slugIdx + slugMarker.length);
  const searchEnd = nextSlugIdx === -1 ? text.length : nextSlugIdx;

  // Replace the type field within this object's range only.
  const typeRegex = /type: "[^"]*",\n/;
  const chunkBefore = text.slice(slugIdx, searchEnd);
  const typeMatch = chunkBefore.match(typeRegex);
  if (!typeMatch) {
    console.error("type field not found for", slug);
    continue;
  }
  const typeStart = slugIdx + typeMatch.index;
  const typeEnd = typeStart + typeMatch[0].length;
  text = text.slice(0, typeStart) + `type: "Lesson Plan",\n` + text.slice(typeEnd);

  // Add pdfUrl right after sourceName (re-locate range since text length changed).
  const slugIdx2 = text.indexOf(slugMarker);
  const nextSlugIdx2 = text.indexOf("slug:", slugIdx2 + slugMarker.length);
  const searchEnd2 = nextSlugIdx2 === -1 ? text.length : nextSlugIdx2;
  const chunk2 = text.slice(slugIdx2, searchEnd2);
  const sourceNameMatch = chunk2.match(/sourceName: "[^"]*",\n/);
  if (!sourceNameMatch) {
    console.error("sourceName not found for", slug);
    continue;
  }
  const insertAt = slugIdx2 + sourceNameMatch.index + sourceNameMatch[0].length;
  const insertion = `    pdfUrl: ${JSON.stringify(`/lesson-plans/${slug}.pdf`)},\n`;
  text = text.slice(0, insertAt) + insertion + text.slice(insertAt);

  converted++;
}

writeFileSync(RESOURCES_PATH, text);
console.log(`Converted ${converted} resources to Lesson Plan type with pdfUrl.`);
