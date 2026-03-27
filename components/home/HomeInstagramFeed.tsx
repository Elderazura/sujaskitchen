"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal, RevealScale } from "@/components/motion/Reveal";
import { useTimeOfDay } from "@/components/home/time-of-day-context";
import { INSTAGRAM_HANDLE, INSTAGRAM_PROFILE_URL } from "@/lib/constants";

type IgPost = {
  id: string;
  image: string;
  permalink: string;
  caption?: string;
};

const FALLBACK_COUNT = 6;

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
  const list = hasFeed ? posts.slice(0, 12) : [];

  return (
    <section className={`px-6 py-20 md:px-16 ${rail}`}>
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p
                className={`font-sans text-xs font-semibold uppercase tracking-[0.2em] ${isNight ? "text-brand-gold" : "text-brand"}`}
              >
                From the feed
              </p>
              <h2 className={`mt-2 font-serif text-3xl md:text-4xl ${heading}`}>
                Instagram
              </h2>
              <p className={`mt-2 max-w-xl font-sans text-sm md:text-base ${muted}`}>
                {hasFeed
                  ? "Fresh plates, behind the pass, and the calendar as it happens."
                  : "Follow the kitchen for daily drops. With Instagram API credentials configured, recent posts appear here automatically."}
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="w-full bg-brand text-brand-light hover:bg-brand-hover md:w-auto"
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
                className={`h-64 w-52 shrink-0 rounded-2xl ${
                  isNight ? "bg-brand-mid/25" : "bg-brand-mid/15"
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 -mx-2 md:-mx-4">
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-4 pt-1 md:gap-5 md:px-4">
              {hasFeed
                ? list.map((post, i) => (
                    <RevealScale key={post.id} delay={0.04 * (i % 6)}>
                      <a
                        href={post.permalink}
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
                              src={post.image}
                              alt=""
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="256px"
                              unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          </div>
                          {post.caption ? (
                            <p
                              className={`line-clamp-2 px-3 py-2 font-sans text-xs ${muted}`}
                            >
                              {post.caption}
                            </p>
                          ) : null}
                        </Card>
                      </a>
                    </RevealScale>
                  ))
                : Array.from({ length: FALLBACK_COUNT }).map((_, i) => (
                    <RevealScale key={`ph-${i}`} delay={0.04 * i}>
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
                  ))}
            </div>
          </div>
        )}

        {!reduce && hasFeed ? (
          <p className={`mt-2 text-center font-sans text-xs ${muted}`}>
            Scroll sideways for more
          </p>
        ) : null}
      </div>
    </section>
  );
}
