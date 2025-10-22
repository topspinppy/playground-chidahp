
'use client'

import { useState, useEffect } from 'react'

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  daysThreshold: number
  unlocked: boolean
  color: string
}

export default function CountdownPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first_step',
      title: 'ก้าวแรก',
      description: 'เริ่มต้นการเดินทาง!',
      icon: '🌱',
      daysThreshold: 155,
      unlocked: false,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'first_100',
      title: '100 วันมหัศจรรย์',
      description: 'เริ่มต้นการเดินทางสู่งานหนังสือ!',
      icon: '🎯',
      daysThreshold: 100,
      unlocked: false,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'quarter_year',
      title: '3 เดือนแห่งความมุ่งมั่น',
      description: 'ผ่านมา 3 เดือนแล้ว!',
      icon: '⭐',
      daysThreshold: 90,
      unlocked: false,
      color: 'from-teal-500 to-blue-500'
    },
    {
      id: 'half_way',
      title: 'ครึ่งทางแล้ว!',
      description: 'ผ่านมาครึ่งทางแล้ว เก่งมาก!',
      icon: '🏆',
      daysThreshold: 50,
      unlocked: false,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'one_month',
      title: '1 เดือนสุดท้าย',
      description: 'ใกล้ถึงเป้าหมายแล้ว!',
      icon: '⚡',
      daysThreshold: 30,
      unlocked: false,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'two_weeks',
      title: '2 สัปดาห์สุดท้าย',
      description: 'เตรียมตัวให้พร้อม!',
      icon: '🔥',
      daysThreshold: 14,
      unlocked: false,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'one_week',
      title: '1 สัปดาห์สุดท้าย',
      description: 'เกือบถึงแล้ว!',
      icon: '💎',
      daysThreshold: 7,
      unlocked: false,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'final_day',
      title: 'วันสุดท้าย!',
      description: 'วันแห่งชัยชนะ!',
      icon: '👑',
      daysThreshold: 1,
      unlocked: false,
      color: 'from-yellow-400 to-yellow-600'
    }
  ])

  // Convert Buddhist calendar 2568 to Gregorian calendar 2025
  // March 27, 2568 BE = March 27, 2025 CE
  const targetDate = new Date('2026-03-27T00:00:00').getTime()

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now()
      const distance = targetDate - now

      if (distance > 0) {
        const daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24))
        setTimeLeft({
          days: daysLeft,
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })

        // Check and unlock achievements
        setAchievements(prevAchievements => 
          prevAchievements.map(achievement => ({
            ...achievement,
            unlocked: daysLeft <= achievement.daysThreshold
          }))
        )
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        // Unlock all achievements when countdown reaches zero
        setAchievements(prevAchievements => 
          prevAchievements.map(achievement => ({
            ...achievement,
            unlocked: true
          }))
        )
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-yellow-800 to-amber-900 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 animate-pulse">
            นับถอยหลังพังเรนเจอร์
          </h1>
          <p className="text-lg md:text-xl text-yellow-200 mb-2">
            โปรเจ็กต์ ชี้ดาบ X ชูโล่ #งานหนังสือ2569
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-white/20 shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl md:text-5xl font-bold text-white mb-1">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="text-sm md:text-lg text-yellow-200 font-medium">
              วัน
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-white/20 shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl md:text-5xl font-bold text-white mb-1">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-sm md:text-lg text-yellow-200 font-medium">
              ชั่วโมง
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-white/20 shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl md:text-5xl font-bold text-white mb-1">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-sm md:text-lg text-yellow-200 font-medium">
              นาที
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-white/20 shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl md:text-5xl font-bold text-white mb-1">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-sm md:text-lg text-yellow-200 font-medium">
              วินาที
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-xl mx-auto mb-6">
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-orange-500 to-yellow-500 h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${Math.max(0, Math.min(100, ((targetDate - Date.now()) / (targetDate - new Date('2024-01-01').getTime())) * 100))}%`
              }}
            ></div>
          </div>
          <p className="text-yellow-200 mt-2 text-xs md:text-sm">
            ความคืบหน้าการนับถอยหลังพังเรนเจอร์
          </p>
        </div>

        {/* Achievement Badges */}
        <div className="max-w-3xl mx-auto mb-6">
          <h2 className="text-lg md:text-xl font-bold text-white mb-4">
            🏆 Achievement Badges
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 md:gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`relative p-2 md:p-3 rounded-lg border transition-all duration-500 transform ${
                  achievement.unlocked
                    ? `bg-gradient-to-br ${achievement.color} border-white/50 shadow-lg scale-105 animate-pulse`
                    : 'bg-white/5 border-white/20 opacity-50'
                }`}
              >
                <div className="text-center">
                  <div className="text-xl md:text-2xl mb-1">
                    {achievement.icon}
                  </div>
                  <h3 className={`text-xs md:text-sm font-bold mb-1 ${
                    achievement.unlocked ? 'text-white' : 'text-gray-400'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-xs hidden sm:block ${
                    achievement.unlocked ? 'text-white/90' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                  <div className={`text-xs mt-1 font-medium ${
                    achievement.unlocked ? 'text-white' : 'text-gray-400'
                  }`}>
                    {achievement.daysThreshold} วัน
                  </div>
                </div>
                
                {/* Unlock animation overlay */}
                {achievement.unlocked && (
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-lg animate-ping"></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Achievement Stats */}
          <div className="mt-4 text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 border border-white/20">
              <span className="text-white font-bold text-sm md:text-base">
                🎖️ ปลดล็อกแล้ว: {achievements.filter(a => a.unlocked).length}/{achievements.length} เหรียญ
              </span>
            </div>
          </div>
        </div>


        {/* Floating Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-yellow-300/30 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-orange-300/40 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  )
}