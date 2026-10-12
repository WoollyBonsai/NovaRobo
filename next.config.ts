import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  eslint: {
    // Prevent non-fatal lint warnings from breaking production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;