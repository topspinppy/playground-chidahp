import { NextRequest, NextResponse } from 'next/server';
import UserModel from '@/models/User';

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

    // Create user with Supabase
    const newUser = await UserModel.create({
      name,
      email,
      password, // จะถูก hash อัตโนมัติใน create method
      role,
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
    }

    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในระบบ' },
      { status: 500 }
    );
  }
}
