/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/dnd',
        destination: '/dnd/0',
      },
    ]
  },
}

module.exports = nextConfig
