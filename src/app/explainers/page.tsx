import type { Metadata } from "next";
import Section from "@/components/Section";
import ResourceCard from "@/components/ResourceCard";
import { getResources } from "@/lib/sheet";

export const metadata: Metadata = {
  title: "Explainers — Philosophy Commons",
  description:
    "Short, plain-language explainers on the concepts and thought experiments that come up again and again in philosophy.",
};

export default async function ExplainersPage() {
  const resources = await getResources();
  const explainers = resources
    .filter((r) => r.type === "Explainer")
    .sort((a, b) => (a.dateAdded < b.dateAdded ? 1 : -1));

  return (
    <Section className="py-12 sm:py-16">
      <div className="mb-10 max-w-2xl">
        <h1 className="font-serif text-3xl font-bold text-ink-950 sm:text-4xl">Explainers</h1>
        <p className="mt-3 text-ink-700/70">
          Big ideas, explained in minutes. Each explainer distills a concept
          or thought experiment — the trolley problem, the Gettier problem,
          the Ship of Theseus — into a short, accessible read with pointers
          to go deeper.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {explainers.map((resource) => (
          <ResourceCard key={resource.slug} resource={resource} />
        ))}
      </div>
    </Section>
  );
}
