"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { PageShell } from "@/components/shared/PageShell";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { useTimeOfDay } from "@/components/home/time-of-day-context";
import { cn } from "@/lib/utils";

type Step = {
  n: string;
  title: string;
  body: string;
  image: string;
  alt: string;
};

// NOTE: craft images are curated from existing shoot photos — confirm/swap freely.
const STEPS: Step[] = [
  {
    n: "01",
    title: "We cook in small batches.",
    body: "Every order is made fresh that day. We do not cook for tomorrow. We do not reheat from yesterday.",
    image: "/images/DSC04917.jpg",
    alt: "Fresh Kerala dishes prepared in small batches at Suja's Kitchen",
  },
  {
    n: "02",
    title: "The spices come from Wayanad.",
    body: "Black pepper, cardamom, and curry leaves from the same farms in Wayanad and Idukki we have trusted for two decades. No substitutes.",
    image: "/images/FISH-CURRY-bnr-1.jpg",
    alt: "Kerala curry rich with Wayanad spices",
  },
  {
    n: "03",
    title: "Suja still decides what goes in.",
    body: "Twenty-five years in, the woman who started this in her home kitchen still decides every recipe, every portion, every standard.",
    image: "/images/suja-maam_1.jpg",
    alt: "Suja Alex checking a dish in the kitchen",
  },
];

export default function HomeCraftStory() {
  const { isNight } = useTimeOfDay();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Crossfade the pinned image across the three scroll thirds.
  const op0 = useTransform(scrollYProgress, [0.0, 0.3, 0.4], [1, 1, 0]);
  const op1 = useTransform(scrollYProgress, [0.34, 0.44, 0.62, 0.72], [0, 1, 1, 0]);
  const op2 = useTransform(scrollYProgress, [0.66, 0.76, 1], [0, 1, 1]);
  const ops = [op0, op1, op2];

  const heading = isNight ? "text-brand-light" : "text-brand-dark";
  const body = isNight ? "text-brand-light/80" : "text-brand-dark/85";
  const num = isNight ? "text-brand-gold/70" : "text-brand/50";

  const Header = (
    <div className="max-w-2xl">
      <SectionEyebrow className={isNight ? "text-brand-gold" : "text-brand"}>
        How we make food
      </SectionEyebrow>
      <h2 className={cn("text-section mt-4 text-3xl md:text-5xl", heading)}>
        Three truths. No shortcuts.
      </h2>
    </div>
  );

  // Stacked fallback (mobile + reduced motion): image over text, no pinning.
  const Stacked = (
    <PageShell className="section-y">
      {Header}
      <div className="mt-12 space-y-14">
        {STEPS.map((s) => (
          <article key={s.n} className="grid gap-6 sm:grid-cols-2 sm:items-center sm:gap-10">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={s.image}
                alt={s.alt}
                fill
                sizes="(max-width:640px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div>
              <span className={cn("text-display text-sm tabular-nums", num)}>{s.n}</span>
              <h3 className={cn("mt-2 font-serif text-2xl", heading)}>{s.title}</h3>
              <p className={cn("text-body-editorial mt-3", body)}>{s.body}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );

  if (reduce) return <section>{Stacked}</section>;

  return (
    <section>
      {/* Mobile: stacked */}
      <div className="md:hidden">{Stacked}</div>

      {/* Desktop: pinned image, scrolling steps */}
      <div ref={ref} className="hidden md:block">
        <PageShell className="pt-[clamp(4.5rem,3.5rem+3vw,6rem)]">{Header}</PageShell>
        <PageShell>
          <div className="grid grid-cols-2 gap-16">
            <div>
              <div className="sticky top-0 flex h-screen items-center py-[10vh]">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-[0_40px_80px_-40px_rgba(36,22,18,0.55)]">
                  {STEPS.map((s, i) => (
                    <motion.div
                      key={s.n}
                      style={{ opacity: ops[i] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={s.image}
                        alt={s.alt}
                        fill
                        sizes="45vw"
                        className="object-cover"
                        priority={i === 0}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "linear-gradient(to top, rgba(22,12,8,0.35), rgba(22,12,8,0) 45%)",
                        }}
                        aria-hidden
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {STEPS.map((s) => (
                <div
                  key={s.n}
                  className="flex min-h-screen flex-col justify-center"
                >
                  <span className={cn("text-display text-lg tabular-nums", num)}>
                    {s.n}
                  </span>
                  <h3 className={cn("mt-3 font-serif text-3xl md:text-4xl", heading)}>
                    {s.title}
                  </h3>
                  <p className={cn("text-body-editorial mt-5 max-w-md text-lg", body)}>
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PageShell>
      </div>
    </section>
  );
}
