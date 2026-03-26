/** @type {import('next').NextConfig} */
const nextConfig = {
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
