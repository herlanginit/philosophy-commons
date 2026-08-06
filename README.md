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
   - `pdfUrl` — optional; a link to your own downloadable PDF for this resource (e.g. an "inspired lesson plan" — see below). Shows a separate "Download inspired lesson plan (PDF)" button. Leave blank if there isn't one.
   - `imageUrl` — optional; a photo/artwork shown on the resource's card and detail page (Aeon-style). Leave blank for a plain card with no photo. See "Resource photos" below for where to source one.
   - `imageCredit`, `imageCreditUrl` — required whenever `imageUrl` is set: who to credit (e.g. an artist or photographer's name) and a link to the image's source/license page. Shown as a visible caption over the photo.
   - Rows missing a `title` or `description`, or with a `type`/`level`/`tradition` that doesn't match the lists above, are skipped automatically rather than breaking the site.

**Copyright note:** don't paste the full text of a copyrighted article/book into the `body` column. Link to it via `sourceUrl` instead, and write your own short summary in `body`. Public-domain texts (Project Gutenberg, Early Modern Texts, Archive.org, DOAB) are the exception — feel free to quote those more freely since they're out of copyright.
3. Publish it: **File → Share → Publish to web**. Under "Link", choose the specific sheet/tab (not "Entire Document"), set the format to **Comma-separated values (.csv)**, and click **Publish**. Copy the URL it gives you.
4. Set that URL as the `RESOURCES_SHEET_CSV_URL` environment variable (copy [.env.local.example](.env.local.example) to `.env.local` for local dev, or add it in your hosting provider's project settings for the live site — see below).
5. Edits typically show up on the live site within about 5 minutes (the site re-checks the sheet periodically); no rebuild or redeploy needed.

If the environment variable isn't set, or the sheet can't be reached, the site silently falls back to the seed data in `src/data/resources.ts` — it will never show a broken page.

## Contact form emails

The `/contact` page sends submissions (including lesson plan / resource submissions with file attachments) to `heritagelanguageinitiative@gmail.com` via [Resend](https://resend.com):

1. Sign up free at resend.com and create an API key.
2. Set it as the `RESEND_API_KEY` environment variable (`.env.local` locally, or your hosting provider's project settings for the live site).
3. Without a domain verified on Resend, emails send from `onboarding@resend.dev` — fine for this use case since the recipient is your own address. Verify a domain later in Resend if you want the "from" address to match your own domain instead.

The form has a "What's this about?" selector (general inquiry vs. submitting a lesson plan/resource) and an optional file attachment field (up to 3 files, 4MB each, 4MB combined — kept under typical serverless request-body limits). Attachments are sent as real email attachments via Resend's API.

If `RESEND_API_KEY` isn't set, the form shows an error instead of silently losing messages.

## Resource photos

Cards and detail pages can show a photo, styled after [Aeon](https://aeon.co)'s photo-led essay tiles. Every photo currently in the seed data is a real, freely-licensed image from [Wikimedia Commons](https://commons.wikimedia.org) (public domain or Creative Commons) — never a copyrighted stock photo or an AI-generated image — with a visible on-page credit linking back to the source file.

To add or change one (via the Google Sheet or directly in `resources.ts`):

1. Find a public-domain or CC-licensed image on [Wikimedia Commons](https://commons.wikimedia.org) that fits the resource (a portrait of the philosopher, a relevant artwork, a fitting photograph).
2. Use the direct file URL under `upload.wikimedia.org` as `imageUrl` (open the file page and copy the link from "Use this file" → "Download", or right-click the full-resolution image).
3. Set `imageCredit` to the artist/photographer's name (or "Unknown artist" if the file page doesn't list one) and `imageCreditUrl` to the Commons file page URL, so the photo stays properly attributed.
4. `next.config.ts` only allows images from `upload.wikimedia.org` (see `images.remotePatterns`) — add another host there first if you use a different source.

`scripts/resolve_images.py` / `scripts/finalize_images.py` are the scripts used to bulk-resolve the current set of images via the Commons search API — useful as a reference if you want to re-curate a batch of images at once rather than one at a time.

## Inspired lesson plan PDFs

The 8 "Lesson Plan" type resources each link to a real, freely-available course (MIT OpenCourseWare, Open Yale Courses, Open Culture) via `sourceUrl`, and also offer a downloadable original PDF via `pdfUrl` — a classroom-ready lesson plan **inspired by** that course's instructor and topic, credited to them by name, but written as original material for this site rather than a copy of their actual course materials. Every PDF says so explicitly in its own header and footer.

- `scripts/lesson_plans_data.py` — the actual lesson content (objectives, materials, procedure, discussion questions, assessment) for each of the 8 lesson plans
- `scripts/generate_lesson_plans.py` — renders each entry to a branded PDF (Python + [reportlab](https://www.reportlab.com/)) under `public/lesson-plans/{slug}.pdf`
- Run `pip3 install --user reportlab pypdf && python3 scripts/generate_lesson_plans.py` to regenerate them after editing the content
- `scripts/add-pdf-urls.mjs` — one-off script that added the `pdfUrl` field to the matching seed resources; not needed again unless you add a new lesson plan PDF from scratch

To add a new inspired lesson plan: add an entry to `LESSON_PLANS` in `lesson_plans_data.py`, regenerate, then add a `pdfUrl` pointing to `/lesson-plans/{slug}.pdf` for that resource (in `src/data/resources.ts` or the Google Sheet's `pdfUrl` column).

## Structure

- `src/app/` — pages (App Router): home, `/resources` (library with search/filter/sort), `/resources/[slug]` (detail), `/explainers`, `/for-educators`, `/about`, `/contact`, `/my-library`
- `src/app/api/resources/route.ts` — JSON endpoint used by client-side pages (e.g. My Library) to read the current resource list
- `src/app/api/contact/route.ts` — sends contact-form submissions via the Resend API
- `src/data/resources.ts` — the resource content model, constants (topics/types/levels/traditions), and seed/fallback dataset
- `src/lib/sheet.ts` — fetches and parses the published Google Sheet CSV into `Resource[]`, with fallback to seed data
- `src/lib/csv.ts` — small CSV parser (handles quoted fields, embedded commas/newlines)
- `src/components/` — shared UI (header, footer, resource cards, filters, etc.)
- `src/lib/useSavedResources.ts` — localStorage-backed "save to My Library" hook

## Build

```bash
npm run build
```
