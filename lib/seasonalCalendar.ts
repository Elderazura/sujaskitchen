import { addDays } from "date-fns";

/** Gregorian festival anchors use Dubai noon to avoid UTC boundary shifts. */
export function dubaiNoon(year: number, month: number, day: number): Date {
  const m = String(month).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return new Date(`${year}-${m}-${d}T12:00:00+04:00`);
}

/** Western Easter Sunday (Gregorian), anonymous Gregorian algorithm. */
export function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return dubaiNoon(year, month, day);
}

/**
 * Gregorian dates for Eid (Dubai). Update yearly when official dates are known.
 * When a year is missing, Eid instances for that year are skipped.
 */
export const KNOWN_EID_DATES: Record<
  number,
  { fitr: string; adha: string }
> = {
  2025: { fitr: "2025-03-30", adha: "2025-06-06" },
  2026: { fitr: "2026-03-20", adha: "2026-05-27" },
  2027: { fitr: "2027-03-09", adha: "2027-05-17" },
  2028: { fitr: "2028-02-27", adha: "2028-05-06" },
};

function parseIsoToDubai(iso: string): Date {
  const [y, mo, da] = iso.split("-").map(Number);
  return dubaiNoon(y, mo, da);
}

export type SeasonalFestivalSlug = "onam" | "vishu" | "easter" | "christmas" | "eid";

export type SeasonalInstance = {
  slug: SeasonalFestivalSlug;
  variantLabel: string;
  year: number;
  visibilityStart: Date;
  visibilityEnd: Date;
  notifyStart: Date;
  orderStart: Date;
  orderEnd: Date;
  eventStart: Date;
  eventEnd: Date;
};

const SLUG_PRIORITY: SeasonalFestivalSlug[] = [
  "onam",
  "eid",
  "christmas",
  "easter",
  "vishu",
];

function priorityIndex(slug: SeasonalFestivalSlug): number {
  const i = SLUG_PRIORITY.indexOf(slug);
  return i === -1 ? 99 : i;
}

function makeOnam(y: number): SeasonalInstance {
  return {
    slug: "onam",
    variantLabel: "Onam",
    year: y,
    visibilityStart: dubaiNoon(y, 7, 1),
    visibilityEnd: dubaiNoon(y, 9, 20),
    notifyStart: dubaiNoon(y, 7, 1),
    orderStart: dubaiNoon(y, 8, 20),
    orderEnd: dubaiNoon(y, 9, 14),
    eventStart: dubaiNoon(y, 9, 1),
    eventEnd: dubaiNoon(y, 9, 15),
  };
}

function makeVishu(y: number): SeasonalInstance {
  return {
    slug: "vishu",
    variantLabel: "Vishu",
    year: y,
    visibilityStart: dubaiNoon(y, 3, 1),
    visibilityEnd: dubaiNoon(y, 4, 20),
    notifyStart: dubaiNoon(y, 3, 1),
    orderStart: dubaiNoon(y, 4, 1),
    orderEnd: dubaiNoon(y, 4, 16),
    eventStart: dubaiNoon(y, 4, 14),
    eventEnd: dubaiNoon(y, 4, 16),
  };
}

function makeChristmas(y: number): SeasonalInstance {
  return {
    slug: "christmas",
    variantLabel: "Christmas",
    year: y,
    visibilityStart: dubaiNoon(y, 11, 1),
    visibilityEnd: dubaiNoon(y, 12, 31),
    notifyStart: dubaiNoon(y, 11, 1),
    orderStart: dubaiNoon(y, 12, 1),
    orderEnd: dubaiNoon(y, 12, 26),
    eventStart: dubaiNoon(y, 12, 24),
    eventEnd: dubaiNoon(y, 12, 26),
  };
}

function makeEaster(y: number): SeasonalInstance {
  const es = easterSunday(y);
  return {
    slug: "easter",
    variantLabel: "Easter",
    year: y,
    visibilityStart: addDays(es, -45),
    visibilityEnd: addDays(es, 3),
    notifyStart: addDays(es, -45),
    orderStart: addDays(es, -21),
    orderEnd: es,
    eventStart: addDays(es, -3),
    eventEnd: addDays(es, 1),
  };
}

function makeEidFitr(y: number, iso: string): SeasonalInstance {
  const peak = parseIsoToDubai(iso);
  return {
    slug: "eid",
    variantLabel: "Eid al-Fitr",
    year: y,
    visibilityStart: addDays(peak, -28),
    visibilityEnd: addDays(peak, 3),
    notifyStart: addDays(peak, -28),
    orderStart: addDays(peak, -10),
    orderEnd: peak,
    eventStart: peak,
    eventEnd: addDays(peak, 1),
  };
}

