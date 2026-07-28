'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageHero from '@/components/shared/PageHero';
import ParallaxBanner from '@/components/ParallaxBanner';
import AnimatedGallery from '@/components/AnimatedGallery';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Star, Building2, Heart, Calendar, Users, MapPin, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useRef, useState } from 'react';
import { PageCrossLinks } from '@/components/shared/PageCrossLinks';

export default function OurStory() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const storyImages = [
    '/images/suja-maam_1.jpg',
    '/images/SJK-image-5-1-scaled.jpg',
    '/images/SJK-image-8.jpg',
    '/images/SJK-image-2-1.jpg',
    '/images/Sujas-Kitchen-scaled.jpg',
    '/images/Sujas-Kitchen-1-scaled.jpg',
  ];

  const journeyMilestones = [
    {
      year: '1999',
      title: 'The Beginning',
      description: 'Mrs. Suja Alex founded Suja\'s Kitchen with a vision to bring authentic Kerala cuisine to the UAE.',
      image: '/images/suja-maam_1.jpg',
      icon: Calendar
    },
    {
      year: '2000s',
      title: 'Growing Community',
      description: 'Building a loyal customer base by serving authentic home-cooked meals to the Kerala community in Dubai.',
      image: '/images/Sujas-Kitchen-1-scaled.jpg',
      icon: Users
    },
    {
      year: '2010s',
      title: 'Expansion',
      description: 'Expanding services to include catering for events and celebrations across Dubai and Abu Dhabi.',
      image: '/images/sujas-banquet.webp',
      icon: MapPin
    },
    {
      year: 'Today',
      title: 'Cloud Kitchen',
      description: 'Modern cloud kitchen facility in Al Quoz, serving fresh authentic Kerala cuisine daily.',
      image: '/images/SJK-image-5-1-scaled.jpg',
      icon: Award
    },
  ];

  const values = [
    {
      title: 'Authenticity',
      description: 'Traditional recipes passed down through generations, never compromised.',
      Icon: Leaf
    },
    {
      title: 'Quality',
      description: 'Finest ingredients sourced from Kerala, prepared fresh daily.',
      Icon: Star
    },
    {
      title: 'Tradition',
      description: 'Cooking methods that honor Kerala\'s rich culinary heritage.',
      Icon: Building2
    },
    {
      title: 'Community',
      description: 'Serving the Kerala community in UAE with love and care.',
      Icon: Heart
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section with Parallax */}
        <PageHero
          image="/images/suja-maam_1.jpg"
          alt="Suja Alex, founder of Suja's Kitchen, in the kitchen"
          eyebrow="Our story · Since 1999"
          title="From one home kitchen to five, the recipe never changed."
          subtitle="Twenty-five years of Central Travancore cooking — passion, tradition, and authentic Kerala flavours."
        />

        {/* Founder Section with Animation */}
        <section className="py-20 bg-gradient-to-b from-paper to-paper-deep">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src="/images/suja-maam_1.jpg"
                  alt="Mrs. Suja Alex - Founder"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="space-y-6">
                <div className="inline-block bg-brand/10 text-brand px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Founded in 1999
                </div>
                <h2 className="text-section text-4xl md:text-5xl text-brand-dark mb-6">
                  The Vision Begins
                </h2>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  Suja&apos;s Kitchen was founded by Mrs. Suja Alex in 1999 with a vision to bring 
                  authentic Kerala cuisine to the UAE. What started as a small home kitchen has 
                  grown into a beloved cloud kitchen serving Dubai and Abu Dhabi.
                </p>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  Our story is rooted in the rich culinary heritage of Kerala, a state known for 
                  its diverse and flavorful cuisine. From the backwaters to the hills, Kerala&apos;s 
                  food culture is a celebration of spices, coconut, and traditional cooking methods 
                  passed down through generations.
                </p>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  Mrs. Suja Alex&apos;s passion for authentic cooking and her commitment to preserving 
                  traditional recipes has been the foundation of our success. Every dish we serve 
                  carries the essence of home, prepared with the same love and care as in a traditional 
                  Kerala kitchen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Timeline with Parallax */}
        <ParallaxBanner
          image="/images/Sujas-Kitchen-1-scaled.jpg"
          alt="Our Journey"
          className="py-20"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10"></div>
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-section text-4xl md:text-5xl text-white mb-4 drop-shadow-2xl">
                Our Journey
              </h2>
              <p className="text-xl text-gray-100 max-w-2xl mx-auto drop-shadow-lg">
                Over two decades of bringing authentic Kerala flavors to the UAE
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {journeyMilestones.map((milestone, idx) => {
                const IconComponent = milestone.icon;
                return (
                  <Card
                    key={idx}
                    className="bg-white/95 backdrop-blur-sm overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group border-2 border-transparent hover:border-brand"
                    style={{
                      animationDelay: `${idx * 150}ms`,
                    }}
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={milestone.image}
                        alt={milestone.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand/80 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                          <IconComponent className="w-6 h-6 text-brand" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="text-brand font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand transition-colors">
                        {milestone.title}
                      </h3>
                      <p className="text-brand-mid leading-relaxed text-sm">{milestone.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </ParallaxBanner>

        {/* Philosophy Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-section text-4xl md:text-5xl text-brand-dark mb-6">
                Our Philosophy
              </h2>
              <div className="w-16 h-px bg-brand-gold mx-auto mb-6"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div className="space-y-6">
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  At Suja&apos;s Kitchen, we believe that food is more than just sustenance—it&apos;s 
                  a connection to home, family, and tradition. Every dish we prepare is made with 
                  the same care and attention to detail that you would find in a traditional 
                  Kerala home kitchen.
                </p>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  We source our spices directly from Wayanad and Idukki, regions renowned for their 
                  high-quality spices. Fresh coconut, locally sourced vegetables, and traditional 
                  cooking methods ensure that every bite brings back memories of home.
                </p>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  Our commitment to authenticity means we never compromise on ingredients or cooking 
                  methods. Each recipe has been passed down through generations, preserving the 
                  authentic flavors that define Kerala cuisine.
                </p>
              </div>
              <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src="/images/SJK-image-8.jpg"
                  alt="Traditional Kerala Cooking"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, idx) => (
                <Card
                  key={idx}
                  className="bg-gradient-to-br from-paper-deep to-paper rounded-xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-brand group"
                  style={{
                    animationDelay: `${idx * 100}ms`,
                  }}
                >
                  <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <div className="bg-brand/10 rounded-full p-4 group-hover:bg-brand/20 transition-colors">
                      <value.Icon className="w-8 h-8 text-brand" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-brand-dark/80 leading-relaxed text-sm">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Animated Kitchen Gallery */}
        <section className="py-20 bg-gradient-to-b from-paper-deep to-paper">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-section text-4xl md:text-5xl text-brand-dark mb-4">
                Our Kitchen
              </h2>
              <p className="text-xl text-brand-mid max-w-2xl mx-auto mb-2">
                Where tradition meets modern efficiency
              </p>
              <div className="w-16 h-px bg-brand-gold mx-auto"></div>
            </div>
            
            <AnimatedGallery 
              images={storyImages} 
              altPrefix="Suja's Kitchen"
              interval={4000}
            />
          </div>
        </section>

        {/* Cloud Kitchen Section with Parallax */}
        <ParallaxBanner
          image="/images/SJK-image-5-1-scaled.jpg"
          alt="Cloud Kitchen"
          className="py-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
          <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                <h2 className="text-section text-4xl md:text-5xl text-brand-dark mb-6">
                  The Cloud Kitchen
                </h2>
                <p className="text-lg text-brand-dark/80 mb-6 leading-relaxed">
                  In response to the growing demand for authentic home-cooked meals, we established 
                  our cloud kitchen in Al Quoz, Dubai. This modern facility allows us to prepare 
                  fresh meals daily while maintaining the traditional cooking methods and flavors 
                  that define our cuisine.
                </p>
                <p className="text-lg text-brand-dark/80 mb-6 leading-relaxed">
                  Our cloud kitchen model ensures that every order is prepared fresh, maintaining 
                  the quality and authenticity that our customers have come to expect. Whether 
                  you&apos;re ordering for yourself or planning a large event, we deliver the same 
                  commitment to excellence.
                </p>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  Located in Al Quoz, our facility is equipped with modern equipment while preserving 
                  traditional cooking techniques. This allows us to scale our operations without 
                  compromising on the authentic flavors that make our food special.
                </p>
              </div>
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src="/images/SJK-image-5-1-scaled.jpg"
                  alt="Cloud Kitchen"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </ParallaxBanner>

        {/* Catering Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-section text-4xl md:text-5xl text-brand-dark mb-6">
                Catering Services
              </h2>
              <div className="w-16 h-px bg-brand-gold mx-auto mb-6"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src="/images/sujas-banquet.webp"
                  alt="Catering Services"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  Beyond daily deliveries, we offer comprehensive catering services for events of 
                  all sizes. From intimate family gatherings to large corporate events, we create 
                  customized menus that showcase the best of Kerala cuisine.
                </p>
                <p className="text-lg text-brand-dark/80 leading-relaxed">
                  Our catering team works closely with clients to understand their needs and 
                  preferences, ensuring that every event is a memorable culinary experience. 
                  Attention to detail, authentic flavors, and exceptional service are the 
                  hallmarks of our catering operations.
                </p>
                <Link
                  href="/catering"
                  className="inline-block bg-brand text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-hover transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Learn More About Catering
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Looking Forward Section */}
        <section className="py-20 bg-brand-gradient text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-section text-4xl md:text-5xl mb-6">
              Looking Forward
            </h2>
            <div className="w-16 h-px bg-brand-gold/60 mx-auto mb-8"></div>
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              As we grow, the rule stays the same: Suja still decides what goes into the pot.
              We are proud to cook for the Malayali community in the UAE and for anyone who
              wants the food they grew up with. Every dish carries a name and a memory.
            </p>
            <p className="text-xl mb-10 text-white/90 leading-relaxed">
              From four friends in Sharjah in 1999 to Dubai and Abu Dhabi today, the kitchen
              is bigger. The recipe is not. Still the way Amma used to make it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kitchen/menu"
                className="bg-white text-brand px-10 py-4 rounded-lg font-semibold text-lg hover:bg-paper-deep transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Explore Our Menu
              </Link>
              <Link
                href="/contact"
                className="bg-transparent text-white px-10 py-4 rounded-lg font-semibold text-lg border-2 border-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>

        <PageCrossLinks
          omit={["/our-story"]}
          banner={{
            image: "/images/Sujas-Kitch-Onam-17.jpg",
            alt: "Kerala feast on banana leaf",
            title: "The story ends on your table",
            subtitle:
              "Seasonal sadhyas, daily cloud kitchen orders, and halls full of people — all from the same recipes.",
            href: "/kitchen/menu",
            cta: "See what we cook",
            tone: "dark",
          }}
        />
      </main>
      
      <Footer />
    </div>
  );
}
