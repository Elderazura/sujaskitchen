"use client";

import Image from "next/image";
import { PageShell } from "@/components/shared/PageShell";
import { useTimeOfDay } from "@/components/home/time-of-day-context";
import { cn } from "@/lib/utils";

const STATS = [
  { value: "1999", label: "Cooking since" },
  { value: "5", label: "Cloud kitchens in the UAE" },
  { value: "2,000", label: "Guests catered per event" },
];

const CERTS = [
  {
    src: "/images/Dubai-Municipality-Accredited-Photoroom.png",
    alt: "Dubai Municipality accredited",
  },
  {
    src: "/images/haccp-hazard-analysis-critical-control-260nw-2369890213-Photoroom.png",
    alt: "HACCP certified",
  },
  { src: "/images/iso-22000-e1729347891555.webp", alt: "ISO 22000 certified" },
];

export default function HomeTrustStrip() {
  const { isNight } = useTimeOfDay();
  const value = isNight ? "text-brand-light" : "text-brand-dark";
  const label = isNight ? "text-brand-light/60" : "text-brand-mid";
  const border = isNight ? "border-brand-light/12" : "border-brand-dark/10";

  return (
    <section className={cn("border-y", border)}>
      <PageShell className="py-6 md:py-7">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-4 sm:gap-x-12">
            {STATS.map((s) => (
              <li key={s.label} className="flex items-baseline gap-2.5">
                <span
                  className={cn(
                    "text-display text-2xl tabular-nums md:text-3xl",
                    value,
                  )}
                >
                  {s.value}
                </span>
                <span
                  className={cn(
                    "max-w-[8rem] font-sans text-xs leading-tight",
                    label,
                  )}
                >
                  {s.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <span className={cn("text-eyebrow shrink-0", label)}>
              Certified
            </span>
            <div className="flex items-center gap-4">
              {CERTS.map((c) => (
                <Image
                  key={c.src}
                  src={c.src}
                  alt={c.alt}
                  width={96}
                  height={44}
                  className={cn(
                    "h-9 w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 md:h-11",
                    isNight && "opacity-80 brightness-0 invert",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </PageShell>
    </section>
  );
}
