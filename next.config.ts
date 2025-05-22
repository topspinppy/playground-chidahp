import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    WPGRAPHQL_URL: process.env.WPGRAPHQL_URL,
  }
};

export default nextConfig;
