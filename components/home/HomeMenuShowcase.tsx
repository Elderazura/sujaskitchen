"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HOME_MENU_SHOWCASE } from "@/lib/menuData";
import { Reveal } from "@/components/motion/Reveal";
import { useTimeOfDay } from "@/components/home/time-of-day-context";

export default function HomeMenuShowcase() {
  const { isNight } = useTimeOfDay();
  const heading = isNight ? "text-brand-light" : "text-brand-dark";
  const muted = isNight ? "text-brand-light/70" : "text-brand-mid";

  return (
    <section
      className={`px-6 py-16 md:px-16 ${isNight ? "bg-brand-dark/20" : "bg-brand-light/20"}`}
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className={`font-serif text-3xl md:text-4xl ${heading}`}>
                From the daily menu
              </h2>
              <p className={`mt-2 max-w-2xl font-sans text-sm md:text-base ${muted}`}>
                A few plates guests order again and again. The full list changes by day on Talabat, Noon, and WhatsApp.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className={
                isNight
                  ? "w-full border-brand-light/40 text-brand-light hover:bg-brand-dark/80 hover:text-brand-light md:w-auto"
                  : "w-full border-brand-mid/30 md:w-auto"
              }
            >
              <Link href="/kitchen/menu">Browse the menu</Link>
            </Button>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_MENU_SHOWCASE.map((item, i) => (
            <Reveal key={item.name} delay={0.04 * (i % 3)}>
              <Card
                className={
                  isNight
                    ? "overflow-hidden border-brand-mid/35 bg-brand-dark/75"
                    : "overflow-hidden border-brand-mid/20 bg-white"
                }
              >
                <Link
                  href="/kitchen/menu"
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={item.imageSrc}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <CardContent className="p-5">
                    <Badge
                      variant="secondary"
                      className={
                        isNight
                          ? "border-brand-mid/40 bg-brand-dark/80 text-brand-light"
                          : "border-brand-mid/20 bg-brand-light/60 text-brand-dark"
                      }
                    >
                      {item.categoryLabel}
                    </Badge>
                    <h3 className={`mt-3 font-serif text-xl ${heading}`}>
                      {item.name}
                    </h3>
                    <p className={`mt-2 font-sans text-sm leading-relaxed ${muted}`}>
                      {item.description}
                    </p>
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
