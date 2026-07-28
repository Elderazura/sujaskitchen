"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import DeliveryPlatforms from "@/components/shared/DeliveryPlatforms";
import {
  useTimeConfig,
  useTimeOfDay,
} from "@/components/home/time-of-day-context";
import SteamEffect from "@/components/home/SteamEffect";
import CTAButton from "@/components/shared/CTAButton";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { PageShell } from "@/components/shared/PageShell";
import Link from "next/link";
import { HERO_CAPTION_ROTATIONS, HERO_SLIDES } from "@/lib/heroMedia";
import { SITE } from "@/lib/constants";
import { useRotatingIndex } from "@/components/home/useRotatingIndex";
import { cn } from "@/lib/utils";

const IMAGE_INTERVAL_MS = 14_000;
const CAPTION_INTERVAL_MS = 11_000;

/** Calm, slow eases */
const easeCrossfade = [0.4, 0, 0.2, 1] as const;
const easeCaption = [0.22, 1, 0.36, 1] as const;

/** Crisp text halo so light copy stays legible over bright food without a heavy scrim. */
const heroHeadlineShadow =
  "[text-shadow:0_1px_2px_rgba(0,0,0,0.6),0_2px_16px_rgba(20,11,8,0.82),0_0_46px_rgba(20,11,8,0.5)]";
const heroSubtextShadow =
  "[text-shadow:0_1px_3px_rgba(0,0,0,0.6),0_1px_18px_rgba(20,11,8,0.7)]";

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
          transition={{
            duration: liveMotion ? 1.65 : 0,
            ease: easeCrossfade,
          }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0 will-change-transform"
            initial={false}
            animate={
              liveMotion
                ? {
                    scale: [1, 1.018, 1.012, 1],
                    x: ["0%", "0.2%", "-0.12%", "0%"],
                    y: ["0%", "-0.22%", "0.1%", "0%"],
                  }
                : { scale: 1, x: "0%", y: "0%" }
            }
            transition={{
              duration: 42,
              repeat: liveMotion ? Infinity : 0,
              ease: "easeInOut",
              times: [0, 0.38, 0.74, 1],
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
        className="absolute inset-0 z-[1] transition-[background-color] duration-[1800ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ backgroundColor: config.overlay }}
        aria-hidden
      />

      {/* Directional scrim: anchors the copy on the left, keeps food visible on the right */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          backgroundImage:
            "linear-gradient(94deg, rgba(22,12,8,0.78) 0%, rgba(22,12,8,0.6) 28%, rgba(22,12,8,0.38) 46%, rgba(22,12,8,0.12) 62%, rgba(22,12,8,0) 80%), linear-gradient(to top, rgba(22,12,8,0.45) 0%, rgba(22,12,8,0) 34%)",
        }}
        aria-hidden
      />

      <SteamEffect />

      <div className="pointer-events-none absolute bottom-6 right-4 z-20 flex gap-1.5 sm:right-6 md:bottom-8 lg:right-8">
        {slides.map((s, i) => (
          <span
            key={s.src}
            className={cn(
              "h-1.5 rounded-full transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              i === slideIndex
                ? "w-7 bg-brand-light"
                : "w-1.5 bg-brand-light/40",
            )}
            aria-hidden
          />
        ))}
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 md:bottom-8"
        animate={liveMotion ? { y: [0, 7, 0] } : { y: 0 }}
        transition={{ duration: 1.9, repeat: liveMotion ? Infinity : 0, ease: "easeInOut" }}
        aria-hidden
      >
        <ChevronDown className={cn("h-6 w-6 text-brand-light/70", heroSubtextShadow)} />
      </motion.div>

      {/* Upper-middle: aligned to site grid */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 pt-[min(18vh,5.5rem)] md:pt-[min(22vh,6.5rem)]">
        <PageShell className="pointer-events-auto">
          <div className="max-w-3xl text-left">
          <SectionEyebrow
            className={cn(
              "flex items-center gap-3 text-brand-light",
              heroSubtextShadow,
            )}
          >
            <span
              className="h-px w-7 bg-brand-gold"
              aria-hidden
            />
            {SITE.name} · Est. 1999
          </SectionEyebrow>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={`cap-${timeState}-${captionIndex}`}
              initial={
                liveMotion ? { opacity: 0, y: 18 } : false
              }
              animate={{ opacity: 1, y: 0 }}
              exit={liveMotion ? { opacity: 0, y: -12 } : undefined}
              transition={{
                duration: liveMotion ? 1.35 : 0,
                ease: easeCaption,
              }}
            >
              <p
                className={cn(
                  "text-display mt-4 max-w-4xl text-[clamp(2.6rem,1.4rem+4.6vw,5rem)] text-brand-light",
                  heroHeadlineShadow,
                )}
              >
                {caption.headline}
              </p>
              <p
                className={cn(
                  "mt-5 max-w-2xl font-sans text-base font-medium leading-relaxed text-brand-light md:text-lg",
                  heroSubtextShadow,
                )}
              >
                {caption.subtext}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:justify-start"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: liveMotion ? 0.2 : 0,
              duration: liveMotion ? 1.1 : 0,
              ease: easeCaption,
            }}
          >
            <CTAButton href="/kitchen/menu">Order from the kitchen</CTAButton>
            <CTAButton
              href="/catering"
              variant="outline"
              className="border-brand-light/80 bg-brand-dark/35 text-brand-light shadow-none hover:bg-brand-dark/55 hover:text-brand-light"
            >
              Plan catering
            </CTAButton>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: liveMotion ? 0.32 : 0,
              duration: liveMotion ? 1.1 : 0,
              ease: easeCaption,
            }}
            className="mt-7"
          >
            <DeliveryPlatforms variant="onDark" className={heroSubtextShadow} />
          </motion.div>

          {timeState === "chaya" && (
            <motion.div
              initial={liveMotion ? { opacity: 0, y: 14 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: liveMotion ? 0.35 : 0,
                duration: liveMotion ? 1.15 : 0,
                ease: easeCaption,
              }}
              className="mt-8 max-w-md"
            >
              <Card className="border-brand-light/40 bg-brand-dark/50 text-brand-light backdrop-blur-md">
                <CardContent className="p-4 md:p-5">
                  <p className="font-sans text-sm font-medium text-brand-light">
                    Meet Snibbles
                  </p>
                  <p className="mt-1 font-sans text-sm text-brand-light/88">
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
        </PageShell>
      </div>
    </section>
  );
}
