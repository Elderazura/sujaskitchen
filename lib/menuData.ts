import type { TimeState } from "./timeState";

export type FeaturedItem = {
  name: string;
  note: string;
};

export const FEATURED_BY_TIME: Record<TimeState, FeaturedItem[]> = {
  morning: [
    { name: "Appam and stew", note: "Soft centre, crisp edge" },
    { name: "Puttu and kadala", note: "Steamed rice cylinders, black chickpea curry" },
    { name: "Idiyappam", note: "String hoppers with coconut" },
    { name: "Breakfast meal box", note: "Everything in one order" },
  ],
  afternoon: [
    { name: "Kerala rice meal", note: "Curries, thorans, pickle, papad" },
    { name: "Kappa and fish curry", note: "Tapioca, coastal-style curry" },
    { name: "Chicken curry", note: "Central Travancore style" },
    { name: "Full meal box", note: "For the office or home" },
  ],
  evening: [
    { name: "Snibbles snack packs", note: "Built for the 4pm moment" },
    { name: "Banana chips", note: "Thin, crisp, salted" },
    { name: "Unniyappam", note: "Jaggery rice fritters" },
    { name: "Chai pairing box", note: "Snacks that belong with tea" },
  ],
  night: [
    { name: "Malabar biriyani", note: "Layered rice and meat" },
    { name: "Mutton stew and appam", note: "Soft appam, rich stew" },
    { name: "Prawn curry", note: "Coconut and kokum" },
    { name: "Dinner combo box", note: "Curry, bread or rice, sides" },
  ],
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
