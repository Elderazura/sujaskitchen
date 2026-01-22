'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart } from 'lucide-react';

interface SocialPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  date: string;
  permalink: string;
  mediaType?: string;
}

export default function SocialFeed() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchInstagramPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % Math.ceil(posts.length / 3));
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [posts.length]);

  const fetchInstagramPosts = async () => {
    try {
      const response = await fetch('/api/instagram');
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        // Fallback to static posts if API fails
        setPosts(getFallbackPosts());
      } else {
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error('Error fetching Instagram posts:', err);
      setError('Failed to load Instagram feed');
      // Fallback to static posts
      setPosts(getFallbackPosts());
    } finally {
      setLoading(false);
    }
  };

  const getFallbackPosts = (): SocialPost[] => [
    {
      id: '1',
      image: '/images/Sujas-Onam-1.jpeg',
      caption: 'Onam Sadya preparations in full swing!',
      likes: 234,
      date: '2 days ago',
      permalink: 'https://instagram.com/sujaskitchen',
    },
    {
      id: '2',
      image: '/images/Sujas-Catering-9-1-scaled.jpg',
      caption: 'Corporate event catering - another successful celebration!',
      likes: 189,
      date: '5 days ago',
      permalink: 'https://instagram.com/sujaskitchen',
    },
    {
      id: '3',
      image: '/images/Sujas-Kitch-Onam-17.jpg',
      caption: 'Fresh fish curry ready for delivery!',
      likes: 312,
      date: '1 week ago',
      permalink: 'https://instagram.com/sujaskitchen',
    },
    {
      id: '4',
      image: '/images/Sujas-snacks.jpg',
      caption: 'Homemade Kerala snacks - perfect for tea time!',
      likes: 278,
      date: '1 week ago',
      permalink: 'https://instagram.com/sujaskitchen',
    },
    {
      id: '5',
      image: '/images/sujas-kitchen-christmas-lunch.jpg',
      caption: 'Christmas special menu now available!',
      likes: 445,
      date: '2 weeks ago',
      permalink: 'https://instagram.com/sujaskitchen',
    },
    {
      id: '6',
      image: '/images/Sujas-Kitchen-1-scaled.jpg',
      caption: 'Our kitchen team preparing today\'s fresh meals!',
      likes: 156,
      date: '2 weeks ago',
      permalink: 'https://instagram.com/sujaskitchen',
    },
  ];

  const visiblePosts = posts.slice(currentIndex * 3, (currentIndex * 3) + 3);

  if (loading) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <Skeleton className="h-64 w-full" />
              <CardContent className="p-6">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error && posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">{error}</p>
        <p className="text-sm text-gray-500">
          Please configure Instagram API credentials in your environment variables.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visiblePosts.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                {post.mediaType === 'VIDEO' ? (
                  <video
                    src={post.image}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    muted
                    playsInline
                  />
                ) : (
                  <Image
                    src={post.image}
                    alt={post.caption || 'Instagram post'}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                <div className="absolute top-4 right-4 bg-[#c91432] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Instagram
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-700 mb-4 line-clamp-2">{post.caption}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[#c91432] fill-[#c91432]" />
                    <span>{post.likes}</span>
                  </div>
                  <span>{post.date}</span>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
      
      {posts.length > 3 && (
        <div className="flex justify-center mt-8 gap-2">
          {[...Array(Math.ceil(posts.length / 3))].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-[#c91432] w-8' : 'bg-gray-300 w-2'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
