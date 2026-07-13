import type { Metadata } from "next";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Privacy Policy — Philosophy Commons",
  description: "Philosophy Commons' privacy policy.",
};

export default function PrivacyPage() {
  return (
    <Section className="py-14 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-serif text-3xl font-bold text-ink-950">Privacy Policy</h1>
        <p className="mt-2 text-sm text-ink-700/60">Last updated July 2026</p>

        <div className="mt-8 space-y-6 text-ink-700/85">
          <p>
            Philosophy Commons ("we," "us") provides this placeholder privacy
            policy for demonstration purposes. In a production deployment,
            this page would describe what data is collected, how it is used,
            and what choices visitors have.
          </p>
          <div>
            <h2 className="font-serif text-lg font-semibold text-ink-900">
              What we store
            </h2>
            <p className="mt-2">
              The "My Library" feature saves your bookmarked resources in
              your browser's local storage. This data never leaves your
              device and is not transmitted to us — clearing your browser
              data will remove it.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-lg font-semibold text-ink-900">
              Contact
            </h2>
            <p className="mt-2">
              Questions about this policy can be sent through the{" "}
              <a href="/get-involved" className="font-medium text-gold-600 hover:text-gold-500">
                Get Involved
              </a>{" "}
              contact form.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
