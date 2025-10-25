'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  LogOut, 
  User,
  Calendar,
  Users
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'writer' | 'reviewer';
  status: 'active' | 'inactive' | 'suspended';
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        router.push('/affiliate/admin/login');
        return;
      }
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/affiliate/admin/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/affiliate/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-yellow-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Chidahp Affiliate Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-yellow-600" />
                <span className="text-sm text-gray-700">{user.name}</span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  {user.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="text-sm">ออกจากระบบ</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-yellow-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-yellow-600 hover:border-yellow-300'
              }`}
            >
              ภาพรวม
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-yellow-600 hover:border-yellow-300'
              }`}
            >
              ตั้งค่า
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">ภาพรวมระบบ</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white overflow-hidden shadow rounded-lg border border-yellow-200">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FileText className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-600 truncate">
                          บทความทั้งหมด
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          0
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg border border-yellow-200">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Users className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-600 truncate">
                          ผู้ใช้ทั้งหมด
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          1
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg border border-yellow-200">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Calendar className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-600 truncate">
                          เข้าสู่ระบบล่าสุด
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          วันนี้
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="bg-white shadow rounded-lg p-6 border border-yellow-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                ยินดีต้อนรับสู่ระบบ Admin
              </h3>
              <p className="text-gray-600 mb-4">
                ระบบนี้พร้อมใช้งานแล้ว คุณสามารถจัดการเนื้อหาและตั้งค่าระบบได้ผ่านเมนูด้านบน
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  💡 <strong>หมายเหตุ:</strong> ระบบนี้เป็นเวอร์ชันพื้นฐานที่เหลือแค่การ login และ dashboard 
                  คุณสามารถพัฒนาต่อได้ตามต้องการ
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">ตั้งค่าระบบ</h2>
            <div className="bg-white shadow rounded-lg p-6 border border-yellow-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                ข้อมูลผู้ใช้
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">ชื่อ</label>
                  <p className="mt-1 text-sm text-gray-900">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">อีเมล์</label>
                  <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">บทบาท</label>
                  <p className="mt-1 text-sm text-gray-900">{user.role}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">สถานะ</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status === 'active' ? 'ใช้งานได้' : 'ไม่ใช้งาน'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
