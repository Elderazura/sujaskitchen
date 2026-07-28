"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FEATURED_BY_TIME } from "@/lib/menuData";
import { FEATURED_INTRO_ROTATIONS } from "@/lib/heroMedia";
import { TIME_SCHEDULE_COPY } from "@/lib/timeState";
import {
  useTimeConfig,
  useTimeOfDay,
} from "@/components/home/time-of-day-context";
import { useRotatingIndex } from "@/components/home/useRotatingIndex";
import CTAButton from "@/components/shared/CTAButton";
import { PageSection } from "@/components/shared/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils";

export default function FeaturedItems() {
  const config = useTimeConfig();
  const { timeState, isNight } = useTimeOfDay();

  const muted = isNight ? "text-brand-light/70" : "text-brand-mid";
  const heading = isNight ? "text-brand-light" : "text-brand-dark";

  if (timeState === "closed") {
    return (
      <PageSection
        className="border-t border-brand-dark/15"
        style={{
          backgroundColor: config.pageBg,
          transition: "background-color 1.5s ease-in-out, color 1.5s ease-in-out",
        }}
      >
        <SectionHeader
          eyebrow="Right now"
          title="Closed now. Opens at 7:00 AM for breakfast."
          description="Browse the menu for later or contact us to plan your next order."
          eyebrowClassName={isNight ? "text-brand-gold" : "text-brand"}
          titleClassName={heading}
          descriptionClassName={muted}
        />
        <CTAButton href="/kitchen/menu" className="mt-8">
          Browse the menu
        </CTAButton>
      </PageSection>
    );
  }

  const items = FEATURED_BY_TIME[timeState];
  const schedule = TIME_SCHEDULE_COPY[timeState];
  const reduce = useReducedMotion();
  const intros = FEATURED_INTRO_ROTATIONS[timeState];
  const introIndex = useRotatingIndex(
    intros.length,
    5400,
    !reduce,
    timeState,
  );
  const introLine = intros[introIndex] ?? intros[0];

  return (
    <PageSection
      className="border-t border-brand-dark/10"
      style={{
        backgroundColor: config.pageBg,
        transition: "background-color 1.5s ease-in-out, color 1.5s ease-in-out",
      }}
    >
        <SectionHeader
          eyebrow="Right now"
          title="Featured for this part of the day"
          meta={
            <p className={cn("text-caption", muted)}>
              {schedule.label} · {schedule.range}
            </p>
          }
          eyebrowClassName={isNight ? "text-brand-gold" : "text-brand"}
          titleClassName={cn("text-2xl md:text-3xl", heading)}
        />
        <div className="relative mt-2 min-h-[3rem] max-w-2xl md:min-h-[2.75rem]">
          <AnimatePresence initial={false} mode="wait">
            <motion.p
              key={`${timeState}-${introIndex}`}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: reduce ? 0 : 0.4 }}
              className={cn("text-body-editorial", muted)}
            >
              {introLine}
            </motion.p>
          </AnimatePresence>
        </div>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.li
              key={`${timeState}-${item.name}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
            >
              <Link
                href="/kitchen/menu"
                className={cn(
                  "group block min-h-11 rounded-lg py-2 transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
                  isNight
                    ? "focus-visible:ring-offset-brand-dark hover:text-brand-gold"
                    : "focus-visible:ring-offset-white hover:text-brand",
                )}
              >
                <p className={cn("font-serif text-lg transition-colors", heading)}>
                  {item.name}
                </p>
                <p className={cn("text-caption mt-1", muted)}>{item.note}</p>
              </Link>
            </motion.li>
          ))}
        </ul>
        <CTAButton href="/kitchen/menu" className="mt-10">
          See today&apos;s menu
        </CTAButton>
    </PageSection>
  );
}