function makeEidAdha(y: number, iso: string): SeasonalInstance {
  const peak = parseIsoToDubai(iso);
  return {
    slug: "eid",
    variantLabel: "Eid al-Adha",
    year: y,
    visibilityStart: addDays(peak, -28),
    visibilityEnd: addDays(peak, 3),
    notifyStart: addDays(peak, -28),
    orderStart: addDays(peak, -10),
    orderEnd: peak,
    eventStart: peak,
    eventEnd: addDays(peak, 1),
  };
}

function instancesForYear(y: number): SeasonalInstance[] {
  const list: SeasonalInstance[] = [
    makeOnam(y),
    makeVishu(y),
    makeChristmas(y),
    makeEaster(y),
  ];
  const eid = KNOWN_EID_DATES[y];
  if (eid) {
    list.push(makeEidFitr(y, eid.fitr), makeEidAdha(y, eid.adha));
  }
  return list;
}

function allInstancesAround(now: Date): SeasonalInstance[] {
  const y = now.getFullYear();
  return [...instancesForYear(y), ...instancesForYear(y + 1)].sort(
    (a, b) => a.eventStart.getTime() - b.eventStart.getTime(),
  );
}

const VALID_SLUGS = new Set<string>([
  "onam",
  "vishu",
  "easter",
  "christmas",
  "eid",
]);

export function parseSeasonalViewParam(
  raw: string | string[] | undefined | null,
): SeasonalFestivalSlug | null {
  if (raw == null) return null;
  const s = Array.isArray(raw) ? raw[0] : raw;
  if (!s || typeof s !== "string") return null;
  const v = s.toLowerCase().trim();
  return VALID_SLUGS.has(v) ? (v as SeasonalFestivalSlug) : null;
}

export type SeasonalPageMode = "ordering" | "notify" | "closed" | "preview";

export type SeasonalResolvedState = {
  instance: SeasonalInstance;
  mode: SeasonalPageMode;
  /** Before visibility window; we still promote this as the next focus */
  isEarly: boolean;
  canOrder: boolean;
  canNotify: boolean;
};

function isOrderingOpen(now: Date, i: SeasonalInstance): boolean {
  return now >= i.orderStart && now <= i.orderEnd;
}

function isNotifyOpen(now: Date, i: SeasonalInstance): boolean {
  return now < i.orderStart && now >= i.notifyStart;
}

function chooseAmongActive(
  now: Date,
  candidates: SeasonalInstance[],
): SeasonalInstance {
  const sorted = [...candidates].sort((a, b) => {
    const ao = isOrderingOpen(now, a) ? 1 : 0;
    const bo = isOrderingOpen(now, b) ? 1 : 0;
    if (ao !== bo) return bo - ao;
    const ap = priorityIndex(a.slug);
    const bp = priorityIndex(b.slug);
    if (ap !== bp) return ap - bp;
    return a.eventStart.getTime() - b.eventStart.getTime();
  });
  return sorted[0];
}

/**
 * Resolves which festival the /seasonal experience should focus on and what UI to show.
 */
export function resolveSeasonalState(
  now: Date,
  viewOverride: SeasonalFestivalSlug | null,
): SeasonalResolvedState {
  const pool = allInstancesAround(now);

  if (viewOverride) {
    const slugMatches = pool.filter((i) => i.slug === viewOverride);
    const inVis = slugMatches.filter(
      (i) => now >= i.visibilityStart && now <= i.visibilityEnd,
    );
    let inst: SeasonalInstance | undefined;
    if (inVis.length) {
      inst = chooseAmongActive(now, inVis);
    } else {
      const nextUp = slugMatches
        .filter((i) => i.visibilityStart > now)
        .sort(
          (a, b) => a.visibilityStart.getTime() - b.visibilityStart.getTime(),
        )[0];
      const lastEnded = slugMatches
        .filter((i) => now > i.visibilityEnd)
        .sort(
          (a, b) => b.visibilityEnd.getTime() - a.visibilityEnd.getTime(),
        )[0];
      inst = nextUp ?? lastEnded ?? slugMatches[0];
    }
    if (inst) {
      return buildResolved(now, inst);
    }
  }

  const inVisibility = pool.filter(
    (i) => now >= i.visibilityStart && now <= i.visibilityEnd,
  );

  let chosen: SeasonalInstance;
  if (inVisibility.length) {
    chosen = chooseAmongActive(now, inVisibility);
  } else {
    const upcoming = pool
      .filter((i) => i.visibilityStart > now)
      .sort(
        (a, b) => a.visibilityStart.getTime() - b.visibilityStart.getTime(),
      );
    chosen = upcoming[0] ?? pool[0];
  }

  return buildResolved(now, chosen);
}

