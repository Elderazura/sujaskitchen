"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { CookingPot, Leaf, HandPlatter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import FeaturedItems from "@/components/home/FeaturedItems";
import HomeExploreStrip from "@/components/home/HomeExploreStrip";
import HomeGoogleReviews from "@/components/home/HomeGoogleReviews";
import HomeInstagramFeed from "@/components/home/HomeInstagramFeed";
import HomeMenuShowcase from "@/components/home/HomeMenuShowcase";
import HomeOrderStrip from "@/components/home/HomeOrderStrip";
import HomeParallaxBlock from "@/components/home/HomeParallaxBlock";
import HomePromoBanner from "@/components/home/HomePromoBanner";
import HomeSnibblesPreview from "@/components/home/HomeSnibblesPreview";
import SujaStoryTicker from "@/components/home/SujaStoryTicker";
import SeasonalHeartbeat from "@/components/home/SeasonalHeartbeat";
import SnibblesBand from "@/components/home/SnibblesBand";
import { useRotatingIndex } from "@/components/home/useRotatingIndex";
import { useTimeConfig, useTimeOfDay } from "@/components/home/time-of-day-context";
import CTAButton from "@/components/shared/CTAButton";
import { ClosingCtaBand } from "@/components/shared/PageCrossLinks";
import { Reveal, RevealScale, RevealX } from "@/components/motion/Reveal";
import { HOME_STORY_ROTATIONS } from "@/lib/heroMedia";
import { HOW_WE_MAKE_ROTATIONS } from "@/lib/homeSectionCopy";

