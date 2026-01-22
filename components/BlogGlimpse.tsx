'use client';

import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Art of Making Perfect Appam',
    excerpt: 'Learn the traditional method of making soft, fluffy appam with crispy edges - a Kerala breakfast favorite.',
    image: '/images/Appam-Beef-Curry-Combo_1-1.jpg',
    date: 'March 15, 2024',
    category: 'Recipes',
  },
  {
    id: 2,
    title: 'Onam Sadya: A Complete Guide',
    excerpt: 'Discover the significance of each dish in a traditional Onam Sadya and why it\'s more than just a meal.',
    image: '/images/Sujas-Kitch-Onam-17.jpg',
    date: 'March 10, 2024',
    category: 'Culture',
  },
  {
    id: 3,
    title: 'Spices of Kerala: From Farm to Kitchen',
    excerpt: 'Journey through Kerala\'s spice gardens and learn how we source the finest ingredients for authentic flavors.',
    image: '/images/Sujas-Kitchen-1-scaled.jpg',
    date: 'March 5, 2024',
    category: 'Ingredients',
  },
];

export default function BlogGlimpse() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link
            key={post.id}
            href="#"
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-[#c91432] text-white px-3 py-1 rounded-full text-sm font-semibold">
                {post.category}
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#c91432] transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 leading-relaxed line-clamp-2">{post.excerpt}</p>
              <div className="mt-4 flex items-center text-[#c91432] font-semibold group-hover:gap-2 transition-all">
                Read More
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
