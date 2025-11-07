import { supabaseAdmin } from '@/lib/supabase';

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  status: 'draft' | 'pending_review' | 'published' | 'archived';
  author_id: string;
  category_id: string | null;
  tags: string[];
  chidahp_id: number | null; // Chidahp API post ID
  chidahp_url: string | null; // Chidahp API post URL
  seo_title: string | null;
  seo_description: string | null;
  reading_time: number | null; // in minutes
  view_count: number;
  like_count: number;
  share_count: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ArticleInsert {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string | null;
  status?: 'draft' | 'pending_review' | 'published' | 'archived';
  author_id: string;
  category_id?: string | null;
  tags?: string[];
  chidahp_id?: number | null;
  chidahp_url?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  reading_time?: number | null;
  view_count?: number;
  like_count?: number;
  share_count?: number;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ArticleUpdate {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featured_image?: string | null;
  status?: 'draft' | 'pending_review' | 'published' | 'archived';
  author_id?: string;
  category_id?: string | null;
  tags?: string[];
  chidahp_id?: number | null;
  chidahp_url?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  reading_time?: number | null;
  view_count?: number;
  like_count?: number;
  share_count?: number;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  chidahp_id: number | null;
  color: string | null;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export class ArticleModel {
  // Create a new article
  static async create(articleData: Omit<ArticleInsert, 'id' | 'created_at' | 'updated_at'>): Promise<Article> {
    if (!supabaseAdmin) {
      throw new Error('Supabase admin client is not available');
    }
    const { data, error } = await supabaseAdmin
      .from('articles')
      .insert({
        ...articleData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create article: ${error.message}`);
    }

    return data;
  }

  // Find article by ID
  static async findById(id: string): Promise<Article | null> {
    if (!supabaseAdmin) {
      throw new Error('Supabase admin client is not available');
    }
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select(`
        *,
        author:users(name, email),
        category:categories(name, slug, color)
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to find article: ${error.message}`);
    }

    return data;
  }

  // Find article by slug
  static async findBySlug(slug: string): Promise<Article | null> {
    if (!supabaseAdmin) {
      throw new Error('Supabase admin client is not available');
    }
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select(`
        *,
        author:users(name, email),
        category:categories(name, slug, color)
      `)
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to find article: ${error.message}`);
    }

    return data;
  }

  // Find article by Chidahp ID
  static async findByChidahpId(chidahpId: number): Promise<Article | null> {
    if (!supabaseAdmin) {
      throw new Error('Supabase admin client is not available');
    }
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select(`
        *,
        author:users(name, email),
        category:categories(name, slug, color)
      `)
      .eq('chidahp_id', chidahpId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to find article: ${error.message}`);
    }

    return data;
  }

  // Get articles with pagination and filters
  static async findMany(options: {
    page?: number;
    limit?: number;
    status?: string;
    author_id?: string;
    category_id?: string;
    search?: string;
    sort_by?: 'created_at' | 'updated_at' | 'published_at' | 'view_count';
    sort_order?: 'asc' | 'desc';
  } = {}): Promise<{ articles: Article[]; total: number; page: number; totalPages: number }> {
    const {
      page = 1,
      limit = 10,
      status,
      author_id,
      category_id,
      search,
      sort_by = 'created_at',
      sort_order = 'desc'
    } = options;

    if (!supabaseAdmin) {
      throw new Error('Supabase admin client is not available');
    }
    let query = supabaseAdmin
      .from('articles')
      .select(`
        *,
        author:users(name, email),
        category:categories(name, slug, color)
      `, { count: 'exact' });

    // Apply filters
    if (status) {
      query = query.eq('status', status);
    }
    if (author_id) {
      query = query.eq('author_id', author_id);
    }
    if (category_id) {
      query = query.eq('category_id', category_id);
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
    }

    // Apply sorting
    query = query.order(sort_by, { ascending: sort_order === 'asc' });

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      throw new Error(`Failed to fetch articles: ${error.message}`);
    }

    return {
      articles: data || [],
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit)
    };
  }

  // Update article
  static async update(id: string, updates: ArticleUpdate): Promise<Article> {
    if (!supabaseAdmin) {
      throw new Error('Supabase admin client is not available');
    }
    const { data, error } = await supabaseAdmin
      .from('articles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update article: ${error.message}`);
    }

    return data;
  }

  // Delete article
  static async delete(id: string): Promise<void> {
    if (!supabaseAdmin) {
      throw new Error('Supabase admin client is not available');
    }
    const { error } = await supabaseAdmin
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete article: ${error.message}`);
    }
  }

  // Increment view count
  static async incrementViewCount(id: string): Promise<void> {
    if (!supabaseAdmin) {
      throw new Error('Supabase admin client is not available');
    }
    const { error } = await supabaseAdmin
      .from('articles')
      .update({
        view_count: 'view_count + 1',
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to increment view count: ${error.message}`);
    }
  }

  // Get categories
  static async getCategories(): Promise<Category[]> {
    if (!supabaseAdmin) {
      throw new Error('Supabase admin client is not available');
    }
    const { data, error } = await supabaseAdmin
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }

    return data || [];
  }

  // Create category
  static async createCategory(categoryData: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Promise<Category> {
    if (!supabaseAdmin) {
      throw new Error('Supabase admin client is not available');
    }
    const { data, error } = await supabaseAdmin
      .from('categories')
      .insert({
        ...categoryData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create category: ${error.message}`);
    }

    return data;
  }
}

export default ArticleModel;
