import Image from "next/image";
import Link from "next/link";
import { TOPICS, type Topic } from "@/data/resources";
import { TOPIC_IMAGES } from "@/data/topicImages";

const TOPIC_META: Record<Topic, { blurb: string }> = {
  Ethics: { blurb: "Right, wrong, and how to live" },
  Metaphysics: { blurb: "Reality, identity, and being" },
  Epistemology: { blurb: "Knowledge, belief, and doubt" },
  Logic: { blurb: "Arguments, validity, and reasoning" },
  "Political Philosophy": { blurb: "Power, justice, and the state" },
  "Philosophy of Mind": { blurb: "Consciousness and thought" },
  Aesthetics: { blurb: "Beauty, art, and taste" },
  "Philosophy of Religion": { blurb: "God, faith, and meaning" },
  Existentialism: { blurb: "Freedom, choice, and absurdity" },
  "Eastern Philosophy": { blurb: "Daoist, Buddhist & Confucian thought" },
};

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {TOPICS.map((topic) => {
        const image = TOPIC_IMAGES[topic];
        return (
          <Link
            key={topic}
            href={`/resources?topic=${encodeURIComponent(topic)}`}
            className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-xl shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <Image
              src={image.url}
              alt=""
              fill
              sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 45vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
            <div className="relative p-4 text-parchment-50">
              <span className="font-serif text-base font-semibold leading-tight">{topic}</span>
              <span className="mt-1 block text-xs leading-snug text-parchment-100/80">
                {TOPIC_META[topic].blurb}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
