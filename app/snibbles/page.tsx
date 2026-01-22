'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ParallaxBanner from '@/components/ParallaxBanner';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Heart, Leaf, Clock, ShoppingCart, Sparkles, Star, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Snibbles() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    {
      id: 1,
      name: 'Banana Chips',
      description: 'Crispy, golden banana chips made from fresh Kerala bananas. Perfect for snacking anytime.',
      image: '/images/Banana-Chips-Pack-Final.png',
      features: ['Fresh ingredients', 'No preservatives', 'Traditional recipe'],
      popular: true,
    },
    {
      id: 2,
      name: 'Kozhi Ada',
      description: 'Sweet rice dumplings with coconut filling. A traditional Kerala snack that brings back memories of home.',
      image: '/images/Kozhi-Ada-Pack-Final.png',
      features: ['Handmade', 'Fresh coconut', 'Authentic taste'],
      popular: false,
    },
    {
      id: 3,
      name: 'Kappa Chips',
      description: 'Crispy tapioca chips seasoned to perfection. A unique Kerala snack that\'s both healthy and delicious.',
      image: '/images/Chembu-Chips-Pack-Final.png',
      features: ['Gluten-free', 'Natural flavors', 'Crunchy texture'],
      popular: true,
    },
    {
      id: 4,
      name: 'Mixture',
      description: 'A delightful mix of traditional Kerala snacks. Perfect for tea time or as a party snack.',
      image: '/images/Mixture-Pack-Final.png',
      features: ['Mixed variety', 'Freshly packed', 'Long shelf life'],
      popular: false,
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Each product is crafted with the same care and attention as our restaurant meals',
      color: 'from-[#c91432] to-[#a01026]',
    },
    {
      icon: Leaf,
      title: 'Fresh Ingredients',
      description: 'Sourced from Kerala, using traditional recipes and authentic flavors',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Package,
      title: 'Ready to Ship',
      description: 'Carefully packed to maintain freshness and flavor during delivery',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Clock,
      title: 'Long Shelf Life',
      description: 'Packed with care to ensure your snacks stay fresh and delicious',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section with Parallax */}
        <ParallaxBanner
          image="/images/snibbles-mockup-scaled.jpg"
          alt="Snibbles by Suja's Kitchen"
          className="h-[85vh] min-h-[700px] flex items-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60 z-10"></div>
          <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <div 
              className="transform transition-all duration-700"
              style={{
                opacity: 1 - scrollY / 500,
                transform: `translateY(${scrollY * 0.2}px)`,
              }}
            >
              <div className="relative w-80 h-20 mx-auto mb-8 animate-fade-in">
                <Image
                  src="/images/snibbles-logo-tm-scaled.png"
                  alt="Snibbles Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl animate-slide-up">
                Snibbles
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-gray-100 drop-shadow-lg animate-slide-up-delay">
                by Suja&apos;s Kitchen
              </p>
              <p className="text-lg md:text-xl mb-10 text-gray-200 drop-shadow-md max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
                Snibbles is Suja&apos;s latest love letter to those who miss home. Inspired by decades of comforting meals, 
                each bite is crafted to bring Kerala a little closer, wherever you are.
              </p>
              <Link href="#products" className="animate-fade-in-delay">
                <Button size="lg" className="bg-[#c91432] hover:bg-[#a01026] text-white text-lg px-10 py-6 shadow-xl">
                  Explore Products
                </Button>
              </Link>
            </div>
          </div>
        </ParallaxBanner>

        {/* Why Snibbles Section with Animations */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Snibbles?
              </h2>
              <div className="w-24 h-1 bg-[#c91432] mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Freshly made, lovingly packed, and ready to reach your doorstep
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, idx) => {
                const IconComponent = benefit.icon;
                return (
                  <Card
                    key={idx}
                    className="text-center p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-[#c91432] group"
                    style={{
                      animationDelay: `${idx * 150}ms`,
                    }}
                  >
                    <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      <div className={`bg-gradient-to-br ${benefit.color} rounded-full p-4 shadow-lg`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl group-hover:text-[#c91432] transition-colors">
                        {benefit.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Products Showcase Section */}
        <section id="products" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Product Range
              </h2>
              <div className="w-24 h-1 bg-[#c91432] mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Traditional Kerala snacks, packed fresh and ready to enjoy
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, idx) => (
                <Card
                  key={product.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group border-2 border-transparent hover:border-[#c91432]"
                  style={{
                    animationDelay: `${idx * 100}ms`,
                  }}
                >
                  <div className="relative h-72 bg-gradient-to-br from-gray-50 to-gray-100">
                    {product.popular && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-[#c91432] text-white flex items-center gap-1">
                          <Star className="w-3 h-3 fill-white" />
                          Popular
                        </Badge>
                      </div>
                    )}
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#c91432]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-[#c91432] transition-colors">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 leading-relaxed">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature, featureIdx) => (
                        <li key={featureIdx} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#c91432] flex-shrink-0"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-[#c91432] hover:bg-[#a01026] text-white group/btn">
                      <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                      Order Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Banner with Parallax */}
        <ParallaxBanner
          image="/images/Sujas-snacks.jpg"
          alt="Snibbles Features"
          className="py-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
          <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-[#c91432] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Quality</h3>
                  <p className="text-gray-600 text-sm">
                    Made with the finest ingredients and traditional recipes
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-[#c91432] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
                  <p className="text-gray-600 text-sm">
                    Quick and secure shipping across UAE
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-[#c91432] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Favorite</h3>
                  <p className="text-gray-600 text-sm">
                    Loved by thousands of customers across UAE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ParallaxBanner>

        {/* Story Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src="/images/suja-maam_1.jpg"
                  alt="Suja's Kitchen"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#c91432]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="space-y-6">
                <div className="inline-block bg-[#c91432]/10 text-[#c91432] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  The Snibbles Story
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Bringing Home Closer
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Snibbles was born from a simple idea: to bring the authentic flavors of Kerala 
                  to your home, no matter where you are. Each product is a piece of our culinary 
                  heritage, carefully crafted and lovingly packed.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Using the same traditional recipes and quality ingredients that make our restaurant 
                  meals special, Snibbles ensures that every bite reminds you of home. Whether you&apos;re 
                  in Dubai, Abu Dhabi, or anywhere in the UAE, a taste of Kerala is just an order away.
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-gray-900">4.8/5</span>
                  </div>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <span className="text-gray-600">500+ Happy Customers</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#c91432] to-[#a01026] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Order Your Snibbles Today
            </h2>
            <div className="w-24 h-1 bg-white/50 mx-auto mb-8"></div>
            <p className="text-xl mb-10 text-white/90 leading-relaxed">
              Freshly made, lovingly packed, and ready to reach your doorstep — order your Snibbles today 
              and relive the flavors of home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="bg-white text-[#c91432] hover:bg-gray-100 shadow-xl">
                  Contact Us
                </Button>
              </Link>
              <a href="tel:+971501234567">
                <Button size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white/20">
                  Call to Order
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
