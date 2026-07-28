"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getSeasonalDisplayEvents } from "@/lib/seasonalData";
import { Button } from "@/components/ui/button";
import { PageSection } from "@/components/shared/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { useTimeOfDay } from "@/components/home/time-of-day-context";
import { cn } from "@/lib/utils";

export default function SeasonalHeartbeat() {
  const { events, fallbackMessage } = getSeasonalDisplayEvents();
  const { isNight } = useTimeOfDay();

  const lead = events[0];
  const rest = events.slice(1);

  const heading = isNight ? "text-brand-light" : "text-brand-dark";
  const muted = isNight ? "text-brand-light/70" : "text-brand-mid";
  const cardBorder = isNight ? "border-brand-light/12" : "border-brand-dark/10";
  const cardBg = isNight ? "bg-brand-dark/70" : "bg-white/70";

  return (
    <PageSection className={isNight ? "bg-brand-dark/90" : "bg-brand-light/30"}>
      <SectionHeader
        eyebrow="Seasonal"
        title="What is coming up"
        description={fallbackMessage ?? undefined}
        eyebrowClassName={isNight ? "text-brand-gold" : "text-brand"}
        titleClassName={heading}
        descriptionClassName={muted}
      />

      {lead ? (
        <Reveal className="mt-10">
          <Link
            href={lead.href}
            className={cn(
              "group grid overflow-hidden rounded-2xl border md:grid-cols-2",
              cardBorder,
              cardBg,
            )}
          >
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[24rem]">
              <Image
                src={lead.imageSrc}
                alt={lead.imageAlt}
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10">
              <span className="text-eyebrow text-brand-gold">Next up</span>
              <h3 className={cn("text-section mt-3 text-3xl md:text-4xl", heading)}>
                {lead.name}
              </h3>
              <p className={cn("text-body-editorial mt-4 max-w-md", muted)}>
                {lead.copy}
              </p>
              <span
                className={cn(
                  "mt-7 inline-flex items-center gap-2 font-sans text-sm font-semibold",
                  isNight ? "text-brand-gold" : "text-brand",
                )}
              >
                {lead.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </span>
            </div>
          </Link>
        </Reveal>
      ) : null}

      {rest.length ? (
        <div className="scroll-rail mt-6 pb-4 md:gap-6">
          <div className="scroll-rail-inner snap-x snap-mandatory">
            {rest.map((ev, i) => (
              <motion.article
                key={ev.slug}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={cn(
                  "w-64 shrink-0 snap-start overflow-hidden rounded-xl border shadow-sm md:w-72",
                  cardBorder,
                  cardBg,
                )}
              >
                <Link href={ev.href} className="group block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={ev.imageSrc}
                      alt={ev.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width:768px) 70vw, 18rem"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className={cn("font-serif text-lg", heading)}>{ev.name}</h4>
                    <p className={cn("mt-1.5 line-clamp-2 font-sans text-sm", muted)}>
                      {ev.copy}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      ) : null}
    </PageSection>
  );
}
