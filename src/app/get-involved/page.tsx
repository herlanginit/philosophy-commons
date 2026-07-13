import type { Metadata } from "next";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Get Involved — Philosophy Commons",
  description:
    "Donate, volunteer, partner with us, or get in touch — ways to support Philosophy Commons' free philosophy education library.",
};

const WAYS = [
  {
    title: "Donate",
    icon: "🤍",
    body: "Philosophy Commons is a nonprofit. Every dollar goes toward commissioning new resources, editorial review, and keeping the library free.",
    cta: "Donate",
  },
  {
    title: "Volunteer",
    icon: "🙋",
    body: "We're always looking for educators, writers, and philosophy grad students to help write, review, or translate resources.",
    cta: "Apply to volunteer",
  },
  {
    title: "Partner with us",
    icon: "🤝",
    body: "Schools, districts, and philosophy organizations can partner with us on curriculum design, professional development, or co-branded resources.",
    cta: "Start a partnership",
  },
  {
    title: "Careers",
    icon: "💼",
    body: "We occasionally hire for curriculum, editorial, and engineering roles. Check back or reach out to be notified of openings.",
    cta: "View openings",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <Section className="border-b border-ink-900/10 bg-gradient-to-b from-parchment-200 to-parchment-100 py-14 sm:py-20">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gold-600">
            Get Involved
          </p>
          <h1 className="font-serif text-3xl font-bold text-ink-950 sm:text-4xl">
            Help keep philosophy free and open
          </h1>
          <p className="mt-4 text-ink-700/80">
            Philosophy Commons runs on the support of donors, volunteers, and
            partner institutions. Here's how to get involved.
          </p>
        </div>
      </Section>

      <Section className="py-14 sm:py-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {WAYS.map((way) => (
            <div key={way.title} className="rounded-xl border border-ink-900/10 bg-white p-6">
              <span className="text-2xl" aria-hidden>
                {way.icon}
              </span>
              <h2 className="mt-3 font-serif text-lg font-semibold text-ink-900">{way.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-700/80">{way.body}</p>
              <button
                type="button"
                className="mt-4 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-parchment-50 hover:bg-ink-700"
              >
                {way.cta}
              </button>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-ink-900/10 bg-parchment-50 py-14 sm:py-20">
        <div className="mx-auto max-w-xl">
          <h2 className="font-serif text-2xl font-bold text-ink-950">Contact us</h2>
          <p className="mt-2 text-ink-700/70">
            Questions, resource suggestions, or press inquiries — we'd love to
            hear from you.
          </p>
          <form
            className="mt-6 space-y-4"
            action="mailto:hello@philosophycommons.org"
            method="post"
            encType="text/plain"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-ink-800">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 w-full rounded-md border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-900 focus:border-gold-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink-800">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-md border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-900 focus:border-gold-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-ink-800">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="mt-1 w-full rounded-md border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-900 focus:border-gold-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-parchment-50 hover:bg-ink-700"
            >
              Send message
            </button>
          </form>
        </div>
      </Section>
    </>
  );
}
