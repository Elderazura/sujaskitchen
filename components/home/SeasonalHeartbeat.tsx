"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getSeasonalDisplayEvents } from "@/lib/seasonalData";
import { Button } from "@/components/ui/button";
import { useTimeOfDay } from "@/components/home/time-of-day-context";

export default function SeasonalHeartbeat() {
  const { events, fallbackMessage } = getSeasonalDisplayEvents();
  const { isNight } = useTimeOfDay();

  return (
    <section
      className={`px-6 py-16 md:px-16 ${
        isNight ? "bg-[#17120e]" : "bg-[#FFFBF0]"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <p
          className={`font-sans text-sm uppercase tracking-widest ${
            isNight ? "text-stone-500" : "text-stone-500"
          }`}
        >
          Seasonal
        </p>
        <h2
          className={`mt-2 font-serif text-3xl md:text-4xl ${
            isNight ? "text-[#FEF3C7]" : "text-stone-900"
          }`}
        >
          What is coming up
        </h2>
        {fallbackMessage && (
          <p
            className={`mt-3 max-w-2xl font-sans text-sm ${
              isNight ? "text-stone-400" : "text-stone-600"
            }`}
          >
            {fallbackMessage}
          </p>
        )}

        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:gap-6">
          {events.map((ev, i) => (
            <motion.article
              key={ev.slug}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`w-[min(100%,20rem)] shrink-0 snap-start overflow-hidden rounded-xl border shadow-sm md:w-[22rem] ${
                isNight
                  ? "border-stone-700 bg-stone-900"
                  : "border-stone-200 bg-white"
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
                    isNight ? "text-[#FEF3C7]" : "text-stone-900"
                  }`}
                >
                  {ev.name}
                </h3>
                <p
                  className={`mt-2 font-sans text-sm ${
                    isNight ? "text-stone-400" : "text-stone-600"
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
      </div>
    </section>
  );
}
