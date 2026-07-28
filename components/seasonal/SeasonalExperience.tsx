import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTAButton from "@/components/shared/CTAButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SeasonalPageExtras } from "@/components/seasonal/SeasonalPageExtras";
import { SeasonalNotifyForm } from "@/components/seasonal/SeasonalNotifyForm";
import { SeasonalOrderForm } from "@/components/seasonal/SeasonalOrderForm";
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
      return { label: "Orders open", className: "bg-brand text-white" };
    case "notify":
      return { label: "Coming soon", className: "bg-brand/15 text-brand" };
    case "closed":
      return { label: "This wave closed", className: "bg-muted text-foreground" };
    default:
      return { label: "Save the date", className: "bg-muted text-foreground" };
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

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF0] text-foreground">
      <Navigation />
      <main className="flex-1">
        <section className="relative min-h-[45vh] overflow-hidden md:min-h-[50vh]">
          <Image
            src={content.heroSrc}
            alt={content.heroAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />
          <div className="relative z-10 mx-auto flex min-h-[45vh] max-w-4xl flex-col justify-end px-6 py-14 md:min-h-[50vh] md:px-16">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={cn("text-caption", badge.className)}>
                {badge.label}
              </Badge>
              {viewIsOverride && (
                <Badge variant="outline" className="border-white/40 bg-black/20 text-white">
                  Selected festival
                </Badge>
              )}
            </div>
            <h1 className="text-display mt-3 text-[clamp(1.75rem,5vw,3.75rem)] text-white">
              {content.displayName}
            </h1>
            <p className="text-body-editorial mt-2 max-w-2xl text-lg text-white/90 md:text-xl">
              {content.tagline}
            </p>
            <p className="text-body-editorial mt-3 max-w-2xl text-white/85 md:text-lg">
              {content.description}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-8 md:px-16">
          {mode === "closed" && (
            <Alert className="mb-8 border-border">
              <AlertTitle>Orders closed for this stretch</AlertTitle>
              <AlertDescription>
                The order window for this run has ended. You can still reach us
                on the contact page for the daily menu or catering. The page will move
                to the next festival automatically.
              </AlertDescription>
              <CTAButton href="/contact" className="mt-4">
                Contact the kitchen
              </CTAButton>
            </Alert>
          )}

          {mode === "preview" && (
            <Alert className="mb-8 border-border">
              <AlertTitle>
                {isEarly ? "Ordering opens soon" : "Dates for this season"}
              </AlertTitle>
              <AlertDescription className="space-y-2">
                <p className="text-body-editorial">
                  {isEarly
                    ? `We usually open orders for ${content.displayName} from ${formatDayUAE(instance.orderStart)}.`
                    : `Peak days run ${formatDayUAE(instance.eventStart)} to ${formatDayUAE(instance.eventEnd)}.`}
                </p>
                <p className="text-caption text-muted-foreground">
                  Order window: {formatDayUAE(instance.orderStart)} –{" "}
                  {formatDayUAE(instance.orderEnd)} (Dubai dates).
                </p>
              </AlertDescription>
            </Alert>
          )}

          {(mode === "notify" || mode === "ordering") && (
            <p className="text-caption mb-8 text-muted-foreground">
              Order window: {formatDayUAE(instance.orderStart)} –{" "}
              {formatDayUAE(instance.orderEnd)}. Peak:{" "}
              {formatDayUAE(instance.eventStart)} –{" "}
              {formatDayUAE(instance.eventEnd)} (Dubai).
            </p>
          )}

          <h2 className="text-section text-2xl">For the community</h2>
          <p className="text-body-editorial mt-3 text-muted-foreground">
            {content.communityBlurb}
          </p>

          <h2 className="text-section mt-12 text-2xl">{content.offerTitle}</h2>
          <ul className="text-body-editorial mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
            {content.offerLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <h2 className="text-section mt-12 text-2xl">Menu highlights</h2>
          <ul className="text-body-editorial mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
            {content.menuHighlights.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <h2 className="text-section mt-12 text-2xl">From previous years</h2>
          <p className="text-caption mt-2 text-muted-foreground">
            A few snapshots from past spreads. Final menu and pricing are
            confirmed when each window opens.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {content.gallery.map((g) => (
              <div
                key={g.src}
                className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border"
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>

          <div className="mt-14 space-y-8">
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
          </div>

          <Card className="mt-12 border-border">
            <CardContent className="space-y-3 p-6">
              <p className="text-body-editorial text-sm">{content.pricingNote}</p>
              <p className="text-body-editorial text-sm">{content.orderNote}</p>
              <p className="text-body-editorial text-sm font-medium text-brand">
                {content.deadlineNote}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <CTAButton href="/contact">Contact us to order</CTAButton>
                <CTAButton href="/catering" variant="outline">
                  Catering enquiry
                </CTAButton>
              </div>
            </CardContent>
          </Card>
        </div>

        <SeasonalPageExtras
          heroSrc={content.heroSrc}
          heroAlt={content.heroAlt}
          festivalName={content.displayName}
        />

        <section className="border-t border-border bg-white px-6 py-12 md:px-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-section text-2xl">Other festivals</h2>
            <p className="text-caption mt-2 text-muted-foreground">
              Jump to a specific page. The main seasonal view still follows the
              calendar automatically.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {SEASONAL_EVENTS.filter((e) => e.slug !== instance.slug).map(
                (e) => (
                  <li key={e.slug}>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={e.href}>{e.name}</Link>
                    </Button>
                  </li>
                ),
              )}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
