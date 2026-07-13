import type { Metadata } from "next";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Philosophy Commons",
  description:
    "Questions, resource suggestions, or feedback — get in touch with Philosophy Commons.",
};

export default function ContactPage() {
  return (
    <Section className="py-14 sm:py-20">
      <div className="mx-auto max-w-xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gold-600">
          Contact
        </p>
        <h1 className="font-serif text-3xl font-bold text-ink-950 sm:text-4xl">Contact us</h1>
        <p className="mt-3 text-ink-700/70">
          Questions, resource suggestions, or feedback — we'd love to hear
          from you.
        </p>
        <ContactForm />
      </div>
    </Section>
  );
}
