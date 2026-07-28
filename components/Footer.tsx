import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Clock, Instagram, ArrowRight } from "lucide-react";
import { CONTACT, INSTAGRAM_PROFILE_URL, INSTAGRAM_HANDLE } from "@/lib/constants";
import DeliveryPlatforms from "@/components/shared/DeliveryPlatforms";

const linkClass =
  "text-caption text-brand-light/65 transition-colors hover:text-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark rounded-sm";

const EXPLORE = [
  { href: "/kitchen", label: "Cloud kitchen" },
  { href: "/kitchen/menu", label: "Full menu" },
  { href: "/catering", label: "Catering" },
  { href: "/snibbles", label: "Snibbles" },
  { href: "/seasonal", label: "Seasonal" },
];

const COMPANY = [
  { href: "/our-story", label: "Our story" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

const CERTS = [
  { src: "/images/Dubai-Municipality-Accredited-Photoroom.png", alt: "Dubai Municipality accredited" },
  { src: "/images/haccp-hazard-analysis-critical-control-260nw-2369890213-Photoroom.png", alt: "HACCP certified" },
  { src: "/images/iso-22000-e1729347891555.webp", alt: "ISO 22000 certified" },
];

export default function Footer() {
  return (
    <footer className="grain bg-brand-dark text-brand-light/80">
      {/* CTA band */}
      <div className="border-b border-brand-mid/30">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:items-center md:py-14 lg:px-8">
          <div>
            <p className="flex items-center gap-3 text-eyebrow text-brand-gold">
              <span className="h-px w-7 bg-brand-gold" aria-hidden />
              Suja&apos;s Kitchen · Est. 1999
            </p>
            <h2 className="text-display mt-4 text-3xl text-brand-light md:text-4xl">
              Hungry? The kitchen is open.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5 md:items-end">
            <Link
              href="/kitchen/menu"
              className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-brand px-8 font-sans text-base font-semibold text-brand-light transition-colors hover:bg-brand-hover"
            >
              See today&apos;s menu
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <DeliveryPlatforms variant="onDark" className="md:justify-end" />
          </div>
        </div>
      </div>

      {/* Main columns */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:px-8">
        <div className="lg:pr-4">
          <div className="relative h-16 w-16">
            <Image
              src="/logo/Sujas_logo.png"
              alt="Suja's Kitchen"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-body-editorial mt-5 max-w-xs text-brand-light/60">
            Kerala meals, snacks, and catering from a cloud kitchen in Dubai —
            central Travancore cooking, small batches, since 1999.
          </p>
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-caption text-brand-light/70 transition-colors hover:text-brand-gold"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-brand-mid/40">
              <Instagram className="h-4 w-4" aria-hidden />
            </span>
            @{INSTAGRAM_HANDLE}
          </a>
        </div>

        <nav aria-label="Explore">
          <h3 className="text-eyebrow text-brand-gold/90">Explore</h3>
          <ul className="mt-5 space-y-3">
            {EXPLORE.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h3 className="text-eyebrow text-brand-gold/90">Company</h3>
          <ul className="mt-5 space-y-3">
            {COMPANY.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-eyebrow text-brand-gold/90">Visit &amp; contact</h3>
          <ul className="mt-5 space-y-4">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" aria-hidden />
              <span className="text-caption text-brand-light/70">
                {CONTACT.addressLine1}
                <br />
                {CONTACT.poBox}, {CONTACT.city}, {CONTACT.country}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" aria-hidden />
              <a href={`mailto:${CONTACT.email}`} className={linkClass}>
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" aria-hidden />
              <span className="text-caption text-brand-light/70">
                Breakfast through dinner, daily
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-mid/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="text-caption text-brand-light/50">
            &copy; {new Date().getFullYear()} Suja&apos;s Kitchen · Kerala food in
            Dubai &amp; Abu Dhabi
          </p>
          <div className="flex items-center gap-4">
            <span className="text-caption text-brand-light/40">Certified</span>
            {CERTS.map((c) => (
              <Image
                key={c.src}
                src={c.src}
                alt={c.alt}
                width={80}
                height={36}
                className="h-8 w-auto object-contain opacity-70 brightness-0 invert transition-opacity hover:opacity-100"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
