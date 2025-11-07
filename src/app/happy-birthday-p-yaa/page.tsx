'use client'

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useSearchParams } from 'next/navigation';

interface BirthdayWish {
  id: string;
  text: string;
  created_at: string;
  author?: string;
}

// Birthday Card Component
const BirthdayCard = ({ wish, index }: {
  wish: BirthdayWish;
  index: number;
}) => {
  const colors = ['bg-pink-200', 'bg-purple-200', 'bg-blue-200', 'bg-yellow-200', 'bg-green-200', 'bg-orange-200', 'bg-cyan-200', 'bg-rose-200'];
  const cardColor = colors[index % colors.length];

  return (
    <div
      className={`${cardColor} shadow-lg hover:shadow-xl transition-all duration-300 relative border-2 border-white/60 rounded-xl overflow-hidden`}
    >
      {/* Content */}
      <div className="p-6 flex flex-col min-h-[200px]">
        <p className="text-gray-800 leading-relaxed text-base font-medium flex-grow whitespace-pre-wrap break-words">
          {wish.text}
        </p>
        
        {/* Bottom section with date and author */}
        <div className="mt-4 pt-4 border-t border-white/40">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600">
              {new Date(wish.created_at).toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            {wish.author && (
              <p className="text-sm text-gray-700 font-medium">— {wish.author}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Question Authentication Component
const QuestionAuth = ({ onSuccess }: { onSuccess: () => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = [
    { id: 0, text: 'คุณชื่ออะไร', answer: 'สมหยา' },
    { id: 1, text: 'ใครชื่ออรุณ', answer: 'สมหยา' },
    { id: 2, text: 'อรุณใครชื่อ', answer: 'สมหยา' }
  ];

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
    setError('');
  };

  const handleNext = () => {
    const correctAnswer = questions[currentQuestion].answer.toLowerCase().trim();
    const userAnswer = answers[currentQuestion].toLowerCase().trim();

    if (userAnswer !== correctAnswer) {
      setError('คำตอบไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setError('');
    } else {
      // All questions answered correctly
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        onSuccess();
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && answers[currentQuestion].trim() !== '') {
      handleNext();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">🔐</div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            หน้าลับ
          </h1>
          <p className="text-white/80 text-sm">
            กรุณาตอบคำถามเพื่อเข้าสู่หน้าอวยพร
          </p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white/60 text-sm">
              คำถาม {currentQuestion + 1} / {questions.length}
            </span>
            <div className="flex space-x-1">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx <= currentQuestion ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-4">
            <p className="text-white text-lg font-semibold mb-4 text-center">
              {questions[currentQuestion].text}
            </p>
            <input
              type="text"
              value={answers[currentQuestion]}
              onChange={(e) => handleAnswerChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white text-center font-medium"
              placeholder="พิมพ์คำตอบ..."
              autoFocus
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-400/50 text-red-100 px-4 py-2 rounded-lg text-sm mb-4 text-center">
              {error}
            </div>
          )}

          <button
            onClick={handleNext}
            disabled={answers[currentQuestion].trim() === '' || isSubmitting}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {isSubmitting ? 'กำลังตรวจสอบ...' : currentQuestion < questions.length - 1 ? 'ถัดไป' : 'เข้าสู่หน้าอวยพร'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function HappyBirthdayPYaaPage() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [wishes, setWishes] = useState<BirthdayWish[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isLoadingWishes, setIsLoadingWishes] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBirthdayOwner, setIsBirthdayOwner] = useState(false);
  
  // Character limit for birthday wishes
  const MAX_CHARACTERS = 500;

  // Check for secret key
  useEffect(() => {
    const key = searchParams.get('key');
    if (key === 'yaayaa') {
      setIsAuthenticated(true);
    }
  }, [searchParams]);

  // Check if user is birthday owner (after answering questions)
  const handleAuthSuccess = () => {
    setIsBirthdayOwner(true);
    setIsAuthenticated(true);
  };

  const handleSubmit = async () => {
    if (message.trim() === '') return;
    if (message.trim().length > MAX_CHARACTERS) {
      setError(`ข้อความยาวเกินไป กรุณาเขียนไม่เกิน ${MAX_CHARACTERS} ตัวอักษร`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data, error: insertError } = await supabase
        .from('birthday_wishes_p_yaa')
        .insert({
          text: message.trim(),
          author: author.trim() || null
        })
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }
      console.log(data);
      setMessage('');
      setAuthor('');
      setSubmitted(true);
      await fetchWishes();
    } catch (err) {
      console.log(err);
      setError('เกิดข้อผิดพลาดในการส่งอวยพร กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  const fetchWishes = useCallback(async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('birthday_wishes_p_yaa')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1000);

      if (fetchError) {
        throw fetchError;
      }

      const docs = (data || []).map(item => ({
        id: item.id,
        text: item.text,
        created_at: item.created_at,
        author: item.author
      }));
      
      setWishes(docs);
    } catch (err) {
      console.error('Error fetching wishes:', err);
      setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
    } finally {
      setIsLoadingWishes(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishes();
    }
  }, [isAuthenticated, fetchWishes]);

  // Show question auth if not authenticated and not birthday owner
  if (!isAuthenticated && !isBirthdayOwner) {
    return <QuestionAuth onSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 relative overflow-hidden">
      {/* Floating balloons and confetti effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <span className="text-2xl">
              {['🎈', '🎉', '🎊', '✨', '⭐'][Math.floor(Math.random() * 5)]}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full px-4 pb-4 relative z-10 min-h-screen">
        {/* Header Section */}
        <div className="py-12 text-center px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl mb-4 animate-bounce">🎂</div>
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 mb-4 leading-tight">
              สุขสันต์วันเกิด
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-2 font-semibold">
              พี่หยาของชาวชูโล่ 🏆
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              ขอให้มีความสุขมาก ๆ ในวันพิเศษนี้ ✨
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full px-6">
          {/* Form Section */}
          {showForm && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-pink-200/50 mb-6 animate-slide-in-up max-w-2xl mx-auto">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              {!submitted ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                      💌 เขียนอวยพรวันเกิด
                    </h2>
                    <button
                      onClick={() => setShowForm(false)}
                      className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
                    >
                      ×
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ชื่อของคุณ (ไม่บังคับ)
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="พิมพ์ชื่อของคุณ..."
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      disabled={loading}
                      maxLength={50}
                    />
                  </div>

                  <textarea
                    className="w-full h-48 border border-gray-300 p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="เขียนอวยพรวันเกิดของคุณที่นี่... (ไม่เกิน 500 ตัวอักษร)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                    maxLength={MAX_CHARACTERS}
                  />
                  
                  <div className="mt-2 text-right">
                    <span className={`text-sm ${message.length > MAX_CHARACTERS * 0.9 ? 'text-red-500' : 'text-gray-500'}`}>
                      {message.length}/{MAX_CHARACTERS}
                    </span>
                  </div>

                  <button
                    className="mt-4 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:via-purple-600 hover:to-rose-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    onClick={handleSubmit}
                    disabled={loading || message.trim() === '' || message.trim().length > MAX_CHARACTERS}
                  >
                    {loading ? 'กำลังส่ง...' : '🎉 ส่งอวยพร'}
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4 animate-bounce">🎉</div>
                  <h2 className="text-2xl font-bold text-pink-600 mb-4">
                    ขอบคุณมาก!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    อวยพรของคุณจะปรากฏบนบอร์ดด้านล่างในไม่ช้า!
                  </p>
                  <button
                    className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-colors"
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

          {/* Birthday Wishes Section */}
          <div className="w-full min-h-[70vh] bg-gradient-to-br from-pink-100 via-purple-100 to-rose-100 rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-pink-300 animate-slide-in-up relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(236, 72, 153, 0.3) 1px, transparent 0)`,
                backgroundSize: '30px 30px'
              }}></div>
            </div>

            {/* Board frame */}
            <div className="absolute inset-2 border-2 border-pink-400 rounded-2xl"></div>

            <div className="text-center mb-8 relative z-50">
              <div className="max-w-md mx-auto">
                <p className="text-lg md:text-xl text-gray-800 font-bold mb-4 drop-shadow-sm">
                  💝 อวยพรจากเพื่อน ๆ
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 text-white px-8 py-4 rounded-full hover:from-pink-600 hover:via-purple-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl font-bold text-base md:text-lg relative z-50"
                >
                  ✨ เขียนอวยพรของคุณ
                </button>
              </div>
            </div>

            {isLoadingWishes ? (
              <div className="text-center py-12 relative z-10">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-pink-500 border-t-transparent"></div>
                <p className="mt-4 text-gray-700 font-medium">กำลังโหลดอวยพร...</p>
              </div>
            ) : wishes.length === 0 ? (
              <div className="text-center py-12 relative z-10">
                <div className="text-5xl mb-4">💌</div>
                <p className="text-gray-700 text-lg font-medium">ยังไม่มีอวยพร</p>
                <p className="text-sm text-gray-600 mt-2">เป็นคนแรกที่เขียนอวยพร!</p>
              </div>
            ) : (
              <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto px-2 py-4">
                  {wishes.map((wish, idx) => (
                    <div
                      key={wish.id}
                      className="animate-slide-in-up"
                      style={{
                        animationDelay: `${idx * 50}ms`
                      }}
                    >
                      <BirthdayCard wish={wish} index={idx} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 mb-8">
          <p className="text-gray-500 text-sm">
            Made with 💖 for สมหยา
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes card-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        .animate-card-float {
          animation: card-float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
