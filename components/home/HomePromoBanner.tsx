"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTimeOfDay } from "@/components/home/time-of-day-context";

type HomePromoBannerProps = {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  /** "left" = text on left (default), "right" = gradient favors text on right */
  align?: "left" | "right";
};

export default function HomePromoBanner({
  title,
  description,
  ctaLabel,
  href,
  imageSrc,
  imageAlt,
  align = "left",
}: HomePromoBannerProps) {
  const { isNight } = useTimeOfDay();
  const gradient =
    align === "right"
      ? "bg-gradient-to-l from-black/80 via-black/50 to-transparent"
      : "bg-gradient-to-r from-black/80 via-black/55 to-black/25";

  return (
    <section className="px-0">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-none md:mx-6 md:rounded-xl lg:mx-auto">
        <div className="relative aspect-[5/4] w-full md:aspect-[21/8] md:min-h-[280px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, min(1280px, 100vw)"
            priority={false}
          />
          <div
            className={`absolute inset-0 ${gradient}`}
            aria-hidden
          />
          <div
            className={`absolute inset-0 flex flex-col justify-end px-6 py-10 md:justify-center md:px-14 lg:px-16 ${
              align === "right" ? "items-end text-right" : "items-start text-left"
            }`}
          >
            <h2 className="max-w-xl font-serif text-2xl leading-tight text-white md:text-4xl">
              {title}
            </h2>
            <p className="mt-3 max-w-lg font-sans text-sm leading-relaxed text-white/90 md:text-base">
              {description}
            </p>
            <Button
              asChild
              size="lg"
              className={`mt-6 border-0 shadow-md ${
                isNight
                  ? "bg-brand-light text-brand-dark hover:bg-brand-light/90"
                  : "bg-white text-brand-dark hover:bg-brand-light/50"
              }`}
            >
              <Link href={href}>{ctaLabel}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
