"use client";

import Link from "next/link";
import { FOOTER_LINK_GROUPS } from "@/data/nav";

const SOCIALS = [
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink-900/10 bg-ink-950 text-parchment-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500 font-serif text-sm font-bold text-ink-950">
                PC
              </span>
              <span className="font-serif text-lg font-semibold text-parchment-50">
                Philosophy Commons
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-parchment-100/70">
              A free, open library of readings, lesson plans, and explainers
              spanning every branch and tradition of philosophy — built for
              educators, students, and the curious.
            </p>
            <form
              className="mt-6 flex max-w-sm gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-full border border-parchment-100/20 bg-ink-900 px-4 py-2 text-sm text-parchment-50 placeholder:text-parchment-100/40 focus:border-gold-500 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-ink-950 hover:bg-gold-400"
              >
                Subscribe
              </button>
            </form>
          </div>

          {FOOTER_LINK_GROUPS.map((group) => (
            <div key={group.heading}>
              <h3 className="font-serif text-sm font-semibold uppercase tracking-wide text-gold-400">
                {group.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-parchment-100/75 hover:text-parchment-50"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-parchment-100/10 pt-6 sm:flex-row">
          <p className="text-xs text-parchment-100/50">
            © {new Date().getFullYear()} Philosophy Commons. All resources
            free to use for educational purposes with attribution.
          </p>
          <div className="flex gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-xs text-parchment-100/50 hover:text-parchment-50"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
