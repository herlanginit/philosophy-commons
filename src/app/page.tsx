import Link from "next/link";
import Section from "@/components/Section";
import CategoryGrid from "@/components/CategoryGrid";
import ResourceCard from "@/components/ResourceCard";
import HeroSearchForm from "@/components/HeroSearchForm";
import { TOPICS } from "@/data/resources";
import { getResources } from "@/lib/sheet";

export default async function Home() {
  const resources = await getResources();

  const STATS = [
    { label: "Free resources", value: `${resources.length}+` },
    { label: "Branches of philosophy", value: `${TOPICS.length}` },
    { label: "Educators & learners reached", value: "4,200+" },
    { label: "Always free", value: "$0" },
  ];

  const newest = [...resources]
    .sort((a, b) => (a.dateAdded < b.dateAdded ? 1 : -1))
    .slice(0, 4);

  const explainers = resources.filter((r) => r.type === "Explainer").slice(0, 3);

  return (
    <>
      <Section className="relative overflow-hidden border-b border-ink-900/10 bg-gradient-to-b from-parchment-200 to-parchment-100 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center rounded-full bg-gold-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-600">
            Free &amp; open, always
          </p>
          <h1 className="font-serif text-4xl font-bold leading-tight text-ink-950 sm:text-5xl">
            Philosophy resources for every classroom, and every curious mind.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-700/80">
            Philosophy Commons is a free library of readings, lesson plans,
            explainers, and discussion guides spanning ethics, metaphysics,
            logic, and every other branch of philosophy — built for
            educators, students, and anyone who wants to think more clearly.
          </p>
          <div className="mt-8">
            <HeroSearchForm />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link
              href="/resources"
              className="rounded-full bg-ink-900 px-5 py-2.5 font-semibold text-parchment-50 hover:bg-ink-700"
            >
              Browse the library
            </Link>
            <Link
              href="/for-educators"
              className="rounded-full border border-ink-900/15 bg-white px-5 py-2.5 font-semibold text-ink-900 hover:border-gold-500 hover:text-gold-600"
            >
              For educators
            </Link>
          </div>
        </div>
      </Section>

      <Section className="border-b border-ink-900/10 bg-ink-950 py-10">
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="text-xs uppercase tracking-wide text-parchment-100/60">
                {stat.label}
              </dt>
              <dd className="mt-1 font-serif text-2xl font-bold text-gold-400 sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section className="py-16 sm:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink-950 sm:text-3xl">
              Browse by branch
            </h2>
            <p className="mt-2 text-ink-700/70">
              Every resource is tagged so you can find exactly what fits your
              syllabus or your curiosity.
            </p>
          </div>
          <Link
            href="/resources"
            className="hidden shrink-0 text-sm font-semibold text-gold-600 hover:text-gold-500 sm:block"
          >
            View all resources →
          </Link>
        </div>
        <CategoryGrid />
      </Section>

      <Section className="border-t border-ink-900/10 bg-parchment-50 py-16 sm:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink-950 sm:text-3xl">
              Newest additions
            </h2>
            <p className="mt-2 text-ink-700/70">
              Fresh readings, lessons, and guides added to the library.
            </p>
          </div>
          <Link
            href="/resources"
            className="hidden shrink-0 text-sm font-semibold text-gold-600 hover:text-gold-500 sm:block"
          >
            View all resources →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {newest.map((resource) => (
            <ResourceCard key={resource.slug} resource={resource} />
          ))}
        </div>
      </Section>

      <Section className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gold-600">
              Quick reads
            </p>
            <h2 className="font-serif text-2xl font-bold text-ink-950 sm:text-3xl">
              Big ideas, explained in minutes
            </h2>
            <p className="mt-3 text-ink-700/70">
              Short, plain-language explainers on the concepts and thought
              experiments that come up again and again — the trolley problem,
              the Ship of Theseus, the Chinese Room, and more.
            </p>
            <Link
              href="/explainers"
              className="mt-5 inline-block rounded-full border border-ink-900/15 bg-white px-5 py-2.5 text-sm font-semibold text-ink-900 hover:border-gold-500 hover:text-gold-600"
            >
              Browse all explainers
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {explainers.map((resource) => (
              <ResourceCard key={resource.slug} resource={resource} />
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-t border-ink-900/10 bg-ink-950 py-16 text-center sm:py-20">
        <h2 className="font-serif text-2xl font-bold text-parchment-50 sm:text-3xl">
          Have a resource to suggest, or feedback to share?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-parchment-100/70">
          Philosophy Commons is built by educators. We'd love to hear from
          you.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-ink-950 hover:bg-gold-400"
          >
            Contact us
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-parchment-100/20 px-5 py-2.5 text-sm font-semibold text-parchment-50 hover:border-gold-400 hover:text-gold-400"
          >
            Learn about our mission
          </Link>
        </div>
      </Section>
    </>
  );
}
