import type { Metadata } from "next";
import SeasonalPageTemplate from "@/components/seasonal/SeasonalPageTemplate";

export const metadata: Metadata = {
  title: "Onam Sadhya Dubai",
  description:
    "Order Onam sadhya and corporate sadhya catering in Dubai. Twenty-five dishes, banana leaf service, advance booking.",
};

export default function OnamPage() {
  return (
    <SeasonalPageTemplate
      title="Onam sadhya"
      description="The full spread. Parippu to payasam. For homes, offices, and community halls."
      heroSrc="/images/Sujas-Kitch-Onam-17.jpg"
      heroAlt="Onam sadhya with Kerala dishes on banana leaf"
      communityBlurb="Onam is the week the Malayali calendar leans toward home. We cook the sadhya the way Suja has for twenty-five years: small batches, fresh coconut, spices from the same farms we have used since Sharjah."
      offerTitle="What we offer"
      offerLines={[
        "Twenty-five dishes and more: parippu, sambar, avial, erissery, olan, pachadi, inji puli, thoran, pickle, pappadam, chips, and payasam.",
        "Corporate sadhya for offices, alumni groups, and resident associations.",
        "Per-person sadhya and family boxes with a clear deadline for each wave.",
      ]}
      pricingNote="Indicative range: AED 47–49 per person for the full sadhya, subject to final menu and delivery distance."
      orderNote="We confirm every order on WhatsApp with date, headcount, and delivery or pickup window."
      deadlineNote="Sadhyas need advance notice. We close each wave when the kitchen hits safe capacity."
    />
  );
}
