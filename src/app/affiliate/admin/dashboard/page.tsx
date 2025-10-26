'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  LogOut, 
  User,
  Calendar,
  Users
} from 'lucide-react';
import { useAuth } from '../hook/useAuth';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
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

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">การจัดการ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/affiliate/admin/articles')}
              className="p-6 bg-white rounded-lg shadow border border-yellow-200 hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-yellow-500 mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">จัดการบทความ</h4>
                  <p className="text-sm text-gray-600">สร้าง แก้ไข และลบบทความ</p>
                </div>
              </div>
            </button>
            
            <div className="p-6 bg-white rounded-lg shadow border border-yellow-200 text-left opacity-50">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-gray-400 mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">รายงาน</h4>
                  <p className="text-sm text-gray-600">ดูสถิติและรายงาน</p>
                </div>
              </div>
            </div>
          </div>
        </div>

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
