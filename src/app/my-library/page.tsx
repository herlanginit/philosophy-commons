"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Section from "@/components/Section";
import ResourceCard from "@/components/ResourceCard";
import { useSavedResources } from "@/lib/useSavedResources";
import type { Resource } from "@/data/resources";

export default function MyLibraryPage() {
  const { saved, hydrated } = useSavedResources();
  const [resources, setResources] = useState<Resource[] | null>(null);

  useEffect(() => {
    fetch("/api/resources")
      .then((res) => res.json())
      .then(setResources)
      .catch(() => setResources([]));
  }, []);

  const savedResources = resources?.filter((r) => saved.includes(r.slug)) ?? [];
  const loading = !hydrated || resources === null;

  return (
    <Section className="py-12 sm:py-16">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-ink-950 sm:text-4xl">My Library</h1>
        <p className="mt-2 max-w-2xl text-ink-700/70">
          Resources you've saved, stored right in this browser — no account
          required.
        </p>
      </div>

      {loading ? null : savedResources.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink-900/15 bg-white py-16 text-center">
          <p className="font-serif text-lg font-semibold text-ink-900">
            Nothing saved yet
          </p>
          <p className="mt-2 text-sm text-ink-700/70">
            Click the save button on any resource to add it to your library.
          </p>
          <Link
            href="/resources"
            className="mt-4 inline-block rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-parchment-50 hover:bg-ink-700"
          >
            Browse the library
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {savedResources.map((resource) => (
            <ResourceCard key={resource.slug} resource={resource} />
          ))}
        </div>
      )}
    </Section>
  );
}
