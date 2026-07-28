import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, CalendarClock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTAButton from "@/components/shared/CTAButton";
import { PageShell } from "@/components/shared/PageShell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SeasonalPageExtras } from "@/components/seasonal/SeasonalPageExtras";
import { SeasonalNotifyForm } from "@/components/seasonal/SeasonalNotifyForm";
import { SeasonalOrderForm } from "@/components/seasonal/SeasonalOrderForm";
import SeasonalCountdown from "@/components/seasonal/SeasonalCountdown";
import { SEASONAL_EVENTS } from "@/lib/seasonalData";
import { getFestivalContent } from "@/lib/seasonalFestivalContent";
import type { SeasonalResolvedState } from "@/lib/seasonalCalendar";
import { seasonalMailConfigured } from "@/lib/seasonalResend";
import { cn } from "@/lib/utils";

function formatDayUAE(d: Date) {
  return d.toLocaleDateString("en-AE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dubai",
  });
}

function modeBadge(mode: SeasonalResolvedState["mode"]) {
  switch (mode) {
    case "ordering":
      return { label: "Orders open now", dot: "bg-emerald-400" };
    case "notify":
      return { label: "Ordering soon", dot: "bg-brand-gold" };
    case "closed":
      return { label: "This wave has closed", dot: "bg-brand-light/50" };
    default:
      return { label: "Save the date", dot: "bg-brand-gold" };
  }
}

