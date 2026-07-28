"use client";

import Link from "next/link";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import CTAButton from "@/components/shared/CTAButton";
import { useTimeOfDay } from "@/components/home/time-of-day-context";
import { cn } from "@/lib/utils";

export default function HomeEatGather() {
  const { isNight } = useTimeOfDay();
  const heading = isNight ? "text-brand-light" : "text-brand-dark";
  const body = isNight ? "text-brand-light/85" : "text-brand-dark/90";
  const muted = isNight ? "text-brand-light/60" : "text-brand-mid";

  return (
    <section className="section-y px-6 md:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionEyebrow className={isNight ? "text-brand-gold" : "text-brand"}>
          Eat or gather
        </SectionEyebrow>
        <h2 className={cn("text-section mt-3 text-3xl md:text-4xl", heading)}>
          Daily Kerala meals, or a feast for hundreds.
        </h2>
        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className={cn("font-serif text-2xl", heading)}>The kitchen</h3>
            <p className={cn("text-body-editorial mt-3", body)}>
              Cloud kitchen in Al Quoz. Breakfast through dinner, meal boxes, and
              festival specials — delivered across Dubai and Abu Dhabi.
            </p>
            <CTAButton href="/kitchen/menu" className="mt-6 w-fit">
              See today&apos;s menu
            </CTAButton>
            <Link
              href="/kitchen"
              className={cn(
                "mt-3 block text-caption underline-offset-4 hover:underline",
                muted,
              )}
            >
              Visit the kitchen
            </Link>
          </div>
          <div>
            <h3 className={cn("font-serif text-2xl", heading)}>Catering</h3>
            <p className={cn("text-body-editorial mt-3", body)}>
              Weddings, corporate spreads, Onam, and community events. Portions and
              service for up to two thousand guests.
            </p>
            <CTAButton href="/catering" className="mt-6 w-fit">
              Plan an event
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
