import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail } from "lucide-react";
import { CONTACT } from "@/lib/constants";

const footerLinkClass =
  "text-brand-light/70 transition-colors hover:text-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark rounded-sm";

export default function Footer() {
  const midLinks = [
    { href: "/kitchen", label: "Kitchen" },
    { href: "/kitchen/menu", label: "Menu" },
    { href: "/catering", label: "Catering" },
    { href: "/snibbles", label: "Snibbles" },
    { href: "/seasonal", label: "Seasonal" },
    { href: "/our-story", label: "Our Story" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-brand-dark text-brand-light/80">
      <div className="section-y mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          <div>
            <h3 className="text-section text-xl text-brand-light md:text-2xl">
              Suja&apos;s Kitchen
            </h3>
            <p className="text-body-editorial mt-4 max-w-sm text-brand-light/65">
              Kerala food from a cloud kitchen in Dubai, catering across the UAE
              since 1999.
            </p>
            <div className="mt-6 flex gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-brand-mid/30">
                <Image
                  src="/images/Dubai-Municipality-Accredited-Photoroom.png"
                  alt="Dubai Municipality accredited"
                  fill
                  className="bg-brand-dark/50 object-contain p-2"
                />
              </div>
              <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-brand-mid/30">
                <Image
                  src="/images/iso-22000-e1729347891555.webp"
                  alt="ISO 22000 certification"
                  fill
                  className="bg-brand-dark/50 object-contain p-2"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-caption font-semibold uppercase tracking-wider text-brand-gold/90">
              Navigate
            </h4>
            <ul className="mt-4 space-y-2.5">
              {midLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={`text-caption ${footerLinkClass}`}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-caption font-semibold uppercase tracking-wider text-brand-gold/90">
              Contact
            </h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold"
                  aria-hidden
                />
                <span className="text-caption text-brand-light/70">
                  {CONTACT.addressLine1}
                  <br />
                  {CONTACT.poBox}, {CONTACT.city}, {CONTACT.country}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold"
                  aria-hidden
                />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className={`text-caption ${footerLinkClass}`}
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-brand-mid/35 pt-8 text-center md:mt-12">
          <p className="text-caption text-brand-light/50">
            &copy; {new Date().getFullYear()} Suja&apos;s Kitchen
          </p>
        </div>
      </div>
    </footer>
  );
}
