import { Suspense } from "react";
import type { Metadata } from "next";
import Section from "@/components/Section";
import ResourceLibrary from "@/components/ResourceLibrary";
import { getResources } from "@/lib/sheet";

export const metadata: Metadata = {
  title: "Resource Library — Philosophy Commons",
  description:
    "Search and filter free philosophy readings, lesson plans, explainers, and discussion guides by branch, type, level, and tradition.",
};

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <Section className="py-12 sm:py-16">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-ink-950 sm:text-4xl">
          Resource Library
        </h1>
        <p className="mt-2 max-w-2xl text-ink-700/70">
          Browse readings, lesson plans, explainers, activities, and more —
          every resource is free to use with attribution.
        </p>
      </div>
      <Suspense fallback={<div className="text-sm text-ink-700/60">Loading resources…</div>}>
        <ResourceLibrary resources={resources} />
      </Suspense>
    </Section>
  );
}
