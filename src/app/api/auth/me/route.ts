import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import UserModel from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET() {
  try {
    // Get token from cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'ไม่พบการเข้าสู่ระบบ' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    // Get user from database
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'ไม่พบผู้ใช้' },
        { status: 401 }
      );
    }

    // Check if user is still active
    if (user.status !== 'active') {
      return NextResponse.json(
        { error: 'บัญชีของคุณถูกระงับ' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: user.toJSON()
    });

  } catch (error: unknown) {
    console.error('Auth check error:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: 'การเข้าสู่ระบบหมดอายุ กรุณาเข้าสู่ระบบใหม่' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในระบบ' },
      { status: 500 }
    );
  }
}
