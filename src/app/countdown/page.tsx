
'use client'

import { useState, useEffect } from 'react'

export default function CountdownPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Convert Buddhist calendar 2568 to Gregorian calendar 2025
  // March 27, 2568 BE = March 27, 2025 CE
  const targetDate = new Date('2026-03-27T00:00:00').getTime()

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now()
      const distance = targetDate - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-yellow-800 to-amber-900 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-pulse">
            นับถอยหลังพังเรนเจอร์
          </h1>
          <p className="text-xl md:text-2xl text-yellow-200 mb-2">
            โปรเจ็กต์ ชี้ดาบ X ชูโล่ #งานหนังสือ2569
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl md:text-6xl font-bold text-white mb-2">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="text-lg md:text-xl text-yellow-200 font-medium">
              วัน
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl md:text-6xl font-bold text-white mb-2">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-lg md:text-xl text-yellow-200 font-medium">
              ชั่วโมง
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl md:text-6xl font-bold text-white mb-2">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-lg md:text-xl text-yellow-200 font-medium">
              นาที
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-4xl md:text-6xl font-bold text-white mb-2">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-lg md:text-xl text-yellow-200 font-medium">
              วินาที
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white/20 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-orange-500 to-yellow-500 h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${Math.max(0, Math.min(100, ((targetDate - Date.now()) / (targetDate - new Date('2024-01-01').getTime())) * 100))}%`
              }}
            ></div>
          </div>
          <p className="text-yellow-200 mt-2 text-sm">
            ความคืบหน้าการนับถอยหลังพังเรนเจอร์
          </p>
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