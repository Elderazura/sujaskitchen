"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TimeHero from "@/components/home/TimeHero";
import HomeBelowFold from "@/components/home/HomeBelowFold";
import HomeScrollProgress from "@/components/home/HomeScrollProgress";
import StickyOrderBar from "@/components/home/StickyOrderBar";
import { TimeOfDayProvider } from "@/components/home/time-of-day-context";

export default function HomePageClient() {
  return (
    <div className="flex min-h-screen min-w-0 flex-col overflow-x-clip font-sans">
      <HomeScrollProgress />
      <Navigation />
      <TimeOfDayProvider>
        <main className="min-w-0 flex-1 overflow-x-clip">
          <TimeHero />
          <HomeBelowFold />
        </main>
        <StickyOrderBar />
      </TimeOfDayProvider>
      <Footer />
    </div>
  );
}
