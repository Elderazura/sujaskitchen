import { HERO_SLIDES, type TimeState } from "@/lib/heroMedia";

export type { TimeState } from "@/lib/heroMedia";

/**
 * Dubai-local wall clock via the client device. Align `getTimeState` with TZ if you need strict Dubai time.
 */
export function getTimeState(): TimeState {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 7) return "closed";
  if (hour >= 7 && hour < 11) return "breakfast";
  if (hour >= 11 && hour < 15) return "lunch";
  if (hour >= 15 && hour < 19) return "chaya";
  return "dinner";
}

export type TimeConfig = {
  headline: string;
  subtext: string;
  heroSrc: string;
  heroAlt: string;
  overlay: string;
  pageBg: string;
  textPrimary: string;
  cta: string;
  ctaHref: string;
};

/** One-line labels for UI (e.g. hours strip). */
export const TIME_SCHEDULE_COPY: Record<
  Exclude<TimeState, "closed">,
  { label: string; range: string }
> = {
  breakfast: { label: "Breakfast", range: "7:00 AM to 11:00 AM" },
  lunch: { label: "Lunch", range: "11:00 AM to 3:00 PM" },
  chaya: { label: "Chaya and Kerala snacks", range: "3:00 PM to 7:00 PM" },
  dinner: { label: "Dinner", range: "7:00 PM to midnight" },
};

export const TIME_CONFIG: Record<TimeState, TimeConfig> = {
  breakfast: {
    headline: "Good morning. Sit down, it's ready.",
    subtext:
      "Appam. Puttu. Chaya. The way a Kerala breakfast is supposed to feel.",
    heroSrc: HERO_SLIDES.breakfast[0].src,
    heroAlt: HERO_SLIDES.breakfast[0].alt,
    overlay: "rgba(28, 15, 10, 0.20)",
    pageBg: "#f7f0e2",
    textPrimary: "#241612",
    cta: "Order breakfast",
    ctaHref: "/kitchen/menu",
  },
  lunch: {
    headline: "The rice is ready. Everything else followed.",
    subtext:
      "Kerala rice meal, curries, and sides. The lunch you have been thinking about since morning.",
    heroSrc: HERO_SLIDES.lunch[0].src,
    heroAlt: HERO_SLIDES.lunch[0].alt,
    overlay: "rgba(28, 15, 10, 0.24)",
    pageBg: "#f5ecdc",
    textPrimary: "#241612",
    cta: "Order lunch",
    ctaHref: "/kitchen/menu",
  },
  chaya: {
    headline: "Chaya time. Kerala snacks on the table.",
    subtext:
      "Something hot to drink. Something crisp from the jar. The three-to-seven stretch, done right.",
    heroSrc: HERO_SLIDES.chaya[0].src,
    heroAlt: HERO_SLIDES.chaya[0].alt,
    overlay: "rgba(28, 15, 10, 0.22)",
    pageBg: "#f3e8d4",
    textPrimary: "#241612",
    cta: "Order snacks",
    ctaHref: "/snibbles",
  },
  dinner: {
    headline: "Long day. Dinner is handled.",
    subtext:
      "Malabar biriyani. Mutton stew. Appam. Cooked today and sent to your door.",
    heroSrc: HERO_SLIDES.dinner[0].src,
    heroAlt: HERO_SLIDES.dinner[0].alt,
    overlay: "rgba(20, 11, 8, 0.5)",
    pageBg: "#211410",
    textPrimary: "#f7efe1",
    cta: "Order dinner",
    ctaHref: "/kitchen/menu",
  },
  closed: {
    headline: "The kitchen is closed right now.",
    subtext:
      "We open again at 7:00 in the morning for breakfast. Browse the menu for when we are back, or contact us to plan your next order.",
    heroSrc: HERO_SLIDES.closed[0].src,
    heroAlt: HERO_SLIDES.closed[0].alt,
    overlay: "rgba(18, 10, 7, 0.58)",
    pageBg: "#1b100c",
    textPrimary: "#f7efe1",
    cta: "Contact us",
    ctaHref: "/contact",
  },
};
