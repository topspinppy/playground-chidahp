import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase';

// POST /api/articles/[id]/sync-wordpress - Sync article to WordPress
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createSupabaseClient();
    
    // Get the article from Supabase
    const { data: article, error: fetchError } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching article:', fetchError);
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    // TODO: Implement WordPress API integration
    // This is a mock implementation
    const wordpressResponse = await syncToWordPress(article);
    console.log('WordPress API response:', wordpressResponse);
    if (wordpressResponse.success) {
      // Update article with WordPress ID
      const { data: updatedArticle, error: updateError } = await supabase
        .from('articles')
        .update({
          wordpress_id: wordpressResponse.wordpress_id,
          wordpress_synced: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating article with WordPress ID:', updateError);
        return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
      }

      return NextResponse.json({ 
        message: 'Article synced to WordPress successfully',
        article: updatedArticle,
        wordpress_id: wordpressResponse.wordpress_id
      });
    } else {
      return NextResponse.json({ 
        error: 'Failed to sync to WordPress',
        details: wordpressResponse.error
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in POST /api/articles/[id]/sync-wordpress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// WordPress sync function using real API
async function syncToWordPress(articleData: { id: string; title: string; content: string; excerpt: string; status: string; category: string; tags: string[] }) {
  try {
    const response = await fetch(process.env.WORDPRESS_API_URL || 'https://api.playground.chidahp.com/wp-json/chidahp-affiliate/v1/submit-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WORDPRESS_API_TOKEN}`
      },
      body: JSON.stringify({
        user_id: parseInt(process.env.WORDPRESS_DEFAULT_USER_ID || '16'), // Default user_id for Chulo Reviewer
        title: articleData.title,
        content: articleData.content,
        excerpt: articleData.excerpt,
        categories: [parseInt(process.env.WORDPRESS_DEFAULT_CATEGORY_ID || '107')], // Always use category 107 (Chulo Reviewer)
        tags: articleData.tags
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`WordPress API error: ${response.status} - ${errorText}`);
    }

    const wordpressPost = await response.json();
    
    console.log('WordPress API success response:', wordpressPost);

    
    return {
      success: true,
      wordpress_id: wordpressPost.post_id,
      wordpress_data: wordpressPost
    };
  } catch (error) {
    console.error('WordPress sync error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Helper function to get WordPress category ID
// function getWordPressCategoryId(category: string): number {
//   // Only Chulo Reviewer category is supported
//   return 107; // WordPress tag_ID for Chulo Reviewer
// }
