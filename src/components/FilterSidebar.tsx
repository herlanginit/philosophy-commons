import FilterGroup from "./FilterGroup";
import { TOPICS, RESOURCE_TYPES, LEVELS, TRADITIONS } from "@/data/resources";

export interface ActiveFilters {
  topics: string[];
  types: string[];
  levels: string[];
  traditions: string[];
}

export default function FilterSidebar({
  filters,
  onToggle,
  onClear,
}: {
  filters: ActiveFilters;
  onToggle: (facet: keyof ActiveFilters, value: string) => void;
  onClear: () => void;
}) {
  const activeCount =
    filters.topics.length +
    filters.types.length +
    filters.levels.length +
    filters.traditions.length;

  return (
    <details
      open
      className="rounded-xl border border-ink-900/10 bg-white p-5 lg:sticky lg:top-20 lg:open lg:[&>summary]:hidden"
    >
      <summary className="cursor-pointer list-none font-serif text-base font-semibold text-ink-900 lg:hidden">
        Filters {activeCount > 0 && `(${activeCount})`}
      </summary>
      <div className="mt-4 flex items-center justify-between lg:mt-0">
        <h2 className="hidden font-serif text-base font-semibold text-ink-900 lg:block">
          Filters
        </h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-semibold text-gold-600 hover:text-gold-500"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="mt-2">
        <FilterGroup
          title="Branch / Topic"
          options={TOPICS}
          selected={filters.topics}
          onToggle={(v) => onToggle("topics", v)}
        />
        <FilterGroup
          title="Resource Type"
          options={RESOURCE_TYPES}
          selected={filters.types}
          onToggle={(v) => onToggle("types", v)}
        />
        <FilterGroup
          title="Level"
          options={LEVELS}
          selected={filters.levels}
          onToggle={(v) => onToggle("levels", v)}
        />
        <FilterGroup
          title="Tradition / Era"
          options={TRADITIONS}
          selected={filters.traditions}
          onToggle={(v) => onToggle("traditions", v)}
        />
      </div>
    </details>
  );
}
