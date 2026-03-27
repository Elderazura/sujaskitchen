'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const handleScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const next = window.scrollY > 20;
        setScrolled((prev) => (prev === next ? prev : next));
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/kitchen', label: 'Kitchen' },
    { href: '/kitchen/menu', label: 'Menu' },
    { href: '/catering', label: 'Catering' },
    { href: '/snibbles', label: 'Snibbles' },
    { href: '/seasonal', label: 'Seasonal' },
    { href: '/our-story', label: 'Our Story' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const phoneNumber = '+971501234567'; // Update with actual phone number

  return (
    <nav className={`sticky top-0 z-50 border-b bg-white/95 shadow-md backdrop-blur-sm transition-all duration-300 ${
      scrolled ? "border-brand/25 shadow-lg" : "border-brand-mid/10"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <div className="relative w-16 h-16">
                <Image
                  src="/logo/Sujas_logo.png"
                  alt="Suja's Kitchen Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-baseline space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-brand-dark/90 transition-all duration-200 hover:bg-brand/10 hover:text-brand"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <a
              href={`tel:${phoneNumber}`}
              className="ml-4 flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-light transition-all duration-200 hover:bg-brand-hover"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">Call Us</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <a
              href={`tel:${phoneNumber}`}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-brand-light transition-colors hover:bg-brand-hover"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-brand-dark/90 transition-colors hover:bg-brand/10 hover:text-brand focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-brand-mid/10 md:hidden">
          <div className="space-y-1 bg-white px-2 pb-3 pt-2 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-3 text-base font-medium text-brand-dark/90 transition-colors hover:bg-brand/10 hover:text-brand"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${phoneNumber}`}
              className="mt-2 flex items-center gap-2 rounded-lg bg-brand px-3 py-3 text-base font-medium text-brand-light transition-colors hover:bg-brand-hover"
              onClick={() => setIsOpen(false)}
            >
              <Phone className="w-5 h-5" />
              Call Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
