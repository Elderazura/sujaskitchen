"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import FeaturedItems from "@/components/home/FeaturedItems";
import HomeTrustStrip from "@/components/home/HomeTrustStrip";
import DishMarquee from "@/components/home/DishMarquee";
import HomeCraftStory from "@/components/home/HomeCraftStory";
import HomeEatGather from "@/components/home/HomeEatGather";
import HomeGoogleReviews from "@/components/home/HomeGoogleReviews";
import HomeInstagramFeed from "@/components/home/HomeInstagramFeed";
import SeasonalHeartbeat from "@/components/home/SeasonalHeartbeat";
import SnibblesBand from "@/components/home/SnibblesBand";
import { useRotatingIndex } from "@/components/home/useRotatingIndex";
import { useTimeConfig, useTimeOfDay } from "@/components/home/time-of-day-context";
import { PageShell } from "@/components/shared/PageShell";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { ClosingCtaBand, MidPageBanner } from "@/components/shared/PageCrossLinks";
import { cn } from "@/lib/utils";
import { Reveal, RevealX } from "@/components/motion/Reveal";
import { HOME_STORY_ROTATIONS } from "@/lib/heroMedia";

export default function HomeBelowFold() {
  const config = useTimeConfig();
  const { isNight, timeState } = useTimeOfDay();
  const reduce = useReducedMotion();

  const muted = isNight ? "text-brand-light/70" : "text-brand-mid";
  const heading = isNight ? "text-brand-light" : "text-brand-dark";

  const storyIndex = useRotatingIndex(
    HOME_STORY_ROTATIONS.length,
    7200,
    !reduce,
    timeState,
  );
  const storyLine = HOME_STORY_ROTATIONS[storyIndex]?.line ?? "";

  return (
    <div
      className="min-w-0 overflow-x-clip transition-[background-color] duration-[1500ms] ease-in-out"
      style={{
        backgroundColor: config.pageBg,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
        backgroundBlendMode: "soft-light",
      }}
    >
      <HomeTrustStrip />

      <FeaturedItems />

      <DishMarquee />

      {/* Founder moment */}
      <section className="section-y">
        <PageShell>
          <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1fr] md:gap-16">
            <RevealX from="left">
              <figure className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(36,22,18,0.5)]">
                <Image
                  src="/images/suja-maam.jpg"
                  alt="Suja Alex, founder of Suja's Kitchen, in the kitchen"
                  fill
                  sizes="(max-width:768px) 100vw, 42vw"
                  className="object-cover object-center"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(to top, rgba(22,12,8,0.78) 0%, rgba(22,12,8,0.1) 42%, rgba(22,12,8,0) 70%)",
                  }}
                  aria-hidden
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-eyebrow text-brand-gold">Suja Alex</p>
                  <p className="mt-1 font-sans text-sm text-brand-light/90">
                    Founder &amp; head cook, since 1999
                  </p>
                </figcaption>
              </figure>
            </RevealX>

            <Reveal delay={0.08}>
              <SectionEyebrow className={isNight ? "text-brand-gold" : "text-brand"}>
                The kitchen
              </SectionEyebrow>
              <h2
                className={cn(
                  "text-section mt-4 text-3xl leading-[1.1] md:text-5xl",
                  heading,
                )}
              >
                Since 1999, every dish has been Suja&apos;s decision.
              </h2>
              <blockquote
                className={cn(
                  "mt-7 border-l-2 border-brand-gold/70 pl-5 font-serif text-xl italic leading-snug md:text-2xl",
                  isNight ? "text-brand-light/90" : "text-brand-dark/85",
                )}
              >
                &ldquo;Twenty-five years, from a home kitchen to a cloud kitchen.
                The standard never moved.&rdquo;
              </blockquote>
              <div className="mt-6 min-h-[4.5rem] max-w-xl md:min-h-[3.75rem]">
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
              <Link
                href="/our-story"
                className={cn(
                  "group mt-6 inline-flex min-h-11 items-center gap-2 font-sans text-sm font-semibold transition-colors",
                  isNight
                    ? "text-brand-gold hover:text-brand-light"
                    : "text-brand hover:text-brand-hover",
                )}
              >
                Read our story
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </PageShell>
      </section>

      {/* Signature: pinned craft story */}
      <HomeCraftStory />

      {/* Full-bleed cinematic break */}
      <Reveal className="w-full">
        <MidPageBanner
          image="/images/DSC04699-1-scaled.jpg"
          alt="Kerala dishes freshly plated at Suja's Kitchen"
          title="Cooked today. Sent to your door."
          subtitle="Same-day Kerala cooking, delivered hot across Dubai and Abu Dhabi — breakfast through dinner."
          href="/kitchen/menu"
          cta="Order now"
          tone="dark"
        />
      </Reveal>

      <HomeEatGather />

      <HomeGoogleReviews />

      <SeasonalHeartbeat />

      <HomeInstagramFeed />

      <SnibblesBand />

      <ClosingCtaBand />
    </div>
  );
}
