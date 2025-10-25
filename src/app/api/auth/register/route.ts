import { NextRequest, NextResponse } from 'next/server';
import UserModel from '@/models/User';
import { syncUserToWordPress } from '@/lib/wordpress';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role = 'writer', profile } = await request.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const emailExists = await UserModel.emailExists(email);
    if (emailExists) {
      return NextResponse.json(
        { error: 'อีเมล์นี้ถูกใช้งานแล้ว' },
        { status: 400 }
      );
    }

    // Sync user to WordPress FIRST (before creating in Supabase)
    let wordpressResponse;
    try {
      wordpressResponse = await syncUserToWordPress({
        name,
        email,
        password, // Use original password for WordPress (not hashed)
        role
      });
      console.log(`User synced to WordPress successfully with ID: ${wordpressResponse.user_id}`);
    } catch (wordpressError) {
      console.error('Failed to sync user to WordPress:', wordpressError);
      return NextResponse.json(
        { error: 'ไม่สามารถเชื่อมต่อกับ Backoffice ได้ กรุณาลองใหม่อีกครั้ง' },
        { status: 500 }
      );
    }

    // Only create user in Supabase if WordPress sync was successful
    const newUser = await UserModel.create({
      name,
      email,
      password, // จะถูก hash อัตโนมัติใน create method
      role,
      wordpress_user_id: wordpressResponse.user_id || null, // Store WordPress user ID directly
      profile: profile || {
        bio: '',
        social_media: {},
        writing_experience: '',
        motivation: ''
      }
    });

    // Return user without password (toJSON method จะลบ password ออกอัตโนมัติ)
    return NextResponse.json(
      {
        message: 'สมัครสมาชิกสำเร็จ',
        user: newUser.toJSON()
      },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error('Registration error:', error);
    
    // Handle Supabase errors
    if (error instanceof Error) {
      // Check for unique constraint violation
      if (error.message.includes('duplicate key') || error.message.includes('unique constraint')) {
        return NextResponse.json(
          { error: 'อีเมล์นี้ถูกใช้งานแล้ว' },
          { status: 400 }
        );
      }
      
      // Check for validation errors
      if (error.message.includes('Failed to create user')) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      // Check for WordPress API errors
      if (error.message.includes('WordPress API error')) {
        return NextResponse.json(
          { error: 'ไม่สามารถเชื่อมต่อกับ WordPress ได้ กรุณาลองใหม่อีกครั้ง' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในระบบ' },
      { status: 500 }
    );
  }
}
