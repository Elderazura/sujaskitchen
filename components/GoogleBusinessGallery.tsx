'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface GoogleMedia {
  id: string;
  url: string;
  thumbnail: string;
  type: string;
  date: string;
}

export default function GoogleBusinessGallery() {
  const [media, setMedia] = useState<GoogleMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGoogleMedia();
  }, []);

  const fetchGoogleMedia = async () => {
    try {
      const response = await fetch('/api/google-media');
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setMedia(data.media || []);
      }
    } catch (err) {
      console.error('Error fetching Google media:', err);
      setError('Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">{error}</p>
        <p className="text-sm text-gray-500">
          Please configure Google My Business API credentials in your environment variables.
        </p>
      </div>
    );
  }

  if (media.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {media.slice(0, 8).map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={item.thumbnail}
                alt="Google Business Photo"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
