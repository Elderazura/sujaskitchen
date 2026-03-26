"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  useTimeConfig,
  useTimeOfDay,
} from "@/components/home/time-of-day-context";
import SteamEffect from "@/components/home/SteamEffect";
import CTAButton from "@/components/shared/CTAButton";
import Link from "next/link";
import {
  HERO_CAPTION_ROTATIONS,
  HERO_SLIDES,
} from "@/lib/heroMedia";
import { useRotatingIndex } from "@/components/home/useRotatingIndex";

const IMAGE_INTERVAL_MS = 8000;
const CAPTION_INTERVAL_MS = 6500;

export default function TimeHero() {
  const config = useTimeConfig();
  const { timeState } = useTimeOfDay();
  const reduce = useReducedMotion();

  const slides = HERO_SLIDES[timeState];
  const captions = HERO_CAPTION_ROTATIONS[timeState];

  const liveMotion = !reduce;
  const slideIndex = useRotatingIndex(
    slides.length,
    IMAGE_INTERVAL_MS,
    liveMotion,
    timeState,
  );
  const captionIndex = useRotatingIndex(
    captions.length,
    CAPTION_INTERVAL_MS,
    liveMotion,
    timeState,
  );

  const slide = slides[slideIndex] ?? slides[0];
  const caption = captions[captionIndex] ?? captions[0];

  return (
    <section
      className="relative h-[100svh] min-h-[32rem] w-full overflow-hidden"
      suppressHydrationWarning
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={`${timeState}-${slide.src}-${slideIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: liveMotion ? 0.85 : 0, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={
              liveMotion
                ? { scale: [1, 1.045, 1] }
                : { scale: 1 }
            }
            transition={{
              duration: 22,
              repeat: liveMotion ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              quality={88}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div
        className="absolute inset-0 z-[1] transition-[background-color] duration-[1000ms] ease-in-out"
        style={{ backgroundColor: config.overlay }}
        aria-hidden
      />

      <SteamEffect />

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 md:bottom-8">
        {slides.map((s, i) => (
          <span
            key={s.src}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === slideIndex
                ? "w-6 bg-brand-light"
                : "w-1.5 bg-brand-light/40"
            }`}
            aria-hidden
          />
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-24 pt-32 md:px-16 md:pb-28">
        <div className="max-w-3xl">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={`cap-${timeState}-${captionIndex}`}
              initial={
                liveMotion ? { opacity: 0, y: 14 } : false
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                liveMotion ? { opacity: 0, y: -10 } : undefined
              }
              transition={{ duration: liveMotion ? 0.45 : 0, ease: "easeOut" }}
            >
              <p className="font-serif text-4xl leading-tight text-white drop-shadow-md md:text-6xl md:leading-tight">
                {caption.headline}
              </p>
              <p className="mt-4 max-w-xl font-sans text-base text-white/88 md:text-lg">
                {caption.subtext}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <CTAButton href={config.ctaHref}>{config.cta}</CTAButton>
            {timeState === "closed" && (
              <CTAButton
                href="/kitchen/menu"
                variant="outline"
                className="border-white/70 bg-white/10 text-white shadow-none hover:bg-white/20 hover:text-white"
              >
                Browse the menu
              </CTAButton>
            )}
          </div>

          {timeState === "chaya" && (
            <motion.div
              initial={liveMotion ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: liveMotion ? 0.55 : 0 }}
              className="mt-6 max-w-md"
            >
              <Card className="border-brand-light/35 bg-black/40 text-white backdrop-blur-md">
                <CardContent className="p-4 md:p-5">
                  <p className="font-sans text-sm font-medium text-brand-light">
                    Meet Snibbles
                  </p>
                  <p className="mt-1 font-sans text-sm text-white/85">
                    Our snack brand. Built for chaya time.
                  </p>
                  <Link
                    href="/snibbles"
                    className="mt-3 inline-block font-sans text-sm font-medium text-brand-gold underline-offset-4 hover:underline"
                  >
                    See Snibbles
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
