/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  experimental: {
    forceSwcTransforms: true,
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_BASE_WEB: process.env.NEXT_PUBLIC_BASE_WEB
  }
}

module.exports = nextConfig
