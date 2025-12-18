
'use client'

import { useState, useEffect } from 'react'

interface Step {
  id: string
  title: string
  description: string
  icon: string
  stepNumber: number
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

  const [progress, setProgress] = useState(0)

  const [steps] = useState<Step[]>([
    {
      id: 'step_1',
      title: 'ก้าวแรก',
      description: 'Step 1',
      icon: '🌱',
      stepNumber: 1,
      unlocked: true,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'step_2',
      title: 'Approve หัวข้อผ่าน',
      description: 'Step 2',
      icon: '✅',
      stepNumber: 2,
      unlocked: true,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'step_3',
      title: 'ทีมเขียนทำงาน',
      description: 'Step 3',
      icon: '✍️',
      stepNumber: 3,
      unlocked: true,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'step_4',
      title: 'อาร์ตไดเริ่มเข้า',
      description: 'Step 4',
      icon: '🎨',
      stepNumber: 4,
      unlocked: true,
      color: 'from-teal-500 to-blue-500'
    },
    {
      id: 'step_5',
      title: 'เก็บรายละเอียด',
      description: 'Step 5',
      icon: '🔍',
      stepNumber: 5,
      unlocked: false,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'step_6',
      title: 'ส่งโรงพิมพ์',
      description: 'Step 6',
      icon: '🖨️',
      stepNumber: 6,
      unlocked: false,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'step_7',
      title: 'Launchปักธง!!!',
      description: 'Step 7',
      icon: '🚀',
      stepNumber: 7,
      unlocked: false,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'step_8',
      title: 'สู่งานหนังสือ',
      description: 'Step 8',
      icon: '📚',
      stepNumber: 8,
      unlocked: false,
      color: 'from-indigo-500 to-purple-500'
    }
  ])

  // Convert Buddhist calendar 2568 to Gregorian calendar 2025
  // March 27, 2568 BE = March 27, 2025 CE
  const targetDate = new Date('2026-03-27T00:00:00').getTime()
  const startDate = new Date('2025-10-01T00:00:00').getTime()

  // Countdown timer with flip detection
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now()
      const distance = targetDate - now
      const totalDuration = targetDate - startDate

      // Calculate progress percentage
      const progressPercent = Math.max(0, Math.min(100, ((targetDate - now) / totalDuration) * 100))
      setProgress(progressPercent)

      if (distance > 0) {
        const daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hoursLeft = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const secondsLeft = Math.floor((distance % (1000 * 60)) / 1000)

        setTimeLeft({
          days: daysLeft,
          hours: hoursLeft,
          minutes: minutesLeft,
          seconds: secondsLeft
        })

        // Steps are managed manually, no automatic unlocking based on countdown
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setProgress(0)
        // Steps are managed manually
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, startDate])


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
                width: `${progress}%`
              }}
            ></div>
          </div>
          <p className="text-yellow-200 mt-2 text-xs md:text-sm">
            ความคืบหน้าการนับถอยหลังพังเรนเจอร์
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-3xl mx-auto mb-6">
          <h2 className="text-lg md:text-xl font-bold text-white mb-4">
            📋 Steps
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`relative p-3 md:p-4 rounded-lg border transition-all duration-500 transform ${
                  step.unlocked
                    ? `bg-gradient-to-br ${step.color} border-white/50 shadow-lg scale-105 ${
                        step.stepNumber === 3 ? 'animate-pulse' : ''
                      }`
                    : 'bg-white/5 border-white/20 opacity-50'
                }`}
              >
                <div className="text-center">
                  <div className="text-xl md:text-2xl mb-1">
                    {step.icon}
                  </div>
                  <div className={`text-xs font-bold mb-1 ${
                    step.unlocked ? 'text-white' : 'text-gray-400'
                  }`}>
                    Step {step.stepNumber}
                  </div>
                  <h3 className={`text-xs md:text-sm font-bold mb-1 ${
                    step.unlocked ? 'text-white' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-xs ${
                    step.unlocked ? 'text-white/90' : 'text-gray-500'
                  }`}>
                    {step.description}
                  </p>
                </div>
                
                {/* Active step indicator */}
                {step.unlocked && step.stepNumber === 3 && (
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-lg animate-ping"></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Steps Stats */}
          <div className="mt-4 text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 border border-white/20">
              <span className="text-white font-bold text-sm md:text-base">
                📍 สถานะ: {steps.filter(s => s.unlocked).length}/{steps.length} ขั้นตอน
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