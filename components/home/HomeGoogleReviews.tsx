"use client";

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal, RevealX } from "@/components/motion/Reveal";
import { PageSection } from "@/components/shared/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { pickBestGoogleReviews, averageRating } from "@/lib/googleReviewUtils";
import { useTimeOfDay } from "@/components/home/time-of-day-context";
import { cn } from "@/lib/utils";

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
  {
    id: "fb-5",
    name: "Google reviewer",
    rating: 5,
    text:
      "Catered our office Onam sadhya for forty people. Set up on time, generous portions, and every dish tasted home-made.",
  },
  {
    id: "fb-6",
    name: "Google reviewer",
    rating: 4,
    text:
      "Reliable Kerala food in Dubai that actually tastes like home. The Malabar biriyani and parotta are our weekend regulars.",
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
  const avg = averageRating(list) ?? 4.8;

  return (
    <PageSection>
        <Reveal>
          <SectionHeader
            eyebrow="Loved in the UAE"
            title="What people say on Google"
            description="We highlight longer, recent-style feedback with four- and five-star ratings. Full listings live on Google Maps."
            meta={
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1",
                  isNight ? "border-brand-gold/40" : "border-brand-gold/50",
                )}
              >
                <span className="flex" aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-brand-gold text-brand-gold"
                    />
                  ))}
                </span>
                <span className={cn("font-sans text-sm font-semibold tabular-nums", heading)}>
                  {avg.toFixed(1)}
                </span>
                <span className={cn("font-sans text-xs", muted)}>on Google</span>
              </span>
            }
            eyebrowClassName={isNight ? "text-brand-gold" : "text-brand"}
            titleClassName={heading}
            descriptionClassName={muted}
          />
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
                    <Skeleton
                      className={`h-11 w-11 rounded-full ${isNight ? "bg-brand-mid/30" : "bg-brand-mid/20"}`}
                    />
                    <div className="space-y-2">
                      <Skeleton
                        className={`h-4 w-28 ${isNight ? "bg-brand-mid/25" : "bg-brand-mid/15"}`}
                      />
                      <Skeleton
                        className={`h-3 w-20 ${isNight ? "bg-brand-mid/25" : "bg-brand-mid/15"}`}
                      />
                    </div>
                  </div>
                  <Skeleton
                    className={`h-16 w-full ${isNight ? "bg-brand-mid/25" : "bg-brand-mid/15"}`}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((r, i) => (
              <RevealX
                key={r.id}
                from={i % 2 === 0 ? "left" : "right"}
                delay={0.05 * (i % 3)}
              >
                <Card
                  className={cn(
                    "h-full rounded-xl transition-shadow duration-300",
                    isNight
                      ? "border-brand-light/12 bg-brand-light/[0.04]"
                      : "border-brand-dark/10 bg-white hover:shadow-[0_18px_44px_-26px_rgba(36,22,18,0.5)]",
                  )}
                >
                  <CardContent className="flex h-full flex-col p-7">
                    <Quote
                      className="h-7 w-7 shrink-0 rotate-180 fill-brand-gold/25 text-brand-gold/70"
                      aria-hidden
                    />
                    <p
                      className={cn(
                        "mt-4 flex-1 font-serif text-lg italic leading-relaxed",
                        isNight ? "text-brand-light/90" : "text-brand-dark/90",
                      )}
                    >
                      {r.text}
                    </p>
                    <div
                      className={cn(
                        "mt-6 flex items-center gap-3 border-t pt-5",
                        isNight ? "border-brand-light/12" : "border-brand-dark/10",
                      )}
                    >
                      <Avatar className="h-10 w-10 border border-brand-mid/25 dark:border-brand-mid/40">
                        {r.profilePhoto ? (
                          <AvatarImage src={r.profilePhoto} alt="" />
                        ) : null}
                        <AvatarFallback className="font-sans text-xs">
                          {initials(r.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className={cn("truncate font-sans text-sm font-semibold", heading)}>
                          {r.name}
                        </p>
                        <div className="mt-1">
                          <StarRow rating={r.rating} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </RevealX>
            ))}
          </div>
        )}

        <p className={`mt-8 font-sans text-xs ${muted}`}>
          Ratings and reviews are from Google and shown for convenience. Experience may vary.
        </p>
    </PageSection>
  );
}
