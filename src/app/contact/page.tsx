import type { Metadata } from "next";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Get in Touch — Philosophy Commons",
  description:
    "Questions, feedback, or a lesson plan to share — get in touch with Philosophy Commons or submit a resource for the library.",
};

export default function ContactPage() {
  return (
    <Section className="py-14 sm:py-20">
      <div className="mx-auto max-w-xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gold-600">
          Get in Touch
        </p>
        <h1 className="font-serif text-3xl font-bold text-ink-950 sm:text-4xl">
          Questions, feedback, or a resource to share?
        </h1>
        <p className="mt-3 text-ink-700/70">
          We'd love to hear from you. If you're an educator with a lesson
          plan, discussion guide, or other resource you'd like considered
          for the library, select "Submit a lesson plan or resource" below
          and attach it — we review every submission.
        </p>
        <ContactForm />
      </div>
    </Section>
  );
}
