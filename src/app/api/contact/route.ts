import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const { BREVO_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!BREVO_API_KEY) {
    return NextResponse.json({ error: "not-configured" }, { status: 503 });
  }

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "bad-request" }, { status: 400 });
  }

  const name = String(data.name ?? "").trim().slice(0, 200);
  const email = String(data.email ?? "").trim().slice(0, 200);
  const subject = String(data.subject ?? "Voiceover inquiry").replace(/[\r\n]+/g, " ").slice(0, 200);
  const message = String(data.message ?? "").trim().slice(0, 10000);

  if (!name || !EMAIL_RE.test(email) || !message) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // Both addresses must be a sender you validated in Brevo (Senders & IP > Senders).
  const to = CONTACT_TO || CONTACT_FROM;
  const from = CONTACT_FROM || CONTACT_TO;
  if (!to || !from) {
    return NextResponse.json({ error: "not-configured" }, { status: 503 });
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        sender: { name: "Portfolio contact form", email: from },
        to: [{ email: to }],
        replyTo: { email, name },
        subject,
        textContent: message,
      }),
    });
    if (!res.ok) {
      console.error("Brevo error:", res.status, await res.text());
      return NextResponse.json({ error: "send-failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Brevo request failed:", err);
    return NextResponse.json({ error: "send-failed" }, { status: 502 });
  }
}
