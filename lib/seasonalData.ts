export type SeasonalEvent = {
  slug: string;
  name: string;
  /** Approximate start (month 1-12, day) for display logic */
  month: number;
  day: number;
  endMonth?: number;
  endDay?: number;
  copy: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  cta: string;
};

export const SEASONAL_EVENTS: SeasonalEvent[] = [
  {
    slug: "onam",
    name: "Onam",
    month: 9,
    day: 1,
    endMonth: 9,
    endDay: 15,
    copy: "The full sadhya spread. Advance orders for home and office.",
    imageSrc: "/images/Sujas-Kitch-Onam-17.jpg",
    imageAlt: "Onam sadhya spread with Kerala dishes on banana leaf",
    href: "/seasonal/onam",
    cta: "View Onam",
  },
  {
    slug: "christmas",
    name: "Christmas",
    month: 12,
    day: 15,
    endMonth: 12,
    endDay: 26,
    copy: "Cake, roast, appam, and full boxes. Church events welcome.",
    imageSrc: "/images/sujas-kitchen-christmas-lunch.jpg",
    imageAlt: "Christmas lunch spread at Suja's Kitchen",
    href: "/seasonal/christmas",
    cta: "View Christmas",
  },
  {
    slug: "easter",
    name: "Easter",
    month: 4,
    day: 1,
    endMonth: 4,
    endDay: 25,
    copy: "Seasonal specials for Easter week.",
    imageSrc: "/images/Sujas-Kitchen-1-scaled.jpg",
    imageAlt: "Festive Kerala spread",
    href: "/seasonal/easter",
    cta: "View Easter",
  },
  {
    slug: "vishu",
    name: "Vishu",
    month: 4,
    day: 10,
    endMonth: 4,
    endDay: 16,
    copy: "Vishu sadhya and seasonal favourites.",
    imageSrc: "/images/Sujas-Onam-1.jpeg",
    imageAlt: "Kerala festive meal",
    href: "/seasonal/vishu",
    cta: "View Vishu",
  },
  {
    slug: "eid",
    name: "Eid",
    month: 4,
    day: 1,
    endMonth: 4,
    endDay: 14,
    copy: "Feast trays and bulk orders for gatherings.",
    imageSrc: "/images/Sujas-Catering-9-1-scaled.jpg",
    imageAlt: "Catering spread for a celebration",
    href: "/seasonal",
    cta: "Ask about Eid",
  },
];

function toDate(year: number, month: number, day: number) {
  return new Date(year, month - 1, day);
}

/** Days between two dates (absolute). */
function daysApart(a: Date, b: Date) {
  return Math.round(Math.abs(a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Events to show on the homepage seasonal strip: within 60 days of window, or closest past with note.
 */
export function getSeasonalDisplayEvents(now = new Date()) {
  const year = now.getFullYear();
  const windowDays = 60;

  const scored = SEASONAL_EVENTS.map((ev) => {
    const start = toDate(year, ev.month, ev.day);
    const end = ev.endMonth && ev.endDay
      ? toDate(year, ev.endMonth, ev.endDay)
      : start;
    const distStart = daysApart(now, start);
    const distEnd = daysApart(now, end);
    const inWindow =
      now >= new Date(start.getTime() - windowDays * 86400000) &&
      now <= new Date(end.getTime() + windowDays * 86400000);
    return { ev, start, end, distStart, distEnd, inWindow };
  });

  const active = scored.filter((s) => s.inWindow).map((s) => s.ev);
  if (active.length > 0) return { events: active, fallbackMessage: null as string | null };

  const past = scored
    .filter((s) => now > s.end)
    .sort((a, b) => b.end.getTime() - a.end.getTime())[0];
  const next = scored
    .filter((s) => now < s.start)
    .sort((a, b) => a.start.getTime() - b.start.getTime())[0];

  const msg = next
    ? `Stay tuned for ${next.ev.name} (${next.ev.name === "Onam" ? "September" : "the season ahead"})`
    : past
      ? `Stay tuned for the next seasonal menu`
      : null;

  return {
    events: past ? [past.ev] : [scored.sort((a, b) => a.distStart - b.distStart)[0].ev],
    fallbackMessage: msg,
  };
}
