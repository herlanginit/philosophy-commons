import { NextResponse } from "next/server";

const CONTACT_TO_EMAIL = "heritagelanguageinitiative@gmail.com";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured");
    return NextResponse.json(
      { error: "Contact form is not configured yet. Please try again later." },
      { status: 500 }
    );
  }

  const { name, email, message } = await request.json();

  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !email.trim() ||
    typeof message !== "string" || !message.trim()
  ) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

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
      subject: `New contact form message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
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
