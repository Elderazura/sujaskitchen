import type { TimeState } from "./timeState";

export type FeaturedItem = {
  name: string;
  note: string;
};

export const FEATURED_BY_TIME: Record<TimeState, FeaturedItem[]> = {
  breakfast: [
    { name: "Appam and stew", note: "Soft centre, crisp edge" },
    { name: "Puttu and kadala", note: "Steamed rice cylinders, black chickpea curry" },
    { name: "Idiyappam", note: "String hoppers with coconut" },
    { name: "Breakfast meal box", note: "Everything in one order" },
  ],
  lunch: [
    { name: "Kerala rice meal", note: "Curries, thorans, pickle, papad" },
    { name: "Kappa and fish curry", note: "Tapioca, coastal-style curry" },
    { name: "Chicken curry", note: "Central Travancore style" },
    { name: "Full meal box", note: "For the office or home" },
  ],
  chaya: [
    { name: "Snibbles snack packs", note: "Built for chaya time" },
    { name: "Banana chips", note: "Thin, crisp, salted" },
    { name: "Unniyappam", note: "Jaggery rice fritters" },
    { name: "Mixture and chai", note: "Kerala tea-time pairings" },
  ],
  dinner: [
    { name: "Malabar biriyani", note: "Layered rice and meat" },
    { name: "Mutton stew and appam", note: "Soft appam, rich stew" },
    { name: "Prawn curry", note: "Coconut and kokum" },
    { name: "Dinner combo box", note: "Curry, bread or rice, sides" },
  ],
  /** Not shown in grid; FeaturedItems uses dedicated closed UI. */
  closed: [],
};

export type MenuCategory =
  | "breakfast"
  | "lunch"
  | "dinner"
  | "snacks"
  | "desserts"
  | "meal_boxes";

export const MENU_CATEGORIES: { id: MenuCategory; label: string }[] = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "snacks", label: "Snacks" },
  { id: "desserts", label: "Desserts" },
  { id: "meal_boxes", label: "Meal boxes" },
];

export type MenuShowcaseItem = {
  name: string;
  description: string;
  imageSrc: string;
  categoryLabel: string;
};

/** Static highlights for the home page menu section (links to full menu). */
export const HOME_MENU_SHOWCASE: MenuShowcaseItem[] = [
  {
    name: "Appam and beef curry",
    description: "Soft centre, crisp lace edge, with a slow-cooked Travancore-style curry.",
    imageSrc: "/images/Appam-Beef-Curry-Combo_1-1.jpg",
    categoryLabel: "Breakfast and dinner",
  },
  {
    name: "Parotta and beef curry",
    description: "Layered flatbread with the same curry families order on repeat.",
    imageSrc: "/images/Parotta-Beef-Curry-Combo-scaled.jpg",
    categoryLabel: "Lunch and dinner",
  },
  {
    name: "Ghee rice meal",
    description: "Fragrant rice with sides, thorans, and pickle in the full-meal tradition.",
    imageSrc: "/images/Ghee-Rice-scaled.jpg",
    categoryLabel: "Lunch",
  },
  {
    name: "Coastal fish curry",
    description: "Coconut, kokum, and fresh spice balance in a Kerala coastal classic.",
    imageSrc: "/images/FISH-CURRY-bnr-1.jpg",
    categoryLabel: "Lunch and dinner",
  },
  {
    name: "Onam and seasonal feasts",
    description: "Sadya and festival menus when the calendar calls for a full spread.",
    imageSrc: "/images/Sujas-Kitch-Onam-17.jpg",
    categoryLabel: "Seasonal",
  },
  {
    name: "Snibbles and tea-time",
    description: "Chips, mixtures, and sweets made for the four o'clock table.",
    imageSrc: "/images/Sujas-snacks.jpg",
    categoryLabel: "Snacks",
  },
];
