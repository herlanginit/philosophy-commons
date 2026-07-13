# Philosophy Commons

A free, open resource library for philosophy education — readings, lesson plans, explainers, discussion guides, and activities spanning every branch and tradition of philosophy. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

Every resource links out to the real external source (Stanford Encyclopedia of Philosophy, Project Gutenberg, MIT OpenCourseWare, etc.) via an "Access this resource" button — we don't rehost copyrighted PDFs/articles ourselves, only a short original description plus a link to the real thing.

There is no backend or database — search, filtering, and sorting run client-side, and "My Library" (saved resources) is stored in the visitor's browser via `localStorage`. Content itself can come from either:

- **Seed data** — [src/data/resources.ts](src/data/resources.ts), a hardcoded fallback
- **A Google Sheet** — non-technical editors can add/edit resources (including the source link) in a spreadsheet and the site picks up changes automatically, no code or redeploy needed

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content from a Google Sheet (no code required)

1. Create a new Google Sheet, then **File → Import → Upload** and pick [resources-template.csv](resources-template.csv) from this repo. This gives you a sheet pre-filled with real starter resources in the right format — edit those rows or add new ones below.
2. Columns, one resource per row:
   - `slug` — optional; leave blank and one is generated from the title
   - `title`, `description` — short text
   - `body` — your own summary/notes about the resource (not copied from the source — see below); put each paragraph on its own line within the cell (Alt+Enter on Windows, Option+Return on Mac, adds a line break without leaving the cell)
   - `type` — one of: Lesson Plan, Primary Text, Explainer, Video, Podcast, Discussion Guide, Activity
   - `topics` — comma-separated, e.g. `Ethics, Political Philosophy` (valid values: Ethics, Metaphysics, Epistemology, Logic, Political Philosophy, Philosophy of Mind, Aesthetics, Philosophy of Religion, Existentialism, Eastern Philosophy)
   - `level` — one of: Intro / High School, Undergraduate, Graduate / Advanced
   - `tradition` — one of: Ancient, Medieval, Modern, Contemporary, Analytic, Continental, Eastern
   - `dateAdded` — `YYYY-MM-DD`
   - `estMinutes` — a number
   - `author` — the real author/creator of the *original* resource (not the site editor)
   - `sourceUrl` — the actual link to the resource (a PDF, article, video, or course page on the original site). This is what the big "Access this resource" button on the resource's page opens.
   - `sourceName` — a short label for where it lives, e.g. `Stanford Encyclopedia of Philosophy`, `Project Gutenberg`
   - Rows missing a `title` or `description`, or with a `type`/`level`/`tradition` that doesn't match the lists above, are skipped automatically rather than breaking the site.

**Copyright note:** don't paste the full text of a copyrighted article/book into the `body` column. Link to it via `sourceUrl` instead, and write your own short summary in `body`. Public-domain texts (Project Gutenberg, Early Modern Texts, Archive.org, DOAB) are the exception — feel free to quote those more freely since they're out of copyright.
3. Publish it: **File → Share → Publish to web**. Under "Link", choose the specific sheet/tab (not "Entire Document"), set the format to **Comma-separated values (.csv)**, and click **Publish**. Copy the URL it gives you.
4. Set that URL as the `RESOURCES_SHEET_CSV_URL` environment variable (copy [.env.local.example](.env.local.example) to `.env.local` for local dev, or add it in your hosting provider's project settings for the live site — see below).
5. Edits typically show up on the live site within about 5 minutes (the site re-checks the sheet periodically); no rebuild or redeploy needed.

If the environment variable isn't set, or the sheet can't be reached, the site silently falls back to the seed data in `src/data/resources.ts` — it will never show a broken page.

## Structure

- `src/app/` — pages (App Router): home, `/resources` (library with search/filter/sort), `/resources/[slug]` (detail), `/explainers`, `/for-educators`, `/about`, `/get-involved`, `/my-library`, `/privacy`
- `src/app/api/resources/route.ts` — JSON endpoint used by client-side pages (e.g. My Library) to read the current resource list
- `src/data/resources.ts` — the resource content model, constants (topics/types/levels/traditions), and seed/fallback dataset
- `src/lib/sheet.ts` — fetches and parses the published Google Sheet CSV into `Resource[]`, with fallback to seed data
- `src/lib/csv.ts` — small CSV parser (handles quoted fields, embedded commas/newlines)
- `src/components/` — shared UI (header, footer, resource cards, filters, etc.)
- `src/lib/useSavedResources.ts` — localStorage-backed "save to My Library" hook

## Build

```bash
npm run build
```
