"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageSection } from "@/components/shared/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal, RevealX } from "@/components/motion/Reveal";
import { useTimeOfDay } from "@/components/home/time-of-day-context";
import { cn } from "@/lib/utils";

type Panel = {
  href: string;
  kicker: string;
  title: string;
  body: string;
  cta: string;
  image: string;
  alt: string;
  from: "left" | "right";
};

const PANELS: Panel[] = [
  {
    href: "/kitchen/menu",
    kicker: "Every day",
    title: "The cloud kitchen",
    body: "Breakfast through dinner, meal boxes, and festival specials — cooked the same day in Al Quoz and delivered across Dubai and Abu Dhabi.",
    cta: "See today's menu",
    image: "/images/Ghee-Rice-scaled.jpg",
    alt: "Kerala ghee rice meal with sides from Suja's Kitchen",
    from: "left",
  },
  {
    href: "/catering",
    kicker: "By the hundred",
    title: "Catering & feasts",
    body: "Weddings, corporate spreads, Onam sadhya, and community events — full portions and service for up to two thousand guests.",
    cta: "Plan an event",
    image: "/images/sujas-banquet.webp",
    alt: "Suja's Kitchen catering banquet spread",
    from: "right",
  },
];

export default function HomeEatGather() {
  const { isNight } = useTimeOfDay();
  const heading = isNight ? "text-brand-light" : "text-brand-dark";

  return (
    <PageSection>
      <Reveal>
        <SectionHeader
          eyebrow="Eat or gather"
          title="Daily Kerala meals, or a feast for hundreds."
          eyebrowClassName={isNight ? "text-brand-gold" : "text-brand"}
          titleClassName={heading}
          className="max-w-3xl"
        />
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
        {PANELS.map((panel) => (
          <RevealX key={panel.href} from={panel.from}>
            <Link
              href={panel.href}
              className="group relative block overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] md:aspect-[4/5]">
                <Image
                  src={panel.image}
                  alt={panel.alt}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
                />
                {/* Editorial scrim — copy sits bottom-left, food stays legible above */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(to top, rgba(22,12,8,0.9) 0%, rgba(22,12,8,0.62) 32%, rgba(22,12,8,0.18) 62%, rgba(22,12,8,0.06) 100%)",
                  }}
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="text-eyebrow text-brand-gold">{panel.kicker}</p>
                  <h3 className="text-section mt-2 text-2xl text-brand-light md:text-3xl">
                    {panel.title}
                  </h3>
                  <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-brand-light/85 md:text-base">
                    {panel.body}
                  </p>
                  <span
                    className={cn(
                      "mt-5 inline-flex items-center gap-2 font-sans text-sm font-semibold text-brand-light",
                    )}
                  >
                    {panel.cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </RevealX>
        ))}
      </div>
    </PageSection>
  );
}
