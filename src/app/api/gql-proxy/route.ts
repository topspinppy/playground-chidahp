import { NextRequest, NextResponse } from "next/server";

const GRAPHQL_ENDPOINT = "https://api.playground.chidahp.com/graphql";
const REQUEST_TIMEOUT = 7000;
const CONTENT_TYPE_JSON = "application/json";

const ERROR_MESSAGES = {
  TIMEOUT: "GraphQL API ช้าหรือไม่ตอบสนอง",
  NETWORK: "ไม่สามารถเชื่อมต่อกับ GraphQL API ได้",
  INVALID_REQUEST: "คำขอไม่ถูกต้อง",
} as const;


interface ErrorResponse {
  message: string;
  error?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.text();
    
    if (!body.trim()) {
      return NextResponse.json(
        { message: ERROR_MESSAGES.INVALID_REQUEST } satisfies ErrorResponse,
        { status: 400 }
      );
    }

    let parsedBody;
    try {
      parsedBody = JSON.parse(body);
    } catch {
      return NextResponse.json(
        { message: ERROR_MESSAGES.INVALID_REQUEST } satisfies ErrorResponse,
        { status: 400 }
      );
    }

    if (!parsedBody.query) {
      return NextResponse.json(
        { message: ERROR_MESSAGES.INVALID_REQUEST } satisfies ErrorResponse,
        { status: 400 }
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      const gqlRes = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
          ...(req.headers.get("authorization") && {
            Authorization: req.headers.get("authorization")!,
          }),
        },
        body,
        signal: controller.signal,
      });

      clearTimeout(timeout);
      
      const responseHeaders: Record<string, string> = {
        "Content-Type": CONTENT_TYPE_JSON,
      };

      const corsHeaders = [
        "access-control-allow-origin",
        "access-control-allow-credentials",
        "access-control-expose-headers",
      ];
      
      corsHeaders.forEach((header) => {
        const value = gqlRes.headers.get(header);
        if (value) {
          responseHeaders[header] = value;
        }
      });

      if (gqlRes.ok) {
        const data = await gqlRes.text();
        return new NextResponse(data, {
          status: gqlRes.status,
          headers: responseHeaders,
        });
      } else {
        const errorData = await gqlRes.text();
        let errorMessage: ErrorResponse;
        
        try {
          const parsedError = JSON.parse(errorData);
          errorMessage = {
            message: parsedError.errors?.[0]?.message || parsedError.message || "GraphQL request failed",
            error: parsedError.errors?.[0]?.extensions?.code,
          };
        } catch {
          errorMessage = { message: "GraphQL request failed" };
        }

        return NextResponse.json(errorMessage, {
          status: gqlRes.status,
          headers: responseHeaders,
        });
      }
    } catch (fetchError) {
      clearTimeout(timeout);
      
      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        return NextResponse.json(
          { message: ERROR_MESSAGES.TIMEOUT } satisfies ErrorResponse,
          { status: 504 }
        );
      }

      return NextResponse.json(
        { message: ERROR_MESSAGES.NETWORK } satisfies ErrorResponse,
        { status: 503 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { 
        message: ERROR_MESSAGES.INVALID_REQUEST,
        error: error instanceof Error ? error.message : "Unknown error"
      } satisfies ErrorResponse,
      { status: 400 }
    );
  }
}
