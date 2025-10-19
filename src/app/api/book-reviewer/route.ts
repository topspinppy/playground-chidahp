import { NextRequest, NextResponse } from 'next/server';
import { getPostsByCategory } from '@/lib/api';

// CORS headers helper
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Max-Age': '86400',
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number.parseInt(searchParams.get('limit') || '10');
    const cursor = searchParams.get('cursor') || undefined;

    // Validate limit
    if (limit < 1 || limit > 50) {
      return NextResponse.json(
        { 
          error: 'Limit must be between 1 and 50',
          code: 'INVALID_LIMIT'
        },
        { 
          status: 400,
          headers: corsHeaders
        }
      );
    }

    const result = await getPostsByCategory('chidahp-book-reviewer', limit, cursor);

    return NextResponse.json({
      success: true,
      data: {
        posts: result.nodes,
        pagination: {
          hasNextPage: result.pageInfo.hasNextPage,
          endCursor: result.pageInfo.endCursor
        },
        meta: {
          category: 'chidahp-book-reviewer',
          total: result.nodes.length,
          limit
        }
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });

  } catch (error) {
    console.error('Error fetching book reviewer posts:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch book reviewer posts',
        code: 'FETCH_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 500,
        headers: corsHeaders
      }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}
