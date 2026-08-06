import Image from "next/image";
import Link from "next/link";
import type { Resource } from "@/data/resources";
import SaveButton from "./SaveButton";

const TYPE_ICON: Record<Resource["type"], string> = {
  "Lesson Plan": "📘",
  "Primary Text": "📜",
  Explainer: "💡",
  Video: "🎬",
  Podcast: "🎙️",
  "Discussion Guide": "💬",
  Activity: "✏️",
};

export default function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-ink-900/10 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/resources/${resource.slug}`} className="flex flex-1 flex-col">
        {resource.imageUrl && (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-900/5">
            <Image
              src={resource.imageUrl}
              alt=""
              fill
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink-950/70 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-parchment-50 backdrop-blur-sm">
              <span aria-hidden>{TYPE_ICON[resource.type]}</span>
              {resource.type}
            </span>
            {resource.imageCredit && (
              <span className="absolute bottom-1.5 right-2 rounded bg-ink-950/50 px-1.5 py-0.5 text-[10px] leading-none text-parchment-50/90">
                Photo: {resource.imageCredit}
              </span>
            )}
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            {!resource.imageUrl && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-900/5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-ink-700">
                <span aria-hidden>{TYPE_ICON[resource.type]}</span>
                {resource.type}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-xs text-ink-700/60">
              {resource.pdfUrl && (
                <span
                  className="inline-flex items-center gap-0.5 rounded-full bg-gold-500/15 px-1.5 py-0.5 font-semibold text-gold-600"
                  title="Downloadable inspired lesson plan available"
                >
                  PDF
                </span>
              )}
              {resource.estMinutes} min
            </span>
          </div>
          <h3 className="font-serif text-lg font-semibold leading-snug text-ink-900 group-hover:text-ink-600">
            {resource.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-700/80 line-clamp-3">
            {resource.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {resource.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-parchment-200 px-2 py-0.5 text-xs text-ink-700"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between border-t border-ink-900/10 px-5 py-3">
        <span className="text-xs text-ink-700/60">
          {resource.level}
          {resource.sourceName && (
            <>
              {" "}
              · <span className="text-gold-600">{resource.sourceName}</span>
            </>
          )}
        </span>
        <SaveButton slug={resource.slug} />
      </div>
    </div>
  );
}
