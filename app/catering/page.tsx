'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ParallaxBanner from '@/components/ParallaxBanner';
import AnimatedGallery from '@/components/AnimatedGallery';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Briefcase, Calendar, CheckCircle2, Phone, Mail, Clock, ChefHat } from 'lucide-react';

export default function Catering() {
  const services = [
    {
      title: 'Family Gatherings',
      description: 'Perfect for intimate family celebrations, birthdays, and special occasions. Minimum 5 people.',
      features: ['Customized menu', 'Traditional Kerala dishes', 'Fresh preparation', 'Flexible timing'],
      image: '/images/Feeding-a-Crowd.jpg',
      icon: Users,
      color: 'from-[#c91432] to-[#a01026]',
    },
    {
      title: 'Corporate Events',
      description: 'Professional catering for office events, meetings, and corporate celebrations.',
      features: ['Bulk orders', 'Professional service', 'On-time delivery', 'Customized packages'],
      image: '/images/Sujas-Catering-1-scaled.jpg',
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Large Events',
      description: 'Comprehensive catering solutions for weddings, festivals, and large celebrations.',
      features: ['Full-service catering', 'Event planning support', 'Multiple menu options', 'Dedicated team'],
      image: '/images/sujas-banquet.webp',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
    }
  ];

  const cateringImages = [
    '/images/Sujas-Catering-1-scaled.jpg',
    '/images/Sujas-Catering-2.jpg',
    '/images/Sujas-Catering-3-1-scaled.jpg',
    '/images/Sujas-Catering-4-1-scaled.jpg',
    '/images/Sujas-Catering-5-1-scaled.jpg',
    '/images/Sujas-Catering-6-scaled.jpg',
    '/images/Sujas-Catering-7-scaled.jpg',
    '/images/Sujas-Catering-8-1-scaled.jpg',
    '/images/Sujas-Catering-9-1-scaled.jpg',
    '/images/Sujas-Catering-10-1-scaled.jpg',
    '/images/Sujas-Catering-11-scaled.jpg',
    '/images/sujas-banquet.webp',
  ];

  const eventTypes = [
    {
      name: 'Weddings',
      image: '/images/Sujas-Catering-9-1-scaled.jpg',
      description: 'Memorable wedding feasts with traditional Kerala cuisine',
      popular: true,
    },
    {
      name: 'Corporate Events',
      image: '/images/Sujas-Catering-8-1-scaled.jpg',
      description: 'Professional catering for business gatherings',
      popular: false,
    },
    {
      name: 'Festivals',
      image: '/images/Sujas-Onam-1.jpeg',
      description: 'Celebrate Onam, Christmas, and other festivals',
      popular: true,
    },
    {
      name: 'Birthday Parties',
      image: '/images/Sujas-Catering-7-scaled.jpg',
      description: 'Special celebrations with authentic flavors',
      popular: false,
    },
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Contact Us',
      description: 'Reach out with your event details, date, number of guests, and any special requirements',
      icon: Phone,
    },
    {
      number: '02',
      title: 'Menu Planning',
      description: 'We create a customized menu based on your preferences, dietary requirements, and event type',
      icon: ChefHat,
    },
    {
      number: '03',
      title: 'Confirmation',
      description: 'Review and confirm the menu, quantities, pricing, and delivery/setup timing',
      icon: CheckCircle2,
    },
    {
      number: '04',
      title: 'Delivery & Service',
      description: 'Fresh food prepared and delivered to your venue on time, ready to serve',
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section with Parallax */}
        <ParallaxBanner
          image="/images/sujas-banquet.webp"
          alt="Catering Services - Suja's Kitchen"
          className="h-[85vh] min-h-[700px] flex items-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60 z-10"></div>
          <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 drop-shadow-2xl animate-fade-in">
              Catering Services
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-100 drop-shadow-lg max-w-3xl mx-auto leading-relaxed animate-slide-up">
              Bringing authentic Kerala cuisine to your special events
            </p>
            <div className="mt-10 animate-fade-in-delay">
              <Link href="#contact">
                <Button size="lg" className="bg-[#c91432] hover:bg-[#a01026] text-white text-lg px-10 py-6 shadow-xl">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </div>
        </ParallaxBanner>

        {/* Introduction Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Your Event, Our Expertise
              </h2>
              <div className="w-24 h-1 bg-[#c91432] mx-auto mb-6"></div>
              <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
                Whether you&apos;re planning an intimate family gathering or a large corporate event, 
                we offer customized catering services that bring the authentic flavors of Kerala to your 
                celebration. Our team works closely with you to create a menu that perfectly suits your 
                event and preferences.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-[#c91432] group"
                    style={{
                      animationDelay: `${index * 150}ms`,
                    }}
                  >
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <div className={`bg-gradient-to-br ${service.color} rounded-full p-3 shadow-lg`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl group-hover:text-[#c91432] transition-colors">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#c91432] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Event Types Gallery */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Events We Cater
              </h2>
              <div className="w-24 h-1 bg-[#c91432] mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From intimate gatherings to grand celebrations, we bring Kerala&apos;s authentic flavors to every occasion
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {eventTypes.map((event, idx) => (
                <div
                  key={idx}
                  className="relative h-80 rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  {event.popular && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-[#c91432] text-white">Popular</Badge>
                    </div>
                  )}
                  <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
                    <p className="text-gray-200">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Animated Gallery Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Catering Events
              </h2>
              <div className="w-24 h-1 bg-[#c91432] mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                A glimpse into our successful catering events across Dubai and Abu Dhabi
              </p>
            </div>
            
            <AnimatedGallery
              images={cateringImages}
              altPrefix="Catering event"
              interval={4000}
            />
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <div className="w-24 h-1 bg-[#c91432] mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Simple steps to make your event memorable
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={idx}
                    className="text-center group"
                    style={{
                      animationDelay: `${idx * 100}ms`,
                    }}
                  >
                    <div className="relative mb-6">
                      <div className="bg-gradient-to-br from-[#c91432] to-[#a01026] rounded-2xl p-6 shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 text-white mx-auto" />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-[#c91432] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm shadow-lg">
                        {step.number}
                      </div>
                    </div>
                    <h4 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-[#c91432] transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Banner with Parallax */}
        <ParallaxBanner
          image="/images/Sujas-Catering-1-scaled.jpg"
          alt="Catering Features"
          className="py-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
          <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-[#c91432] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <ChefHat className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Chefs</h3>
                  <p className="text-gray-600 text-sm">
                    Experienced team specializing in authentic Kerala cuisine
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-[#c91432] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">On-Time Delivery</h3>
                  <p className="text-gray-600 text-sm">
                    Punctual service ensuring your event runs smoothly
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-[#c91432] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Customized Menus</h3>
                  <p className="text-gray-600 text-sm">
                    Tailored to your preferences and dietary requirements
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ParallaxBanner>

        {/* CTA Section */}
        <section id="contact" className="py-20 bg-gradient-to-r from-[#c91432] to-[#a01026] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Plan Your Event?</h2>
            <div className="w-24 h-1 bg-white/50 mx-auto mb-8"></div>
            <p className="text-xl mb-10 text-white/90 leading-relaxed">
              Contact us today to discuss your catering needs. We&apos;re here to make your event 
              memorable with authentic Kerala cuisine. Minimum 48 hours advance notice required for catering orders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="bg-white text-[#c91432] hover:bg-gray-100 shadow-xl">
                  Get a Quote
                </Button>
              </Link>
              <Link href="/menu">
                <Button size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white/20">
                  View Menu
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
