"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/motion/Reveal";
import { useTimeOfDay } from "@/components/home/time-of-day-context";

const LINKS = [
  {
    href: "/kitchen",
    title: "Cloud kitchen",
    line: "Daily menu, Al Quoz, delivery across the Emirates.",
    image: "/images/Sujas-Kitchen-scaled.jpg",
    alt: "Suja's Kitchen food spread",
  },
  {
    href: "/kitchen/menu",
    title: "Full menu",
    line: "Breakfast through dinner and meal boxes.",
    image: "/images/Sujas-Kitchen-1-scaled.jpg",
    alt: "Menu highlights",
  },
  {
    href: "/catering",
    title: "Catering",
    line: "Weddings, offices, and halls. Up to two thousand guests.",
    image: "/images/sujas-banquet.webp",
    alt: "Catering banquet",
  },
  {
    href: "/seasonal",
    title: "Seasonal",
    line: "Onam, Christmas, Easter, Vishu, and feast windows.",
    image: "/images/Sujas-Kitch-Onam-17.jpg",
    alt: "Seasonal sadhya",
  },
  {
    href: "/our-story",
    title: "Our story",
    line: "1999 to today. Same pot, bigger kitchen.",
    image: "/images/suja-maam_1.jpg",
    alt: "Suja Alex in the kitchen",
  },
  {
    href: "/blog",
    title: "Journal",
    line: "Notes from the kitchen and the calendar.",
    image: "/images/Ghee-Rice-scaled.jpg",
    alt: "Ghee rice dish",
  },
] as const;

export default function HomeExploreStrip() {
  const { isNight } = useTimeOfDay();
  const heading = isNight ? "text-brand-light" : "text-brand-dark";
  const muted = isNight ? "text-brand-light/75" : "text-brand-mid";

  return (
    <section
      className={`px-6 py-16 md:px-16 ${
        isNight ? "bg-brand-dark/30" : "bg-brand-light/25"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className={`font-serif text-3xl md:text-4xl ${heading}`}>
            Explore the kitchen
          </h2>
          <p className={`mt-2 max-w-2xl font-sans text-sm md:text-base ${muted}`}>
            Same recipes everywhere you click. Jump into menus, seasons, the story, and longer reads.
          </p>
        </Reveal>
        <RevealStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LINKS.map((item) => (
            <RevealStaggerItem key={item.href}>
              <Link href={item.href} className="group block h-full">
                <Card
                  className={`h-full overflow-hidden transition-shadow duration-300 group-hover:shadow-xl ${
                    isNight
                      ? "border-brand-mid/35 bg-brand-dark/60"
                      : "border-brand-mid/20 bg-white"
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="font-serif text-lg">{item.title}</p>
                      <p className="mt-1 line-clamp-2 font-sans text-xs text-white/88">
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
