"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/Reveal";
import { useTimeOfDay } from "@/components/home/time-of-day-context";

const SNIBBLES_PREVIEW = [
  {
    name: "Banana chips",
    line: "Thin, crisp, salted. The default chaya companion.",
    image: "/images/Banana-Chips-Pack-Final.png",
    alt: "Snibbles banana chips pack",
    popular: true,
  },
  {
    name: "Kappa chips",
    line: "Tapioca, seasoned and fried the Kerala way.",
    image: "/images/Chembu-Chips-Pack-Final.png",
    alt: "Snibbles kappa chips pack",
    popular: true,
  },
  {
    name: "Mixture",
    line: "A mixed tray for tea time and guests.",
    image: "/images/Mixture-Pack-Final.png",
    alt: "Snibbles mixture pack",
    popular: false,
  },
  {
    name: "Kozhi ada",
    line: "Sweet rice dumplings with coconut filling.",
    image: "/images/Kozhi-Ada-Pack-Final.png",
    alt: "Snibbles kozhi ada pack",
    popular: false,
  },
] as const;

export default function HomeSnibblesPreview() {
  const { isNight } = useTimeOfDay();
  const heading = isNight ? "text-brand-light" : "text-brand-dark";
  const muted = isNight ? "text-brand-light/75" : "text-brand-mid";

  return (
    <section className="px-6 py-16 md:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Badge
                variant="secondary"
                className={
                  isNight
                    ? "border-brand-mid/40 bg-brand-dark/70 text-brand-light"
                    : "border-brand-mid/25 bg-brand-light/70 text-brand-dark"
                }
              >
                Snibbles
              </Badge>
              <h2 className={`mt-3 font-serif text-3xl md:text-4xl ${heading}`}>
                Kerala snacks, packed to leave Al Quoz
              </h2>
              <p className={`mt-2 max-w-2xl font-sans text-sm md:text-base ${muted}`}>
                Chips, mixtures, and sweets under our snack brand. Order alongside meals or on their own.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="w-full bg-brand-gold text-brand-dark hover:bg-brand-gold/90 md:w-auto"
            >
              <Link href="/snibbles">Shop Snibbles</Link>
            </Button>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SNIBBLES_PREVIEW.map((p, i) => (
            <Reveal key={p.name} delay={0.05 * (i % 4)}>
              <Card
                className={
                  isNight
                    ? "h-full overflow-hidden border-brand-mid/35 bg-brand-dark/75"
                    : "h-full overflow-hidden border-brand-mid/20 bg-white"
                }
              >
                <Link
                  href="/snibbles"
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <div className="relative aspect-square w-full bg-brand-light/20 p-6">
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      className="object-contain p-2 transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`font-serif text-lg ${heading}`}>{p.name}</p>
                      {p.popular ? (
                        <Badge className="shrink-0 bg-brand text-white hover:bg-brand-hover">
                          Popular
                        </Badge>
                      ) : null}
                    </div>
                    <p className={`mt-2 font-sans text-sm ${muted}`}>{p.line}</p>
                  </CardContent>
                </Link>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
