import type { SeasonalFestivalSlug } from "@/lib/seasonalCalendar";
import { SEASONAL_FESTIVAL_CONTENT } from "@/lib/seasonalFestivalContent";

export type SeasonalEvent = {
  slug: SeasonalFestivalSlug;
  name: string;
  copy: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  cta: string;
};

const SLUG_ORDER: SeasonalFestivalSlug[] = [
  "onam",
  "christmas",
  "easter",
  "vishu",
  "eid",
];

const CARD_COPY: Record<SeasonalFestivalSlug, string> = {
  onam: "The full sadhya spread. Advance orders for home and office.",
  christmas: "Cake, roast, appam, and full boxes. Church events welcome.",
  easter: "Seasonal specials for Easter week.",
  vishu: "Vishu sadhya and seasonal favourites.",
  eid: "Feast trays and bulk orders for gatherings.",
};

/** One card per festival for optional hub grids and cross-links. */
export const SEASONAL_EVENTS: SeasonalEvent[] = SLUG_ORDER.map((slug) => {
  const c = SEASONAL_FESTIVAL_CONTENT[slug];
  return {
    slug,
    name: c.name,
    copy: CARD_COPY[slug],
    imageSrc: c.heroSrc,
    imageAlt: c.heroAlt,
    href: `/seasonal?view=${slug}`,
    cta: "View seasonal page",
  };
});

export { getSeasonalDisplayEvents } from "@/lib/seasonalCalendar";
