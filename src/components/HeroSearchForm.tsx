"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSearchForm() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const params = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : "";
        router.push(`/resources${params}`);
      }}
      className="mx-auto flex w-full max-w-xl items-center gap-2 rounded-full border border-ink-900/10 bg-white p-1.5 pl-5 shadow-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="h-5 w-5 shrink-0 text-ink-700/50"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.34-4.34M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
      </svg>
      <label htmlFor="hero-search" className="sr-only">
        Search resources
      </label>
      <input
        id="hero-search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search readings, lesson plans, explainers…"
        className="w-full bg-transparent py-2 text-sm text-ink-900 placeholder:text-ink-700/40 focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-parchment-50 transition-colors hover:bg-ink-700"
      >
        Search
      </button>
    </form>
  );
}
