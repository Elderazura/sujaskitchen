"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

type HomeParallaxBlockProps = {
  children: ReactNode;
  className?: string;
  /** Vertical drift in px at scroll extremes */
  range?: number;
};

export default function HomeParallaxBlock({
  children,
  className,
  range = 48,
}: HomeParallaxBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [0, 0, 0] : [range, 0, -range],
  );

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
