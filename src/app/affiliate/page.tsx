'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

// Zod schema for form validation
const formSchema = z.object({
  name: z.string()
    .min(1, 'กรุณากรอกชื่อ-นามสกุล')
    .min(2, 'ชื่อ-นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร')
    .max(100, 'ชื่อ-นามสกุลต้องไม่เกิน 100 ตัวอักษร'),
  email: z.string()
    .min(1, 'กรุณากรอกอีเมล์')
    .email('รูปแบบอีเมล์ไม่ถูกต้อง'),
  password: z.string()
    .min(1, 'กรุณากรอกรหัสผ่าน')
    .min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร')
    .max(50, 'รหัสผ่านต้องไม่เกิน 50 ตัวอักษร'),
  confirmPassword: z.string()
    .min(1, 'กรุณายืนยันรหัสผ่าน'),
  bio: z.string()
    .max(500, 'ข้อมูลเกี่ยวกับตัวคุณต้องไม่เกิน 500 ตัวอักษร')
    .optional(),
  writingExperience: z.enum(['beginner', 'intermediate', 'advanced', 'expert'], {
    message: 'กรุณาเลือกประสบการณ์การเขียน'
  }),
  motivation: z.string()
    .max(1000, 'แรงจูงใจต้องไม่เกิน 1000 ตัวอักษร')
    .optional(),
  socialMedia: z.object({
    facebook: z.string()
      .url('รูปแบบ URL ของ Facebook ไม่ถูกต้อง')
      .optional()
      .or(z.literal('')),
    instagram: z.string()
      .url('รูปแบบ URL ของ Instagram ไม่ถูกต้อง')
      .optional()
      .or(z.literal('')),
    twitter: z.string()
      .url('รูปแบบ URL ของ Twitter ไม่ถูกต้อง')
      .optional()
      .or(z.literal('')),
    tiktok: z.string()
      .url('รูปแบบ URL ของ TikTok ไม่ถูกต้อง')
      .optional()
      .or(z.literal(''))
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: 'รหัสผ่านไม่ตรงกัน',
  path: ['confirmPassword']
});

type FormData = z.infer<typeof formSchema>;

export default function AffiliatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Helper function to get field error
  const getFieldError = (fieldName: string) => {
    return validationErrors[fieldName] || '';
  };

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
    writingExperience: 'beginner',
    motivation: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      tiktok: ''
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    if (name.startsWith('socialMedia.')) {
      const socialKey = name.split('.')[1] as keyof FormData['socialMedia'];
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    setValidationErrors({});

    // Zod validation
    try {
      const validatedData = formSchema.parse(formData);
      
      // If validation passes, proceed with API call
      await submitForm(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        for (const err of error.issues) {
          const fieldName = err.path.join('.');
          fieldErrors[fieldName] = err.message;
        }
        setValidationErrors(fieldErrors);
      } else {
        setError('เกิดข้อผิดพลาดในการตรวจสอบข้อมูล');
      }
      setIsLoading(false);
      return;
    }
  };

  const submitForm = async (validatedData: FormData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: validatedData.name,
          email: validatedData.email,
          password: validatedData.password,
          role: 'writer',
          profile: {
            bio: validatedData.bio,
            writing_experience: validatedData.writingExperience,
            motivation: validatedData.motivation,
            social_media: validatedData.socialMedia
          }
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('สมัครสมาชิกสำเร็จ! กำลังนำคุณไปยังหน้าเข้าสู่ระบบ...');
        setTimeout(() => {
          router.push('/affiliate/admin/login');
        }, 2000);
      } else {
        setError(data.error || 'เกิดข้อผิดพลาดในการสมัครสมาชิก');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            ชุมชนชูโล่รีวิวหนังสือชี้ดาบ
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          หากคุณเขียนรีวิวหนังสือของสำนักพิมพ์ ชี้ดาบ ในหมวดหมู่ Chulo Reviewer และแชร์พร้อมลิงก์บนโซเชียลมีเดียของคุณ 
          เมื่อมีผู้อ่านสนใจและกดซื้อผ่านลิงก์นั้น คุณจะได้รับ &ldquo;ค่าคอมมิชชั่น&rdquo; จากทุกเล่มที่ถูกซื้อผ่านรีวิวของคุณ
          </p>
        </div>

        {/* How It Works Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 border border-yellow-200">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              วิธีการทำงาน
            </h3>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              เริ่มต้นการเป็น Writer ในชุมชนของเราได้ง่ายๆ เพียง 3 ขั้นตอน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">สมัครสมาชิก</h4>
              <p className="text-gray-700 leading-relaxed">
                กรอกข้อมูลและสมัครเข้าร่วมชุมชน Writer ของสำนักพิมพ์ชี้ดาบ
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">เขียนรีวิว + แปะลิงก์</h4>
              <p className="text-gray-700 leading-relaxed">
                เขียนรีวิวหนังสือของชี้ดาบและแปะลิงก์ใน Social Media ของคุณ
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">รับค่าคอมมิชชั่น</h4>
              <p className="text-gray-700 leading-relaxed">
                เมื่อมีคนซื้อหนังสือของชี้ดาบผ่านลิงก์ของคุณ คุณจะได้รับค่าคอมมิชชั่น
              </p>
            </div>
          </div>
        </div>

        {/* Benefits of Joining Section */}
        <div className="mt-16 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow-xl p-8 border border-yellow-200">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              ทำไมต้องเข้าร่วมกับเรา?
            </h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              เข้าร่วมชุมชน Writer ของสำนักพิมพ์ชี้ดาบและได้รับประโยชน์มากมาย
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md text-center border border-yellow-200">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">หนังสือใหม่ก่อนใคร</h4>
              <p className="text-sm text-gray-700">ได้รับหนังสือใหม่ก่อนวางจำหน่าย</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md text-center border border-yellow-200">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">ชุมชนนักอ่าน</h4>
              <p className="text-sm text-gray-700">พบปะกับนักอ่านที่รักหนังสือ</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md text-center border border-yellow-200">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">พัฒนาทักษะ</h4>
              <p className="text-sm text-gray-700">พัฒนาทักษะการเขียนและการวิเคราะห์</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md text-center border border-yellow-200">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">รายได้เสริม</h4>
              <p className="text-sm text-gray-700">รับค่าคอมมิชชั่นจากการรีวิวและเมื่อหนังสือขายได้จากการรีวิวของคุณ</p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 border border-yellow-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              สมัครเข้าร่วมชุมชน
            </h3>
            <p className="text-gray-700">
              กรอกข้อมูลด้านล่างเพื่อเริ่มต้นการเป็น Writer ในชุมชนของเรา
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อ-นามสกุล *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    getFieldError('name') ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="กรอกชื่อ-นามสกุลของคุณ"
                />
                {getFieldError('name') && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError('name')}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  อีเมล์ *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    getFieldError('email') ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="your@email.com"
                />
                {getFieldError('email') && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError('email')}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  รหัสผ่าน *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    getFieldError('password') ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="อย่างน้อย 6 ตัวอักษร"
                />
                {getFieldError('password') && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError('password')}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  ยืนยันรหัสผ่าน *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    getFieldError('confirmPassword') ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="ยืนยันรหัสผ่าน"
                />
                {getFieldError('confirmPassword') && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError('confirmPassword')}</p>
                )}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                เกี่ยวกับตัวคุณ
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                value={formData.bio}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  getFieldError('bio') ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="บอกเล่าเกี่ยวกับตัวคุณ ประสบการณ์การอ่าน หรือความสนใจในหนังสือ"
              />
              {getFieldError('bio') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('bio')}</p>
              )}
            </div>

            {/* Writing Experience */}
            <div>
              <label htmlFor="writingExperience" className="block text-sm font-medium text-gray-700 mb-2">
                ประสบการณ์การเขียน
              </label>
              <select
                id="writingExperience"
                name="writingExperience"
                value={formData.writingExperience}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  getFieldError('writingExperience') ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="beginner">เริ่มต้น - ยังไม่มีประสบการณ์มาก</option>
                <option value="intermediate">ปานกลาง - มีประสบการณ์บ้าง</option>
                <option value="advanced">ขั้นสูง - มีประสบการณ์มาก</option>
                <option value="expert">ผู้เชี่ยวชาญ - มีประสบการณ์มากมาย</option>
              </select>
              {getFieldError('writingExperience') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('writingExperience')}</p>
              )}
            </div>

            {/* Motivation */}
            <div>
              <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                แรงจูงใจในการเข้าร่วม
              </label>
              <textarea
                id="motivation"
                name="motivation"
                rows={3}
                value={formData.motivation}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  getFieldError('motivation') ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="บอกเล่าเหตุผลที่คุณต้องการเข้าร่วมกับเรา"
              />
              {getFieldError('motivation') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('motivation')}</p>
              )}
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">ช่องทางโซเชียลมีเดีย (ไม่บังคับ)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook
                  </label>
                  <input
                    type="url"
                    id="facebook"
                    name="socialMedia.facebook"
                    value={formData.socialMedia.facebook}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      getFieldError('socialMedia.facebook') ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="https://facebook.com/yourprofile"
                  />
                  {getFieldError('socialMedia.facebook') && (
                    <p className="mt-1 text-sm text-red-600">{getFieldError('socialMedia.facebook')}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram
                  </label>
                  <input
                    type="url"
                    id="instagram"
                    name="socialMedia.instagram"
                    value={formData.socialMedia.instagram}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      getFieldError('socialMedia.instagram') ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="https://instagram.com/yourprofile"
                  />
                  {getFieldError('socialMedia.instagram') && (
                    <p className="mt-1 text-sm text-red-600">{getFieldError('socialMedia.instagram')}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter
                  </label>
                  <input
                    type="url"
                    id="twitter"
                    name="socialMedia.twitter"
                    value={formData.socialMedia.twitter}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      getFieldError('socialMedia.twitter') ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="https://twitter.com/yourprofile"
                  />
                  {getFieldError('socialMedia.twitter') && (
                    <p className="mt-1 text-sm text-red-600">{getFieldError('socialMedia.twitter')}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="tiktok" className="block text-sm font-medium text-gray-700 mb-2">
                    TikTok
                  </label>
                  <input
                    type="url"
                    id="tiktok"
                    name="socialMedia.tiktok"
                    value={formData.socialMedia.tiktok}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      getFieldError('socialMedia.tiktok') ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="https://tiktok.com/@yourprofile"
                  />
                  {getFieldError('socialMedia.tiktok') && (
                    <p className="mt-1 text-sm text-red-600">{getFieldError('socialMedia.tiktok')}</p>
                  )}
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600">
                ช่องทางโซเชียลมีเดียเหล่านี้จะช่วยให้เราติดต่อและตรวจสอบตัวตนของคุณได้ง่ายขึ้น
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yellow-500 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-700">
              มีบัญชีแล้ว?{' '}
              <a href="/affiliate/admin/login" className="text-yellow-600 hover:text-yellow-700 font-medium">
                เข้าสู่ระบบ
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
