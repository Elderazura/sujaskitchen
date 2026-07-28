"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/motion/Reveal";
import { PageSection } from "@/components/shared/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useTimeOfDay } from "@/components/home/time-of-day-context";
import { INSTAGRAM_HANDLE, INSTAGRAM_PROFILE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

type IgPost = {
  id: string;
  image: string;
  permalink: string;
  caption?: string;
};

/** Curated food photos shown when the Instagram API is not connected. */
const FALLBACK_TILES: { image: string; alt: string }[] = [
  { image: "/images/SujasKitchen_-40-Edit-scaled.jpg", alt: "Kerala dish plated at Suja's Kitchen" },
  { image: "/images/Appam-Beef-Curry-Combo_1-1.jpg", alt: "Appam with beef curry" },
  { image: "/images/FISH-CURRY-bnr-1.jpg", alt: "Kerala coastal fish curry" },
  { image: "/images/Param-Puri-scaled.jpg", alt: "Parotta and puri from the kitchen" },
  { image: "/images/Sujas-Kitch-Onam-17.jpg", alt: "Onam sadhya spread" },
  { image: "/images/Mixer-Fried-Rice-scaled.jpg", alt: "Fried rice bowl" },
  { image: "/images/DSC04699-1-scaled.jpg", alt: "Dishes from Suja's Kitchen" },
  { image: "/images/Ghee-Rice-scaled.jpg", alt: "Ghee rice meal" },
];

export default function HomeInstagramFeed() {
  const { isNight } = useTimeOfDay();
  const [posts, setPosts] = useState<IgPost[]>([]);

  const heading = isNight ? "text-brand-light" : "text-brand-dark";
  const muted = isNight ? "text-brand-light/70" : "text-brand-mid";
  const rail = isNight ? "bg-brand-dark/40" : "bg-paper-deep";

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/instagram");
        const data = await res.json();
        if (cancelled) return;
        if (Array.isArray(data.posts) && data.posts.length > 0) {
          setPosts(data.posts as IgPost[]);
        }
      } catch {
        /* keep fallback tiles */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const hasFeed = posts.length > 0;
  const tiles = hasFeed
    ? posts.slice(0, 8).map((p) => ({
        image: p.image,
        alt: p.caption ?? "Instagram post from Suja's Kitchen",
        href: p.permalink,
        unoptimized: true,
      }))
    : FALLBACK_TILES.map((t) => ({
        image: t.image,
        alt: t.alt,
        href: INSTAGRAM_PROFILE_URL,
        unoptimized: false,
      }));

  return (
    <PageSection className={rail}>
      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="From the feed"
            title="Straight from the pass"
            description={`Fresh from the kitchen. Follow @${INSTAGRAM_HANDLE} for the daily line-up.`}
            eyebrowClassName={isNight ? "text-brand-gold" : "text-brand"}
            titleClassName={heading}
            descriptionClassName={muted}
          />
          <Button
            asChild
            size="lg"
            className="shrink-0 gap-2 bg-brand px-7 text-brand-light hover:bg-brand-hover md:mb-1"
          >
            <a href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noopener noreferrer">
              <Instagram className="h-4 w-4" aria-hidden />
              Open Instagram
            </a>
          </Button>
        </div>
      </Reveal>

      <RevealStagger className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
        {tiles.map((tile, i) => (
          <RevealStaggerItem key={`${tile.image}-${i}`}>
            <a
              href={tile.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on Instagram"
              className={cn(
                "group relative block aspect-square overflow-hidden rounded-xl ring-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                isNight ? "ring-brand-light/10" : "ring-brand-dark/10",
              )}
            >
              <Image
                src={tile.image}
                alt={tile.alt}
                fill
                sizes="(max-width:640px) 50vw, (max-width:768px) 33vw, 25vw"
                className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                unoptimized={tile.unoptimized}
              />
              <div className="absolute inset-0 bg-brand-dark/0 transition-colors duration-300 group-hover:bg-brand-dark/45" />
              <Instagram
                className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-brand-light opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
            </a>
          </RevealStaggerItem>
        ))}
      </RevealStagger>
    </PageSection>
  );
}
