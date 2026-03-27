import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getResend,
  resendFromAddress,
  seasonalOrdersInbox,
} from "@/lib/seasonalResend";
import { seasonalOrderFormSchema } from "@/lib/seasonalFormSchemas";

export const dynamic = "force-dynamic";

const bodySchema = seasonalOrderFormSchema.extend({
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
  const to = seasonalOrdersInbox();
  if (!resend || !from || !to) {
    return NextResponse.json(
      { error: "Email is not configured for seasonal orders." },
      { status: 503 },
    );
  }

  const {
    name,
    email,
    phone,
    festivalLabel,
    festivalSlug,
    deliveryOrPickup,
    preferredDate,
    headcount,
    itemsNotes,
  } = parsed.data;

  const text = [
    `Seasonal order: ${festivalLabel}`,
    `Festival slug: ${festivalSlug}`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Delivery / pickup: ${deliveryOrPickup}`,
    `Preferred date: ${preferredDate}`,
    `Headcount: ${headcount}`,
    "",
    "Items / notes:",
    itemsNotes || "(none)",
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Seasonal order: ${festivalLabel} — ${name}`,
    text,
  });

  if (error) {
    console.error("Resend seasonal order error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Try again or use WhatsApp." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
