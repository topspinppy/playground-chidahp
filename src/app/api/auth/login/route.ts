import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import UserModel from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'กรุณากรอกอีเมล์และรหัสผ่าน' },
        { status: 400 }
      );
    }

    // Find user by email (include password for comparison)
    const user = await UserModel.findByEmail(email, true);
    if (!user) {
      return NextResponse.json(
        { error: 'อีเมล์หรือรหัสผ่านไม่ถูกต้อง' },
        { status: 401 }
      );
    }

    // Check if user is active
    if (user.status !== 'active') {
      return NextResponse.json(
        { error: 'บัญชีของคุณถูกระงับ กรุณาติดต่อผู้ดูแลระบบ' },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'อีเมล์หรือรหัสผ่านไม่ถูกต้อง' },
        { status: 401 }
      );
    }

    // Update last login
    const { supabaseAdmin } = await import('@/lib/supabase');
    if (!supabaseAdmin) {
      throw new Error('Supabase admin client is not available');
    }
    await supabaseAdmin
      .from('users')
      .update({ 
        last_login: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role,
        name: user.name
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return NextResponse.json({
      message: 'เข้าสู่ระบบสำเร็จ',
      user: user.toJSON()
    });

  } catch (error: unknown) {
    console.error('Login error:', error);
    
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในระบบ' },
      { status: 500 }
    );
  }
}
