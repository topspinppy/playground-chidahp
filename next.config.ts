import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    WPGRAPHQL_URL: process.env.WPGRAPHQL_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.playground.chidahp.com"
      },
    ],
  }
};

export default nextConfig;
