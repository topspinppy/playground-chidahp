/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLClient } from "graphql-request";
import { Redis } from "@upstash/redis";
import crypto from "crypto";

// 1. Setup GraphQL client
const client = new GraphQLClient(process.env.WPGRAPHQL_URL!);

// 2. Setup Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// 3. Utility: Generate unique cache key from query + variables
function getCacheKey(query: string, variables?: Record<string, any>) {
  const keyString = query + JSON.stringify(variables || {});
  return "graphql:" + crypto.createHash("sha1").update(keyString).digest("hex");
}

// 4. Cached GraphQL request function
export async function cachedGraphQLRequest<T = any>(
  query: string,
  variables?: Record<string, any>,
  ttlSeconds: number = 60
): Promise<T> {
  const key = getCacheKey(query, variables);

  // Try cache first
  const cached = await redis.get<T>(key);
  if (cached) return cached;

  // No cache — fetch
  const data = await client.request<T>(query, variables);

  // Cache the result with TTL
  await redis.set(key, data, { ex: ttlSeconds });

  return data;
}
