import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000); // 7s timeout

  try {
    const gqlRes = await fetch("https://api.playground.chidahp.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const data = await gqlRes.text();

    return new Response(data, {
      status: gqlRes.status,
      headers: { "Content-Type": "application/json" },
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "GraphQL API ช้าหรือไม่ตอบสนอง" }),
      {
        status: 504,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