function buildResolved(now: Date, instance: SeasonalInstance): SeasonalResolvedState {
  const isEarly = now < instance.visibilityStart;
  const canOrder = isOrderingOpen(now, instance);
  const inVisibility =
    now >= instance.visibilityStart && now <= instance.visibilityEnd;
  const pastOrderWindow = now > instance.orderEnd;

  let canNotify = false;
  if (!canOrder && now < instance.orderStart) {
    if (isEarly) canNotify = true;
    else if (now >= instance.notifyStart) canNotify = true;
  }

  let mode: SeasonalPageMode;
  if (canOrder) {
    mode = "ordering";
  } else if (pastOrderWindow && inVisibility) {
    mode = "closed";
    canNotify = false;
  } else if (canNotify) {
    mode = "notify";
  } else {
    mode = "preview";
  }

  return {
    instance,
    mode,
    isEarly,
    canOrder,
    canNotify,
  };
}

/** Homepage strip: events near their window (unchanged shape for SeasonalHeartbeat). */
export function getSeasonalDisplayEvents(now = new Date()) {
  const pool = allInstancesAround(now);
  const windowDays = 60;
  const ms = windowDays * 86400000;

  type Scored = {
    slug: SeasonalFestivalSlug;
    name: string;
    copy: string;
    imageSrc: string;
    imageAlt: string;
    href: string;
    cta: string;
    start: Date;
    end: Date;
    inWindow: boolean;
  };

  const fromContent = (
    i: SeasonalInstance,
  ): Omit<Scored, "inWindow" | "start" | "end"> => {
    const href = `/seasonal?view=${i.slug}`;
    const copyMap: Record<SeasonalFestivalSlug, string> = {
      onam: "The full sadhya spread. Advance orders for home and office.",
      christmas: "Cake, roast, appam, and full boxes. Church events welcome.",
      easter: "Seasonal specials for Easter week.",
      vishu: "Vishu sadhya and seasonal favourites.",
      eid: "Feast trays and bulk orders for gatherings.",
    };
    const ctaMap: Record<SeasonalFestivalSlug, string> = {
      onam: "View seasonal page",
      christmas: "View seasonal page",
      easter: "View seasonal page",
      vishu: "View seasonal page",
      eid: "View seasonal page",
    };
    const img: Record<SeasonalFestivalSlug, { src: string; alt: string }> = {
      onam: {
        src: "/images/Sujas-Kitch-Onam-17.jpg",
        alt: "Onam sadhya spread with Kerala dishes on banana leaf",
      },
      christmas: {
        src: "/images/sujas-kitchen-christmas-lunch.jpg",
        alt: "Christmas lunch spread at Suja's Kitchen",
      },
      easter: {
        src: "/images/Sujas-Kitchen-1-scaled.jpg",
        alt: "Festive Kerala spread",
      },
      vishu: {
        src: "/images/Sujas-Onam-1.jpeg",
        alt: "Kerala festive meal",
      },
      eid: {
        src: "/images/Sujas-Catering-9-1-scaled.jpg",
        alt: "Catering spread for a celebration",
      },
    };
    return {
      slug: i.slug,
      name: i.variantLabel,
      copy: copyMap[i.slug],
      imageSrc: img[i.slug].src,
      imageAlt: img[i.slug].alt,
      href,
      cta: ctaMap[i.slug],
    };
  };

  const uniqueBySlug = new Map<SeasonalFestivalSlug, SeasonalInstance>();
  for (const i of pool) {
    if (!uniqueBySlug.has(i.slug)) uniqueBySlug.set(i.slug, i);
  }

  const scored: Scored[] = [];
  for (const i of uniqueBySlug.values()) {
    const start = i.visibilityStart;
    const end = i.visibilityEnd;
    const inWindow =
      now >= new Date(start.getTime() - ms) && now <= new Date(end.getTime() + ms);
    scored.push({
      ...fromContent(i),
      start,
      end,
      inWindow,
    });
  }

  const active = scored.filter((s) => s.inWindow);
  if (active.length > 0) {
    return {
      events: active.map(({ inWindow: _a, start: _s, end: _e, ...ev }) => ev),
      fallbackMessage: null as string | null,
    };
  }

  const past = scored
    .filter((s) => now > s.end)
    .sort((a, b) => b.end.getTime() - a.end.getTime())[0];
  const next = scored
    .filter((s) => now < s.start)
    .sort((a, b) => a.start.getTime() - b.start.getTime())[0];

  const msg = next
    ? `Next seasonal focus: ${next.name}. Open the seasonal page for dates and ordering.`
    : past
      ? "Stay tuned for the next seasonal menu."
      : null;

  const fallback = past ?? scored.sort((a, b) => a.start.getTime() - b.start.getTime())[0];

  return {
    events: [
      (() => {
        const { inWindow, start, end, ...ev } = fallback;
        return ev;
      })(),
    ],
    fallbackMessage: msg,
  };
}
