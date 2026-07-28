"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { HOME_MENU_SHOWCASE } from "@/lib/menuData";
import { TIME_SCHEDULE_COPY } from "@/lib/timeState";
import { useTimeConfig, useTimeOfDay } from "@/components/home/time-of-day-context";
import CTAButton from "@/components/shared/CTAButton";
import { PageSection } from "@/components/shared/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export default function FeaturedItems() {
  const config = useTimeConfig();
  const { timeState, isNight } = useTimeOfDay();
  const reduce = useReducedMotion();

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

  const schedule = TIME_SCHEDULE_COPY[timeState];

  return (
    <PageSection
      className="border-t border-brand-dark/10"
      style={{
        backgroundColor: config.pageBg,
        transition: "background-color 1.5s ease-in-out, color 1.5s ease-in-out",
      }}
    >
      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Signature dishes"
            title="The plates people come back for."
            meta={
              <p
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-caption",
                  isNight
                    ? "border-brand-gold/40 text-brand-gold"
                    : "border-brand/25 text-brand",
                )}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
                </span>
                Now serving · {schedule.label} · {schedule.range}
              </p>
            }
            eyebrowClassName={isNight ? "text-brand-gold" : "text-brand"}
            titleClassName={cn("text-3xl md:text-4xl", heading)}
          />
          <CTAButton href="/kitchen/menu" className="shrink-0 md:mb-1">
            See today&apos;s menu
          </CTAButton>
        </div>
      </Reveal>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {HOME_MENU_SHOWCASE.map((item, i) => (
          <motion.li
            key={item.name}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: (i % 3) * 0.06, duration: 0.5 }}
          >
            <Link
              href="/kitchen/menu"
              className={cn(
                "group flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                isNight
                  ? "border-brand-light/12 bg-brand-light/[0.03] hover:border-brand-gold/40"
                  : "border-brand-dark/10 bg-white/70 hover:-translate-y-1 hover:border-brand/25 hover:bg-white hover:shadow-[0_24px_50px_-30px_rgba(36,22,18,0.55)]",
              )}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.imageSrc}
                  alt={item.name}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
                <span className="absolute left-3 top-3 rounded-full bg-brand-dark/70 px-3 py-1 font-sans text-[0.7rem] font-medium uppercase tracking-wide text-brand-light backdrop-blur-sm">
                  {item.categoryLabel}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3
                    className={cn(
                      "font-serif text-xl leading-tight transition-colors",
                      heading,
                      isNight ? "group-hover:text-brand-gold" : "group-hover:text-brand",
                    )}
                  >
                    {item.name}
                  </h3>
                  <ArrowUpRight
                    className={cn(
                      "mt-1 h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100",
                      isNight ? "text-brand-gold" : "text-brand",
                    )}
                    aria-hidden
                  />
                </div>
                <p className={cn("text-caption mt-2 leading-relaxed", muted)}>
                  {item.description}
                </p>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </PageSection>
  );
}
