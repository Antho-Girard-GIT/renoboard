import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['readdy.ai'],
  },
  experimental: {
    authInterrupts: true,
  }
};

export default nextConfig;
