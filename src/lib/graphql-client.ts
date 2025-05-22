import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(
  process.env.WPGRAPHQL_URL
);
