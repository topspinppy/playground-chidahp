import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // Clear the auth cookie
    const cookieStore = await cookies();
    cookieStore.delete('auth-token');

    return NextResponse.json({
      message: 'ออกจากระบบสำเร็จ'
    });

  } catch (error: unknown) {
    console.error('Logout error:', error);
    
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในระบบ' },
      { status: 500 }
    );
  }
}