export default function HomeBelowFold() {
  const config = useTimeConfig();
  const { isNight, timeState } = useTimeOfDay();
  const reduce = useReducedMotion();

  const muted = isNight ? "text-brand-light/70" : "text-brand-mid";
  const heading = isNight ? "text-brand-light" : "text-brand-dark";
  const bodyClass = isNight ? "text-brand-light/85" : "text-brand-dark/90";

  const storyIndex = useRotatingIndex(
    HOME_STORY_ROTATIONS.length,
    7200,
    !reduce,
    timeState,
  );
  const storyLine = HOME_STORY_ROTATIONS[storyIndex]?.line ?? "";

  const howIndex = useRotatingIndex(
    HOW_WE_MAKE_ROTATIONS.length,
    6800,
    !reduce,
    `${timeState}-how`,
  );
  const howLine = HOW_WE_MAKE_ROTATIONS[howIndex] ?? HOW_WE_MAKE_ROTATIONS[0];

  /** Full "The kitchen" block: same scroll span as Framer Ticker Scroll demo (section vs viewport). */
  const kitchenSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: kitchenStoryScrollProgress } = useScroll({
    target: kitchenSectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <div
      className="min-w-0 transition-[background-color] duration-[1500ms] ease-in-out"
      style={{ backgroundColor: config.pageBg }}
    >
      <FeaturedItems />

      <HomeDivider variant={isNight ? "gold" : "brand"} />

      <div ref={kitchenSectionRef} className="min-w-0">
        <HomeParallaxBlock range={36} className="will-change-transform">
          <Reveal>
            <section className="px-6 py-20 text-center md:px-16 md:pb-24">
              <p
                className={`font-sans text-xs font-semibold uppercase tracking-[0.25em] ${isNight ? "text-brand-gold" : "text-brand"}`}
              >
                The kitchen
              </p>
              <h2
                className={`mx-auto mt-3 max-w-4xl font-serif text-3xl leading-snug md:text-5xl ${heading}`}
              >
                Since 1999, every dish has been Suja&apos;s decision.
              </h2>
              <SujaStoryTicker
                isNight={isNight}
                sectionScrollProgress={kitchenStoryScrollProgress}
              />
              <div className="mx-auto mt-6 min-h-[4.5rem] max-w-2xl md:min-h-[3.75rem]">
                <AnimatePresence initial={false} mode="wait">
                  <motion.p
                    key={storyIndex}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: reduce ? 0 : 0.45 }}
                    className={`font-sans text-base leading-relaxed md:text-lg ${muted}`}
                  >
                    {storyLine}
                  </motion.p>
                </AnimatePresence>
              </div>
            </section>
          </Reveal>
        </HomeParallaxBlock>
      </div>

      <HomeExploreStrip />

      <Reveal delay={0.04}>
        <div className="px-0 py-10 md:px-6 md:py-12">
          <HomePromoBanner
            title="Catering for crowds, still cooked like home"
            description="Weddings, corporate spreads, Onam, and community events. Planning, portions, and service for up to two thousand guests."
            ctaLabel="Plan an event"
            href="/catering"
            imageSrc="/images/sujas-banquet.webp"
            imageAlt="Catering spread with rice, curries, and sides from Suja's Kitchen"
          />
        </div>
      </Reveal>

      <Reveal delay={0.05}>
      <section className={`px-6 py-16 md:px-16 ${isNight ? "bg-brand-dark/25" : "bg-white/60"}`}>
        <div className="mx-auto max-w-7xl">
          <h2 className={`font-serif text-3xl md:text-4xl ${heading}`}>
            How we make food
          </h2>
          <p className={`mt-2 max-w-2xl font-sans text-sm ${muted}`}>
            Three truths. No shortcuts.
          </p>
          <div className="relative mt-3 min-h-[2.75rem] max-w-2xl">
            <AnimatePresence initial={false} mode="wait">
              <motion.p
                key={`${howIndex}-${timeState}`}
                initial={reduce ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: 8 }}
                transition={{ duration: reduce ? 0 : 0.4 }}
                className={`font-sans text-sm italic md:text-base ${isNight ? "text-brand-gold/90" : "text-brand-dark/80"}`}
              >
                {howLine}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                Icon: CookingPot,
                title: "We cook in small batches.",
                body: "Every order is made fresh that day. We do not cook for tomorrow. We do not reheat from yesterday.",
              },
              {
                Icon: Leaf,
                title: "The spices come from Wayanad.",
                body: "Black pepper, cardamom, curry leaves from the same farms in Wayanad and Idukki we have trusted for two decades. No substitutes.",
              },
              {
                Icon: HandPlatter,
                title: "Suja still decides what goes in.",
                body: "Twenty-five years in, the woman who started this in her home kitchen still decides every recipe, every portion, every standard.",
              },
            ].map(({ Icon, title, body: copy }, idx) => (
              <RevealX
                key={title}
                from={idx % 2 === 0 ? "left" : "right"}
                delay={0.08 * idx}
              >
                <Card
                  className={
                    isNight
                      ? "h-full border-brand-mid/40 bg-brand-dark/70"
                      : "h-full border-brand-mid/25 bg-white shadow-sm"
                  }
                >
                  <CardContent className="p-6">
                    <Icon
                      className={`h-10 w-10 ${isNight ? "text-brand-gold" : "text-brand-dark"}`}
                    />
                    <h3 className={`mt-4 font-serif text-xl ${heading}`}>{title}</h3>
                    <p className={`mt-2 font-sans text-sm leading-relaxed ${bodyClass}`}>
                      {copy}
                    </p>
                  </CardContent>
                </Card>
              </RevealX>
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      <HomeMenuShowcase />

      <HomeDivider variant="muted" />

      <HomeInstagramFeed />

      <HomeSnibblesPreview />

      <HomeGoogleReviews />

      <Reveal delay={0.04}>
        <div className="px-0 py-10 md:px-6 md:py-12">
          <HomePromoBanner
            title="Al Quoz kitchen. Daily menu."
            description="Breakfast through dinner, meal boxes, and festival specials. Delivered across Dubai and Abu Dhabi when you order online."
            ctaLabel="Visit the kitchen"
            href="/kitchen"
            imageSrc="/images/Sujas-Kitchen-scaled.jpg"
            imageAlt="Suja's Kitchen cloud kitchen and service"
            align="right"
          />
        </div>
      </Reveal>

      <HomeOrderStrip />

      <Reveal delay={0.06}>
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <Card
            className={
              isNight
                ? "border-brand-mid/40 bg-brand-dark/90"
                : "border-brand-mid/20 bg-brand-light/40"
            }
          >
            <CardContent className="flex h-full flex-col p-8">
              <h3 className={`font-serif text-2xl ${heading}`}>
                Kerala at your door.
              </h3>
              <p className={`mt-3 flex-1 font-sans text-sm leading-relaxed ${bodyClass}`}>
                Cloud kitchen. Daily fresh menu. Delivered across Dubai and Abu
                Dhabi.
              </p>
              <CTAButton href="/kitchen/menu" className="mt-6 w-fit">
                See today&apos;s menu
              </CTAButton>
            </CardContent>
          </Card>
          <Card className="border-0 bg-brand-dark text-brand-light shadow-lg">
            <CardContent className="flex h-full flex-col p-8">
              <h3 className="font-serif text-2xl text-brand-light">
                Feeding your gathering.
              </h3>
              <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-brand-light/85">
                Weddings. Corporate events. Onam feasts. Community celebrations.
                Up to 2,000 guests.
              </p>
              <ButtonAsLinkLight href="/catering">
                Talk to us about your event
              </ButtonAsLinkLight>
            </CardContent>
          </Card>
        </div>
      </section>
      </Reveal>

      <SeasonalHeartbeat />
      <SnibblesBand />

      <Reveal delay={0.05}>
      <section className={`px-0 py-16 ${isNight ? "bg-brand-dark/35" : "bg-brand-light/25"}`}>
        <div className="relative mx-auto max-w-6xl px-6 md:px-16">
          <RevealScale>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-brand-mid/25 shadow-xl md:aspect-[21/9]">
              <Image
                src="/images/suja-maam_1.jpg"
                alt="Suja Alex in the kitchen at Suja's Kitchen"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1152px"
              />
            </div>
          </RevealScale>
          <div className={`mx-auto mt-10 max-w-2xl text-center`}>
            <p className={`font-sans text-base leading-relaxed md:text-lg ${bodyClass}`}>
              In 1999, four friends were tired of hotel food. Suja cooked for
              them. They told others. Twenty-five years later, she still cooks the
              same way. The kitchen is bigger. The recipe is not.
            </p>
            <CTAButton
              href="/our-story"
              variant="outline"
              className={`mt-8 ${isNight ? "border-brand-light/50 text-brand-light hover:bg-brand-dark/80 hover:text-brand-light" : "border-brand-mid/30 text-brand-dark"}`}
            >
              Read Suja&apos;s story
            </CTAButton>
          </div>
        </div>
      </section>
      </Reveal>

      <ClosingCtaBand />
    </div>
  );
}

function ButtonAsLinkLight({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="mt-6 inline-flex min-h-11 w-fit items-center justify-center rounded-lg border border-brand-light/45 bg-brand/15 px-8 py-2 font-sans text-base font-medium text-brand-light backdrop-blur hover:bg-brand/25"
    >
      {children}
    </Link>
  );
}

function HomeDivider({ variant }: { variant: "gold" | "brand" | "muted" }) {
  const bar =
    variant === "gold"
      ? "bg-gradient-to-r from-transparent via-brand-gold/45 to-transparent"
      : variant === "brand"
        ? "bg-gradient-to-r from-transparent via-brand/50 to-transparent"
        : "bg-gradient-to-r from-transparent via-brand-hover/40 to-transparent";
  return (
    <div className="px-6 py-2 md:px-16">
      <div className={cn("mx-auto h-0.5 max-w-5xl", bar)} />
    </div>
  );
}
