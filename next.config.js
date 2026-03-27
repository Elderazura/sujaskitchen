/** @type {import('next').NextConfig} */
const nextConfig = {
  // Reduces dev-only double-mount issues with animation libs (Framer, etc.)
  reactStrictMode: false,
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/menu",
        destination: "/kitchen/menu",
        permanent: true,
      },
    ];
  },
  images: {
    qualities: [75, 85, 88, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sujaskitchen.com',
      },
      {
        protocol: 'https',
        hostname: 'www.sujaskitchen.com',
      },
      {
        protocol: 'https',
        hostname: '**.sujaskitchen.com',
      },
    ],
  },
}

module.exports = nextConfig
