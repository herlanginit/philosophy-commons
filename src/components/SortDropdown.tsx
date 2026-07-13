export const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "popular", label: "Most Popular" },
  { value: "az", label: "Title A–Z" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export default function SortDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: SortValue) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink-700">
      <span className="font-medium">Sort by</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortValue)}
        className="rounded-md border border-ink-900/15 bg-white px-2.5 py-1.5 text-sm text-ink-900 focus:border-gold-500 focus:outline-none"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
