/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: process.env.ASSET_PREFIX || '',
  images: {
    domains: ['aceternity.com'], // Add 'aceternity.com' to the domains array
  },
  optimizeFonts: false,
}

module.exports = nextConfig
