// /app/api/gql-proxy/route.ts (Next.js App Router)
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const gqlRes = await fetch("https://api.playground.chidahp.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const data = await gqlRes.text();
  return new Response(data, {
    status: gqlRes.status,
    headers: { "Content-Type": "application/json" },
  });
}
