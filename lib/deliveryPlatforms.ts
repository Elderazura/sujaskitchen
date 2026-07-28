/**
 * Delivery apps the kitchen takes orders on.
 * NOTE: `href` values are PLACEHOLDERS (platform homepages). Replace each with
 * Suja's Kitchen's real store URL on the platform when available.
 */
export type DeliveryPlatform = {
  name: string;
  href: string;
  /** true once a real store URL (not the homepage placeholder) is set */
  live: boolean;
  /** Local wordmark SVG in /public/images/delivery/ */
  logo?: string;
  /** Display width for the logo image (height scales via CSS) */
  logoWidth?: number;
};

export const DELIVERY_PLATFORMS: DeliveryPlatform[] = [
  {
    name: "Talabat",
    href: "https://www.talabat.com",
    live: false,
    logo: "/images/delivery/talabat.svg",
    logoWidth: 72,
  },
  {
    name: "Noon Food",
    href: "https://food.noon.com",
    live: false,
    logo: "/images/delivery/noon.svg",
    logoWidth: 52,
  },
  {
    name: "Careem",
    href: "https://www.careem.com/food",
    live: false,
    logo: "/images/delivery/careem.svg",
    logoWidth: 76,
  },
  {
    name: "Deliveroo",
    href: "https://deliveroo.ae",
    live: false,
    logo: "/images/delivery/deliveroo.svg",
    logoWidth: 96,
  },
];
