'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ParallaxBanner from '@/components/ParallaxBanner';
import TestimonialSlider from '@/components/TestimonialSlider';
import SocialFeed from '@/components/SocialFeed';
import GoogleBusinessGallery from '@/components/GoogleBusinessGallery';
import { Leaf, UtensilsCrossed, ChefHat } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const popularDishes = [
    { name: 'Appam & Beef Curry', image: '/images/Appam-Beef-Curry-Combo_1-1.jpg' },
    { name: 'Parotta & Beef Curry', image: '/images/Parotta-Beef-Curry-Combo-scaled.jpg' },
    { name: 'Ghee Rice', image: '/images/Ghee-Rice-scaled.jpg' },
    { name: 'Kerala Snacks', image: '/images/Sujas-snacks.jpg' },
    { name: 'Fish Curry', image: '/images/FISH-CURRY-bnr-1.jpg' },
    { name: 'Onam Sadya', image: '/images/Sujas-Kitch-Onam-17.jpg' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-grow">
        {/* Main Hero Banner with Parallax */}
        <section 
          ref={heroRef}
          className="relative w-full h-[85vh] min-h-[500px] md:h-[90vh] md:min-h-[700px] flex items-center justify-center overflow-hidden"
        >
          <div 
            className="absolute inset-0 z-0"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              willChange: 'transform',
            }}
          >
            <Image
              src="/images/Sujas-kitchen-best-kerala-food-in-UAE.jpeg"
              alt="Suja's Kitchen - Best Kerala Food in UAE"
              fill
              className="object-cover scale-110"
              priority
              quality={95}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60"></div>
          </div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <div 
              className="transform transition-all duration-700"
              style={{
                opacity: 1 - scrollY / 500,
                transform: `translateY(${scrollY * 0.3}px)`,
              }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 drop-shadow-2xl animate-fade-in px-4">
                Suja&apos;s Kitchen
              </h1>
              <p className="text-xl sm:text-2xl md:text-4xl mb-3 md:mb-4 font-light drop-shadow-lg animate-slide-up px-4">
                Authentic Kerala Cuisine
              </p>
              <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-10 max-w-2xl mx-auto text-gray-100 drop-shadow-md animate-slide-up-delay px-4">
                Best Kerala Food in UAE • Since 1999
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-delay px-4">
              <Link
                href="/menu"
                className="bg-[#c91432] text-white px-6 py-3 sm:px-10 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-[#a01026] transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-center"
              >
                Order Now
              </Link>
              <Link
                href="/catering"
                className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 sm:px-10 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border-2 border-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105 text-center"
              >
                Catering Services
              </Link>
            </div>
          </div>
        </section>

        {/* Popular Dishes Animated Slider */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4 px-4">
                Popular Dishes
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                Our most loved authentic Kerala dishes
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
              {popularDishes.map((dish, idx) => (
                <div
                  key={idx}
                  className="relative h-40 sm:h-48 md:h-64 rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer transform hover:-translate-y-2"
                  style={{
                    animationDelay: `${idx * 100}ms`,
                  }}
                >
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover group-hover:scale-125 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-xs sm:text-sm md:text-lg leading-tight">{dish.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fish Curry Banner with Parallax */}
        <ParallaxBanner
          image="/images/FISH-CURRY-bnr-1.jpg"
          alt="Kerala Fish Curry"
          className="h-[60vh] min-h-[500px] flex items-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
          <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl animate-fade-in">
                Authentic Kerala Fish Curry
              </h2>
              <p className="text-xl md:text-2xl text-gray-100 mb-8 drop-shadow-lg leading-relaxed">
                Made with fresh fish, coconut milk, and traditional spices. A taste of Kerala&apos;s coastal cuisine.
              </p>
              <Link
                href="/menu"
                className="inline-block bg-[#c91432] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#a01026] transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Explore Our Menu
              </Link>
            </div>
          </div>
        </ParallaxBanner>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose Suja&apos;s Kitchen?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Authentic flavors, fresh ingredients, and traditional recipes since 1999
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { Icon: Leaf, title: 'Authentic Ingredients', desc: 'Spices sourced directly from Wayanad and Idukki, fresh coconut, and traditional cooking methods.' },
                { Icon: UtensilsCrossed, title: 'Fresh Daily Preparation', desc: 'Our cloud kitchen in Al Quoz prepares fresh meals daily for delivery across Dubai and Abu Dhabi.' },
                { Icon: ChefHat, title: 'Catering Excellence', desc: 'Customized menus for events of all sizes - from family gatherings to corporate celebrations.' },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="text-center p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 group"
                  style={{
                    animationDelay: `${idx * 150}ms`,
                  }}
                >
                  <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <feature.Icon className="w-12 h-12 text-[#c91432]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#c91432] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                What Our Customers Say
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Real reviews from our satisfied customers
              </p>
            </div>
            <TestimonialSlider />
          </div>
        </section>

        {/* Google Business Gallery */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Photos from Our Customers
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Real photos shared by our customers on Google
              </p>
            </div>
            <GoogleBusinessGallery />
          </div>
        </section>

        {/* Onam Sadya Banner with Parallax */}
        <ParallaxBanner
          image="/images/Sujas-Kitch-Onam-17.jpg"
          alt="Onam Sadya - Traditional Kerala Feast"
          className="h-[70vh] min-h-[600px] flex items-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10"></div>
          <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white w-full">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
              Onam Sadya
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 drop-shadow-lg max-w-2xl mx-auto">
              Traditional Kerala feast with 20+ dishes served on banana leaf. Experience the authentic flavors of Onam.
            </p>
            <Link
              href="/menu"
              className="inline-block bg-[#c91432] text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-[#a01026] transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Order Onam Sadya
            </Link>
          </div>
        </ParallaxBanner>

        {/* Social Feed Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Follow Our Journey
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
                See what&apos;s cooking in our kitchen
              </p>
              <a
                href="https://instagram.com/sujaskitchen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#c91432] font-semibold hover:gap-3 transition-all"
              >
                Follow us on Instagram
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
            <SocialFeed />
          </div>
        </section>

        {/* Christmas Lunch Banner with Parallax */}
        <ParallaxBanner
          image="/images/sujas-kitchen-christmas-lunch.jpg"
          alt="Christmas Lunch at Suja's Kitchen"
          className="h-[60vh] min-h-[500px] flex items-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
          <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
                Christmas Special
              </h2>
              <p className="text-xl md:text-2xl text-gray-100 mb-8 drop-shadow-lg leading-relaxed">
                Celebrate the festive season with our special Christmas lunch menu. Traditional Kerala dishes with a festive twist.
              </p>
              <Link
                href="/catering"
                className="inline-block bg-[#c91432] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#a01026] transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Book Your Christmas Lunch
              </Link>
            </div>
          </div>
        </ParallaxBanner>

        {/* Our Story Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src="/images/suja-maam_1.jpg"
                  alt="Mrs. Suja Alex - Founder"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  priority
                />
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Founded in 1999 by Mrs. Suja Alex, Suja&apos;s Kitchen has been bringing authentic 
                  Kerala cuisine to the UAE for over two decades. Our journey began with a simple 
                  mission: to share the authentic flavors of Kerala with the community.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Using traditional recipes passed down through generations and sourcing the finest 
                  ingredients from Kerala, we create dishes that taste like home. Every bite brings 
                  back memories of Amma&apos;s kitchen.
                </p>
                <Link
                  href="/our-story"
                  className="inline-block bg-[#c91432] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#a01026] transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Read Our Full Story
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Catering Banner with Parallax */}
        <ParallaxBanner
          image="/images/sujas-banquet.webp"
          alt="Catering Services - Suja's Kitchen"
          className="h-[60vh] min-h-[500px] flex items-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
          <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
                Catering Services
              </h2>
              <p className="text-xl md:text-2xl text-gray-100 mb-8 drop-shadow-lg leading-relaxed">
                From intimate family gatherings to large corporate events. We bring authentic Kerala cuisine to your celebration.
              </p>
              <Link
                href="/catering"
                className="inline-block bg-[#c91432] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#a01026] transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Learn More About Catering
              </Link>
            </div>
          </div>
        </ParallaxBanner>

        {/* Final CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-[#c91432] to-[#a01026] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 px-4">
              Ready to Taste Authentic Kerala?
            </h2>
            <p className="text-lg sm:text-xl mb-6 md:mb-10 text-white/90 leading-relaxed px-4">
              Order now or contact us for catering services. We deliver fresh, authentic Kerala cuisine 
              to Dubai and Abu Dhabi.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link
                href="/menu"
                className="bg-white text-[#c91432] px-6 py-3 sm:px-10 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl text-center"
              >
                View Menu
              </Link>
              <Link
                href="/contact"
                className="bg-transparent text-white px-6 py-3 sm:px-10 sm:py-4 rounded-lg font-semibold text-base sm:text-lg border-2 border-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105 text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
