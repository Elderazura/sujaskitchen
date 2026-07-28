"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal, RevealScale } from "@/components/motion/Reveal";
import { PageSection } from "@/components/shared/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useTimeOfDay } from "@/components/home/time-of-day-context";
import { INSTAGRAM_HANDLE, INSTAGRAM_PROFILE_URL } from "@/lib/constants";
import { HOME_FEED_PORTRAIT_VIDEOS } from "@/lib/homeFeedVideos";

type IgPost = {
  id: string;
  image: string;
  permalink: string;
  caption?: string;
};

type ScrollItem =
  | { kind: "video"; id: string; src: string }
  | {
      kind: "ig";
      id: string;
      image: string;
      permalink: string;
      caption?: string;
    };

const FALLBACK_PLACEHOLDER_COUNT = 2;
const MAX_IG_IN_RAIL = 10;

export default function HomeInstagramFeed() {
  const { isNight } = useTimeOfDay();
  const reduce = useReducedMotion();
  const [posts, setPosts] = useState<IgPost[]>([]);
  const [loading, setLoading] = useState(true);

  const heading = isNight ? "text-brand-light" : "text-brand-dark";
  const muted = isNight ? "text-brand-light/70" : "text-brand-mid";
  const rail = isNight ? "bg-brand-dark/40" : "bg-brand-light/50";

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/instagram");
        const data = await res.json();
        if (cancelled) return;
        if (Array.isArray(data.posts) && data.posts.length > 0) {
          setPosts(data.posts as IgPost[]);
        } else {
          setPosts([]);
        }
      } catch {
        if (!cancelled) setPosts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const hasFeed = posts.length > 0;
  const videoItems: ScrollItem[] = HOME_FEED_PORTRAIT_VIDEOS.map((v) => ({
    kind: "video" as const,
    id: v.id,
    src: v.src,
  }));
  const igItems: ScrollItem[] = (hasFeed ? posts : [])
    .slice(0, MAX_IG_IN_RAIL)
    .map((p) => ({
      kind: "ig" as const,
      id: p.id,
      image: p.image,
      permalink: p.permalink,
      caption: p.caption,
    }));
  const scrollItems: ScrollItem[] = [...videoItems, ...igItems];

  return (
    <PageSection className={rail}>
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="From the feed"
              title="Instagram"
              description={
                hasFeed
                  ? "Reels from the kitchen, then fresh posts from the feed."
                  : "Portrait clips from the pass, plus more on Instagram when the API is connected."
              }
              eyebrowClassName={isNight ? "text-brand-gold" : "text-brand"}
              titleClassName={heading}
              descriptionClassName={muted}
            />
            <Button
              asChild
              size="lg"
              className="shrink-0 bg-brand text-brand-light hover:bg-brand-hover md:mb-1"
            >
              <a href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                Open Instagram
              </a>
            </Button>
          </div>
        </Reveal>

        {loading ? (
          <div className="mt-12 flex gap-4 overflow-hidden pb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className={`h-[22rem] w-52 shrink-0 rounded-2xl ${
                  isNight ? "bg-brand-mid/25" : "bg-brand-mid/15"
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pt-1 md:gap-5">
              {scrollItems.map((item, i) =>
                item.kind === "video" ? (
                  <RevealScale key={item.id} delay={0.04 * (i % 6)}>
                    <a
                      href={INSTAGRAM_PROFILE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block w-[min(78vw,14rem)] shrink-0 snap-center sm:w-52 md:w-56"
                    >
                      <Card
                        className={`overflow-hidden border-2 transition-all duration-300 group-hover:border-brand group-hover:shadow-lg ${
                          isNight
                            ? "border-brand-mid/40 bg-brand-dark/80"
                            : "border-brand-mid/25 bg-white"
                        }`}
                      >
                        <div className="relative aspect-[9/16] w-full overflow-hidden bg-brand-dark/20">
                          <video
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                            muted
                            playsInline
                            loop
                            autoPlay={!reduce}
                            preload="metadata"
                            aria-label="Short clip from Suja's Kitchen"
                          >
                            <source src={item.src} type="video/webm" />
                          </video>
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-80" />
                          <span
                            className={`absolute bottom-3 left-3 font-sans text-xs font-medium text-brand-light`}
                          >
                            @{INSTAGRAM_HANDLE}
                          </span>
                        </div>
                        <p
                          className={`px-3 py-2 font-sans text-xs ${muted}`}
                        >
                          From the kitchen
                        </p>
                      </Card>
                    </a>
                  </RevealScale>
                ) : (
                  <RevealScale key={item.id} delay={0.04 * (i % 6)}>
                    <a
                      href={item.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block w-[min(85vw,16rem)] shrink-0 snap-center sm:w-60 md:w-64"
                    >
                      <Card
                        className={`overflow-hidden border-2 transition-all duration-300 group-hover:border-brand group-hover:shadow-lg ${
                          isNight
                            ? "border-brand-mid/40 bg-brand-dark/80"
                            : "border-brand-mid/25 bg-white"
                        }`}
                      >
                        <div className="relative aspect-square w-full overflow-hidden bg-brand-dark/10">
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="256px"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>
                        {item.caption ? (
                          <p
                            className={`line-clamp-2 px-3 py-2 font-sans text-xs ${muted}`}
                          >
                            {item.caption}
                          </p>
                        ) : null}
                      </Card>
                    </a>
                  </RevealScale>
                ),
              )}
              {!hasFeed
                ? Array.from({ length: FALLBACK_PLACEHOLDER_COUNT }).map(
                    (_, i) => (
                      <RevealScale
                        key={`ph-${i}`}
                        delay={0.04 * (scrollItems.length + i)}
                      >
                        <a
                          href={INSTAGRAM_PROFILE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-[min(85vw,16rem)] shrink-0 snap-center sm:w-60 md:w-64"
                        >
                          <Card
                            className={`flex aspect-square flex-col items-center justify-center border-2 border-dashed p-6 text-center transition-colors hover:border-brand ${
                              isNight
                                ? "border-brand-mid/50 bg-brand-dark/60"
                                : "border-brand-mid/35 bg-brand-light/30"
                            }`}
                          >
                            <span className={`font-serif text-lg ${heading}`}>
                              @{INSTAGRAM_HANDLE}
                            </span>
                            <span className={`mt-2 font-sans text-xs ${muted}`}>
                              Tap to follow
                            </span>
                          </Card>
                        </a>
                      </RevealScale>
                    ),
                  )
                : null}
            </div>
          </div>
        )}

        {!reduce && scrollItems.length > 1 ? (
          <p className={`mt-2 font-sans text-xs ${muted}`}>
            Scroll sideways for more
          </p>
        ) : null}
    </PageSection>
  );
}
