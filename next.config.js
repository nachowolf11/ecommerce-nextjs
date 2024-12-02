/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'livosur-web.vercel.app'
        }
      ]
    }
  }
  
  module.exports = nextConfig