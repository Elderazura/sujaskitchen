/** @type {import('next').NextConfig} */
const nextConfig = {
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
