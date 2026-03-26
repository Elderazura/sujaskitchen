"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CookingPot, Leaf, HandPlatter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import FeaturedItems from "@/components/home/FeaturedItems";
import SeasonalHeartbeat from "@/components/home/SeasonalHeartbeat";
import SnibblesBand from "@/components/home/SnibblesBand";
import { useTimeConfig, useTimeOfDay } from "@/components/home/time-of-day-context";
import CTAButton from "@/components/shared/CTAButton";
import { Reveal } from "@/components/motion/Reveal";

export default function HomeBelowFold() {
  const config = useTimeConfig();
  const { isNight } = useTimeOfDay();

  const muted = isNight ? "text-stone-400" : "text-stone-600";
  const heading = isNight ? "text-[#FEF3C7]" : "text-stone-900";
  const body = isNight ? "text-stone-300" : "text-stone-700";

  return (
    <motion.div
      animate={{ backgroundColor: config.pageBg }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="min-w-0"
    >
      <FeaturedItems />

      <Reveal>
      <section className="px-6 py-20 text-center md:px-16">
        <h2
          className={`mx-auto max-w-4xl font-serif text-3xl leading-snug md:text-5xl ${heading}`}
        >
          Since 1999, every dish has been Suja&apos;s decision.
        </h2>
        <p
          className={`mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed md:text-lg ${muted}`}
        >
          Central Travancore cooking. Wayanad spices. Fresh coconut. The same
          recipe as the first day.
        </p>
      </section>
      </Reveal>

      <Reveal delay={0.05}>
      <section className={`px-6 py-16 md:px-16 ${isNight ? "bg-black/20" : "bg-white/60"}`}>
        <div className="mx-auto max-w-7xl">
          <h2 className={`font-serif text-3xl md:text-4xl ${heading}`}>
            How we make food
          </h2>
          <p className={`mt-2 max-w-2xl font-sans text-sm ${muted}`}>
            Three truths. No shortcuts.
          </p>
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
            ].map(({ Icon, title, body }) => (
              <Card
                key={title}
                className={
                  isNight
                    ? "border-stone-700 bg-stone-900/70"
                    : "border-stone-200 bg-white"
                }
              >
                <CardContent className="p-6">
                  <Icon
                    className={`h-10 w-10 ${isNight ? "text-brand-gold" : "text-brand-dark"}`}
                  />
                  <h3 className={`mt-4 font-serif text-xl ${heading}`}>{title}</h3>
                  <p className={`mt-2 font-sans text-sm leading-relaxed ${body}`}>
                    {body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal delay={0.06}>
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <Card
            className={
              isNight
                ? "border-stone-700 bg-[#292018]"
                : "border-stone-200 bg-[#FFFBEB]"
            }
          >
            <CardContent className="flex h-full flex-col p-8">
              <h3 className={`font-serif text-2xl ${heading}`}>
                Kerala at your door.
              </h3>
              <p className={`mt-3 flex-1 font-sans text-sm leading-relaxed ${body}`}>
                Cloud kitchen. Daily fresh menu. Delivered across Dubai and Abu
                Dhabi.
              </p>
              <CTAButton href="/kitchen/menu" className="mt-6 w-fit">
                See today&apos;s menu
              </CTAButton>
            </CardContent>
          </Card>
          <Card className="border-0 bg-brand-dark text-white shadow-lg">
            <CardContent className="flex h-full flex-col p-8">
              <h3 className="font-serif text-2xl text-white">
                Feeding your gathering.
              </h3>
              <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-white/85">
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
      <section className={`px-0 py-16 ${isNight ? "bg-black/25" : "bg-stone-100"}`}>
        <div className="relative mx-auto max-w-6xl px-6 md:px-16">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl md:aspect-[21/9]">
            <Image
              src="/images/suja-maam_1.jpg"
              alt="Suja Alex in the kitchen at Suja's Kitchen"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1152px"
            />
          </div>
          <div className={`mx-auto mt-10 max-w-2xl text-center`}>
            <p className={`font-sans text-base leading-relaxed md:text-lg ${body}`}>
              In 1999, four friends were tired of hotel food. Suja cooked for
              them. They told others. Twenty-five years later, she still cooks the
              same way. The kitchen is bigger. The recipe is not.
            </p>
            <CTAButton
              href="/our-story"
              variant="outline"
              className={`mt-8 ${isNight ? "border-stone-600 text-[#FEF3C7] hover:bg-stone-800 hover:text-[#FEF3C7]" : ""}`}
            >
              Read Suja&apos;s story
            </CTAButton>
          </div>
        </div>
      </section>
      </Reveal>
    </motion.div>
  );
}

function ButtonAsLinkLight({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="mt-6 inline-flex min-h-11 w-fit items-center justify-center rounded-lg border border-white/40 bg-white/10 px-8 py-2 font-sans text-base font-medium text-white backdrop-blur hover:bg-white/20"
    >
      {children}
    </Link>
  );
}
