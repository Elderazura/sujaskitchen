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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/our-story', label: 'Our Story' },
    { href: '/menu', label: 'Menu' },
    { href: '/snibbles', label: 'Snibbles' },
    { href: '/catering', label: 'Catering' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const phoneNumber = '+971501234567'; // Update with actual phone number

  return (
    <nav className={`bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b transition-all duration-300 ${
      scrolled ? 'border-[#c91432]/20 shadow-lg' : 'border-gray-100'
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
                  className="text-gray-700 hover:text-[#c91432] px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[#c91432]/10"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center gap-2 bg-[#c91432] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#a01026] transition-all duration-200 ml-4"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">Call Us</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center justify-center w-10 h-10 bg-[#c91432] text-white rounded-lg hover:bg-[#a01026] transition-colors"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-[#c91432] hover:bg-[#c91432]/10 focus:outline-none transition-colors"
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
        <div className="md:hidden border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-[#c91432] block px-3 py-3 rounded-lg text-base font-medium hover:bg-[#c91432]/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center gap-2 text-white bg-[#c91432] hover:bg-[#a01026] block px-3 py-3 rounded-lg text-base font-medium transition-colors mt-2"
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
