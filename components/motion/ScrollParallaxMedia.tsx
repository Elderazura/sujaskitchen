"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Extra vertical movement on md+ (px) */
  range?: number;
  sizes?: string;
  priority?: boolean;
};

/**
 * Subtle vertical parallax on the background image. Disabled when reduced motion is on or on small screens (class-based).
 */
export default function ScrollParallaxMedia({
  src,
  alt,
  className = "",
  range = 36,
  sizes = "100vw",
  priority = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [-range, range],
  );

  return (
    <div
      ref={ref}
      className={`relative min-h-[220px] w-full overflow-hidden sm:min-h-[280px] md:min-h-[320px] ${className}`}
    >
      <motion.div
        className="absolute inset-0 hidden scale-110 md:block"
        style={{ y }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
          quality={85}
        />
      </motion.div>
      <div className="absolute inset-0 md:hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
          quality={85}
        />
      </div>
    </div>
  );
}
