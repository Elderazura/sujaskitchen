"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/** Thin brand readout of scroll depth on the home page. */
export default function HomeScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduce ? 300 : 120,
    damping: reduce ? 40 : 28,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand via-brand-hover to-brand-dark"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
