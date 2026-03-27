import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getResend,
  resendFromAddress,
  seasonalNotifyInbox,
} from "@/lib/seasonalResend";
import { seasonalNotifyFormSchema } from "@/lib/seasonalFormSchemas";

export const dynamic = "force-dynamic";

const bodySchema = seasonalNotifyFormSchema.extend({
  website: z.string().optional(),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid form data", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const resend = getResend();
  const from = resendFromAddress();
  const to = seasonalNotifyInbox();
  if (!resend || !from || !to) {
    return NextResponse.json(
      { error: "Email is not configured for notifications." },
      { status: 503 },
    );
  }

  const { email, name, festivalLabel, festivalSlug } = parsed.data;

  const text = [
    `Seasonal notify signup: ${festivalLabel}`,
    `Festival slug: ${festivalSlug}`,
    "",
    `Email: ${email}`,
    name ? `Name: ${name}` : "Name: (not provided)",
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Seasonal notify: ${festivalLabel} — ${email}`,
    text,
  });

  if (error) {
    console.error("Resend seasonal notify error:", error);
    return NextResponse.json(
      { error: "Failed to send. Try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
