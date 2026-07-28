'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ParallaxBanner from '@/components/ParallaxBanner';
import Image from 'next/image';
import { Download, ShoppingCart, Users, UtensilsCrossed, ChefHat, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { PageCrossLinks } from '@/components/shared/PageCrossLinks';
import CTAButton from '@/components/shared/CTAButton';
import { Reveal } from '@/components/motion/Reveal';

export default function Menu() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuTypes = [
    {
      id: 'kerala',
      name: 'Kerala Menu',
      description: 'South Indian cuisine with Kerala flavours. From spicy curries to sweet payasam, the taste people here grew up with.',
      image: '/images/Sujas-Kitch-Onam-17.jpg',
      features: ['Traditional Sadya', 'Kerala Curries', 'Appam & Stew', 'Kerala Snacks'],
      downloadUrl: '/menus/kerala-menu.pdf',
    },
    {
      id: 'north-indian',
      name: 'North Indian Menu',
      description: 'Rich and aromatic North Indian dishes. From creamy butter chicken to flavorful biryanis, indulge in the royal flavors of North India.',
      image: '/images/Sujas-Kitchen-1-scaled.jpg',
      features: ['Biryani Varieties', 'Tandoori Specials', 'North Indian Curries', 'Bread Selection'],
      downloadUrl: '/menus/north-indian-menu.pdf',
    },
    {
      id: 'continental',
      name: 'Continental Menu',
      description: 'International favorites with a touch of Kerala. From pasta to grilled specialties, enjoy global flavors prepared with local expertise.',
      image: '/images/sujas-kitchen-christmas-lunch.jpg',
      features: ['Pasta Varieties', 'Grilled Specials', 'Continental Soups', 'Dessert Selection'],
      downloadUrl: '/menus/continental-menu.pdf',
    },
    {
      id: 'arabic',
      name: 'Arabic Menu',
      description: 'Middle Eastern dishes. From shawarma to mandi, rich and aromatic flavours from the Gulf table.',
      image: '/images/Sujas-Catering-9-1-scaled.jpg',
      features: ['Shawarma', 'Mandi & Kabsa', 'Arabic Mezze', 'Grilled Meats'],
      downloadUrl: '/menus/arabic-menu.pdf',
    },
  ];

  const topDishes = [
    {
      name: 'Kerala Sadya',
      description: 'Complete traditional feast with 20+ dishes',
      image: '/images/Sujas-Kitch-Onam-17.jpg',
      category: 'Kerala',
    },
    {
      name: 'Appam & Beef Curry',
      description: 'Soft appam with spicy Kerala beef curry',
      image: '/images/Appam-Beef-Curry-Combo_1-1.jpg',
      category: 'Kerala',
    },
    {
      name: 'Fish Curry',
      description: 'Tangy coconut-based fish curry',
      image: '/images/FISH-CURRY-bnr-1.jpg',
      category: 'Kerala',
    },
    {
      name: 'Parotta & Beef Curry',
      description: 'Flaky parotta with traditional beef curry',
      image: '/images/Parotta-Beef-Curry-Combo-scaled.jpg',
      category: 'Kerala',
    },
    {
      name: 'Ghee Rice',
      description: 'Fragrant basmati rice with ghee and spices',
      image: '/images/Ghee-Rice-scaled.jpg',
      category: 'Kerala',
    },
    {
      name: 'Kerala Snacks',
      description: 'Traditional tea-time snacks and treats',
      image: '/images/Sujas-snacks.jpg',
      category: 'Kerala',
    },
  ];

  const deliveryPlatforms = [
    {
      name: 'Talabat',
      url: 'https://www.talabat.com',
      color: '#FF6600',
    },
    {
      name: 'Noon',
      url: 'https://www.noon.com',
      color: '#FF6600',
    },
    {
      name: 'Careem',
      url: 'https://www.careem.com',
      color: '#00D9FF',
    },
  ];

  const handleDownload = (menuType: string, url: string) => {
    // In a real implementation, this would download the PDF
    // For now, we'll create a placeholder
    const link = document.createElement('a');
    link.href = url;
    link.download = `${menuType}-menu.pdf`;
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section with Parallax */}
        <ParallaxBanner
          image="/images/Sujas-Kitchen-scaled.jpg"
          alt="Suja's Kitchen menu — Kerala and multi-cuisine spreads"
          className="h-[70vh] min-h-[600px] flex items-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
          <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-display text-5xl md:text-7xl mb-6 drop-shadow-2xl animate-fade-in">
              Our Menu
            </h1>
            <p className="text-body-editorial text-xl md:text-2xl text-gray-100 drop-shadow-lg max-w-2xl mx-auto animate-slide-up">
              Discover our diverse culinary offerings across multiple cuisines
            </p>
          </div>
        </ParallaxBanner>

        {/* Menu Introduction */}
        <Reveal>
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-section text-4xl md:text-5xl text-gray-900 mb-6">
                A World of Flavors
              </h2>
              <div className="w-24 h-1 bg-brand mx-auto mb-6"></div>
              <p className="text-body-editorial text-xl text-gray-700 max-w-3xl mx-auto">
                At Suja&apos;s Kitchen, we cook across cuisines without cutting corners. Kerala,
                North Indian, Continental, and Arabic — each line is held to the same small-batch
                standard Suja set in 1999.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-brand/10 rounded-full p-3">
                    <UtensilsCrossed className="w-8 h-8 text-brand" />
                  </div>
                  <h3 className="text-section text-2xl text-gray-900">Fresh Daily Preparation</h3>
                </div>
                <p className="text-body-editorial text-gray-700">
                  Every dish is prepared fresh that day using recipes Suja still signs off on, and
                  ingredients we would use at home. No compromises on taste or freshness.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-brand/10 rounded-full p-3">
                    <ChefHat className="w-8 h-8 text-brand" />
                  </div>
                  <h3 className="text-section text-2xl text-gray-900">Expert Chefs</h3>
                </div>
                <p className="text-body-editorial text-gray-700">
                  Our team brings years of practice in each cuisine, so the details — spice level,
                  texture, timing — land where they should.
                </p>
              </div>
            </div>
          </div>
        </section>
        </Reveal>

        {/* Menu Types - Download Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-section text-4xl md:text-5xl text-gray-900 mb-4">
                Explore Our Menus
              </h2>
              <p className="text-body-editorial text-xl text-gray-600 max-w-2xl mx-auto">
                Download our complete menus and discover the variety we offer
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {menuTypes.map((menu, idx) => (
                <Card
                  key={menu.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group border-2 border-transparent hover:border-brand"
                  style={{
                    animationDelay: `${idx * 150}ms`,
                  }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={menu.image}
                      alt={menu.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-brand text-white text-sm px-3 py-1">
                        {menu.name.split(' ')[0]}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-section text-2xl group-hover:text-brand transition-colors">
                      {menu.name}
                    </CardTitle>
                    <CardDescription className="text-body-editorial">
                      {menu.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {menu.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={() => handleDownload(menu.id, menu.downloadUrl)}
                      className="w-full bg-brand hover:bg-brand-hover text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download {menu.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Top Dishes Showcase */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-section text-4xl md:text-5xl text-gray-900 mb-4">
                Our Signature Dishes
              </h2>
              <p className="text-body-editorial text-xl text-gray-600 max-w-2xl mx-auto">
                Customer favorites that define our culinary excellence
              </p>
              <div className="w-24 h-1 bg-brand mx-auto mt-6"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {topDishes.map((dish, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer"
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
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Badge className="bg-brand text-white text-xs mb-2">{dish.category}</Badge>
                    <h3 className="text-section text-white text-sm md:text-base">{dish.name}</h3>
                    <p className="text-caption text-gray-200 mt-1 line-clamp-1">{dish.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Platforms Banner */}
        <section className="py-20 bg-brand-gradient text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-section text-4xl md:text-5xl mb-4">
                Order Online Now
              </h2>
              <p className="text-body-editorial text-xl text-white/90 max-w-2xl mx-auto mb-8">
                We&apos;re available on all major delivery platforms. Order your favorite dishes 
                and have them delivered fresh to your doorstep.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {deliveryPlatforms.map((platform, idx) => (
                <a
                  key={idx}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group border-2 border-white/20 hover:border-white/40"
                >
                  <div className="text-center">
                    <div 
                      className="bg-white rounded-xl p-8 mb-4 group-hover:shadow-xl transition-shadow flex items-center justify-center"
                      style={{ minHeight: '120px' }}
                    >
                      <div className="text-center">
                        <div 
                          className="text-4xl font-bold mb-2"
                          style={{ color: platform.color }}
                        >
                          {platform.name}
                        </div>
                        <div className="text-sm text-gray-600">Available Now</div>
                      </div>
                    </div>
                    <p className="text-white/90 font-semibold">Order on {platform.name}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-white/80 mb-4">Also available on:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="bg-white/20 text-white px-4 py-2 text-sm">Uber Eats</Badge>
                <Badge className="bg-white/20 text-white px-4 py-2 text-sm">Deliveroo</Badge>
                <Badge className="bg-white/20 text-white px-4 py-2 text-sm">Zomato</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Bulk Order Banner */}
        <ParallaxBanner
          image="/images/sujas-banquet.webp"
          alt="Bulk Orders"
          className="py-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
          <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-brand rounded-full p-4">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-section text-4xl md:text-5xl text-gray-900">
                  Bulk Orders
                </h2>
              </div>
              <p className="text-body-editorial text-lg text-gray-700 mb-6">
                Planning a large gathering or office lunch? We offer special pricing and dedicated 
                service for bulk orders. Perfect for corporate events, family celebrations, or 
                community gatherings.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand"></div>
                  <span className="text-body-editorial text-gray-700">Minimum 10 portions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand"></div>
                  <span className="text-body-editorial text-gray-700">Special pricing available</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand"></div>
                  <span className="text-body-editorial text-gray-700">Advance booking required</span>
                </div>
              </div>
              <CTAButton href="/contact">
                Request Bulk Order Quote
              </CTAButton>
            </div>
          </div>
        </ParallaxBanner>

        {/* Catering CTA Banner */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-brand rounded-full p-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-section text-4xl md:text-5xl">
                    Catering Services
                  </h2>
                </div>
                <p className="text-body-editorial text-xl text-gray-300 mb-6">
                  Make your event memorable with our professional catering services. From intimate 
                  family gatherings to large corporate events, we create customized menus that 
                  showcase the best of our diverse cuisine offerings.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-brand" />
                    <span className="text-body-editorial text-gray-300">Customized menus for every occasion</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-brand" />
                    <span className="text-body-editorial text-gray-300">Professional setup and service</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-brand" />
                    <span className="text-body-editorial text-gray-300">Multiple cuisine options available</span>
                  </div>
                </div>
                <CTAButton href="/catering">
                  Explore Catering Options
                </CTAButton>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src="/images/sujas-banquet.webp"
                  alt="Catering Services"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Menu Variety Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-section text-4xl md:text-5xl text-gray-900 mb-4">
                Why Choose Our Menus?
              </h2>
              <div className="w-24 h-1 bg-brand mx-auto mb-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl hover:shadow-xl transition-all duration-300">
                <div className="bg-brand/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <UtensilsCrossed className="w-8 h-8 text-brand" />
                </div>
                <h3 className="text-section text-xl text-gray-900 mb-3">Diverse Cuisines</h3>
                <p className="text-body-editorial text-gray-600 text-sm">
                  From Kerala to North Indian, Continental to Arabic - we offer something for everyone
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl hover:shadow-xl transition-all duration-300">
                <div className="bg-brand/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <ChefHat className="w-8 h-8 text-brand" />
                </div>
                <h3 className="text-section text-xl text-gray-900 mb-3">Held recipes</h3>
                <p className="text-body-editorial text-gray-600 text-sm">
                  Dishes traced to family kitchens and Kerala tables, cooked the slow way
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl hover:shadow-xl transition-all duration-300">
                <div className="bg-brand/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-brand" />
                </div>
                <h3 className="text-section text-xl text-gray-900 mb-3">Fresh Ingredients</h3>
                <p className="text-body-editorial text-gray-600 text-sm">
                  Sourced from suppliers we trust, with freshness you can taste in every dish
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl hover:shadow-xl transition-all duration-300">
                <div className="bg-brand/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-8 h-8 text-brand" />
                </div>
                <h3 className="text-section text-xl text-gray-900 mb-3">Easy Ordering</h3>
                <p className="text-body-editorial text-gray-600 text-sm">
                  Available on all major delivery platforms for your convenience
                </p>
              </div>
            </div>
          </div>
        </section>

        <PageCrossLinks
          omit={["/kitchen/menu", "/kitchen"]}
          banner={{
            image: "/images/Sujas-Onam-1.jpeg",
            alt: "Kerala festive meal",
            title: "Menus are PDFs. The kitchen is live.",
            subtitle:
              "Seasonal sadhyas and hall-sized catering use the same spice tray. Plan the calendar or order for tonight.",
            href: "/seasonal",
            cta: "Seasonal hub",
            tone: "dark",
          }}
        />
      </main>
      
      <Footer />
    </div>
  );
}
