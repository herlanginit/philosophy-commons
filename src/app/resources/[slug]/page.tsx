import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Section from "@/components/Section";
import ResourceCard from "@/components/ResourceCard";
import SaveButton from "@/components/SaveButton";
import { getResourceBySlug, getRelatedResources, AGE_RANGE_BY_LEVEL } from "@/data/resources";
import { getResources } from "@/lib/sheet";

// New slugs that appear in the sheet after a build won't be in this list yet —
// dynamicParams (on by default) lets Next render and cache them on first request.
export async function generateStaticParams() {
  const resources = await getResources();
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resources = await getResources();
  const resource = getResourceBySlug(resources, slug);
  if (!resource) return {};
  return {
    title: `${resource.title} — Philosophy Commons`,
    description: resource.description,
  };
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resources = await getResources();
  const resource = getResourceBySlug(resources, slug);
  if (!resource) notFound();

  const related = getRelatedResources(resources, resource);

  return (
    <Section className="py-12 sm:py-16">
      <nav className="mb-6 text-sm text-ink-700/60">
        <Link href="/resources" className="hover:text-gold-600">
          Resource Library
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700/80">{resource.title}</span>
      </nav>

      {resource.imageUrl && (
        <figure className="relative mb-10 aspect-[21/9] w-full overflow-hidden rounded-2xl bg-ink-900/5">
          <Image
            src={resource.imageUrl}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
          {resource.imageCredit && (
            <figcaption className="absolute bottom-0 right-0 rounded-tl-md bg-ink-950/60 px-3 py-1.5 text-xs text-parchment-50/90">
              Photo:{" "}
              {resource.imageCreditUrl ? (
                <a
                  href={resource.imageCreditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-parchment-50"
                >
                  {resource.imageCredit}, via Wikimedia Commons
                </a>
              ) : (
                `${resource.imageCredit}, via Wikimedia Commons`
              )}
            </figcaption>
          )}
        </figure>
      )}

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
        <article>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-900/5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-ink-700">
              {resource.type}
            </span>
            {resource.pdfUrl && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-gold-600">
                {AGE_RANGE_BY_LEVEL[resource.level]}
              </span>
            )}
          </div>
          <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-ink-950 sm:text-4xl">
            {resource.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-700/80">
            {resource.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {resource.sourceUrl && (
              <a
                href={resource.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-ink-950 hover:bg-gold-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
                Access this resource{resource.sourceName ? ` on ${resource.sourceName}` : ""}
              </a>
            )}
            {resource.pdfUrl && (
              <a
                href={resource.pdfUrl}
                download
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink-900 px-5 py-2.5 text-sm font-semibold text-ink-900 hover:bg-ink-900 hover:text-parchment-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M7.5 12l4.5 4.5m0 0 4.5-4.5m-4.5 4.5V3"
                  />
                </svg>
                Download inspired lesson plan (PDF)
              </a>
            )}
          </div>
          {resource.pdfUrl && (
            <p className="mt-2 text-xs text-ink-700/60">
              An original lesson plan written by Philosophy Commons, inspired by this course —
              not the instructor's own materials.
            </p>
          )}

          <div className="mt-8 space-y-5">
            {resource.body
              .filter((paragraph) => paragraph !== resource.description)
              .map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-ink-800">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {resource.topics.map((topic) => (
              <Link
                key={topic}
                href={`/resources?topic=${encodeURIComponent(topic)}`}
                className="rounded-full bg-parchment-200 px-3 py-1 text-xs font-medium text-ink-700 hover:bg-gold-500/20"
              >
                {topic}
              </Link>
            ))}
          </div>
        </article>

        <aside className="lg:sticky lg:top-20 lg:h-fit">
          <div className="rounded-xl border border-ink-900/10 bg-white p-5">
            <SaveButton slug={resource.slug} className="w-full justify-center" />
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-700/60">Level</dt>
                <dd className="text-right font-medium text-ink-900">{resource.level}</dd>
              </div>
              {resource.pdfUrl && (
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-700/60">Suitable Ages</dt>
                  <dd className="text-right font-medium text-ink-900">
                    {AGE_RANGE_BY_LEVEL[resource.level]}
                  </dd>
                </div>
              )}
              <div className="flex justify-between gap-4">
                <dt className="text-ink-700/60">Tradition</dt>
                <dd className="text-right font-medium text-ink-900">{resource.tradition}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-700/60">Time</dt>
                <dd className="text-right font-medium text-ink-900">{resource.estMinutes} min</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-700/60">Author</dt>
                <dd className="text-right font-medium text-ink-900">{resource.author}</dd>
              </div>
              {resource.sourceUrl && (
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-700/60">Source</dt>
                  <dd className="text-right font-medium">
                    <a
                      href={resource.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-600 hover:text-gold-500"
                    >
                      {resource.sourceName || "View original"}
                    </a>
                  </dd>
                </div>
              )}
              <div className="flex justify-between gap-4">
                <dt className="text-ink-700/60">Added</dt>
                <dd className="text-right font-medium text-ink-900">
                  {new Date(resource.dateAdded).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </dd>
              </div>
            </dl>
            <p className="mt-5 border-t border-ink-900/10 pt-4 text-xs leading-relaxed text-ink-700/60">
              Free to use for educational purposes with attribution to
              Philosophy Commons.
            </p>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <div className="mt-16 border-t border-ink-900/10 pt-10">
          <h2 className="font-serif text-2xl font-bold text-ink-950">Related resources</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ResourceCard key={r.slug} resource={r} />
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
