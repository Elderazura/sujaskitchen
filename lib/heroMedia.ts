/**
 * Home hero imagery under /public/hero (per time period).
 * Paths must match filesystem (encode spaces as %20 in URLs).
 */
export const HERO_SLIDES = {
  breakfast: [
    {
      src: "/hero/breakfast/breakfast1.png",
      alt: "Kerala breakfast spread at Suja's Kitchen",
    },
    {
      src: "/hero/breakfast/breakfast2.png",
      alt: "Morning dishes and appam at Suja's Kitchen",
    },
    {
      src: "/hero/breakfast/breakfast3.png",
      alt: "Breakfast plates from Suja's Kitchen",
    },
  ],
  lunch: [
    {
      src: "/hero/Lunch/lunch1.png",
      alt: "Kerala lunch and rice meal at Suja's Kitchen",
    },
    {
      src: "/hero/Lunch/lunch2.png",
      alt: "Curries and sides for lunch",
    },
    {
      src: "/hero/Lunch/lunch3.png",
      alt: "Midday spread from the cloud kitchen",
    },
  ],
  chaya: [
    {
      src: "/hero/Chaya/chaya1.png",
      alt: "Chaya time snacks from Kerala",
    },
    {
      src: "/hero/Chaya/chaya2.png",
      alt: "Tea-time treats and crisps",
    },
    {
      src: "/hero/Chaya/chaya3.png",
      alt: "Kerala snacks for the afternoon",
    },
  ],
  dinner: [
    {
      src: "/hero/Dinner/dinner1.png",
      alt: "Evening Kerala dinner at Suja's Kitchen",
    },
    {
      src: "/hero/Dinner/dinner2.png",
      alt: "Dinner plates and warm curries",
    },
    {
      src: "/hero/Dinner/dinner%202.png",
      alt: "Night menu favourites from the kitchen",
    },
  ],
  closed: [
    {
      src: "/hero/Dinner/dinner1.png",
      alt: "Suja's Kitchen evening service",
    },
    {
      src: "/images/Sujas-Kitchen-scaled.jpg",
      alt: "Suja's Kitchen cloud kitchen",
    },
    {
      src: "/hero/breakfast/breakfast1.png",
      alt: "Breakfast opens at seven",
    },
  ],
} as const;

export type TimeState = keyof typeof HERO_SLIDES;

/** Multiple headline + subtext pairs per period (rotate in the hero). */
export const HERO_CAPTION_ROTATIONS: Record<
  TimeState,
  { headline: string; subtext: string }[]
> = {
  breakfast: [
    {
      headline: "Good morning. Sit down, it's ready.",
      subtext:
        "Appam. Puttu. Chaya. The way a Kerala breakfast is supposed to feel.",
    },
    {
      headline: "Seven to eleven. The kitchen belongs to breakfast.",
      subtext:
        "Soft appam, crisp edges, and curries that woke up when you did.",
    },
    {
      headline: "Same spices. Same coconut. New morning.",
      subtext:
        "Central Travancore habits, packed for Dubai and Abu Dhabi tables.",
    },
  ],
  lunch: [
    {
      headline: "The rice is ready. Everything else followed.",
      subtext:
        "Kerala rice meal, curries, and sides. The lunch you have been thinking about since morning.",
    },
    {
      headline: "Eleven to three. Full plates, full flavour.",
      subtext:
        "Meal boxes for the office, thorans and pickle for the table at home.",
    },
    {
      headline: "No shortcuts between stove and box.",
      subtext:
        "Wayanad pepper, Idukki cardamom, and the same standard Suja set in 1999.",
    },
  ],
  chaya: [
    {
      headline: "Chaya time. Kerala snacks on the table.",
      subtext:
        "Something hot to drink. Something crisp from the jar. Three to seven, done right.",
    },
    {
      headline: "The stretch between lunch and dinner has a name here.",
      subtext:
        "Snibbles, chips, mixtures, and the sweets that belong with tea.",
    },
    {
      headline: "Afternoon is not an afterthought.",
      subtext:
        "Orders built for the four o'clock moment and the guests who drop by after.",
    },
  ],
  dinner: [
    {
      headline: "Long day. Dinner is handled.",
      subtext:
        "Malabar biriyani. Mutton stew. Appam. Cooked today and sent to your door.",
    },
    {
      headline: "Seven to midnight. The kitchen stays serious.",
      subtext:
        "Layered biriyani, coastal curries, and combos that do not need a second order.",
    },
    {
      headline: "End the day the way Kerala ends it.",
      subtext:
        "Warm bread, slow stews, and rice that still tastes of the morning's coconut.",
    },
  ],
  closed: [
    {
      headline: "The kitchen is closed right now.",
      subtext:
        "We open again at 7:00 in the morning for breakfast. Contact us to plan your next order.",
    },
    {
      headline: "Rest, recharge, prep for tomorrow.",
      subtext:
        "Browse the menu or send us an email. We pick it up when the stoves go on.",
    },
    {
      headline: "Al Quoz will be back at seven.",
      subtext:
        "Breakfast through dinner, same recipes. See you when the doors open.",
    },
  ],
};

/** Brand story lines (below-fold rotating copy). */
export const HOME_STORY_ROTATIONS: { line: string }[] = [
  {
    line: "Central Travancore cooking with Wayanad spices and fresh coconut in every batch.",
  },
  {
    line: "Twenty-five years from a home kitchen to a cloud kitchen. The standard never moved.",
  },
  {
    line: "Suja still signs off on recipes, portions, and what leaves the pass.",
  },
  {
    line: "Dubai and Abu Dhabi delivery. The pot is still stirred the Kerala way.",
  },
];

/** Short lines above featured grid (rotates). */
export const FEATURED_INTRO_ROTATIONS: Record<
  Exclude<TimeState, "closed">,
  string[]
> = {
  breakfast: [
    "Start the day the way you remember.",
    "Fresh this morning. Not reheated from yesterday.",
    "Appam, puttu, idiyappam, and the curries that match them.",
  ],
  lunch: [
    "Rice meals and boxes that survive the ride.",
    "Midday is when the full spread shines.",
    "Fish, chicken, thorans, and pickle in one order.",
  ],
  chaya: [
    "Built for chaya and the four o'clock table.",
    "Snibbles, chips, and sweets that pair with tea.",
    "Order for the office break or the guests at home.",
  ],
  dinner: [
    "Biriyani, stew, appam, and coastal curries after dark.",
    "End the day with something slow-cooked.",
    "Combos and full plates, packed for delivery tonight.",
  ],
};
