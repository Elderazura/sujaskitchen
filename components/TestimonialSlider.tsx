'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Testimonial {
  id: string;
  name: string;
  location?: string;
  text: string;
  rating: number;
  profilePhoto?: string | null;
  date?: string;
  reply?: string | null;
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    location: 'Dubai',
    text: 'The best Kerala food in UAE! Every dish reminds me of home. The Onam Sadya was absolutely authentic.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Priya Menon',
    location: 'Abu Dhabi',
    text: 'Suja\'s Kitchen has been our go-to for family gatherings. The catering service is exceptional and the food is always fresh.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Mohammed Ali',
    location: 'Dubai',
    text: 'Authentic flavors and traditional recipes. The fish curry is outstanding! Highly recommended.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Anita Nair',
    location: 'Dubai',
    text: 'As someone from Kerala, I can vouch for the authenticity. The appam and beef curry combo is my favorite!',
    rating: 5,
  },
];

export default function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchGoogleReviews();
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const fetchGoogleReviews = async () => {
    try {
      const response = await fetch('/api/google-reviews');
      const data = await response.json();

      if (data.error) {
        console.error('Error fetching Google reviews:', data.error);
        // Use fallback testimonials
        setTestimonials(fallbackTestimonials);
      } else if (data.reviews && data.reviews.length > 0) {
        setTestimonials(data.reviews);
      }
    } catch (err) {
      console.error('Error fetching Google reviews:', err);
      // Use fallback testimonials
      setTestimonials(fallbackTestimonials);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="relative w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-4 w-20 mb-4" />
                <Skeleton className="h-16 w-full mb-6" />
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card
            key={testimonial.id}
            className={`transition-all duration-500 ${
              index === currentIndex
                ? 'scale-105 shadow-2xl border-[#c91432]'
                : 'opacity-70 scale-95'
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                &quot;{testimonial.text}&quot;
              </p>
              {testimonial.reply && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg border-l-4 border-[#c91432]">
                  <p className="text-xs font-semibold text-[#c91432] mb-1">Owner Response</p>
                  <p className="text-xs text-gray-600">{testimonial.reply}</p>
                </div>
              )}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <Avatar className="h-10 w-10">
                  {testimonial.profilePhoto ? (
                    <AvatarImage src={testimonial.profilePhoto} alt={testimonial.name} />
                  ) : null}
                  <AvatarFallback className="bg-[#c91432] text-white font-semibold">
                    {testimonial.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                  {testimonial.location && (
                    <p className="text-gray-500 text-xs">{testimonial.location}</p>
                  )}
                  {testimonial.date && (
                    <p className="text-gray-400 text-xs">{testimonial.date}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-[#c91432] w-8' : 'bg-gray-300 w-2'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
