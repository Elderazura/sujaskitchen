"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px", amount: 0.15 }}
      transition={{
        duration: reduce ? 0 : 0.55,
        delay: reduce ? 0 : delay,
        ease: easeOut,
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealScale({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px", amount: 0.2 }}
      transition={{
        duration: reduce ? 0 : 0.5,
        delay: reduce ? 0 : delay,
        ease: easeOut,
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealStagger({
  children,
  className,
  stagger = 0.07,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-32px", amount: 0.1 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduce ? 0 : stagger,
            delayChildren: reduce ? 0 : 0.05,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealStaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : 22 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: reduce ? 0 : 0.45, ease: easeOut },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealX({
  children,
  className,
  delay = 0,
  from = "left",
  x = 40,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "left" | "right";
  x?: number;
}) {
  const reduce = useReducedMotion();
  const x0 = from === "left" ? -x : x;
  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? false : { opacity: 0, x: x0 }}
      whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-56px", amount: 0.12 }}
      transition={{
        duration: reduce ? 0 : 0.58,
        delay: reduce ? 0 : delay,
        ease: easeOut,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Splits text into words and reveals each with a masked slide-up stagger.
 * Pass a plain string as children.
 */
export function RevealWords({
  children,
  className,
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = children.split(" ");

  return (
    <motion.span
      className={cn("inline", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-32px", amount: 0.3 }}
      aria-label={children}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduce ? 0 : 0.065,
            delayChildren: reduce ? 0 : delay,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden leading-[1.15]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: reduce ? 0 : "105%", opacity: reduce ? 1 : 0 },
              show: {
                y: 0,
                opacity: 1,
                transition: { duration: reduce ? 0 : 0.52, ease: easeOut },
              },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </motion.span>
  );
}
