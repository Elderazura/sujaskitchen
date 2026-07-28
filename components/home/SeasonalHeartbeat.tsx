"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getSeasonalDisplayEvents } from "@/lib/seasonalData";
import { Button } from "@/components/ui/button";
import { PageSection } from "@/components/shared/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useTimeOfDay } from "@/components/home/time-of-day-context";

export default function SeasonalHeartbeat() {
  const { events, fallbackMessage } = getSeasonalDisplayEvents();
  const { isNight } = useTimeOfDay();

  return (
    <PageSection className={isNight ? "bg-brand-dark/90" : "bg-brand-light/30"}>
        <SectionHeader
          eyebrow="Seasonal"
          title="What is coming up"
          description={fallbackMessage ?? undefined}
          eyebrowClassName={isNight ? "text-brand-light/55" : "text-brand-mid"}
          titleClassName={isNight ? "text-brand-light" : "text-brand-dark"}
          descriptionClassName={isNight ? "text-brand-light/70" : "text-brand-mid"}
        />

        <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 md:gap-6">
          {events.map((ev, i) => (
            <motion.article
              key={ev.slug}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`w-[min(100%,20rem)] shrink-0 snap-start overflow-hidden rounded-xl border shadow-sm md:w-[22rem] ${
                isNight
                  ? "border-brand-mid/40 bg-brand-dark/80"
                  : "border-brand-mid/20 bg-white"
              }`}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={ev.imageSrc}
                  alt={ev.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 85vw, 22rem"
                />
              </div>
              <div className="p-4">
                <h3
                  className={`font-serif text-xl ${
                    isNight ? "text-brand-light" : "text-brand-dark"
                  }`}
                >
                  {ev.name}
                </h3>
                <p
                  className={`mt-2 font-sans text-sm ${
                    isNight ? "text-brand-light/70" : "text-brand-mid"
                  }`}
                >
                  {ev.copy}
                </p>
                <Button
                  className="mt-4 w-full bg-brand hover:bg-brand-hover"
                  asChild
                >
                  <Link href={ev.href}>{ev.cta}</Link>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
    </PageSection>
  );
}
