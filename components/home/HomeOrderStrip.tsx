"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WHATSAPP_ORDER_URL } from "@/lib/constants";
import { Reveal } from "@/components/motion/Reveal";
import { useTimeOfDay } from "@/components/home/time-of-day-context";

const TALABAT_URL = "https://www.talabat.com";
const NOON_URL = "https://www.noon.com";

export default function HomeOrderStrip() {
  const { isNight } = useTimeOfDay();
  const heading = isNight ? "text-brand-light" : "text-brand-dark";
  const muted = isNight ? "text-brand-light/70" : "text-brand-mid";

  const btnClass = isNight
    ? "border-brand-light/35 bg-brand-dark/70 text-brand-light hover:bg-brand-dark hover:text-brand-light"
    : "";

  return (
    <section
      className={`px-6 py-14 md:px-16 ${isNight ? "bg-brand-dark/25" : "bg-white/80"}`}
    >
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <h2 className={`font-serif text-2xl md:text-3xl ${heading}`}>
            Order today
          </h2>
          <p className={`mx-auto mt-2 max-w-xl font-sans text-sm md:text-base ${muted}`}>
            Same kitchen on every channel. Pick Talabat, Noon, or message us on WhatsApp for bulk or custom requests.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button asChild size="lg" variant="default" className="min-h-11 bg-brand hover:bg-brand-hover">
              <Link href={TALABAT_URL} target="_blank" rel="noopener noreferrer">
                Talabat
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className={`min-h-11 ${btnClass}`}>
              <Link href={NOON_URL} target="_blank" rel="noopener noreferrer">
                Noon
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className={`min-h-11 ${btnClass}`}>
              <Link href={WHATSAPP_ORDER_URL} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="min-h-11 bg-brand-light/80 text-brand-dark hover:bg-brand-light"
            >
              <Link href="/kitchen">Cloud kitchen</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
