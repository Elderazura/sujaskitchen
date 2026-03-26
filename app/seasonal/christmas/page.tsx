import type { Metadata } from "next";
import SeasonalPageTemplate from "@/components/seasonal/SeasonalPageTemplate";

export const metadata: Metadata = {
  title: "Kerala Christmas food Dubai",
  description:
    "Christmas cake, beef roast, appam, and full holiday boxes from Suja's Kitchen. Church events and home feasts.",
};

export default function ChristmasPage() {
  return (
    <SeasonalPageTemplate
      title="Christmas at Suja's Kitchen"
      description="Cake that sells out. Roasts that feel like home. Boxes for the table after midnight mass."
      heroSrc="/images/sujas-kitchen-christmas-lunch.jpg"
      heroAlt="Christmas lunch spread with Kerala dishes"
      communityBlurb="Christmas here is loud kitchens, shared cake, and long tables. We bake, roast, and stew in batches small enough that Jacob can still walk the pass and answer the phone."
      offerTitle="What we offer"
      offerLines={[
        "Christmas cake by the loaf and by the gift box. When it is gone, it is gone.",
        "Full meal boxes: beef roast, appam, duck or chicken curries, sides, and dessert.",
        "Church events, choir nights, and parish halls. Trays sized for crowds.",
      ]}
      pricingNote="Cake and boxes are priced per weight or per box. We send a clear sheet on WhatsApp."
      orderNote="WhatsApp with headcount, date, and whether you need delivery or pickup from Al Quoz."
      deadlineNote="Peak days fill fast. Earlier confirmation keeps your slot safe."
    />
  );
}
