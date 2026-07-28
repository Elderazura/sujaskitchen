'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinkClass =
  'inline-flex min-h-11 items-center rounded-lg px-4 py-2 text-sm font-medium text-brand-dark/90 transition-all duration-200 hover:bg-brand/10 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2';

const mobileNavLinkClass =
  'flex min-h-11 items-center rounded-lg px-3 py-3 text-base font-medium text-brand-dark/90 transition-colors hover:bg-brand/10 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2';

const primaryNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/kitchen', label: 'Kitchen' },
  { href: '/kitchen/menu', label: 'Menu' },
  { href: '/catering', label: 'Catering' },
  { href: '/snibbles', label: 'Snibbles' },
  { href: '/seasonal', label: 'Seasonal' },
];

const secondaryNavLinks = [
  { href: '/our-story', label: 'Our Story' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm transition-all duration-300 ${
        scrolled
          ? 'border-brand-mid/15 shadow-sm'
          : 'border-brand-mid/5 shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center rounded-lg hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
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
          <div className="hidden md:flex items-center gap-1">
            {primaryNavLinks.map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`${navLinkClass} gap-1 data-[state=open]:bg-brand/10 data-[state=open]:text-brand`}
              >
                More
                <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[10rem]">
                {secondaryNavLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex h-11 w-11 min-h-11 min-w-11 items-center justify-center rounded-lg text-brand-dark/90 transition-colors hover:bg-brand/10 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
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
            {primaryNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={mobileNavLinkClass}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div
              className="mx-3 my-2 border-t border-brand-mid/10"
              aria-hidden
            />
            {secondaryNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={mobileNavLinkClass}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
