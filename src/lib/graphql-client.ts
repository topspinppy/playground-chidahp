/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLClient } from "graphql-request";

// 1. Setup GraphQL client
const client = new GraphQLClient(process.env.WPGRAPHQL_URL!);

// 2. Simplified GraphQL request (no cache, no Redis)
export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  return client.request<T>(query, variables);
}