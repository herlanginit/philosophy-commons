import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Section from "@/components/Section";
import ResourceCard from "@/components/ResourceCard";
import SaveButton from "@/components/SaveButton";
import { getResourceBySlug, getRelatedResources } from "@/data/resources";
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

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
        <article>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-900/5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-ink-700">
            {resource.type}
          </span>
          <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-ink-950 sm:text-4xl">
            {resource.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-700/80">
            {resource.description}
          </p>

          <div className="mt-8 space-y-5">
            {resource.body.map((paragraph, i) => (
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
