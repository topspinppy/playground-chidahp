'use client'

import { useState, useEffect, useRef, useCallback } from 'react';
import { collection, addDoc, getDocs, orderBy, limit, query, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';

interface Feedback {
  id: string;
  text: string;
  created: Date;
  votes: number;
  voters: string[]; // Array of user IDs who voted
}


// Brainstorm Card Component with Voting
const BrainstormCard = ({ feedback, index, onVote, hasVoted }: {
  feedback: Feedback;
  index: number;
  onVote: (feedbackId: string) => void;
  hasVoted: boolean;
}) => {
  const [isVoting, setIsVoting] = useState(false);
  const [showVoteSuccess, setShowVoteSuccess] = useState(false);

  const handleVote = async () => {
    if (isVoting) return;

    setIsVoting(true);
    try {
      await onVote(feedback.id);
      if (!hasVoted) {
        setShowVoteSuccess(true);
        setTimeout(() => setShowVoteSuccess(false), 2000);
      }
    } finally {
      setIsVoting(false);
    }
  };

  // Get medal for top 3
  const getMedal = () => {
    if (index === 0) return { emoji: '⭐', color: 'text-yellow-500' };
    if (index === 1) return { emoji: '⭐', color: 'text-gray-400' };
    if (index === 2) return { emoji: '⭐', color: 'text-orange-500' };
    return null;
  };

  const medal = getMedal();

  // Generate random rotation for scattered post-it effect
  const rotation = (Math.sin(index * 0.7) * 15) + (Math.cos(index * 1.3) * 8) + (index % 3 - 1) * 5;
  const colors = ['bg-yellow-200', 'bg-pink-200', 'bg-blue-200', 'bg-green-200', 'bg-purple-200', 'bg-orange-200', 'bg-cyan-200', 'bg-lime-200'];
  const postItColor = colors[index % colors.length];
  
  // Generate random size variation (smaller range to prevent overlap)
  const sizeVariation = 0.9 + (Math.sin(index * 0.4) * 0.2);
  const cardWidth = 300 * sizeVariation;
  const cardHeight = 220 * sizeVariation;
  
  // Adjust text size based on card size
  const getTextSize = () => {
    if (sizeVariation < 0.95) return 'text-xs';
    if (sizeVariation < 1.05) return 'text-sm';
    return 'text-base';
  };

  return (
    <div
      className={`${postItColor} shadow-2xl hover:shadow-3xl transition-all duration-300 relative animate-card-float transform hover:scale-105 border-2 border-white/50`}
      style={{
        transform: `rotate(${rotation}deg)`,
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        clipPath: 'polygon(0 0, calc(100% - 25px) 0, 100% 25px, 100% 100%, 0 100%)',
        margin: '10px',
        backdropFilter: 'blur(2px)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        position: 'relative',
        zIndex: 100 - index
      }}
    >
      {/* Post-it fold effect */}
      <div
        className="absolute top-0 right-0 w-5 h-5 bg-gray-300 opacity-60"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
        }}
      ></div>

      {/* Vote count with medal - top right */}
      <div className="absolute top-2 right-8 flex items-center space-x-1">
        {medal ? (
          <div className="flex items-center space-x-1 bg-white/80 px-2 py-1 rounded-full border border-gray-300">
            <span className={`text-sm ${medal.color}`}>{medal.emoji}</span>
            <span className="text-xs font-bold text-gray-700">{feedback.votes}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1 bg-white/80 px-2 py-1 rounded-full border border-gray-300">
            <span className="text-xs text-gray-600">⭐</span>
            <span className="text-xs font-bold text-gray-700">{feedback.votes}</span>
          </div>
        )}
      </div>

      {/* Success animation overlay */}
      {showVoteSuccess && (
        <div className="absolute inset-0 bg-green-100 bg-opacity-90 flex items-center justify-center animate-pulse">
          <div className="text-center">
            <div className="text-2xl mb-1">🎉</div>
            <div className="text-sm font-medium text-green-700">โหวตสำเร็จ!</div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4 pt-8 pr-8">
        <p className={`text-gray-800 leading-relaxed ${getTextSize()} font-medium`}>
          {feedback.text.length > 100 ? `${feedback.text.substring(0, 100)}...` : feedback.text}
        </p>
      </div>

      {/* Bottom section with date and vote button */}
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          {feedback.created.toLocaleDateString('th-TH', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>

        {/* Vote button */}
        <button
          onClick={handleVote}
          disabled={isVoting}
          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
            hasVoted 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-white/90 text-gray-800'
          }`}
        >
          {isVoting ? (
            <>
              <div className="w-3 h-3 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
              <span>กำลังโหวต...</span>
            </>
          ) : (
            <>
              <span>{hasVoted ? '✅' : '👍'}</span>
              <span>{hasVoted ? 'โหวตแล้ว' : 'โหวต'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default function TellMePage() {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isLoadingFeedbacks, setIsLoadingFeedbacks] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Character limit for post-it notes
  const MAX_CHARACTERS = 120;

  // Generate a simple user ID (in real app, this would come from auth)
  const userId = useRef(`user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`).current;

  const handleSubmit = async () => {
    if (message.trim() === '') return;
    if (message.trim().length > MAX_CHARACTERS) {
      setError(`ข้อความยาวเกินไป กรุณาเขียนไม่เกิน ${MAX_CHARACTERS} ตัวอักษร`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      await addDoc(collection(db, 'chidahp-feedbacks'), {
        text: message.trim(),
        created: new Date(),
        votes: 0,
        voters: []
      });
      setMessage('');
      setSubmitted(true);
      await fetchFeedbacks(); // อัปเดตทันที
    } catch (err) {
      console.error('Error submitting message:', err);
      setError('เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (feedbackId: string) => {
    try {
      const feedbackRef = doc(db, 'chidahp-feedbacks', feedbackId);
      const feedback = feedbacks.find(f => f.id === feedbackId);

      if (!feedback) return;

      const hasVoted = feedback.voters.includes(userId);

      // Optimistic update - update vote count and user votes state
      if (hasVoted) {
        // Remove vote
        setFeedbacks(prev => prev.map(f => 
          f.id === feedbackId 
            ? { ...f, votes: f.votes - 1, voters: f.voters.filter(v => v !== userId) }
            : f
        ));
      } else {
        // Add vote
        setFeedbacks(prev => prev.map(f => 
          f.id === feedbackId 
            ? { ...f, votes: f.votes + 1, voters: [...f.voters, userId] }
            : f
        ));
      }

      if (hasVoted) {
        // Remove vote from database
        await updateDoc(feedbackRef, {
          votes: feedback.votes - 1,
          voters: arrayRemove(userId)
        });
      } else {
        // Add vote to database
        await updateDoc(feedbackRef, {
          votes: feedback.votes + 1,
          voters: arrayUnion(userId)
        });
      }

    } catch (err) {
      console.error('Error voting:', err);
      setError('เกิดข้อผิดพลาดในการโหวต กรุณาลองใหม่อีกครั้ง');
      // Revert optimistic update on error
      await fetchFeedbacks();
    }
  };

  const fetchFeedbacks = useCallback(async () => {
    try {
      const q = query(
        collection(db, 'chidahp-feedbacks'),
        orderBy('created', 'desc'),
        limit(10000)
      );
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        text: doc.data().text,
        created: doc.data().created.toDate(),
        votes: doc.data().votes || 0,
        voters: doc.data().voters || []
      }));
      
      // Sort by votes (descending) then by creation date (descending)
      const sortedDocs = [...docs].sort((a, b) => {
        if (b.votes !== a.votes) {
          return b.votes - a.votes;
        }
        return b.created.getTime() - a.created.getTime();
      });
      
      setFeedbacks(sortedDocs);


    } catch (err) {
      console.error('Error fetching feedbacks:', err);
      setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
    } finally {
      setIsLoadingFeedbacks(false);
    }
  }, []);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 relative overflow-hidden">

      <div className="w-full px-4 pb-4 relative z-10 min-h-screen">
        {/* Header Section */}
        <div className="py-15 text-center px-6">
          <div className="max-w mx-auto">
            <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-4 leading-snug tracking-tight">
              #งานหนังสือ2568 คิดว่าจะเดินผ่านบู๊ตชี้ดาบแล้วรอดหรอ 😉
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              ชาวชูโล่คนไหนโดนป้ายยาอะไร - ประทับใจสิ่งใดไปบ้าง บอกเราหน่อย ✨
            </p>
          </div>
        </div>




        {/* Main Content */}
        <div className="w-full px-6">
          {/* Form Section - Hidden by default */}
          {showForm && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-yellow-200/50 mb-6 animate-slide-in-up max-w-2xl mx-auto">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}

              {!submitted ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      📝 แปะความคิดเห็นของคุณ
                    </h2>
                    <button
                      onClick={() => setShowForm(false)}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <textarea
                    className="w-full h-32 border border-gray-300 p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="เขียนความคิดเห็นสั้นๆ (ไม่เกิน 120 ตัวอักษร) เช่น: 'ได้หนังสือมา 2 เล่ม!' หรือ 'เจอผู้เขียนแล้ว!'"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                    maxLength={MAX_CHARACTERS}
                  />
                  
                  {/* Character counter */}
                  <div className="mt-2 text-right">
                    <span className={`text-sm ${message.length > MAX_CHARACTERS * 0.9 ? 'text-red-500' : 'text-gray-500'}`}>
                      {message.length}/{MAX_CHARACTERS}
                    </span>
                  </div>

                  <button
                    className="mt-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-6 py-3 rounded-xl font-semibold hover:from-yellow-600 hover:to-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    onClick={handleSubmit}
                    disabled={loading || message.trim() === '' || message.trim().length > MAX_CHARACTERS}
                  >
                    {loading ? 'กำลังส่ง...' : 'แปะความคิดเห็น'}
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-4xl mb-4">🎉</div>
                  <h2 className="text-2xl font-semibold text-green-600 mb-4">
                    ขอบคุณมากครับ! :)
                  </h2>
                  <p className="text-gray-600 mb-6">
                    ความคิดเห็นของคุณจะปรากฏบนบอร์ดด้านล่างในไม่ช้า!
                  </p>
                  <button
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    onClick={() => {
                      setSubmitted(false);
                      setError('');
                      setShowForm(false);
                    }}
                  >
                    ปิด
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Brainstorm Section - Post-it Board - Main Focus */}
          <div className="w-full min-h-[80vh] bg-gradient-to-br from-amber-100 to-yellow-200 rounded-3xl p-12 shadow-2xl border-6 border-amber-400 animate-slide-in-up animation-delay-1000 relative overflow-hidden animate-board-glow">
            {/* Author signing background image */}
            <div className="absolute inset-0 opacity-40">
              <Image
                src="/jame.png"
                alt="Author signing books"
                fill
                className="object-cover rounded-3xl"
                priority
              />
            </div>

            {/* Board texture overlay */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 69, 19, 0.4) 1px, transparent 0)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            {/* Dark overlay for better contrast */}
            <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>

            {/* Board frame */}
            <div className="absolute inset-2 border-2 border-amber-400 rounded-lg"></div>

            <div className="text-center mb-10 relative z-50">
              <div className="max-w-md mx-auto">
                <p className="text-lg text-white font-bold mb-4 drop-shadow-lg">
                  ดูความคิดเห็นจากเพื่อน ๆ และโหวตให้คำตอบที่โดนใจที่สุด
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-8 py-4 rounded-full hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl font-bold text-base relative z-50"
                >
                  💡 แปะความคิดเห็นของคุณ คลิกเลย!
                </button>
              </div>
            </div>

            {isLoadingFeedbacks ? (
              <div className="text-center py-12 relative z-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-amber-600 border-t-transparent"></div>
                <p className="mt-4 text-gray-700">กำลังโหลด...</p>
              </div>
            ) : feedbacks.length === 0 ? (
              <div className="text-center py-12 relative z-10">
                <div className="text-4xl mb-4">📝</div>
                <p className="text-gray-700">ยังไม่มีคำตอบจากเพื่อน ๆ</p>
                <p className="text-sm text-gray-600 mt-2">เป็นคนแรกที่แปะความคิดเห็นของคุณ!</p>
              </div>
            ) : (
              <div className="relative z-10 overflow-y-auto max-h-[60vh]" style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '20px 40px',
                position: 'relative',
                width: '100%',
                gap: '20px'
              }}>
                {feedbacks.map((feedback, idx) => (
                  <div
                    key={feedback.id}
                    className="animate-slide-in-up"
                    style={{
                      animationDelay: `${idx * 150}ms`,
                      position: 'relative',
                      zIndex: feedbacks.length - idx,
                      transform: `rotate(${(Math.sin(idx * 0.7) * 15) + (Math.cos(idx * 1.3) * 8)}deg)`
                    }}
                  >
                    <BrainstormCard
                      feedback={feedback}
                      index={idx}
                      onVote={handleVote}
                      hasVoted={feedback.voters.includes(userId)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 mb-12">
          <p className="text-gray-500">
            #มหกรรมหนังสือ2568 #อ่านหรือยังฟังหรือเปล่า #ชี้ดาบ #งานหนังสือ2568
          </p>
        </div>
      </div>
    </div>
  );
}