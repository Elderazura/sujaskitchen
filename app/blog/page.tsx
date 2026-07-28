'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageHero from '@/components/shared/PageHero';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { PageCrossLinks } from '@/components/shared/PageCrossLinks';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const blogPosts = [
    {
      id: 1,
      title: 'The Art of Making Perfect Appam',
      excerpt: 'Learn the traditional method of making soft, fluffy appam with crispy edges - a Kerala breakfast favorite.',
      image: '/images/Appam-Beef-Curry-Combo_1-1.jpg',
      date: 'March 15, 2024',
      category: 'Recipes',
      slug: 'art-of-making-perfect-appam',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'Onam Sadya: A Complete Guide',
      excerpt: 'Discover the significance of each dish in a traditional Onam Sadya and why it\'s more than just a meal.',
      image: '/images/Sujas-Kitch-Onam-17.jpg',
      date: 'March 10, 2024',
      category: 'Culture',
      slug: 'onam-sadya-complete-guide',
      readTime: '8 min read',
    },
    {
      id: 3,
      title: 'Spices of Kerala: From Farm to Kitchen',
      excerpt: 'Journey through Kerala\'s spice gardens and learn how we source the finest ingredients for authentic flavors.',
      image: '/images/Sujas-Kitchen-1-scaled.jpg',
      date: 'March 5, 2024',
      category: 'Ingredients',
      slug: 'spices-of-kerala',
      readTime: '6 min read',
    },
    {
      id: 4,
      title: 'Traditional Kerala Cooking Methods',
      excerpt: 'Explore the age-old cooking techniques that make Kerala cuisine unique and flavorful.',
      image: '/images/SJK-image-5-1-scaled.jpg',
      date: 'February 28, 2024',
      category: 'Cooking',
      slug: 'traditional-kerala-cooking-methods',
      readTime: '7 min read',
    },
    {
      id: 5,
      title: 'The History of Kerala Cuisine',
      excerpt: 'Dive into the rich history and cultural influences that shaped Kerala\'s diverse culinary landscape.',
      image: '/images/Sujas-Kitchen-scaled.jpg',
      date: 'February 20, 2024',
      category: 'History',
      slug: 'history-of-kerala-cuisine',
      readTime: '10 min read',
    },
    {
      id: 6,
      title: 'Catering for Large Events: Tips and Tricks',
      excerpt: 'Learn how we prepare authentic Kerala meals for events of all sizes while maintaining quality and flavor.',
      image: '/images/sujas-banquet.webp',
      date: 'February 15, 2024',
      category: 'Catering',
      slug: 'catering-large-events',
      readTime: '9 min read',
    },
  ];

  const categories = ['All', 'Recipes', 'Culture', 'Ingredients', 'Cooking', 'History', 'Catering'];

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section with Parallax */}
        <PageHero
          image="/images/Sujas-Kitchen-scaled.jpg"
          alt="Suja's Kitchen journal"
          eyebrow="The journal"
          title="Stories & recipes from the kitchen"
          subtitle="Kerala cooking notes, seasonal reads, and what the kitchen is making now."
        />

        {/* Category Filter */}
        <section className="py-8 bg-white border-b sticky top-0 z-30 backdrop-blur-sm bg-white/95">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? 'bg-brand hover:bg-brand-hover text-white'
                      : 'border-brand-dark/15 hover:border-brand hover:text-brand'
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-20 bg-gradient-to-b from-paper to-paper-deep">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-brand-mid">No posts found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, idx) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-brand group">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-brand text-white">{post.category}</Badge>
                        </div>
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                            <ArrowRight className="w-5 h-5 text-brand" />
                          </div>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-4 text-sm text-brand-mid mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                          </div>
                          <div className="h-4 w-px bg-brand-dark/20"></div>
                          <span>{post.readTime}</span>
                        </div>
                        <CardTitle className="text-xl group-hover:text-brand transition-colors line-clamp-2">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          variant="ghost"
                          className="text-brand hover:text-brand-hover hover:bg-brand/10 p-0 group/btn"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-brand-gradient text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-section text-4xl md:text-5xl mb-6">Stay Updated</h2>
            <div className="w-16 h-px bg-brand-gold/60 mx-auto mb-8"></div>
            <p className="text-xl mb-10 text-white/90 leading-relaxed">
              Subscribe to our blog to get the latest recipes, stories, and culinary insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg text-brand-dark focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button size="lg" variant="secondary" className="bg-white text-brand hover:bg-paper-deep shadow-xl">
                Subscribe
              </Button>
            </div>
          </div>
        </section>

        <PageCrossLinks
          omit={["/blog"]}
          banner={{
            image: "/images/FISH-CURRY-bnr-1.jpg",
            alt: "Kerala fish curry",
            title: "Reading is slow. Lunch is faster.",
            subtitle:
              "When you are done browsing, the cloud kitchen menu is one tap away on Talabat or Noon.",
            href: "/kitchen/menu",
            cta: "Open menu",
            tone: "dark",
          }}
        />
      </main>
      
      <Footer />
    </div>
  );
}
