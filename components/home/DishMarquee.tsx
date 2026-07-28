"use client";

import { motion, useReducedMotion } from "framer-motion";

const WORDS = [
  "Appam & stew",
  "Malabar biriyani",
  "Puttu & kadala",
  "Coastal fish curry",
  "Onam sadhya",
  "Ghee rice meal",
  "Unniyappam",
  "Parotta & beef",
  "Kappa & meen",
  "Chaya & snibbles",
];

function Track() {
  return (
    <div className="flex shrink-0 items-center">
      {WORDS.map((w) => (
        <span key={w} className="flex items-center whitespace-nowrap">
          <span className="text-display px-6 text-2xl italic text-brand-light/90 md:px-9 md:text-4xl">
            {w}
          </span>
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold"
            aria-hidden
          />
        </span>
      ))}
    </div>
  );
}

/** Decorative infinite marquee of dish names — a warm editorial divider. */
export default function DishMarquee() {
  const reduce = useReducedMotion();

  return (
    <section
      className="overflow-hidden border-y border-brand-light/10 bg-brand-dark py-6 md:py-7"
      aria-hidden
    >
      {reduce ? (
        <div className="flex items-center overflow-hidden px-4">
          <Track />
        </div>
      ) : (
        <motion.div
          className="flex w-max will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        >
          <Track />
          <Track />
        </motion.div>
      )}
    </section>
  );
}
