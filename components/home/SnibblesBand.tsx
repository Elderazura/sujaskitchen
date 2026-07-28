"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/shared/PageShell";
import { Reveal, RevealX } from "@/components/motion/Reveal";

export default function SnibblesBand() {
  return (
    <section className="grain overflow-hidden bg-brand-dark text-brand-light">
      <PageShell className="section-y">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="text-eyebrow text-brand-gold">A brand from the kitchen</p>
            <h2 className="text-section mt-3 text-4xl text-brand-light md:text-5xl">
              Snibbles
            </h2>
            <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-brand-light/75">
              Kerala snacks for chaya time and every moment after. Banana chips,
              mixture, kappa — the crisp things worth keeping a jar of.
            </p>

            <Link
              href="/snibbles"
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-gold px-7 font-sans text-base font-semibold text-brand-dark transition-colors duration-200 hover:bg-brand-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              Meet Snibbles
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>

          <RevealX from="right">
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl ring-1 ring-brand-light/10">
              <Image
                src="/images/snibbles-mockup-scaled.jpg"
                alt="Snibbles snack packs by Suja's Kitchen"
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </RevealX>
        </div>
      </PageShell>
    </section>
  );
}
