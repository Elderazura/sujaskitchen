import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SEASONAL_EVENTS } from "@/lib/seasonalData";
import { Reveal } from "@/components/motion/Reveal";
import { PageCrossLinks } from "@/components/shared/PageCrossLinks";

export const metadata: Metadata = {
  title: "Seasonal offerings",
  description:
    "Onam, Christmas, Easter, Vishu, and Eid specials from Suja's Kitchen in Dubai.",
};

export default function SeasonalHubPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF0] font-sans">
      <Navigation />
      <main className="flex-1">
        <div className="px-6 py-14 md:px-16 md:py-20">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-serif text-4xl text-stone-900 md:text-5xl">
              Seasonal moments
            </h1>
            <p className="mt-4 font-sans text-stone-600 md:text-lg">
              Sadhyas, feast boxes, and catering windows open ahead of each
              festival. Pages stay live year-round with clear order deadlines.
            </p>
            <p className="mt-4 font-sans text-sm text-stone-600 md:text-base">
              Corporate sadhya lines, church halls, and home tables all run
              through the same kitchen. When a festival is not in market, the
              daily cloud kitchen menu still ships across Dubai and Abu Dhabi.
            </p>
          </div>
        </div>

        <Reveal>
          <div className="px-6 pb-8 md:px-16">
            <ul className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SEASONAL_EVENTS.map((ev) => (
                <li key={ev.slug}>
                  <Card className="h-full border-stone-200 shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="flex h-full flex-col p-6">
                      <h2 className="font-serif text-2xl text-stone-900">
                        {ev.name}
                      </h2>
                      <p className="mt-2 flex-1 font-sans text-sm text-stone-600">
                        {ev.copy}
                      </p>
                      <Button
                        className="mt-4 bg-brand hover:bg-brand-hover"
                        asChild
                      >
                        <Link href={ev.href}>{ev.cta}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <section className="mx-auto max-w-4xl px-6 py-12 md:px-16">
            <h2 className="font-serif text-2xl text-stone-900 md:text-3xl">
              Between festivals
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-stone-600 md:text-base">
              If your date is months away, you can still book catering for any
              gathering or order today&apos;s menu from the cloud kitchen. One
              team, one pass, one standard from Suja.
            </p>
          </section>
        </Reveal>

        <PageCrossLinks
          omit={["/seasonal"]}
          banner={{
            image: "/images/sujas-kitchen-christmas-lunch.jpg",
            alt: "Festive spread",
            title: "Calendars move. The kitchen does not wait.",
            subtitle:
              "Daily delivery, bulk WhatsApp orders, and full-service catering share the same line in Al Quoz.",
            href: "/kitchen",
            cta: "Cloud kitchen",
            tone: "dark",
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
