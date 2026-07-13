"use client";

import { useSavedResources } from "@/lib/useSavedResources";

export default function SaveButton({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const { isSaved, toggle, hydrated } = useSavedResources();
  const saved = hydrated && isSaved(slug);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={saved}
      aria-label={saved ? "Remove from My Library" : "Save to My Library"}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
        saved
          ? "border-gold-500 bg-gold-500/10 text-gold-600"
          : "border-ink-900/15 bg-white/60 text-ink-700 hover:border-gold-500 hover:text-gold-600"
      } ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.8}
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5v15.19a.75.75 0 0 1-1.14.643L12 17.6l-4.86 2.733A.75.75 0 0 1 6 19.69V4.5Z"
        />
      </svg>
      {saved ? "Saved" : "Save"}
    </button>
  );
}
