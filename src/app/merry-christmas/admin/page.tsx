'use client';

import { useEffect, useState } from 'react';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

interface Participant {
  id: string;
  name: string;
  timestamp: Timestamp | null;
  hasDrawn: boolean;
}

const ADMIN_PASSWORD = 'admin123'; // เปลี่ยนเป็น password ที่ปลอดภัยกว่า

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [newName, setNewName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Check authentication from localStorage
  useEffect(() => {
    const authStatus = localStorage.getItem('christmas-admin-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load participants from Firebase (Realtime)
  useEffect(() => {
    if (!isAuthenticated) return;

    const q = query(
      collection(db, 'christmas-participants'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const participantsList: Participant[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        participantsList.push({
          id: doc.id,
          name: data.name,
          timestamp: data.timestamp,
          hasDrawn: data.hasDrawn || false,
        });
      });
      setParticipants(participantsList);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('christmas-admin-auth', 'true');
      setPassword('');
    } else {
      alert('รหัสผ่านไม่ถูกต้อง');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('christmas-admin-auth');
  };

  const handleAddName = async () => {
    if (!newName.trim()) {
      alert('กรุณากรอกชื่อ');
      return;
    }

    // Check if name already exists
    const exists = participants.some(p => p.name.toLowerCase().trim() === newName.toLowerCase().trim());
    if (exists) {
      alert('ชื่อนี้มีอยู่แล้ว');
      return;
    }

    setIsAdding(true);
    try {
      await addDoc(collection(db, 'christmas-participants'), {
        name: newName.trim(),
        timestamp: new Date(),
        hasDrawn: false,
      });
      setNewName('');
    } catch (error) {
      console.error('Error adding participant:', error);
      alert('เกิดข้อผิดพลาดในการเพิ่มชื่อ');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบชื่อนี้?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'christmas-participants', id));
    } catch (error) {
      console.error('Error deleting participant:', error);
      alert('เกิดข้อผิดพลาดในการลบชื่อ');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-2xl max-w-md w-full">
          <h1 className="text-3xl font-bold text-yellow-300 mb-6 text-center">
            🔐 Admin Login
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="รหัสผ่าน"
            className="w-full px-4 py-3 rounded-lg text-lg mb-4 focus:outline-none focus:ring-4 focus:ring-yellow-300"
            autoFocus
          />
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-4 px-6 rounded-lg text-xl hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg"
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-pink-900 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-2xl mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-yellow-300">
              🎄 จัดการผู้เข้าร่วม
            </h1>
            <div className="flex gap-2">
              <Link
                href="/merry-christmas/draw"
                className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
              >
                ไปหน้าสุ่ม
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
          <p className="text-white text-lg">
            จำนวนผู้เข้าร่วมทั้งหมด: <span className="font-bold text-yellow-300">{participants.length}</span> คน
          </p>
        </div>

        {/* Add Name Form */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-2xl mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">เพิ่มชื่อผู้เข้าร่วม</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isAdding && handleAddName()}
              placeholder="กรอกชื่อ..."
              className="flex-1 px-4 py-3 rounded-lg text-lg focus:outline-none focus:ring-4 focus:ring-yellow-300"
            />
            <button
              onClick={handleAddName}
              disabled={isAdding}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 disabled:opacity-50"
            >
              {isAdding ? 'กำลังเพิ่ม...' : 'เพิ่ม'}
            </button>
          </div>
        </div>

        {/* Participants List */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">
            รายชื่อผู้เข้าร่วม ({participants.length})
          </h2>
          {participants.length === 0 ? (
            <div className="text-center text-white text-lg py-8">
              ยังไม่มีผู้เข้าร่วม
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    participant.hasDrawn
                      ? 'bg-green-500/20 border-2 border-green-500'
                      : 'bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {participant.hasDrawn ? '✅' : '⏳'}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">
                        {participant.name}
                      </div>
                      <div className="text-sm text-white/70">
                        {participant.hasDrawn ? 'จับสลากแล้ว' : 'ยังไม่จับสลาก'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(participant.id)}
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
                  >
                    ลบ
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="mt-6 text-center">
          <Link
            href="/merry-christmas"
            className="text-yellow-300 hover:text-yellow-200 underline"
          >
            ดูหน้า Live Mode
          </Link>
        </div>
      </div>
    </div>
  );
}

