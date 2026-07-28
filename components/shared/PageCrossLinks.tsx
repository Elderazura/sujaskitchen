"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/motion/Reveal";
import ScrollParallaxMedia from "@/components/motion/ScrollParallaxMedia";

const LINKS = [
  {
    href: "/kitchen",
    key: "kitchen",
    title: "Cloud kitchen",
    line: "Daily menu, delivery across Dubai and Abu Dhabi.",
    image: "/images/Sujas-Kitchen-scaled.jpg",
    alt: "Suja's Kitchen food spread",
  },
  {
    href: "/kitchen/menu",
    key: "menu",
    title: "Full menu",
    line: "Kerala, North Indian, Continental, Arabic PDFs and highlights.",
    image: "/images/Sujas-Kitchen-1-scaled.jpg",
    alt: "Menu dishes from Suja's Kitchen",
  },
  {
    href: "/catering",
    key: "catering",
    title: "Catering",
    line: "Weddings, offices, and halls. Up to two thousand guests.",
    image: "/images/sujas-banquet.webp",
    alt: "Catering banquet setup",
  },
  {
    href: "/snibbles",
    key: "snibbles",
    title: "Snibbles",
    line: "Kerala snacks for the four o'clock moment.",
    image: "/images/Sujas-snacks.jpg",
    alt: "Kerala snacks",
  },
  {
    href: "/seasonal",
    key: "seasonal",
    title: "Seasonal",
    line: "Onam, Christmas, Easter, Vishu, and feast windows.",
    image: "/images/Sujas-Kitch-Onam-17.jpg",
    alt: "Seasonal sadhya spread",
  },
  {
    href: "/our-story",
    key: "story",
    title: "Our story",
    line: "Sharjah, 1999. Al Quoz today. Same pot, bigger kitchen.",
    image: "/images/suja-maam_1.jpg",
    alt: "Suja Alex in the kitchen",
  },
  {
    href: "/blog",
    key: "blog",
    title: "Journal",
    line: "Longer reads, seasonal notes, and what the kitchen is cooking.",
    image: "/images/Ghee-Rice-scaled.jpg",
    alt: "Ghee rice dish from Suja's Kitchen",
  },
  {
    href: "/contact",
    key: "contact",
    title: "Contact",
    line: "Email or the contact page. We reply during kitchen hours.",
    image: "/images/Sujas-Kitchen-scaled.jpg",
    alt: "Suja's Kitchen contact and orders",
  },
] as const;

function dedupeLinks(omit: readonly string[]) {
  const set = new Set(omit);
  return LINKS.filter((l) => !set.has(l.href) && !set.has(l.key));
}

type BannerTone = "dark" | "light";

export function MidPageBanner({
  image,
  alt,
  title,
  subtitle,
  href,
  cta,
  tone = "dark",
}: {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  href: string;
  cta: string;
  tone?: BannerTone;
}) {
  const reduce = useReducedMotion();
  return (
    <section
      className={`relative min-h-[260px] overflow-hidden md:min-h-[360px] ${
        tone === "dark" ? "bg-stone-950 text-white" : "bg-brand-light/40 text-stone-900"
      }`}
    >
      <div className="absolute inset-0">
        <ScrollParallaxMedia src={image} alt={alt} className="min-h-[260px] md:min-h-[360px]" />
      </div>
      <div
        className={`absolute inset-0 ${
          tone === "dark"
            ? "bg-gradient-to-r from-black/80 via-black/55 to-black/35"
            : "bg-gradient-to-r from-stone-100/95 via-stone-50/80 to-transparent"
        }`}
      />
      <div className="relative z-10 mx-auto flex max-w-6xl min-h-[260px] flex-col justify-end px-6 py-12 md:min-h-[360px] md:justify-center md:py-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -20 }}
          whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <h2 className="font-serif text-3xl md:text-5xl">{title}</h2>
          <p
            className={`mt-3 font-sans text-sm leading-relaxed md:text-base ${
              tone === "dark" ? "text-white/85" : "text-stone-700"
            }`}
          >
            {subtitle}
          </p>
          <Button
            className="mt-6 min-h-12 bg-brand text-white hover:bg-brand-hover"
            size="lg"
            asChild
          >
            <Link href={href}>{cta}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export function ExploreMoreGrid({
  omit = [],
  heading = "Explore more",
  sub = "Other doors from the same kitchen.",
}: {
  omit?: readonly string[];
  heading?: string;
  sub?: string;
}) {
  const items = dedupeLinks(omit);
  const show = items.slice(0, 4);

  return (
    <section className="bg-stone-50 px-4 py-14 sm:px-6 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">
            {heading}
          </h2>
          <p className="mt-2 max-w-2xl font-sans text-sm text-stone-600 md:text-base">
            {sub}
          </p>
        </Reveal>
        <RevealStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {show.map((item) => (
            <RevealStaggerItem key={item.href}>
              <Link href={item.href} className="group block h-full">
                <Card className="h-full overflow-hidden border-stone-200 transition-shadow duration-300 group-hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="font-serif text-lg">{item.title}</p>
                      <p className="mt-1 line-clamp-2 font-sans text-xs text-white/85">
                        {item.line}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1 font-sans text-xs font-medium text-brand-light">
                        Open
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

export function ClosingCtaBand({
  title = "Ready when you are",
  body = "Order on the apps, email for bulk, or talk to us about a hall full of people.",
}: {
  title?: string;
  body?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <section className="bg-brand-gradient px-4 py-14 text-brand-light sm:px-6 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h2
          className="font-serif text-3xl md:text-5xl"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-2xl font-sans text-sm text-brand-light/90 md:text-base"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          {body}
        </motion.p>
        <motion.div
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Button
            size="lg"
            className="min-h-12 bg-white text-brand hover:bg-brand-light"
            asChild
          >
            <Link href="/kitchen/menu">See the menu</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-h-12 border-2 border-brand-light/80 bg-transparent text-brand-light hover:bg-brand-dark/30"
            asChild
          >
            <Link href="/contact">Email us</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-h-12 border-2 border-brand-light/80 bg-transparent text-brand-light hover:bg-brand-dark/30"
            asChild
          >
            <Link href="/contact">Contact</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Standard page tail: mid banner, explore grid, closing CTA. Omit href keys or paths you do not want duplicated.
 */
export function PageCrossLinks({
  omit = [],
  banner,
}: {
  omit?: readonly string[];
  banner?: {
    image: string;
    alt: string;
    title: string;
    subtitle: string;
    href: string;
    cta: string;
    tone?: BannerTone;
  };
}) {
  const defaultBanner = {
    image: "/images/Parotta-Beef-Curry-Combo-scaled.jpg",
    alt: "Parotta and beef curry",
    title: "Still thinking about lunch?",
    subtitle:
      "The menu covers breakfast through dinner. Pick a cuisine, order on Talabat or Noon, or message us for something larger.",
    href: "/kitchen/menu",
    cta: "Open the menu",
    tone: "dark" as const,
  };
  const b = banner ?? defaultBanner;
  return (
    <>
      <Reveal className="w-full">
        <MidPageBanner {...b} />
      </Reveal>
      <ExploreMoreGrid omit={omit} />
      <ClosingCtaBand />
    </>
  );
}
