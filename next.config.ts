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
      {
        protocol: "https",
        hostname: "secure.gravatar.com"
      }
    ],
  }
};

export default nextConfig;
