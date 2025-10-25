import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase';

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
  } catch (error) {
    console.error('Error in GET /api/articles/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
    const { title, content, excerpt, tags, status } = body;

    const supabase = createSupabaseClient();

    const { data: article, error } = await supabase
      .from('articles')
      .update({
        title,
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

    // TODO: Delete from WordPress if synced
    if (article.wordpress_synced && article.wordpress_id) {
      // This would call WordPress API to delete the post
      console.log('Should delete from WordPress:', article.wordpress_id);
    }

    return NextResponse.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/articles/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
