"use client";

import { Reveal } from "@/components/motion/Reveal";
import { PageCrossLinks } from "@/components/shared/PageCrossLinks";
import { Card, CardContent } from "@/components/ui/card";

export function SeasonalPageExtras({
  heroSrc,
  heroAlt,
  festivalName,
}: {
  heroSrc: string;
  heroAlt: string;
  festivalName: string;
}) {
  return (
    <>
      <Reveal>
        <section className="border-t border-stone-200 bg-white px-6 py-14 md:px-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-2xl text-stone-900 md:text-3xl">
              How orders work
            </h2>
            <p className="mt-3 max-w-2xl font-sans text-sm text-stone-600 md:text-base">
              Festival food needs time. We confirm headcount, date, and delivery or pickup by
              email, then lock the kitchen schedule.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  t: "Tell us the date",
                  b: "Guest count, location, and whether you need trays or boxes.",
                },
                {
                  t: "We send the sheet",
                  b: "Menu lock, price per head or per box, and payment steps.",
                },
                {
                  t: "We cook in waves",
                  b: "Small batches so nothing sits. Pickup from Al Quoz or arranged drops.",
                },
              ].map((x) => (
                <Card key={x.t} className="border-stone-200">
                  <CardContent className="p-5">
                    <p className="font-serif text-lg text-stone-900">{x.t}</p>
                    <p className="mt-2 font-sans text-sm text-stone-600">{x.b}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <PageCrossLinks
        omit={["/seasonal"]}
        banner={{
          image: heroSrc,
          alt: heroAlt,
          title: `After ${festivalName}, the daily menu keeps going`,
          subtitle:
            "Same kitchen. Same spices from Wayanad and Idukki. Order lunch boxes, family trays, or catering for the next gathering.",
          href: "/kitchen/menu",
          cta: "Browse the menu",
          tone: "dark",
        }}
      />
    </>
  );
}
