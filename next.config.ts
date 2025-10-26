import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    WPGRAPHQL_URL: process.env.WPGRAPHQL_URL,
    WEB_URL: process.env.WEB_URL,
    WORDPRESS_API_TOKEN: process.env.WORDPRESS_API_TOKEN,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.playground.chidahp.com"
      },
      {
        protocol: "https",
        hostname: "playground.chidahp.com"
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com"
      }
    ],
    unoptimized: true,
  }
};

export default nextConfig;
