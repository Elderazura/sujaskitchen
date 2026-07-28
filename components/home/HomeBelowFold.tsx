"use client";

import { useRef } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { CookingPot, Leaf, HandPlatter } from "lucide-react";
import FeaturedItems from "@/components/home/FeaturedItems";
import HomeEatGather from "@/components/home/HomeEatGather";
import HomeGoogleReviews from "@/components/home/HomeGoogleReviews";
import HomeInstagramFeed from "@/components/home/HomeInstagramFeed";
import HomeParallaxBlock from "@/components/home/HomeParallaxBlock";
import SujaStoryTicker from "@/components/home/SujaStoryTicker";
import SeasonalHeartbeat from "@/components/home/SeasonalHeartbeat";
import SnibblesBand from "@/components/home/SnibblesBand";
import { useRotatingIndex } from "@/components/home/useRotatingIndex";
import { useTimeConfig, useTimeOfDay } from "@/components/home/time-of-day-context";
import { PageShell, PageSection } from "@/components/shared/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ClosingCtaBand } from "@/components/shared/PageCrossLinks";
import { cn } from "@/lib/utils";
import { Reveal, RevealX } from "@/components/motion/Reveal";
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

  /** Full “The kitchen” block: same scroll span as Framer Ticker Scroll demo (section vs viewport). */
  const kitchenSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: kitchenStoryScrollProgress } = useScroll({
    target: kitchenSectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <div
      className="min-w-0 overflow-x-clip transition-[background-color] duration-[1500ms] ease-in-out"
      style={{ backgroundColor: config.pageBg }}
    >
      <FeaturedItems />

      <div ref={kitchenSectionRef} className="min-w-0">
        <HomeParallaxBlock range={36} className="will-change-transform">
          <Reveal>
            <section className="section-y">
              <PageShell>
                <SectionHeader
                  eyebrow="The kitchen"
                  title="Since 1999, every dish has been Suja&apos;s decision."
                  eyebrowClassName={isNight ? "text-brand-gold" : "text-brand"}
                  titleClassName={cn("text-3xl md:text-5xl leading-snug", heading)}
                  className="max-w-4xl"
                />
                <SujaStoryTicker
                  isNight={isNight}
                  sectionScrollProgress={kitchenStoryScrollProgress}
                />
                <div className="mt-6 min-h-[4.5rem] max-w-2xl md:min-h-[3.75rem]">
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
              </PageShell>
            </section>
          </Reveal>
        </HomeParallaxBlock>
      </div>

      <Reveal delay={0.05}>
        <PageSection
          className={isNight ? "bg-brand-dark/25" : "bg-white/60"}
        >
            <SectionHeader
              eyebrow="How we make food"
              title="Three truths. No shortcuts."
              eyebrowClassName={isNight ? "text-brand-gold" : "text-brand"}
              titleClassName={heading}
            />
            <div className="relative mt-2 min-h-[2.75rem] max-w-2xl">
              <AnimatePresence initial={false} mode="wait">
                <motion.p
                  key={`${howIndex}-${timeState}`}
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: 8 }}
                  transition={{ duration: reduce ? 0 : 0.4 }}
                  className={cn(
                    "text-body-editorial italic",
                    isNight ? "text-brand-gold/90" : "text-brand-dark/80",
                  )}
                >
                  {howLine}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
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
                  <div className="h-full border-0 bg-transparent">
                    <Icon
                      className={cn(
                        "h-10 w-10",
                        isNight ? "text-brand-gold" : "text-brand",
                      )}
                      aria-hidden
                    />
                    <h3 className={cn("mt-4 font-serif text-xl", heading)}>
                      {title}
                    </h3>
                    <p className={cn("text-body-editorial mt-2", bodyClass)}>
                      {copy}
                    </p>
                  </div>
                </RevealX>
              ))}
            </div>
        </PageSection>
      </Reveal>

      <HomeEatGather />

      <HomeGoogleReviews />

      <HomeInstagramFeed />

      <SeasonalHeartbeat />

      <SnibblesBand />

      <ClosingCtaBand />
    </div>
  );
}
