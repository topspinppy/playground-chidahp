import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase';

// GET /api/articles - Get all articles
export async function GET() {
  try {
    const supabase = createSupabaseClient();
    
    const { data: articles, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error);
      return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    }

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error in GET /api/articles:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/articles - Create new article (WordPress first, then Supabase)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, content, excerpt, tags, status, user_id } = body;

    // Validate required fields
    if (!title || !content || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, and content are required' },
        { status: 400 }
      );
    }

    // Validate slug format (English only)
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        { error: 'Slug must contain only lowercase English letters, numbers, and hyphens' },
        { status: 400 }
      );
    }

    // Step 1: Create article in WordPress first
    const wordpressResponse = await createWordPressPost({
      user_id: user_id || parseInt(process.env.WORDPRESS_DEFAULT_USER_ID || '16'), // Default user_id or use provided one
      title,
      content,
      excerpt: excerpt || '',
      categories: [parseInt(process.env.WORDPRESS_DEFAULT_CATEGORY_ID || '107')], // Always use category 107 (Chulo Reviewer)
      tags: tags || []
    });

    if (!wordpressResponse.success) {
      console.error('WordPress creation failed:', wordpressResponse.error);
      return NextResponse.json(
        { error: `WordPress creation failed: ${wordpressResponse.error}` },
        { status: 500 }
      );
    }

    // Step 2: Only if WordPress creation succeeds, save to Supabase
    const supabase = createSupabaseClient();
    const { data: article, error } = await supabase
      .from('articles')
      .insert({
        title,
        slug,
        content,
        excerpt: excerpt || '',
        category: 'chulo-reviewer', // Force category to chulo-reviewer
        tags: tags || [],
        status: status || 'draft',
        author_id: null, // Set to null since we don't have UUID for WordPress user_id
        author_name: 'Chulo Reviewer',
        wordpress_id: wordpressResponse.wordpress_id,
        wordpress_synced: true, // Mark as synced since we created it in WordPress first
        wordpress_category_id: 107,
        wordpress_category_slug: 'chidahp-book-reviewer'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating article in Supabase:', error);
      // If Supabase fails, we should ideally delete from WordPress too
      // But for now, we'll just return an error
      return NextResponse.json({ error: 'Failed to save article to database' }, { status: 500 });
    }

    return NextResponse.json({ article }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/articles:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Function to create post in WordPress
async function createWordPressPost(postData: {
  user_id: number;
  title: string;
  content: string;
  excerpt: string;
  categories: number[];
  tags: string[];
}) {
  try {
    const response = await fetch(process.env.WORDPRESS_API_URL || 'https://api.playground.chidahp.com/wp-json/chidahp-affiliate/v1/submit-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WORDPRESS_API_TOKEN || 'SKKouBZJHhWOwd4HWbybBv3xZBne9yjk'}`
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`WordPress API error: ${response.status} - ${errorText}`);
    }
    
    const wordpressPost = await response.json();
    return {
      success: true,
      wordpress_id: wordpressPost.data['post_id'],
      wordpress_data: wordpressPost
    };
  } catch (error) {
    console.error('WordPress API error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
