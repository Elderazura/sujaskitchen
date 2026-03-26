"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TimeHero from "@/components/home/TimeHero";
import HomeBelowFold from "@/components/home/HomeBelowFold";
import { TimeOfDayProvider } from "@/components/home/time-of-day-context";

export default function HomePageClient() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Navigation />
      <TimeOfDayProvider>
        <main className="flex-1">
          <TimeHero />
          <HomeBelowFold />
        </main>
      </TimeOfDayProvider>
      <Footer />
    </div>
  );
}
