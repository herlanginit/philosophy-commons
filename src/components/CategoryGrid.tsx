import Link from "next/link";
import { TOPICS, type Topic } from "@/data/resources";

const TOPIC_META: Record<Topic, { icon: string; blurb: string }> = {
  Ethics: { icon: "⚖️", blurb: "Right, wrong, and how to live" },
  Metaphysics: { icon: "🌀", blurb: "Reality, identity, and being" },
  Epistemology: { icon: "🔍", blurb: "Knowledge, belief, and doubt" },
  Logic: { icon: "🧩", blurb: "Arguments, validity, and reasoning" },
  "Political Philosophy": { icon: "🏛️", blurb: "Power, justice, and the state" },
  "Philosophy of Mind": { icon: "🧠", blurb: "Consciousness and thought" },
  Aesthetics: { icon: "🎨", blurb: "Beauty, art, and taste" },
  "Philosophy of Religion": { icon: "✨", blurb: "God, faith, and meaning" },
  Existentialism: { icon: "🌱", blurb: "Freedom, choice, and absurdity" },
  "Eastern Philosophy": { icon: "☯️", blurb: "Daoist, Buddhist & Confucian thought" },
};

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {TOPICS.map((topic) => (
        <Link
          key={topic}
          href={`/resources?topic=${encodeURIComponent(topic)}`}
          className="group flex flex-col items-start gap-2 rounded-xl border border-ink-900/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <span className="text-2xl" aria-hidden>
            {TOPIC_META[topic].icon}
          </span>
          <span className="font-serif text-base font-semibold text-ink-900 group-hover:text-gold-600">
            {topic}
          </span>
          <span className="text-xs leading-snug text-ink-700/70">
            {TOPIC_META[topic].blurb}
          </span>
        </Link>
      ))}
    </div>
  );
}
