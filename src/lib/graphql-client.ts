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

// 3. Utility: Generate unique cache key from query + variables + namespace
function getCacheKey(
  query: string,
  variables?: Record<string, unknown>,
  namespace = "graphql"
) {
  const keyString = query + JSON.stringify(variables || {});
  const hash = crypto.createHash("sha1").update(keyString).digest("hex");
  return `${namespace}:${hash}`;
}

// 4. Cached GraphQL request with flexible TTL + namespace
export async function cachedGraphQLRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: {
    ttl?: number; // in seconds
    namespace?: string; // custom key prefix
    fallback?: boolean; // allow fallback to direct request if Redis fails
  }
): Promise<T> {
  const ttl = options?.ttl ?? 3600; // default 1 hour
  const namespace = options?.namespace ?? "graphql";
  const key = getCacheKey(query, variables, namespace);

  try {
    const cached = await redis.get<T>(key);
    if (cached) return cached;

    const data = await client.request<T>(query, variables);
    await redis.set(key, data, { ex: ttl });

    return data;
  } catch (error) {
    if (options?.fallback !== false) {
      return client.request<T>(query, variables);
    }
    throw error;
  }
}

// 5. Optional manual invalidation function
export async function invalidateGraphQLCache(
  query: string,
  variables?: Record<string, unknown>,
  namespace = "graphql"
) {
  const key = getCacheKey(query, variables, namespace);
  await redis.del(key);
}
