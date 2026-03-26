export type TimeState = "morning" | "afternoon" | "evening" | "night";

export function getTimeState(): TimeState {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 11) return "morning";
  if (hour >= 11 && hour < 15) return "afternoon";
  if (hour >= 15 && hour < 19) return "evening";
  return "night";
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

export const TIME_CONFIG: Record<TimeState, TimeConfig> = {
  morning: {
    headline: "Good morning. Sit down, it's ready.",
    subtext: "Appam. Puttu. Chai. The way your morning used to start.",
    heroSrc: "/images/Appam-Beef-Curry-Combo_1-1.jpg",
    heroAlt: "Breakfast spread with appam and curry at Suja's Kitchen",
    overlay: "rgba(245, 158, 11, 0.22)",
    pageBg: "#FFFBEB",
    textPrimary: "#1C1917",
    cta: "Order breakfast",
    ctaHref: "/kitchen/menu",
  },
  afternoon: {
    headline: "The rice is ready. Everything else followed.",
    subtext: "Kerala rice meal. The one you've been thinking about since Monday.",
    heroSrc: "/images/Sujas-Kitch-Onam-17.jpg",
    heroAlt: "Kerala rice meal and sadhya spread on banana leaf",
    overlay: "rgba(217, 119, 6, 0.2)",
    pageBg: "#FFFBF0",
    textPrimary: "#1C1917",
    cta: "Order lunch",
    ctaHref: "/kitchen/menu",
  },
  evening: {
    headline: "4 o'clock. You know what this means.",
    subtext:
      "Chai. Something crispy. The non-negotiable part of any Kerala evening.",
    heroSrc: "/images/Sujas-snacks.jpg",
    heroAlt: "Kerala tea-time snacks and treats",
    overlay: "rgba(180, 83, 9, 0.2)",
    pageBg: "#FFF8F0",
    textPrimary: "#1C1917",
    cta: "Order evening snacks",
    ctaHref: "/snibbles",
  },
  night: {
    headline: "Long day. Dinner is handled.",
    subtext: "Malabar biriyani. Mutton stew. Appam. Arriving at your door.",
    heroSrc: "/images/Sujas-kitchen-best-kerala-food-in-UAE.jpeg",
    heroAlt: "Evening Kerala meal, warm lighting",
    overlay: "rgba(28, 10, 0, 0.38)",
    pageBg: "#1C1410",
    textPrimary: "#FEF3C7",
    cta: "Order dinner",
    ctaHref: "/kitchen/menu",
  },
};
