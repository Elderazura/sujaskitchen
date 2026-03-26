import type { Metadata } from "next";
import SeasonalPageTemplate from "@/components/seasonal/SeasonalPageTemplate";

export const metadata: Metadata = {
  title: "Vishu specials",
  description:
    "Vishu sadhya and seasonal favourites from Suja's Kitchen in Dubai.",
};

export default function VishuPage() {
  return (
    <SeasonalPageTemplate
      title="Vishu"
      description="A new year on the Malayali calendar, marked with fruit, gold, and a careful sadhya."
      heroSrc="/images/Sujas-Onam-1.jpeg"
      heroAlt="Kerala festive meal spread"
      communityBlurb="Vishu morning is light through a window and a table that has to look right before anyone eats. We handle the food so you can handle the moment."
      offerTitle="What we offer"
      offerLines={[
        "Compact sadhya boxes for families.",
        "Add-on sweets and snacks for visitors through the day.",
        "Limited corporate drops for teams who mark the day together.",
      ]}
      pricingNote="Boxes are priced per person with a minimum order for delivery."
      orderNote="WhatsApp with delivery area and preferred morning slot."
      deadlineNote="Slots close forty-eight hours before Vishu morning."
    />
  );
}
