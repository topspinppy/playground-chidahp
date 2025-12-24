'use client';

import { useEffect, useState } from 'react';
import { collection, query, onSnapshot, orderBy, updateDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

interface Participant {
  id: string;
  name: string;
  timestamp: any;
  hasDrawn: boolean;
}

interface DrawResult {
  id: string;
  participantId: string;
  participantName: string;
  recipientId: string;
  recipientName: string;
  timestamp: any;
  drawTime: string;
}

const ADMIN_PASSWORD = 'admin123';

export default function DrawPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [currentDrawer, setCurrentDrawer] = useState<Participant | null>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<Participant | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinningRecipient, setSpinningRecipient] = useState<Participant | null>(null);
  const [recentDraws, setRecentDraws] = useState<DrawResult[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Check authentication
  useEffect(() => {
    const authStatus = localStorage.getItem('christmas-admin-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load participants
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

  // Load recent draws
  useEffect(() => {
    if (!isAuthenticated) return;

    const q = query(
      collection(db, 'christmas-draws'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const draws: DrawResult[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        draws.push({
          id: doc.id,
          participantId: data.participantId,
          participantName: data.participantName,
          recipientId: data.recipientId,
          recipientName: data.recipientName,
          timestamp: data.timestamp,
          drawTime: data.drawTime || '',
        });
      });
      setRecentDraws(draws);
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

  // สุ่มชื่อคนแรก (คนที่จับ)
  const handleRandomFirstDrawer = () => {
    const availableParticipants = participants.filter(p => !p.hasDrawn);
    
    if (availableParticipants.length === 0) {
      alert('ไม่มีผู้เข้าร่วมที่ยังไม่จับสลาก');
      return;
    }

    const randomDrawer = availableParticipants[Math.floor(Math.random() * availableParticipants.length)];
    setCurrentDrawer(randomDrawer);
    setSelectedRecipient(null);
    setSpinningRecipient(null);
  };

  // สุ่มชื่อคนที่ได้ของ (ไม่ใช่ตัวเอง และไม่ซ้ำกับคนอื่น)
  const handleRandomRecipient = () => {
    if (!currentDrawer) {
      alert('กรุณาสุ่มชื่อคนจับก่อน');
      return;
    }

    // หาคนที่ยังไม่ถูกจับ (ไม่ใช่ตัวเอง)
    const availableRecipients = participants.filter(p => 
      p.id !== currentDrawer.id && !p.hasDrawn
    );

    if (availableRecipients.length === 0) {
      alert('ไม่มีผู้เข้าร่วมที่เหลือให้สุ่ม');
      return;
    }

    // หาคนที่ถูกจับไปแล้ว (เพื่อไม่ให้ซ้ำ)
    const alreadyTakenRecipients = new Set(
      recentDraws.map(draw => draw.recipientId)
    );

    // กรองคนที่ยังไม่ถูกจับไป (ไม่ซ้ำ)
    let validRecipients = availableRecipients.filter(p => 
      !alreadyTakenRecipients.has(p.id)
    );

    // กรณีพิเศษ: ถ้าเหลือคนเดียวและทุกคนถูกจับไปแล้ว
    // ให้ได้ของคนแรกที่จับไป (เพื่อให้เป็นวงกลม)
    if (validRecipients.length === 0) {
      if (availableRecipients.length === 0 && recentDraws.length > 0) {
        // หาคนแรกที่จับไป
        const firstDrawer = recentDraws[recentDraws.length - 1]; // คนแรกที่จับ (เรียงจากเก่าไปใหม่)
        const firstDrawerParticipant = participants.find(p => p.id === firstDrawer.participantId);
        if (firstDrawerParticipant) {
          validRecipients = [firstDrawerParticipant];
        } else {
          alert('เกิดข้อผิดพลาด: ไม่พบผู้เข้าร่วมคนแรก');
          return;
        }
      } else {
        alert('ไม่มีผู้เข้าร่วมที่เหลือให้สุ่ม');
        return;
      }
    }

    setIsSpinning(true);
    setSpinningRecipient(null);
    setSelectedRecipient(null);

    // Animation: Show random recipients
    const spinDuration = 2000;
    const spinInterval = 100;
    let elapsed = 0;
    
    const spinAnimation = setInterval(() => {
      elapsed += spinInterval;
      const randomRecipient = validRecipients[Math.floor(Math.random() * validRecipients.length)];
      setSpinningRecipient(randomRecipient);
      
      if (elapsed >= spinDuration) {
        clearInterval(spinAnimation);
        
        // Final recipient - สุ่มจาก validRecipients เท่านั้น
        const finalRecipient = validRecipients[Math.floor(Math.random() * validRecipients.length)];
        setSpinningRecipient(finalRecipient);
        setSelectedRecipient(finalRecipient);
        setIsSpinning(false);
      }
    }, spinInterval);
  };

  const handleConfirmDraw = async () => {
    if (!currentDrawer || !selectedRecipient) {
      alert('กรุณาสุ่มชื่อคนจับและคนที่ได้ของ');
      return;
    }

    setIsSaving(true);
    const drawTime = new Date().toLocaleString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    try {
      // Save draw result
      await addDoc(collection(db, 'christmas-draws'), {
        participantId: currentDrawer.id,
        participantName: currentDrawer.name,
        recipientId: selectedRecipient.id,
        recipientName: selectedRecipient.name,
        timestamp: serverTimestamp(),
        drawTime: drawTime,
        drawType: 'admin',
      });

      // Update participant status (คนที่จับ)
      await updateDoc(doc(db, 'christmas-participants', currentDrawer.id), {
        hasDrawn: true,
      });

      // Reset
      setCurrentDrawer(null);
      setSelectedRecipient(null);
      setSpinningRecipient(null);
      
      alert('บันทึกผลการจับสลากสำเร็จ!');
    } catch (error) {
      console.error('Error saving draw:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกผล');
    } finally {
      setIsSaving(false);
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

  const availableParticipants = participants.filter(p => !p.hasDrawn);
  const drawnParticipants = participants.filter(p => p.hasDrawn);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-pink-900 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-2xl mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-yellow-300">
              🎲 สุ่มจับฉลาก
            </h1>
            <div className="flex gap-2">
              <Link
                href="/merry-christmas/admin"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
              >
                จัดการผู้เข้าร่วม
              </Link>
              <Link
                href="/merry-christmas"
                className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
              >
                ดู Live Mode
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-300">{participants.length}</div>
              <div className="text-white">ทั้งหมด</div>
            </div>
            <div className="bg-green-500/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-300">{drawnParticipants.length}</div>
              <div className="text-white">จับแล้ว</div>
            </div>
            <div className="bg-orange-500/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-300">{availableParticipants.length}</div>
              <div className="text-white">ยังไม่จับ</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Draw Section */}
          <div className="space-y-6">
            {/* Step 1: Random First Drawer */}
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">ขั้นตอนที่ 1: สุ่มชื่อคนจับ</h2>
              {!currentDrawer ? (
                <>
                  <p className="text-white/80 mb-4">
                    สุ่มชื่อจากผู้เข้าร่วมที่ยังไม่จับ ({availableParticipants.length} คน)
                  </p>
                  <button
                    onClick={handleRandomFirstDrawer}
                    disabled={availableParticipants.length === 0}
                    className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-6 px-6 rounded-xl text-2xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-2xl ${
                      availableParticipants.length === 0 ? 'opacity-50 cursor-not-allowed' : 'animate-pulse-glow'
                    }`}
                  >
                    🎲 สุ่มชื่อคนจับ 🎲
                  </button>
                </>
              ) : (
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 shadow-2xl text-center">
                  <div className="text-4xl mb-2">👤</div>
                  <div className="text-2xl font-bold text-white">{currentDrawer.name}</div>
                  <p className="text-white/80 mt-2">จะจับฉลากให้คนนี้</p>
                </div>
              )}
            </div>

            {/* Step 2: Random Recipient */}
            {currentDrawer && (() => {
              // หาคนที่ถูกจับไปแล้ว (เพื่อไม่ให้ซ้ำ)
              const alreadyTakenRecipients = new Set(
                recentDraws.map(draw => draw.recipientId)
              );
              const availableRecipients = participants.filter(p => 
                p.id !== currentDrawer.id && !p.hasDrawn
              );
              let validRecipients = availableRecipients.filter(p => 
                !alreadyTakenRecipients.has(p.id)
              );

              // กรณีพิเศษ: ถ้าเหลือคนเดียวและทุกคนถูกจับไปแล้ว
              // ให้ได้ของคนแรกที่จับไป (เพื่อให้เป็นวงกลม)
              const isLastPerson = availableRecipients.length === 0 && recentDraws.length > 0;
              if (validRecipients.length === 0 && isLastPerson) {
                const firstDrawer = recentDraws[recentDraws.length - 1]; // คนแรกที่จับ
                const firstDrawerParticipant = participants.find(p => p.id === firstDrawer.participantId);
                if (firstDrawerParticipant) {
                  validRecipients = [firstDrawerParticipant];
                }
              }

              return (
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-4">
                  ขั้นตอนที่ 2: สุ่มชื่อคนที่ได้ของ
                </h2>
                <p className="text-white/80 mb-4">
                  สุ่มชื่อคนอื่นที่ไม่ใช่ {currentDrawer.name} และยังไม่ถูกจับไป
                </p>
                {validRecipients.length === 0 && !isLastPerson && (
                  <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-3 mb-4">
                    <p className="text-yellow-200 text-sm">
                      ⚠️ ไม่มีคนเหลือให้สุ่ม (ทุกคนถูกจับไปแล้ว)
                    </p>
                  </div>
                )}
                {isLastPerson && validRecipients.length > 0 && (
                  <div className="bg-green-500/20 border border-green-500 rounded-lg p-3 mb-4">
                    <p className="text-green-200 text-sm">
                      ✅ คนสุดท้าย! จะได้ของคนแรกที่จับไป (เพื่อให้ครบวงกลม)
                    </p>
                  </div>
                )}
                <button
                  onClick={handleRandomRecipient}
                  disabled={isSpinning || validRecipients.length === 0}
                  className={`w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-6 px-6 rounded-xl text-2xl hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-2xl ${
                    isSpinning || validRecipients.length === 0 ? 'opacity-50 cursor-not-allowed' : 'animate-pulse-glow'
                  }`}
                >
                  {isSpinning ? 'กำลังสุ่ม...' : '🎯 สุ่มชื่อคนที่ได้ของ 🎯'}
                </button>

                {/* Spinning/Selected Recipient */}
                {(isSpinning && spinningRecipient) || selectedRecipient ? (
                  <div className="mt-6 animate-bounce-in">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 shadow-2xl text-center">
                      <div className="text-6xl mb-4">🎁</div>
                      <div className="text-3xl font-bold text-white">
                        {isSpinning ? spinningRecipient?.name : selectedRecipient?.name}
                      </div>
                      {isSpinning && (
                        <div className="text-white/80 mt-2 animate-pulse">กำลังสุ่ม...</div>
                      )}
                    </div>
                  </div>
                ) : null}

                {/* Confirm Button */}
                {selectedRecipient && !isSpinning && (
                  <div className="mt-6 animate-scale-in">
                    <div className="bg-white/10 rounded-lg p-4 mb-4 text-center">
                      <div className="text-white text-lg">
                        <span className="font-bold">{currentDrawer.name}</span> ได้ของ{' '}
                        <span className="font-bold text-yellow-300">{selectedRecipient.name}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleConfirmDraw}
                      disabled={isSaving}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50"
                    >
                      {isSaving ? 'กำลังบันทึก...' : '✅ ยืนยันการจับฉลาก'}
                    </button>
                  </div>
                )}
              </div>
              );
            })()}
          </div>

          {/* Right: Recent Draws */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">ผลการจับฉลากล่าสุด</h2>
            {recentDraws.length === 0 ? (
              <div className="text-center text-white text-lg py-8">
                ยังไม่มีผลการจับฉลาก
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {recentDraws.map((draw, index) => (
                  <div
                    key={draw.id}
                    className={`p-4 rounded-lg bg-white/10 text-white transition-all ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-400/30 to-orange-400/30 animate-pulse-glow' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">🎯</div>
                        <div>
                          <div className="text-lg font-bold">
                            {draw.participantName}
                          </div>
                          <div className="text-sm text-white/70">ได้ของ {draw.recipientName}</div>
                          <div className="text-xs text-white/50">{draw.drawTime}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
