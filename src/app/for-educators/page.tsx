import Link from "next/link";
import type { Metadata } from "next";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "For Educators — Philosophy Commons",
  description:
    "Professional development, teaching guides, and facilitation support for educators bringing philosophy into the classroom.",
};

const CARDS = [
  {
    title: "Lesson Plans",
    description: "Full class-ready lessons with pacing, worksheets, and extension activities.",
    href: "/resources?type=Lesson+Plan",
    icon: "📘",
  },
  {
    title: "Discussion Guides",
    description: "Facilitation guides for running structured philosophical discussions.",
    href: "/resources?type=Discussion+Guide",
    icon: "💬",
  },
  {
    title: "Classroom Activities",
    description: "Hands-on activities, card sorts, and role-play exercises.",
    href: "/resources?type=Activity",
    icon: "✏️",
  },
  {
    title: "Explainers",
    description: "Short concept primers you can assign as pre-reading.",
    href: "/explainers",
    icon: "💡",
  },
];

const GUIDANCE = [
  {
    title: "Facilitating open discussion",
    body: "Philosophy classrooms work best when students feel safe disagreeing. Set explicit norms early: attack the argument, not the person; it's fine to change your mind out loud; 'I don't know yet' is a legitimate position.",
  },
  {
    title: "Handling charged topics",
    body: "Ethics, political philosophy, and philosophy of religion regularly touch on students' personal convictions. Frame discussions around the strength of arguments rather than the correctness of conclusions, and give students permission to keep their final views private if they choose.",
  },
  {
    title: "Scaffolding primary texts",
    body: "Primary sources are more rewarding than summaries, but harder to read cold. Pair a primary text with its companion explainer, read the densest passages aloud together, and use guided marginal questions rather than open-ended 'what do you think.'",
  },
  {
    title: "Assessing philosophical writing",
    body: "Grade for the quality of argument, not the conclusion reached. A well-reasoned essay defending a position you disagree with should outscore a poorly-reasoned essay defending a position you find congenial.",
  },
];

export default function ForEducatorsPage() {
  return (
    <>
      <Section className="border-b border-ink-900/10 bg-gradient-to-b from-parchment-200 to-parchment-100 py-14 sm:py-20">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gold-600">
            Educator Support
          </p>
          <h1 className="font-serif text-3xl font-bold text-ink-950 sm:text-4xl">
            Everything you need to bring philosophy into your classroom
          </h1>
          <p className="mt-4 text-ink-700/80">
            Whether you're teaching a full semester of philosophy or slotting
            a single discussion into an existing course, Philosophy Commons
            has free, classroom-tested material to help.
          </p>
        </div>
      </Section>

      <Section className="py-14 sm:py-20">
        <h2 className="font-serif text-2xl font-bold text-ink-950">Start here</h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group flex flex-col gap-2 rounded-xl border border-ink-900/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-2xl" aria-hidden>
                {card.icon}
              </span>
              <span className="font-serif text-base font-semibold text-ink-900 group-hover:text-gold-600">
                {card.title}
              </span>
              <span className="text-sm text-ink-700/70">{card.description}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="border-t border-ink-900/10 bg-parchment-50 py-14 sm:py-20">
        <h2 className="font-serif text-2xl font-bold text-ink-950">
          Guidance for facilitators
        </h2>
        <p className="mt-2 max-w-2xl text-ink-700/70">
          Practical notes for running philosophical discussion well, drawn
          from feedback across hundreds of classrooms.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {GUIDANCE.map((item) => (
            <div key={item.title} className="rounded-xl border border-ink-900/10 bg-white p-6">
              <h3 className="font-serif text-lg font-semibold text-ink-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700/80">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="py-14 text-center sm:py-16">
        <h2 className="font-serif text-2xl font-bold text-ink-950">
          Want professional development for your department?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-ink-700/70">
          We offer free workshops and planning support for schools building
          out a philosophy curriculum.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-parchment-50 hover:bg-ink-700"
        >
          Get in touch
        </Link>
      </Section>
    </>
  );
}
