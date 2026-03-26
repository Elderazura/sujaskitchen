export const SITE = {
  name: "Suja's Kitchen",
  url: "https://sujaskitchen.com",
} as const;

export const CONTACT = {
  addressLine1: "Al Quoz, S1 Warehouse",
  poBox: "P.O. 234121",
  city: "Dubai",
  country: "UAE",
  email: "info@sujaskitchen.com",
  phoneDisplay: "+971 50 123 4567",
  phoneTel: "+971501234567",
} as const;

export const WHATSAPP_ORDER_URL =
  "https://wa.me/971501234567?text=" +
  encodeURIComponent("Hi, I would like to order from Suja's Kitchen");
