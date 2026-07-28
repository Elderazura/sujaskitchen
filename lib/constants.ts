export const SITE = {
  name: "Suja's Kitchen",
  url: "https://sujaskitchen.com",
} as const;

/** Public profile for home feed fallback and CTAs (update if your handle differs). */
export const INSTAGRAM_HANDLE = "sujaskitchen";
export const INSTAGRAM_PROFILE_URL =
  `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

export const CONTACT = {
  addressLine1: "Al Quoz, S1 Warehouse",
  poBox: "P.O. 234121",
  city: "Dubai",
  country: "UAE",
  email: "info@sujaskitchen.com",
} as const;

export const CONTACT_MAILTO = `mailto:${CONTACT.email}`;
