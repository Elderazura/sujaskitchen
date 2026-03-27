"use client";

import { useEffect, useState } from "react";
import type { MotionValue } from "framer-motion";
import {
  motion,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { SUJA_STORY_TICKER_VIDEOS } from "@/lib/sujaTickerVideos";

type Props = {
  className?: string;
  isNight: boolean;
  /**
   * Progress 0..1 while the whole “kitchen” section crosses the viewport (parent owns useScroll).
   * Matches Framer Ticker Scroll: content advances with page scroll, not a tiny local box.
   */
  sectionScrollProgress: MotionValue<number>;
};

/**
 * Desktop: horizontal scrub driven by section scrollYProgress (like Framer Ticker Scroll).
 * Touch / narrow: continuous loop. @see https://framer.university/resources/ticker-scroll-component-for-framer
 */
const AUTO_DURATION_SEC = 48;

export default function SujaStoryTicker({
  className,
  isNight,
  sectionScrollProgress,
}: Props) {
  const reduce = useReducedMotion();
  /** True = auto loop (touch / narrow). False = scroll-scrubbed (desktop). */
  const [autoMove, setAutoMove] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(max-width: 767.98px), (hover: none), (pointer: coarse)",
    );
    const sync = () => setAutoMove(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const xScroll = useTransform(sectionScrollProgress, [0, 1], ["0%", "-50%"]);

  const videos = [...SUJA_STORY_TICKER_VIDEOS];
  const loop = [...videos, ...videos];

  const frame = isNight
    ? "border-brand-mid/40 bg-brand-dark/50 shadow-md"
    : "border-brand/20 bg-white/80 shadow-sm";

  const fadeL = isNight ? "from-brand-dark/95" : "from-[#FFFBF0]";

  const trackInner = (
    <>
      {loop.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className={cn(
            "relative h-52 w-[9.5rem] shrink-0 overflow-hidden rounded-xl border-2 md:h-60 md:w-[10.5rem]",
            frame,
          )}
        >
          <video
            className="h-full w-full object-cover object-center"
            muted
            playsInline
            loop
            autoPlay={!reduce}
            preload="metadata"
          >
            <source src={src} type="video/webm" />
          </video>
        </div>
      ))}
    </>
  );

  return (
    <div
      role="region"
      aria-label="Short clips of Suja in the kitchen"
      className={cn(
        "relative mt-10 w-full overflow-hidden rounded-2xl border border-transparent",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r to-transparent md:w-20",
          fadeL,
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l to-transparent md:w-20",
          fadeL,
        )}
      />

      <div className="overflow-hidden py-1 md:flex md:items-center">
        {reduce ? (
          <div className="flex w-max gap-3 md:gap-4">{trackInner}</div>
        ) : autoMove ? (
          <motion.div
            className="flex w-max gap-3 md:gap-4 will-change-transform"
            initial={false}
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                duration: AUTO_DURATION_SEC / 2,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              },
            }}
          >
            {trackInner}
          </motion.div>
        ) : (
          <motion.div
            className="flex w-max gap-3 md:gap-4 will-change-transform"
            style={{ x: xScroll }}
          >
            {trackInner}
          </motion.div>
        )}
      </div>
    </div>
  );
}
