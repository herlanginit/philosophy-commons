"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Resource } from "@/data/resources";
import ResourceCard from "./ResourceCard";
import FilterSidebar, { type ActiveFilters } from "./FilterSidebar";
import SortDropdown, { type SortValue } from "./SortDropdown";

function parseList(value: string | null): string[] {
  return value ? value.split(",").filter(Boolean) : [];
}

export default function ResourceLibrary({ resources }: { resources: Resource[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const sort = (searchParams.get("sort") as SortValue) ?? "newest";
  const filters: ActiveFilters = useMemo(
    () => ({
      topics: parseList(searchParams.get("topic")),
      types: parseList(searchParams.get("type")),
      levels: parseList(searchParams.get("level")),
      traditions: parseList(searchParams.get("tradition")),
    }),
    [searchParams]
  );

  function updateParams(mutate: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleToggleFilter(facet: keyof ActiveFilters, value: string) {
    const key = { topics: "topic", types: "type", levels: "level", traditions: "tradition" }[
      facet
    ];
    updateParams((params) => {
      const current = parseList(params.get(key));
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      if (next.length > 0) {
        params.set(key, next.join(","));
      } else {
        params.delete(key);
      }
    });
  }

  function handleClearFilters() {
    updateParams((params) => {
      params.delete("topic");
      params.delete("type");
      params.delete("level");
      params.delete("tradition");
    });
  }

  function handleSortChange(value: SortValue) {
    updateParams((params) => {
      params.set("sort", value);
    });
  }

  function handleQueryChange(value: string) {
    updateParams((params) => {
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
    });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = resources.filter((r) => {
      if (q) {
        const haystack = `${r.title} ${r.description} ${r.topics.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filters.topics.length && !r.topics.some((t) => filters.topics.includes(t))) {
        return false;
      }
      if (filters.types.length && !filters.types.includes(r.type)) return false;
      if (filters.levels.length && !filters.levels.includes(r.level)) return false;
      if (filters.traditions.length && !filters.traditions.includes(r.tradition)) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "oldest":
          return a.dateAdded < b.dateAdded ? -1 : 1;
        case "popular":
          return b.popularity - a.popularity;
        case "az":
          return a.title.localeCompare(b.title);
        case "newest":
        default:
          return a.dateAdded < b.dateAdded ? 1 : -1;
      }
    });

    return list;
  }, [query, filters, sort]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
      <FilterSidebar filters={filters} onToggle={handleToggleFilter} onClear={handleClearFilters} />

      <div>
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-700/40"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.34-4.34M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
            </svg>
            <label htmlFor="library-search" className="sr-only">
              Search resources
            </label>
            <input
              id="library-search"
              type="text"
              defaultValue={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Search resources…"
              className="w-full rounded-full border border-ink-900/15 bg-white py-2 pl-9 pr-4 text-sm text-ink-900 placeholder:text-ink-700/40 focus:border-gold-500 focus:outline-none"
            />
          </div>
          <SortDropdown value={sort} onChange={handleSortChange} />
        </div>

        <p className="mb-4 text-sm text-ink-700/70">
          {filtered.length} {filtered.length === 1 ? "resource" : "resources"} found
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-ink-900/15 bg-white py-16 text-center">
            <p className="font-serif text-lg font-semibold text-ink-900">No resources found</p>
            <p className="mt-2 text-sm text-ink-700/70">
              Try a different search term or clear a few filters.
            </p>
            <button
              type="button"
              onClick={() => {
                handleClearFilters();
                handleQueryChange("");
              }}
              className="mt-4 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-parchment-50 hover:bg-ink-700"
            >
              Clear search &amp; filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((resource) => (
              <ResourceCard key={resource.slug} resource={resource} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
