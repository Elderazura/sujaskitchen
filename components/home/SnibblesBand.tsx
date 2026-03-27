"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";

const TICKER_ITEMS = [
  "Banana Chips",
  "Kozhi Ada",
  "Kappa Chips",
  "Mixture",
  "Fresh from Al Quoz",
  "Kerala flavour",
  "Packed for UAE delivery",
  "The 4pm moment",
];

function Ticker() {
  const reduce = useReducedMotion();
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="relative overflow-hidden py-3 border-y border-brand-gold/20">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={reduce ? {} : { x: ["0%", "-50%"] }}
        transition={{
          duration: 22,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="font-sans text-xs uppercase tracking-widest text-brand-light/50 select-none"
          >
            {item}
            <span className="mx-5 text-brand-gold/50">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function RotatingBadge() {
  const reduce = useReducedMotion();
  const text = "Kerala Snacks · By Suja's Kitchen · ";

  return (
    <motion.div
      className="relative h-20 w-20 flex-shrink-0 select-none"
      animate={reduce ? {} : { rotate: 360 }}
      transition={{ duration: 18, ease: "linear", repeat: Infinity }}
      aria-hidden
    >
      <svg viewBox="0 0 80 80" className="h-full w-full" fill="none">
        <path
          id="snibbles-circle"
          d="M 40,40 m -28,0 a 28,28 0 1,1 56,0 a 28,28 0 1,1 -56,0"
          fill="none"
        />
        <text className="fill-brand-gold" fontSize="9.5" fontFamily="sans-serif" letterSpacing="2">
          <textPath href="#snibbles-circle">{text}</textPath>
        </text>
        <circle cx="40" cy="40" r="10" className="fill-brand-gold/15" />
        <text
          x="40"
          y="44"
          textAnchor="middle"
          fontSize="10"
          fontFamily="serif"
          className="fill-brand-gold"
        >
          S
        </text>
      </svg>
    </motion.div>
  );
}

export default function SnibblesBand() {
  return (
    <section className="bg-[#0c0a09] overflow-hidden">
      <Ticker />
      <div className="flex flex-col items-center gap-6 px-6 py-14 text-center md:flex-row md:justify-center md:gap-10 md:px-16 md:text-left">
        <RotatingBadge />
        <div>
          <h2 className="font-serif text-3xl text-brand-gold md:text-4xl">
            Snibbles
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-sans text-sm text-brand-light/75 md:mx-0 md:text-base">
            Kerala snacks. For chaya time. And every moment after.
          </p>
          <Button
            className="mt-6 bg-brand-gold text-brand-dark hover:bg-brand-gold/90"
            size="lg"
            asChild
          >
            <Link href="/snibbles">Meet Snibbles</Link>
          </Button>
        </div>
      </div>
      <Ticker />
    </section>
  );
}
