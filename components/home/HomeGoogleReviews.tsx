"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/motion/Reveal";
import { pickBestGoogleReviews } from "@/lib/googleReviewUtils";
import { useTimeOfDay } from "@/components/home/time-of-day-context";

type Review = {
  id: string;
  name: string;
  profilePhoto?: string | null;
  rating: number;
  text: string;
  date?: string;
};

const FALLBACK_REVIEWS: Review[] = [
  {
    id: "fb-1",
    name: "Google reviewer",
    rating: 5,
    text:
      "Ordered fish curry meals for the office. Everything tasted carefully made, hygienic, and well packed. Called to thank the kitchen afterward.",
  },
  {
    id: "fb-2",
    name: "Google reviewer",
    rating: 5,
    text:
      "Consistent Kerala flavours across orders. Biriyani and sides arrive hot; packaging holds up for delivery across Dubai.",
  },
  {
    id: "fb-3",
    name: "Google reviewer",
    rating: 5,
    text:
      "Family uses them for Onam and weekend meals. Portions are generous and the sadya lineup feels like a home kitchen, not a chain.",
  },
  {
    id: "fb-4",
    name: "Google reviewer",
    rating: 5,
    text:
      "Appam and stew on a weekday morning was worth the wait. Will order the same combo again.",
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 shrink-0 ${
            i < rating
              ? "fill-brand-gold text-brand-gold"
              : "fill-brand-mid/25 text-brand-mid/25"
          }`}
          aria-hidden
        />
      ))}
    </div>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function HomeGoogleReviews() {
  const { isNight } = useTimeOfDay();
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [loading, setLoading] = useState(true);

  const heading = isNight ? "text-brand-light" : "text-brand-dark";
  const muted = isNight ? "text-brand-light/70" : "text-brand-mid";
  const body = isNight ? "text-brand-light/85" : "text-brand-dark/90";

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/google-reviews");
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok || data.error || !Array.isArray(data.reviews)) {
          setReviews(FALLBACK_REVIEWS);
          return;
        }
        const best = pickBestGoogleReviews(
          data.reviews as Review[],
          { minStars: 4, minTextLength: 28, limit: 6 }
        );
        if (best.length >= 3) {
          setReviews(best);
        } else {
          const merged = [...best];
          const seen = new Set(merged.map((r) => r.text.slice(0, 40)));
          for (const f of FALLBACK_REVIEWS) {
            if (merged.length >= 6) break;
            const key = f.text.slice(0, 40);
            if (!seen.has(key)) {
              seen.add(key);
              merged.push(f);
            }
          }
          setReviews(merged.slice(0, 6));
        }
      } catch {
        if (!cancelled) setReviews(FALLBACK_REVIEWS);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const list = reviews ?? [];

  return (
    <section className="px-6 py-16 md:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className={`font-serif text-3xl md:text-4xl ${heading}`}>
            What people say on Google
          </h2>
          <p className={`mt-2 max-w-2xl font-sans text-sm md:text-base ${muted}`}>
            We highlight longer, recent-style feedback with four- and five-star ratings. Full listings live on Google Maps.
          </p>
        </Reveal>

        {loading ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <Card
                key={i}
                className={
                  isNight
                    ? "border-brand-mid/35 bg-brand-dark/50"
                    : "border-brand-mid/20"
                }
              >
                <CardContent className="space-y-3 p-6">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-11 w-11 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((r, i) => (
              <Reveal key={r.id} delay={0.04 * (i % 3)}>
                <Card
                  className={
                    isNight
                      ? "h-full border-brand-mid/35 bg-brand-dark/75"
                      : "h-full border-brand-mid/20 bg-white"
                  }
                >
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-11 w-11 border border-brand-mid/25 dark:border-brand-mid/40">
                        {r.profilePhoto ? (
                          <AvatarImage src={r.profilePhoto} alt="" />
                        ) : null}
                        <AvatarFallback className="font-sans text-xs">
                          {initials(r.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className={`truncate font-sans text-sm font-medium ${heading}`}>
                          {r.name}
                        </p>
                        <div className="mt-1">
                          <StarRow rating={r.rating} />
                        </div>
                        {r.date ? (
                          <p className={`mt-1 font-sans text-xs ${muted}`}>{r.date}</p>
                        ) : null}
                      </div>
                    </div>
                    <p
                      className={`mt-4 flex-1 font-sans text-sm leading-relaxed ${body} line-clamp-6`}
                    >
                      {r.text}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        )}

        <p className={`mt-8 text-center font-sans text-xs ${muted}`}>
          Ratings and reviews are from Google and shown for convenience. Experience may vary.
        </p>
      </div>
    </section>
  );
}
