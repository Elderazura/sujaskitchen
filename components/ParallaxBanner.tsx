'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ParallaxBannerProps {
  image: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
}

export default function ParallaxBanner({ image, alt, children, className = '' }: ParallaxBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!bannerRef.current || !imageRef.current) return;
      
      const rect = bannerRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const bannerTop = rect.top + scrolled;
      const bannerHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate parallax offset based on scroll position relative to banner
      const scrollProgress = (scrolled + windowHeight - bannerTop) / (bannerHeight + windowHeight);
      const parallaxOffset = scrollProgress * 100;
      
      if (rect.top < window.innerHeight && rect.bottom > -bannerHeight) {
        setOffset(parallaxOffset);
      }
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={bannerRef} className={`relative w-full overflow-hidden ${className}`}>
      <div 
        ref={imageRef} 
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${offset}px)`,
          willChange: 'transform',
        }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover scale-110"
          quality={90}
        />
      </div>
      {children}
    </section>
  );
}
