import type { Metadata } from "next";
import SeasonalPageTemplate from "@/components/seasonal/SeasonalPageTemplate";

export const metadata: Metadata = {
  title: "Easter specials",
  description:
    "Easter week specials from Suja's Kitchen — roasts, sides, and trays for home or church.",
};

export default function EasterPage() {
  return (
    <SeasonalPageTemplate
      title="Easter week"
      description="Roasts, sides, and trays for the week leading up to Easter Sunday."
      heroSrc="/images/Sujas-Kitchen-1-scaled.jpg"
      heroAlt="Festive Kerala spread on a table"
      communityBlurb="Easter is a quieter rhythm than Christmas, but the kitchen runs just as tight. We take orders in waves so nothing sits."
      offerTitle="What we offer"
      offerLines={[
        "Family roast trays with sides rooted in Kerala and the Gulf table.",
        "Vegetable-forward boxes for shared meals after service.",
        "Church hall drops when the calendar allows.",
      ]}
      pricingNote="Pricing is confirmed per tray or per head once the menu lock is published each year."
      orderNote="Message on WhatsApp with date, approximate headcount, and any dietary notes."
      deadlineNote="We publish cut-off dates two weeks before Holy Week."
    />
  );
}
