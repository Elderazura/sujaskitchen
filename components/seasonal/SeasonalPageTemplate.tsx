import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTAButton from "@/components/shared/CTAButton";
import { SeasonalPageExtras } from "@/components/seasonal/SeasonalPageExtras";

type Props = {
  title: string;
  description: string;
  heroSrc: string;
  heroAlt: string;
  communityBlurb: string;
  offerTitle: string;
  offerLines: string[];
  pricingNote: string;
  orderNote: string;
  deadlineNote: string;
};

export default function SeasonalPageTemplate({
  title,
  description,
  heroSrc,
  heroAlt,
  communityBlurb,
  offerTitle,
  offerLines,
  pricingNote,
  orderNote,
  deadlineNote,
}: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF0] text-stone-900">
      <Navigation />
      <main className="flex-1">
        <section className="relative min-h-[45vh] overflow-hidden md:min-h-[50vh]">
          <Image
            src={heroSrc}
            alt={heroAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />
          <div className="relative z-10 mx-auto flex min-h-[45vh] max-w-4xl flex-col justify-end px-6 py-14 md:min-h-[50vh]">
            <h1 className="text-display text-[clamp(1.75rem,5vw,3.75rem)] text-white">
              {title}
            </h1>
            <p className="text-body-editorial mt-3 max-w-2xl text-white/85 md:text-lg">
              {description}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-14 md:px-16">
          <h2 className="text-section text-2xl text-stone-900">For the community</h2>
          <p className="text-body-editorial mt-3 text-stone-700">
            {communityBlurb}
          </p>

          <h2 className="text-section mt-12 text-2xl text-stone-900">{offerTitle}</h2>
          <ul className="text-body-editorial mt-4 list-disc space-y-2 pl-5 text-stone-700">
            {offerLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <div className="mt-10 rounded-xl border border-stone-200 bg-white p-6">
            <p className="text-body-editorial text-sm text-stone-800">{pricingNote}</p>
            <p className="text-body-editorial mt-3 text-sm text-stone-800">{orderNote}</p>
            <p className="text-body-editorial mt-3 text-sm font-medium text-brand">
              {deadlineNote}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CTAButton href="/contact">Contact us to order</CTAButton>
              <CTAButton href="/catering" variant="outline">
                Catering enquiry
              </CTAButton>
            </div>
          </div>
        </section>

        <SeasonalPageExtras
          heroSrc={heroSrc}
          heroAlt={heroAlt}
          festivalName={title}
        />
      </main>
      <Footer />
    </div>
  );
}
