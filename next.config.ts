import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'http' as const,
        hostname: 'localhost',
        port: '3000',
      },
    ],
  },
}

export default withPayload(nextConfig)
