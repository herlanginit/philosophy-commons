"use client";

import { useRef, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const MAX_FILES = 3;
const MAX_FILE_BYTES = 4 * 1024 * 1024; // 4MB
const MAX_TOTAL_BYTES = 4 * 1024 * 1024; // 4MB combined, keeps the request well under serverless body limits

function formatBytes(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [reason, setReason] = useState<"general" | "lesson-plan">("general");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function addFiles(newFiles: FileList | null) {
    if (!newFiles) return;
    setErrorMessage("");
    const combined = [...files, ...Array.from(newFiles)];

    if (combined.length > MAX_FILES) {
      setErrorMessage(`Please attach at most ${MAX_FILES} files.`);
      return;
    }
    const oversized = combined.find((f) => f.size > MAX_FILE_BYTES);
    if (oversized) {
      setErrorMessage(`"${oversized.name}" is too large — each file must be under 4MB.`);
      return;
    }
    const total = combined.reduce((sum, f) => sum + f.size, 0);
    if (total > MAX_TOTAL_BYTES) {
      setErrorMessage("Attachments are too large — please keep the combined size under 4MB.");
      return;
    }
    setFiles(combined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeFile(index: number) {
    setFiles(files.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData();
    formData.set("name", (form.elements.namedItem("name") as HTMLInputElement).value);
    formData.set("email", (form.elements.namedItem("email") as HTMLInputElement).value);
    formData.set("message", (form.elements.namedItem("message") as HTMLTextAreaElement).value);
    formData.set("reason", reason);
    for (const file of files) formData.append("files", file);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setStatus("sent");
      form.reset();
      setFiles([]);
      setReason("general");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-6 rounded-xl border border-gold-500/30 bg-gold-500/10 p-6 text-center">
        <p className="font-serif text-lg font-semibold text-ink-900">Message sent</p>
        <p className="mt-2 text-sm text-ink-700/80">
          Thanks for reaching out — we'll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-gold-600 hover:text-gold-500"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-ink-800">
          What's this about?
        </label>
        <select
          id="reason"
          name="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value as "general" | "lesson-plan")}
          className="mt-1 w-full rounded-md border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-900 focus:border-gold-500 focus:outline-none"
        >
          <option value="general">General inquiry or feedback</option>
          <option value="lesson-plan">Submit a lesson plan or resource</option>
        </select>
      </div>
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
          {reason === "lesson-plan" ? "Tell us about this resource" : "Message"}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder={
            reason === "lesson-plan"
              ? "Topic, grade level, branch of philosophy, and anything else we should know…"
              : undefined
          }
          className="mt-1 w-full rounded-md border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-900 placeholder:text-ink-700/40 focus:border-gold-500 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="files" className="block text-sm font-medium text-ink-800">
          Attach files <span className="font-normal text-ink-700/50">(optional, up to 3, 4MB each)</span>
        </label>
        <input
          ref={fileInputRef}
          id="files"
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.odt"
          onChange={(e) => addFiles(e.target.files)}
          className="mt-1 block w-full text-sm text-ink-700 file:mr-3 file:rounded-full file:border-0 file:bg-ink-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-parchment-50 hover:file:bg-ink-700"
        />
        {files.length > 0 && (
          <ul className="mt-2 space-y-1">
            {files.map((file, i) => (
              <li
                key={`${file.name}-${i}`}
                className="flex items-center justify-between rounded-md bg-parchment-200 px-3 py-1.5 text-xs text-ink-800"
              >
                <span className="truncate">
                  {file.name} <span className="text-ink-700/50">({formatBytes(file.size)})</span>
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="ml-2 shrink-0 font-semibold text-gold-600 hover:text-gold-500"
                  aria-label={`Remove ${file.name}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-parchment-50 hover:bg-ink-700 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
