import type { Metadata } from "next";
import HomeGate from "@/components/home/HomeGate";

export const metadata: Metadata = {
  title: "Kerala food delivery Dubai | Suja's Kitchen",
  description:
    "Kerala meals, snacks, and catering from our cloud kitchen in Dubai and Abu Dhabi. Central Travancore cooking since 1999.",
  openGraph: {
    title: "Kerala food delivery Dubai | Suja's Kitchen",
    description:
      "Kerala meals, snacks, and catering from our cloud kitchen in Dubai and Abu Dhabi.",
    url: "https://sujaskitchen.com",
    siteName: "Suja's Kitchen",
    locale: "en_AE",
    type: "website",
  },
};

export default function Home() {
  return <HomeGate />;
}
