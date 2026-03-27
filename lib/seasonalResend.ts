import { Resend } from "resend";

export function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export function seasonalMailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.RESEND_FROM_EMAIL &&
      (process.env.SEASONAL_ORDERS_EMAIL || process.env.SEASONAL_NOTIFY_EMAIL),
  );
}

export function seasonalOrdersInbox(): string | null {
  return process.env.SEASONAL_ORDERS_EMAIL?.trim() || null;
}

export function seasonalNotifyInbox(): string | null {
  return (
    process.env.SEASONAL_NOTIFY_EMAIL?.trim() || seasonalOrdersInbox()
  );
}

export function resendFromAddress(): string | null {
  return process.env.RESEND_FROM_EMAIL?.trim() || null;
}
