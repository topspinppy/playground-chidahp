import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase';
import { updateWordPressPost } from '@/lib/wordpress';

// GET /api/articles/[id] - Get single article
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createSupabaseClient();
    
    const { data: article, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching article:', error);
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ article });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

// PUT /api/articles/[id] - Update article
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, slug, content, excerpt, tags, status } = body;
    // Validate slug format if provided
    if (slug && !/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        { error: 'Slug must contain only lowercase English letters, numbers, and hyphens' },
        { status: 400 }
      );
    }

    const supabase = createSupabaseClient();

    // First, get the current article to check if it's synced with WordPress
    const { data: currentArticle, error: fetchError } = await supabase
      .from('articles')
      .select('wordpress_id, wordpress_synced')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching current article:', fetchError);
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    // Update article in Supabase first
    const { data: article, error } = await supabase
      .from('articles')
      .update({
        title,
        slug,
        content,
        excerpt,
        category: 'chulo-reviewer', // Force category to chulo-reviewer
        tags,
        status,
        wordpress_category_id: 107,
        wordpress_category_slug: 'chidahp-book-reviewer',
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating article:', error);
      return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
    }

    // If article is synced with WordPress, update it there too
    if (currentArticle.wordpress_synced && currentArticle.wordpress_id) {
      try {
        const wordpressResponse = await updateWordPressPost({
          post_id: currentArticle.wordpress_id,
          slug: slug || article.slug,
          title: title || article.title,
          content: content || article.content,
          excerpt: excerpt || article.excerpt || '',
          tags: tags || article.tags || []
        });

        if (!wordpressResponse.success) {
          console.error('Failed to update WordPress post:', wordpressResponse.message);
          // Don't fail the entire request, just log the error
          // The article is still updated in Supabase
        } else {
          console.log('Successfully updated WordPress post:', currentArticle.wordpress_id);
        }
      } catch (error) {
        console.error('Error updating WordPress post:', error);
        // Don't fail the entire request, just log the error
      }
    }

    return NextResponse.json({ article });
  } catch (error) {
    console.error('Error in PUT /api/articles/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/articles/[id] - Delete article
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createSupabaseClient();

    // First get the article to check if it's synced to WordPress
    const { data: article, error: fetchError } = await supabase
      .from('articles')
      .select('wordpress_id, wordpress_synced')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching article for deletion:', fetchError);
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    // Delete from Supabase
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting article:', error);
      return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
    }

    // Delete from WordPress if synced
    if (article.wordpress_synced && article.wordpress_id) {
      try {
        const wordpressResponse = await fetch(
          `https://api.playground.chidahp.com/wp-json/chidahp-affiliate/v1/delete-post/${article.wordpress_id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.WORDPRESS_API_TOKEN}`,
            },
          }
        );
        console.log(wordpressResponse);
        if (!wordpressResponse.ok) {
          console.error('Failed to delete from WordPress:', wordpressResponse.status, wordpressResponse.statusText);
        } else {
          console.log('Successfully deleted from WordPress:', article.wordpress_id);
        }
      } catch (error) {
        console.error('Error deleting from WordPress:', error);
      }
    }

    return NextResponse.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/articles/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
