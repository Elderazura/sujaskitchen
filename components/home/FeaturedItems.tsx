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
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WHATSAPP_ORDER_URL } from "@/lib/constants";

export default function FeaturedItems() {
  const config = useTimeConfig();
  const { timeState, isNight } = useTimeOfDay();

  const muted = isNight ? "text-brand-light/70" : "text-brand-mid";
  const heading = isNight ? "text-brand-light" : "text-brand-dark";
  const kicker = isNight ? "text-brand-light/60" : "text-brand-mid";

  if (timeState === "closed") {
    return (
      <section
        className="border-t border-brand-dark/15 px-6 py-14 md:px-16"
        style={{
          backgroundColor: config.pageBg,
          transition: "background-color 1.5s ease-in-out, color 1.5s ease-in-out",
        }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className={`font-sans text-sm uppercase tracking-widest ${kicker}`}>
            Right now
          </p>
          <h2 className={`mt-2 font-serif text-2xl md:text-3xl ${heading}`}>
            Closed now. Opens at 7:00 AM for breakfast.
          </h2>
          <p className={`mt-4 font-sans text-sm leading-relaxed md:text-base ${muted}`}>
            Browse the menu for later or message us on WhatsApp to plan your next order.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="min-h-11 bg-brand text-brand-light hover:bg-brand-hover"
            >
              <Link href="/kitchen/menu">Browse the menu</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className={`min-h-11 border-brand-light/40 bg-brand-dark/50 text-brand-light hover:bg-brand-dark hover:text-brand-light`}
            >
              <a href={WHATSAPP_ORDER_URL} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
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
    <section
      className="border-t border-brand-dark/10 px-6 py-14 md:px-16"
      style={{
        backgroundColor: config.pageBg,
        transition: "background-color 1.5s ease-in-out, color 1.5s ease-in-out",
      }}
    >
      <div>
        <p className={`font-sans text-sm uppercase tracking-widest ${kicker}`}>
          Right now
        </p>
        <p className={`mt-1 font-sans text-xs md:text-sm ${muted}`}>
          {schedule.label} · {schedule.range}
        </p>
        <h2 className={`mt-2 font-serif text-2xl md:text-3xl ${heading}`}>
          Featured for this part of the day
        </h2>
        <div className="relative mt-3 min-h-[3rem] max-w-2xl md:min-h-[2.75rem]">
          <AnimatePresence initial={false} mode="wait">
            <motion.p
              key={`${timeState}-${introIndex}`}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: reduce ? 0 : 0.4 }}
              className={`font-sans text-sm leading-relaxed md:text-base ${muted}`}
            >
              {introLine}
            </motion.p>
          </AnimatePresence>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.li
              key={`${timeState}-${item.name}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
            >
              <Card
                className={
                  isNight
                    ? "border-brand-mid/35 bg-brand-dark/85"
                    : "border-brand-mid/20 bg-white/90"
                }
              >
                <CardContent className="p-4">
                  <p className={`font-serif text-lg ${heading}`}>{item.name}</p>
                  <p className={`mt-1 font-sans text-sm ${muted}`}>{item.note}</p>
                </CardContent>
              </Card>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
