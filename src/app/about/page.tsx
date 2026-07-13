import Link from "next/link";
import type { Metadata } from "next";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "About Us — Philosophy Commons",
  description:
    "Philosophy Commons' mission, team, and partners — a free, open library of philosophy teaching and learning resources.",
};

const TEAM = [
  { name: "Dr. Amara Osei", initials: "AO", role: "Founder & Executive Director", focus: "Ethics & Political Philosophy" },
  { name: "Dr. Marcus Feldman", initials: "MF", role: "Director of Curriculum", focus: "Philosophy of Mind & Existentialism" },
  { name: "Dr. Priya Nair", initials: "PN", role: "Head of Educator Programs", focus: "Logic & Eastern Philosophy" },
  { name: "Owen Wu", initials: "OW", role: "Head of Product & Engineering", focus: "Platform & Accessibility" },
];

const PARTNERS = [
  "American Philosophical Association",
  "PLATO (Philosophy Learning and Teaching Organization)",
  "National Endowment for the Humanities",
  "Open Syllabus Project",
];

export default function AboutPage() {
  return (
    <>
      <Section className="border-b border-ink-900/10 bg-gradient-to-b from-parchment-200 to-parchment-100 py-14 sm:py-20">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gold-600">
            About Us
          </p>
          <h1 className="font-serif text-3xl font-bold text-ink-950 sm:text-4xl">
            Philosophy shouldn't be locked behind a paywall or a university gate.
          </h1>
          <p className="mt-4 text-ink-700/80">
            Philosophy Commons is a nonprofit building a free, open library of
            philosophy teaching and learning material — readings, lesson
            plans, explainers, and discussion guides — so that any teacher,
            student, or curious adult can access rigorous philosophical
            material without cost.
          </p>
        </div>
      </Section>

      <Section className="py-14 sm:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink-950">Our story</h2>
            <p className="mt-3 leading-relaxed text-ink-700/80">
              Philosophy Commons started as a shared drive of lesson plans
              passed between a handful of high school and community college
              instructors who were tired of rebuilding the same units from
              scratch every semester. What began as a folder of PDFs grew
              into a structured, searchable library — and a mission to make
              sure no one has to reinvent a trolley-problem lesson plan ever
              again.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink-950">Our mission</h2>
            <p className="mt-3 leading-relaxed text-ink-700/80">
              We believe philosophical literacy — the ability to reason
              carefully, weigh arguments, and sit with hard questions — is a
              foundational skill, not a luxury. Every resource in our library
              is free to use, adapt, and share for educational purposes, with
              attribution to the original contributor.
            </p>
          </div>
        </div>
      </Section>

      <Section className="border-t border-ink-900/10 bg-parchment-50 py-14 sm:py-20">
        <h2 className="font-serif text-2xl font-bold text-ink-950">Team</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <div key={member.name} className="rounded-xl border border-ink-900/10 bg-white p-5 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink-900 font-serif text-lg font-bold text-parchment-50">
                {member.initials}
              </div>
              <h3 className="mt-4 font-serif text-base font-semibold text-ink-900">
                {member.name}
              </h3>
              <p className="text-sm text-gold-600">{member.role}</p>
              <p className="mt-1 text-xs text-ink-700/60">{member.focus}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="py-14 sm:py-20">
        <h2 className="font-serif text-2xl font-bold text-ink-950">Partners</h2>
        <p className="mt-2 max-w-2xl text-ink-700/70">
          We work with philosophy organizations, universities, and school
          districts to source and vet material.
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PARTNERS.map((partner) => (
            <li
              key={partner}
              className="rounded-lg border border-ink-900/10 bg-white px-5 py-4 text-sm font-medium text-ink-800"
            >
              {partner}
            </li>
          ))}
        </ul>
      </Section>

      <Section className="border-t border-ink-900/10 py-10 text-sm text-ink-700/60">
        <p>
          Read our{" "}
          <Link href="/privacy" className="font-medium text-gold-600 hover:text-gold-500">
            Privacy Policy
          </Link>{" "}
          or{" "}
          <Link href="/get-involved" className="font-medium text-gold-600 hover:text-gold-500">
            get involved
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
