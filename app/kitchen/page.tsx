import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageCrossLinks } from "@/components/shared/PageCrossLinks";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Kerala meals delivered in Dubai and Abu Dhabi",
  description:
    "Cloud kitchen in Al Quoz. Fresh daily menu, delivery across Dubai and Abu Dhabi. Order on Talabat, Noon, or contact us.",
};

const platforms = [
  { name: "Talabat", href: "https://www.talabat.com" },
  { name: "Noon", href: "https://www.noon.com" },
];

const zones = [
  "Al Quoz",
  "Business Bay",
  "Dubai Silicon Oasis",
  "Abu Dhabi select areas",
];

export default function KitchenPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF0] font-sans text-stone-900">
      <Navigation />
      <main className="flex-1">
        <section className="relative min-h-[min(100svh,52rem)] overflow-hidden md:min-h-[56vh]">
          <Image
            src="/images/Sujas-Kitchen-scaled.jpg"
            alt="Suja's Kitchen cloud kitchen spread"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/30" />
          <div className="relative z-10 mx-auto flex min-h-[min(100svh,52rem)] max-w-4xl flex-col justify-end px-4 py-14 sm:px-6 md:min-h-[56vh] md:py-20">
            <p className="font-sans text-xs uppercase tracking-widest text-white/80 sm:text-sm">
              Cloud kitchen
            </p>
            <h1 className="mt-3 font-serif text-[clamp(1.75rem,5vw,3.75rem)] leading-tight text-white">
              Cooked today. Packed today. On your table tonight.
            </h1>
            <p className="mt-4 max-w-2xl font-sans text-sm text-white/85 sm:text-base md:text-lg">
              No batch cooking for tomorrow. No reheating from yesterday. The
              same small-batch approach we have used since 1999.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                size="lg"
                className="min-h-12 bg-white text-stone-900 hover:bg-stone-100"
                asChild
              >
                <Link href="/kitchen/menu">Browse the full menu</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="min-h-12 border-white/60 bg-transparent text-white hover:bg-white/10"
                asChild
              >
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </section>

        <Reveal>
          <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
            <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">
              Star dishes
            </h2>
            <p className="mt-2 max-w-2xl font-sans text-sm text-stone-600">
              These three rarely leave the top of the list.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {[
                {
                  title: "Kappa and fish curry",
                  src: "/images/FISH-CURRY-bnr-1.jpg",
                  alt: "Kerala fish curry with tapioca",
                },
                {
                  title: "Appam and beef roast",
                  src: "/images/Appam-Beef-Curry-Combo_1-1.jpg",
                  alt: "Appam with beef roast",
                },
                {
                  title: "Onam sadhya box",
                  src: "/images/Sujas-Kitch-Onam-17.jpg",
                  alt: "Onam sadhya spread on banana leaf",
                },
              ].map((d) => (
                <Card key={d.title} className="overflow-hidden border-stone-200">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={d.src}
                      alt={d.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="font-serif text-lg text-stone-900">{d.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.06}>
          <section className="border-y border-stone-200 bg-white px-4 py-14 sm:px-6 md:px-8">
            <div className="mx-auto max-w-6xl">
              <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">
                Al Quoz, built for volume without turning into a factory
              </h2>
              <p className="mt-4 max-w-3xl font-sans text-sm leading-relaxed text-stone-600 md:text-base">
                Five thousand square feet lets us run separate lines for rice
                meals, breads, and snacks. Jacob runs the pass. Suja still signs
                off on new dishes and changes to old ones. If you need twenty
                lunch boxes or two hundred, the rule is the same: cook it the
                day you eat it.
              </p>
              <ul className="mt-8 grid gap-3 font-sans text-sm text-stone-700 sm:grid-cols-2">
                {[
                  "Dubai Municipality accredited facility",
                  "ISO-aligned food safety practices",
                  "Separate production rhythm for catering trays",
                ].map((line) => (
                  <li
                    key={line}
                    className="flex items-center gap-2 rounded-lg border border-stone-200 bg-[#FFFBF0] px-4 py-3"
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-full bg-brand"
                      aria-hidden
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.08}>
          <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg lg:aspect-square">
                <Image
                  src="/images/Sujas-Kitchen-1-scaled.jpg"
                  alt="Plated Kerala dishes from Suja's Kitchen"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">
                  One kitchen, four menus
                </h2>
                <p className="mt-4 font-sans text-sm leading-relaxed text-stone-600 md:text-base">
                  Kerala stays the spine. North Indian, Continental, and Arabic
                  lines sit beside it for offices and families who want variety
                  without ordering from five different places.
                </p>
                <Button
                  className="mt-6 min-h-12 bg-brand text-white hover:bg-brand-hover"
                  asChild
                >
                  <Link href="/kitchen/menu">Download and browse PDF menus</Link>
                </Button>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.05}>
          <section className="border-y border-stone-200 bg-white px-4 py-14 sm:px-6 md:px-8">
            <div className="mx-auto max-w-6xl">
              <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">
                Where to order
              </h2>
              <p className="mt-2 font-sans text-sm text-stone-600">
                We route delivery through the platforms below. No checkout on
                this site.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {platforms.map((p) => (
                  <Button
                    key={p.name}
                    className="min-h-12 bg-brand text-white hover:bg-brand-hover"
                    asChild
                  >
                    <a href={p.href} target="_blank" rel="noreferrer">
                      Order on {p.name}
                    </a>
                  </Button>
                ))}
                <Button variant="outline" className="min-h-12 border-brand/30" asChild>
                  <Link href="/contact">Bulk or custom orders</Link>
                </Button>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.06}>
          <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
            <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">
              Delivery zones
            </h2>
            <ul className="mt-6 grid gap-2 font-sans text-stone-700 sm:grid-cols-2">
              {zones.map((z) => (
                <li
                  key={z}
                  className="rounded-lg border border-stone-200 bg-white px-4 py-3"
                >
                  {z}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <PageCrossLinks
          omit={["/kitchen"]}
          banner={{
            image: "/images/sujas-banquet.webp",
            alt: "Catering spread for a large gathering",
            title: "Feeding a hall, not just a table",
            subtitle:
              "Weddings, corporate lines, church halls, and Onam for the whole office. Catering sits next to the cloud kitchen, not instead of it.",
            href: "/catering",
            cta: "Plan an event",
            tone: "dark",
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
