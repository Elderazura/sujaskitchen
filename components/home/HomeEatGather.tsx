"use client";

import Link from "next/link";
import CTAButton from "@/components/shared/CTAButton";
import { PageSection } from "@/components/shared/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useTimeOfDay } from "@/components/home/time-of-day-context";
import { cn } from "@/lib/utils";

export default function HomeEatGather() {
  const { isNight } = useTimeOfDay();
  const heading = isNight ? "text-brand-light" : "text-brand-dark";
  const body = isNight ? "text-brand-light/85" : "text-brand-dark/90";
  const muted = isNight ? "text-brand-light/60" : "text-brand-mid";

  return (
    <PageSection>
      <SectionHeader
        eyebrow="Eat or gather"
        title="Daily Kerala meals, or a feast for hundreds."
        eyebrowClassName={isNight ? "text-brand-gold" : "text-brand"}
        titleClassName={heading}
        className="max-w-3xl"
      />
      <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
        <div className="flex flex-col items-start">
          <h3 className={cn("font-serif text-2xl", heading)}>The kitchen</h3>
          <p className={cn("text-body-editorial mt-3 max-w-md", body)}>
            Cloud kitchen in Al Quoz. Breakfast through dinner, meal boxes, and
            festival specials — delivered across Dubai and Abu Dhabi.
          </p>
          <CTAButton href="/kitchen/menu" className="mt-6">
            See today&apos;s menu
          </CTAButton>
          <Link
            href="/kitchen"
            className={cn(
              "mt-3 text-caption underline-offset-4 hover:underline",
              muted,
            )}
          >
            Visit the kitchen
          </Link>
        </div>
        <div className="flex flex-col items-start">
          <h3 className={cn("font-serif text-2xl", heading)}>Catering</h3>
          <p className={cn("text-body-editorial mt-3 max-w-md", body)}>
            Weddings, corporate spreads, Onam, and community events. Portions and
            service for up to two thousand guests.
          </p>
          <CTAButton href="/catering" className="mt-6">
            Plan an event
          </CTAButton>
        </div>
      </div>
    </PageSection>
  );
}
