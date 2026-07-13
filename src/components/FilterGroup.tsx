export default function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset className="border-b border-ink-900/10 py-4 first:pt-0 last:border-b-0">
      <legend className="mb-2 text-sm font-semibold text-ink-900">{title}</legend>
      <div className="flex flex-col gap-1.5">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2 text-sm text-ink-700/85"
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onToggle(option)}
              className="h-4 w-4 rounded border-ink-900/25 text-gold-600 focus:ring-gold-500"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
