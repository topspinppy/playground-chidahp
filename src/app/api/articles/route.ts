import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import ArticleModel from '@/models/Article';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// GET /api/articles - Get articles with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || undefined;
    const author_id = searchParams.get('author_id') || undefined;
    const category_id = searchParams.get('category_id') || undefined;
    const search = searchParams.get('search') || undefined;
    const sort_by = searchParams.get('sort_by') as 'created_at' | 'updated_at' | 'published_at' | 'view_count' || 'created_at';
    const sort_order = searchParams.get('sort_order') as 'asc' | 'desc' || 'desc';

    const result = await ArticleModel.findMany({
      page,
      limit,
      status,
      author_id,
      category_id,
      search,
      sort_by,
      sort_order
    });

    return NextResponse.json(result);

  } catch (error: unknown) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลบทความ' },
      { status: 500 }
    );
  }
}

// POST /api/articles - Create new article
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'ไม่พบการเข้าสู่ระบบ' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const { title, content, excerpt, category_id, tags, featured_image, seo_title, seo_description, comment_status } = await request.json();

    // Validation
    if (!title || !content) {
      return NextResponse.json(
        { error: 'กรุณากรอกชื่อบทความและเนื้อหา' },
        { status: 400 }
      );
    }

    // Create article in Supabase
    const article = await ArticleModel.create({
      title,
      content,
      excerpt: excerpt || '',
      author_id: decoded.userId,
      category_id: category_id || null,
      tags: tags || [],
      featured_image: featured_image || null,
      seo_title: seo_title || null,
      seo_description: seo_description || null,
      chidahp_id: null,
      chidahp_url: null,
      status: 'draft'
    });

    return NextResponse.json({
      message: 'สร้างบทความสำเร็จ',
      article
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('Error creating article:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: 'การเข้าสู่ระบบหมดอายุ กรุณาเข้าสู่ระบบใหม่' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการสร้างบทความ' },
      { status: 500 }
    );
  }
}