export default function SeasonalExperience({
  resolved,
  viewIsOverride,
}: {
  resolved: SeasonalResolvedState;
  viewIsOverride: boolean;
}) {
  const { instance, mode, isEarly, canOrder, canNotify } = resolved;
  const content = getFestivalContent(instance.slug, instance.variantLabel);
  const mailOk = seasonalMailConfigured();
  const badge = modeBadge(mode);

  const heroImage = content.gallery[0]?.src ?? content.heroSrc;
  const spreadImage = content.gallery[1]?.src ?? content.heroSrc;

  // Countdown target + label depend on where we are in the cycle.
  const countdownTarget =
    mode === "ordering" ? instance.eventStart : instance.orderStart;
  const countdownLabel =
    mode === "ordering"
      ? `${content.displayName} begins in`
      : isEarly
        ? "Ordering opens in"
        : `${content.displayName} begins in`;

  const primaryCta =
    canOrder && mode === "ordering"
      ? { href: "#order", label: `Order ${content.displayName} sadhya` }
      : canNotify
        ? { href: "#notify", label: "Notify me when orders open" }
        : { href: "/contact", label: "Contact the kitchen" };

  const otherFestivals = SEASONAL_EVENTS.filter(
    (e) => e.slug !== instance.slug,
  );

  return (
    <div className="flex min-h-screen flex-col bg-paper text-brand-dark">
      <Navigation />
      <main className="flex-1">
        {/* ---------- Immersive hero ---------- */}
        <section className="relative flex min-h-[86vh] items-end overflow-hidden">
          <Image
            src={heroImage}
            alt={content.heroAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(20,11,8,0.92) 0%, rgba(20,11,8,0.55) 34%, rgba(20,11,8,0.18) 62%, rgba(20,11,8,0.28) 100%)",
            }}
            aria-hidden
          />
          <PageShell className="relative z-10 w-full pb-16 pt-32 md:pb-24 md:pt-40">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-light/25 bg-black/25 px-3.5 py-1.5 font-sans text-xs font-medium text-brand-light backdrop-blur-sm">
                  <span className={cn("h-1.5 w-1.5 rounded-full", badge.dot)} />
                  {badge.label}
                </span>
                {viewIsOverride && (
                  <span className="rounded-full border border-brand-light/25 bg-black/25 px-3 py-1.5 font-sans text-xs text-brand-light/80 backdrop-blur-sm">
                    Selected festival
                  </span>
                )}
              </div>

              <p className="mt-6 flex items-center gap-3 text-eyebrow text-brand-light [text-shadow:0_1px_16px_rgba(20,11,8,0.5)]">
                <span className="h-px w-7 bg-brand-gold" aria-hidden />
                Seasonal at Suja&apos;s
              </p>
              <h1 className="text-display mt-4 text-[clamp(3rem,1.6rem+6vw,6rem)] text-brand-light [text-shadow:0_1px_24px_rgba(20,11,8,0.55)]">
                {content.displayName}
              </h1>
              <p className="mt-4 font-serif text-2xl italic text-brand-gold md:text-3xl [text-shadow:0_1px_16px_rgba(20,11,8,0.5)]">
                {content.tagline}
              </p>
              <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-brand-light/85 md:text-lg [text-shadow:0_1px_16px_rgba(20,11,8,0.5)]">
                {content.description}
              </p>

              <div className="mt-9 flex flex-col gap-8 sm:flex-row sm:items-end">
                <CTAButton href={primaryCta.href}>{primaryCta.label}</CTAButton>
                {mode !== "closed" ? (
                  <SeasonalCountdown
                    targetIso={countdownTarget.toISOString()}
                    label={countdownLabel}
                  />
                ) : null}
              </div>

              <p className="mt-8 flex items-center gap-2 font-sans text-sm text-brand-light/75">
                <CalendarClock className="h-4 w-4 text-brand-gold" aria-hidden />
                Order window {formatDayUAE(instance.orderStart)} –{" "}
                {formatDayUAE(instance.orderEnd)} · Peak{" "}
                {formatDayUAE(instance.eventStart)} (Dubai)
              </p>
            </div>
          </PageShell>
        </section>

        {/* ---------- The spread (offer) ---------- */}
        <section className="section-y">
          <PageShell>
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <div className="relative order-last aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(36,22,18,0.5)] md:order-first">
                <Image
                  src={spreadImage}
                  alt={content.gallery[1]?.alt ?? content.heroAlt}
                  fill
                  sizes="(max-width:768px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="flex items-center gap-3 text-eyebrow text-brand">
                  <span className="h-px w-7 bg-brand-gold" aria-hidden />
                  {content.offerTitle}
                </p>
                <h2 className="text-section mt-4 text-3xl text-brand-dark md:text-4xl">
                  A table set the way it should be.
                </h2>
                <p className="text-body-editorial mt-4 text-brand-dark/80">
                  {content.communityBlurb}
                </p>
                <ul className="mt-8 space-y-4">
                  {content.offerLines.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-gold/15 text-brand-gold">
                        <Check className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      <span className="text-body-editorial text-brand-dark/85">
                        {line}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </PageShell>
        </section>

        {/* ---------- Menu highlights ---------- */}
        <section className="section-y border-y border-brand-dark/10 bg-paper-deep">
          <PageShell>
            <p className="flex items-center gap-3 text-eyebrow text-brand">
              <span className="h-px w-7 bg-brand-gold" aria-hidden />
              On the leaf
            </p>
            <h2 className="text-section mt-4 max-w-2xl text-3xl text-brand-dark md:text-4xl">
              Menu highlights
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.menuHighlights.map((line, i) => (
                <div
                  key={line}
                  className="flex h-full flex-col rounded-2xl border border-brand-dark/10 bg-white/70 p-6"
                >
                  <span className="text-display text-sm tabular-nums text-brand/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 font-serif text-xl text-brand-dark">{line}</p>
                </div>
              ))}
            </div>
          </PageShell>
        </section>

        {/* ---------- Gallery ---------- */}
        <section className="section-y">
          <PageShell>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="flex items-center gap-3 text-eyebrow text-brand">
                  <span className="h-px w-7 bg-brand-gold" aria-hidden />
                  From previous years
                </p>
                <h2 className="text-section mt-4 text-3xl text-brand-dark md:text-4xl">
                  How it looked last time.
                </h2>
              </div>
              <p className="max-w-sm font-sans text-sm text-brand-mid">
                A few snapshots from past spreads. Final menu and pricing are
                confirmed when each window opens.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3 md:grid-rows-2">
              {content.gallery.map((g, i) => (
                <div
                  key={g.src}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl",
                    i === 0
                      ? "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto"
                      : "aspect-[4/3]",
                  )}
                >
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 40vw"
                    className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                </div>
              ))}
            </div>
          </PageShell>
        </section>

        {/* ---------- Order / notify + pricing ---------- */}
        <section
          id={canOrder && mode === "ordering" ? "order" : "notify"}
          className="section-y border-t border-brand-dark/10 bg-paper-deep"
        >
          <PageShell className="max-w-3xl">
            {mode === "closed" && (
              <Alert className="mb-8 border-brand-dark/15 bg-white">
                <AlertTitle>Orders closed for this stretch</AlertTitle>
                <AlertDescription>
                  The order window for this run has ended. Reach us on the contact
                  page for the daily menu or catering — the page moves to the next
                  festival automatically.
                </AlertDescription>
                <CTAButton href="/contact" className="mt-4">
                  Contact the kitchen
                </CTAButton>
              </Alert>
            )}

            {mode === "preview" && (
              <Alert className="mb-8 border-brand-dark/15 bg-white">
                <AlertTitle>
                  {isEarly ? "Ordering opens soon" : "Dates for this season"}
                </AlertTitle>
                <AlertDescription className="space-y-2">
                  <p className="text-body-editorial">
                    {isEarly
                      ? `We usually open orders for ${content.displayName} from ${formatDayUAE(instance.orderStart)}.`
                      : `Peak days run ${formatDayUAE(instance.eventStart)} to ${formatDayUAE(instance.eventEnd)}.`}
                  </p>
                </AlertDescription>
              </Alert>
            )}

            {canOrder && mode === "ordering" && (
              <SeasonalOrderForm
                festivalSlug={instance.slug}
                festivalLabel={content.displayName}
                mailConfigured={mailOk}
              />
            )}

            {canNotify && !canOrder && (
              <SeasonalNotifyForm
                festivalSlug={instance.slug}
                festivalLabel={content.displayName}
                heading={content.notifyHeading}
                body={content.notifyBody}
                mailConfigured={mailOk}
              />
            )}

            <div className="mt-10 rounded-2xl border border-brand-dark/10 bg-white p-6 md:p-8">
              <p className="text-body-editorial text-sm text-brand-dark/85">
                {content.pricingNote}
              </p>
              <p className="text-body-editorial mt-2 text-sm text-brand-dark/85">
                {content.orderNote}
              </p>
              <p className="text-body-editorial mt-3 text-sm font-semibold text-brand">
                {content.deadlineNote}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <CTAButton href="/contact">Contact us to order</CTAButton>
                <CTAButton href="/catering" variant="outline">
                  Catering enquiry
                </CTAButton>
              </div>
            </div>
          </PageShell>
        </section>

        <SeasonalPageExtras
          heroSrc={content.heroSrc}
          heroAlt={content.heroAlt}
          festivalName={content.displayName}
        />

        {/* ---------- Other festivals ---------- */}
        <section className="section-y bg-brand-dark">
          <PageShell>
            <p className="flex items-center gap-3 text-eyebrow text-brand-gold">
              <span className="h-px w-7 bg-brand-gold" aria-hidden />
              The seasonal calendar
            </p>
            <h2 className="text-section mt-4 text-3xl text-brand-light md:text-4xl">
              Other festivals
            </h2>
            <p className="mt-3 max-w-2xl font-sans text-sm text-brand-light/70">
              Jump to a specific page. The main seasonal view still follows the
              calendar automatically.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {otherFestivals.map((e) => (
                <Link
                  key={e.slug}
                  href={e.href}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-brand-light/10"
                >
                  <Image
                    src={e.imageSrc}
                    alt={e.imageAlt}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(to top, rgba(20,11,8,0.85) 0%, rgba(20,11,8,0.1) 55%, rgba(20,11,8,0) 100%)",
                    }}
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                    <span className="font-serif text-xl text-brand-light">
                      {e.name}
                    </span>
                    <ArrowRight className="h-4 w-4 text-brand-gold transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </div>
                </Link>
              ))}
            </div>
          </PageShell>
        </section>
      </main>
      <Footer />
    </div>
  );
}
