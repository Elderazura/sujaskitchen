import type { SeasonalFestivalSlug } from "@/lib/seasonalCalendar";

export type FestivalGalleryItem = { src: string; alt: string };

export type SeasonalFestivalContent = {
  slug: SeasonalFestivalSlug;
  /** Default title when not using a variant (e.g. Eid al-Fitr) */
  name: string;
  metaTitle: string;
  metaDescription: string;
  heroSrc: string;
  heroAlt: string;
  tagline: string;
  description: string;
  communityBlurb: string;
  offerTitle: string;
  offerLines: string[];
  menuHighlights: string[];
  pricingNote: string;
  orderNote: string;
  deadlineNote: string;
  /** Shown above the notify form */
  notifyHeading: string;
  notifyBody: string;
  gallery: FestivalGalleryItem[];
};

export const SEASONAL_FESTIVAL_CONTENT: Record<
  SeasonalFestivalSlug,
  SeasonalFestivalContent
> = {
  onam: {
    slug: "onam",
    name: "Onam",
    metaTitle: "Onam Sadhya Dubai",
    metaDescription:
      "Order Onam sadhya and corporate sadhya catering in Dubai. Twenty-five dishes, banana leaf service, advance booking.",
    heroSrc: "/images/Sujas-Kitch-Onam-17.jpg",
    heroAlt: "Onam sadhya with Kerala dishes on banana leaf",
    tagline: "The full spread. Parippu to payasam.",
    description:
      "For homes, offices, and community halls. Sadhya the way Suja has cooked it for decades.",
    communityBlurb:
      "Onam is the week the Malayali calendar leans toward home. We cook the sadhya the way Suja has for twenty-five years: small batches, fresh coconut, spices from the same farms we have used since Sharjah.",
    offerTitle: "What we offer",
    offerLines: [
      "Twenty-five dishes and more: parippu, sambar, avial, erissery, olan, pachadi, inji puli, thoran, pickle, pappadam, chips, and payasam.",
      "Corporate sadhya for offices, alumni groups, and resident associations.",
      "Per-person sadhya and family boxes with a clear deadline for each wave.",
    ],
    menuHighlights: [
      "Full vegetarian sadhya on banana leaf",
      "Corporate and bulk trays",
      "Payasam and add-on snacks",
    ],
    pricingNote:
      "Indicative range: AED 47–49 per person for the full sadhya, subject to final menu and delivery distance.",
    orderNote:
      "We confirm every order by email with date, headcount, and delivery or pickup window.",
    deadlineNote:
      "Sadhyas need advance notice. We close each wave when the kitchen hits safe capacity.",
    notifyHeading: "Get notified when sadhya ordering goes live",
    notifyBody:
      "Leave your email and we will message you as soon as the next Onam order window opens. No spam, just dates and cut-offs.",
    gallery: [
      {
        src: "/images/Sujas-Kitch-Onam-17.jpg",
        alt: "Onam sadhya spread with Kerala dishes on banana leaf",
      },
      {
        src: "/images/Sujas-Kitch-Onam-08.jpg",
        alt: "Previous Onam service at Suja's Kitchen",
      },
      {
        src: "/images/Sujas-Onam-1.jpeg",
        alt: "Festive Kerala feast spread",
      },
    ],
  },
  vishu: {
    slug: "vishu",
    name: "Vishu",
    metaTitle: "Vishu specials",
    metaDescription:
      "Vishu sadhya and seasonal favourites from Suja's Kitchen in Dubai.",
    heroSrc: "/images/Sujas-Onam-1.jpeg",
    heroAlt: "Kerala festive meal spread",
    tagline: "A new year on the Malayali calendar.",
    description:
      "Fruit, gold, and a careful sadhya. We handle the food so you can handle the moment.",
    communityBlurb:
      "Vishu morning is light through a window and a table that has to look right before anyone eats. We handle the food so you can handle the moment.",
    offerTitle: "What we offer",
    offerLines: [
      "Compact sadhya boxes for families.",
      "Add-on sweets and snacks for visitors through the day.",
      "Limited corporate drops for teams who mark the day together.",
    ],
    menuHighlights: [
      "Vishu sadhya boxes",
      "Sweets and snacks for guests",
      "Morning delivery slots",
    ],
    pricingNote: "Boxes are priced per person with a minimum order for delivery.",
    orderNote: "Include delivery area and preferred morning slot in your order.",
    deadlineNote: "Slots close forty-eight hours before Vishu morning.",
    notifyHeading: "Get notified before Vishu ordering opens",
    notifyBody:
      "We will email you when Vishu boxes and slots are published for the year.",
    gallery: [
      {
        src: "/images/Sujas-Onam-1.jpeg",
        alt: "Kerala festive meal spread",
      },
      {
        src: "/images/Sujas-Kitch-Onam-17.jpg",
        alt: "Sadhya-style spread",
      },
      {
        src: "/images/Sujas-Kitchen-1-scaled.jpg",
        alt: "Suja's Kitchen festive table",
      },
    ],
  },
  easter: {
    slug: "easter",
    name: "Easter",
    metaTitle: "Easter specials",
    metaDescription:
      "Easter week specials from Suja's Kitchen — roasts, sides, and trays for home or church.",
    heroSrc: "/images/Sujas-Kitchen-1-scaled.jpg",
    heroAlt: "Festive Kerala spread on a table",
    tagline: "Roasts, sides, and trays for Holy Week.",
    description:
      "A quieter rhythm than Christmas, but the kitchen runs just as tight. Orders move in waves.",
    communityBlurb:
      "Easter is a quieter rhythm than Christmas, but the kitchen runs just as tight. We take orders in waves so nothing sits.",
    offerTitle: "What we offer",
    offerLines: [
      "Family roast trays with sides rooted in Kerala and the Gulf table.",
      "Vegetable-forward boxes for shared meals after service.",
      "Church hall drops when the calendar allows.",
    ],
    menuHighlights: [
      "Roast trays and sides",
      "Vegetable-forward boxes",
      "Church and hall catering",
    ],
    pricingNote:
      "Pricing is confirmed per tray or per head once the menu lock is published each year.",
    orderNote:
      "Include date, approximate headcount, and any dietary notes in your order.",
    deadlineNote: "We publish cut-off dates two weeks before Holy Week.",
    notifyHeading: "Get notified when Easter ordering opens",
    notifyBody:
      "We will email you when the Easter menu and cut-offs are live for the year.",
    gallery: [
      {
        src: "/images/Sujas-Kitchen-1-scaled.jpg",
        alt: "Festive Kerala spread",
      },
      {
        src: "/images/sujas-kitchen-christmas-lunch.jpg",
        alt: "Holiday lunch spread",
      },
      {
        src: "/images/Sujas-Catering-9-1-scaled.jpg",
        alt: "Catering trays for a gathering",
      },
    ],
  },
  christmas: {
    slug: "christmas",
    name: "Christmas",
    metaTitle: "Kerala Christmas food Dubai",
    metaDescription:
      "Christmas cake, beef roast, appam, and full holiday boxes from Suja's Kitchen. Church events and home feasts.",
    heroSrc: "/images/sujas-kitchen-christmas-lunch.jpg",
    heroAlt: "Christmas lunch spread with Kerala dishes",
    tagline: "Cake that sells out. Roasts that feel like home.",
    description:
      "Boxes for the table after midnight mass. Church halls and home feasts.",
    communityBlurb:
      "Christmas here is loud kitchens, shared cake, and long tables. We bake, roast, and stew in batches small enough that quality stays honest through the rush.",
    offerTitle: "What we offer",
    offerLines: [
      "Christmas cake by the loaf and by the gift box. When it is gone, it is gone.",
      "Full meal boxes: beef roast, appam, duck or chicken curries, sides, and dessert.",
      "Church events, choir nights, and parish halls. Trays sized for crowds.",
    ],
    menuHighlights: [
      "Christmas cake and gift boxes",
      "Full holiday meal boxes",
      "Church and parish trays",
    ],
    pricingNote:
      "Cake and boxes are priced per weight or per box. We send a clear sheet with your confirmation.",
    orderNote:
      "Include headcount, date, and whether you need delivery or pickup from Al Quoz.",
    deadlineNote: "Peak days fill fast. Earlier confirmation keeps your slot safe.",
    notifyHeading: "Get notified when Christmas ordering opens",
    notifyBody:
      "Be first to know when cake and holiday boxes go on sale for the season.",
    gallery: [
      {
        src: "/images/sujas-kitchen-christmas-lunch.jpg",
        alt: "Christmas lunch spread with Kerala dishes",
      },
      {
        src: "/images/Sujas-Kitchen-1-scaled.jpg",
        alt: "Festive table at Suja's Kitchen",
      },
      {
        src: "/images/Sujas-Catering-11-scaled.jpg",
        alt: "Catering spread for a celebration",
      },
    ],
  },
  eid: {
    slug: "eid",
    name: "Eid",
    metaTitle: "Eid feast trays Dubai",
    metaDescription:
      "Feast trays and bulk orders for Eid gatherings from Suja's Kitchen in Dubai.",
    heroSrc: "/images/Sujas-Catering-9-1-scaled.jpg",
    heroAlt: "Catering spread for a celebration",
    tagline: "Feast trays for family tables and hall gatherings.",
    description:
      "Biryani lines, sides, and sweets scaled for home Iftar tables and community halls.",
    communityBlurb:
      "Eid is shared plates and long queues done right. We cook in batches that respect the clock so food reaches your table while it should.",
    offerTitle: "What we offer",
    offerLines: [
      "Family trays and bulk lines sized for Eid day and the days around it.",
      "Vegetarian and meat routes planned with clear cut-off times.",
      "Hall drops when the schedule allows, confirmed in advance.",
    ],
    menuHighlights: [
      "Biryani and rice trays",
      "Sides, gravies, and sweets",
      "Bulk and hall orders",
    ],
    pricingNote:
      "Pricing follows the published menu for that Eid. We confirm totals before the kitchen locks.",
    orderNote:
      "Include pickup or delivery, approximate headcount, and preferred day in your order.",
    deadlineNote:
      "Eid windows are short. Cut-offs are strict so the line stays safe.",
    notifyHeading: "Get notified when Eid ordering goes live",
    notifyBody:
      "We will email you as soon as the next Eid menu and order window is published.",
    gallery: [
      {
        src: "/images/Sujas-Catering-9-1-scaled.jpg",
        alt: "Catering spread for Eid and celebrations",
      },
      {
        src: "/images/Sujas-Catering-11-scaled.jpg",
        alt: "Trays and bulk service",
      },
      {
        src: "/images/Sujas-Kitchen-scaled.jpg",
        alt: "Suja's Kitchen catering",
      },
    ],
  },
};

export function getFestivalContent(
  slug: SeasonalFestivalSlug,
  variantLabel?: string,
): SeasonalFestivalContent & { displayName: string } {
  const base = SEASONAL_FESTIVAL_CONTENT[slug];
  const displayName =
    slug === "eid" && variantLabel ? variantLabel : base.name;
  return { ...base, displayName };
}
