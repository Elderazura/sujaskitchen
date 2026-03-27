/** Google Business Profile API uses ONE..FIVE; some payloads may use digits. */
export function normalizeGoogleStarRating(raw: string | undefined): number {
  if (!raw) return 5;
  const key = String(raw).toUpperCase().trim();
  const words: Record<string, number> = {
    STAR_RATING_UNSPECIFIED: 0,
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };
  if (key in words) {
    const n = words[key as keyof typeof words];
    return n >= 1 && n <= 5 ? n : 5;
  }
  const parsed = parseInt(key, 10);
  return Number.isFinite(parsed)
    ? Math.min(5, Math.max(1, parsed))
    : 5;
}

export type ReviewPickable = { rating: number; text: string };

export function pickBestGoogleReviews<T extends ReviewPickable>(
  reviews: T[],
  opts?: { minStars?: number; minTextLength?: number; limit?: number }
): T[] {
  const minStars = opts?.minStars ?? 4;
  const minTextLength = opts?.minTextLength ?? 28;
  const limit = opts?.limit ?? 6;

  const filtered = reviews.filter(
    (r) =>
      r.rating >= minStars &&
      typeof r.text === "string" &&
      r.text.trim().length >= minTextLength
  );
  return [...filtered]
    .sort(
      (a, b) =>
        b.rating - a.rating || b.text.trim().length - a.text.trim().length
    )
    .slice(0, limit);
}
