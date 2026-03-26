"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useTimeConfig, useTimeOfDay } from "@/components/home/time-of-day-context";
import SteamEffect from "@/components/home/SteamEffect";
import CTAButton from "@/components/shared/CTAButton";
import Link from "next/link";

export default function TimeHero() {
  const config = useTimeConfig();
  const { timeState } = useTimeOfDay();

  return (
    <section
      className="relative h-[100svh] min-h-[32rem] w-full overflow-hidden"
      suppressHydrationWarning
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={timeState}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={config.heroSrc}
            alt={config.heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            quality={85}
          />
        </motion.div>
      </AnimatePresence>

      <motion.div
        animate={{ backgroundColor: config.overlay }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 z-[1]"
        aria-hidden
      />

      <SteamEffect />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 pt-32 md:px-16 md:pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${timeState}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
            className="max-w-3xl"
          >
            <p className="font-serif text-4xl leading-tight text-white drop-shadow-md md:text-6xl md:leading-tight">
              {config.headline}
            </p>
            <p className="mt-4 max-w-xl font-sans text-base text-white/85 md:text-lg">
              {config.subtext}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <CTAButton href={config.ctaHref}>{config.cta}</CTAButton>
            </div>

            {timeState === "evening" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-6 max-w-md"
              >
                <Card className="border-amber-200/40 bg-black/35 text-white backdrop-blur-md">
                  <CardContent className="p-4 md:p-5">
                    <p className="font-sans text-sm font-medium text-amber-100">
                      Meet Snibbles
                    </p>
                    <p className="mt-1 font-sans text-sm text-white/80">
                      Our snack brand. Built for exactly this moment.
                    </p>
                    <Link
                      href="/snibbles"
                      className="mt-3 inline-block font-sans text-sm font-medium text-amber-200 underline-offset-4 hover:underline"
                    >
                      See Snibbles
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
