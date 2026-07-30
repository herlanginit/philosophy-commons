import { NextResponse } from "next/server";

const CONTACT_TO_EMAIL = "heritagelanguageinitiative@gmail.com";
const MAX_FILES = 3;
const MAX_FILE_BYTES = 4 * 1024 * 1024; // 4MB
const MAX_TOTAL_BYTES = 4 * 1024 * 1024; // 4MB combined, keeps the request well under serverless body limits

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured");
    return NextResponse.json(
      { error: "Contact form is not configured yet. Please try again later." },
      { status: 500 }
    );
  }

  const form = await request.formData();
  const name = form.get("name");
  const email = form.get("email");
  const message = form.get("message");
  const reason = form.get("reason") === "lesson-plan" ? "lesson-plan" : "general";
  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);

  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !email.trim() ||
    typeof message !== "string" || !message.trim()
  ) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  if (files.length > MAX_FILES) {
    return NextResponse.json({ error: `Please attach at most ${MAX_FILES} files.` }, { status: 400 });
  }
  for (const file of files) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: `"${file.name}" is too large — each file must be under 4MB.` },
        { status: 400 }
      );
    }
  }
  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);
  if (totalBytes > MAX_TOTAL_BYTES) {
    return NextResponse.json(
      { error: "Attachments are too large — please keep the combined size under 4MB." },
      { status: 400 }
    );
  }

  const attachments = await Promise.all(
    files.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
    }))
  );

  const subject =
    reason === "lesson-plan"
      ? `New lesson plan submission from ${name}`
      : `New contact form message from ${name}`;
  const reasonLabel = reason === "lesson-plan" ? "Lesson plan / resource submission" : "General inquiry";
  const attachmentNote = attachments.length > 0 ? `\n\nAttached: ${attachments.map((a) => a.filename).join(", ")}` : "";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Philosophy Commons <onboarding@resend.dev>",
      to: [CONTACT_TO_EMAIL],
      reply_to: email,
      subject,
      text: `From: ${name} <${email}>\nReason: ${reasonLabel}\n\n${message}${attachmentNote}`,
      attachments: attachments.length > 0 ? attachments : undefined,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[contact] Resend API error:", res.status, body);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ status: "ok" });
}
