import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold text-[#c91432] mb-4">Suja&apos;s Kitchen</h3>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Authentic Kerala cuisine delivered fresh from our cloud kitchen. 
              Bringing the flavors of home to Dubai and Abu Dhabi since 1999.
            </p>
            <div className="flex gap-4">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                <Image
                  src="/images/Dubai-Municipality-Accredited-Photoroom.png"
                  alt="Dubai Municipality Accredited"
                  fill
                  className="object-contain bg-white/10 p-2"
                />
              </div>
              <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                <Image
                  src="/images/iso-22000-e1729347891555.webp"
                  alt="ISO 22000 Certified"
                  fill
                  className="object-contain bg-white/10 p-2"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#c91432]">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/our-story" className="text-gray-400 hover:text-[#c91432] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-gray-400 hover:text-[#c91432] transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/catering" className="text-gray-400 hover:text-[#c91432] transition-colors">
                  Catering
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#c91432] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#c91432]">Contact Info</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <MapPin className="mr-2 mt-1 w-5 h-5 text-[#c91432] flex-shrink-0" />
                <span>Al Quoz Warehouse<br />Dubai, UAE</span>
              </li>
              <li className="flex items-start">
                <Mail className="mr-2 mt-1 w-5 h-5 text-[#c91432] flex-shrink-0" />
                <a href="mailto:info@sujaskitchen.com" className="hover:text-[#c91432] transition-colors">
                  info@sujaskitchen.com
                </a>
              </li>
              <li>
                <span className="text-[#c91432]">Serving:</span><br />
                <span className="text-gray-400">Dubai & Abu Dhabi</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Suja&apos;s Kitchen. All rights reserved.</p>
          <p className="mt-2 text-sm">Authentic Kerala Cuisine Since 1999</p>
        </div>
      </div>
    </footer>
  );
}
