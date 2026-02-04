'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import MatrixBackground from '@/app/pangranger-2026/MatrixBackground'

const MATRIX_GREEN = '#00FF41'

interface Step {
  id: string
  title: string
  description: string
  icon: string
  stepNumber: number
  unlocked: boolean
  color: string
}

function MatrixCard({
  children,
  className = '',
  cornerSize = 'w-3 h-3',
}: {
  children: React.ReactNode
  className?: string
  cornerSize?: string
}) {
  return (
    <div className={`relative border border-[#00FF41]/50 bg-black/80 backdrop-blur-md overflow-hidden ${className}`}>
      <div className={`absolute top-0 left-0 ${cornerSize} border-t-2 border-l-2 border-[#00FF41]/70`} />
      <div className={`absolute top-0 right-0 ${cornerSize} border-t-2 border-r-2 border-[#00FF41]/70`} />
      <div className={`absolute bottom-0 left-0 ${cornerSize} border-b-2 border-l-2 border-[#00FF41]/70`} />
      <div className={`absolute bottom-0 right-0 ${cornerSize} border-b-2 border-r-2 border-[#00FF41]/70`} />
      {children}
    </div>
  )
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
    { id: 'step_1', title: 'ก้าวแรก', description: 'Step 1', icon: '🌱', stepNumber: 1, unlocked: true, color: 'from-green-500 to-emerald-500' },
    { id: 'step_2', title: 'Approve หัวข้อผ่าน', description: 'Step 2', icon: '✅', stepNumber: 2, unlocked: true, color: 'from-blue-500 to-cyan-500' },
    { id: 'step_3', title: 'ทีมเขียนทำงาน', description: 'Step 3', icon: '✍️', stepNumber: 3, unlocked: true, color: 'from-purple-500 to-pink-500' },
    { id: 'step_4', title: 'อาร์ตไดเริ่มเข้า', description: 'Step 4', icon: '🎨', stepNumber: 4, unlocked: true, color: 'from-teal-500 to-blue-500' },
    { id: 'step_5', title: 'เก็บรายละเอียด', description: 'Step 5', icon: '🔍', stepNumber: 5, unlocked: true, color: 'from-orange-500 to-red-500' },
    { id: 'step_6', title: 'ส่งโรงพิมพ์', description: 'Step 6', icon: '🖨️', stepNumber: 6, unlocked: true, color: 'from-red-500 to-pink-500' },
    { id: 'step_7', title: 'Launchปักธง!!!', description: 'Step 7', icon: '🚀', stepNumber: 7, unlocked: false, color: 'from-yellow-500 to-orange-500' },
    { id: 'step_8', title: 'สู่งานหนังสือ', description: 'Step 8', icon: '📚', stepNumber: 8, unlocked: false, color: 'from-indigo-500 to-purple-500' }
  ])

  const targetDate = new Date('2026-03-27T00:00:00').getTime()
  const startDate = new Date('2025-10-01T00:00:00').getTime()

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now()
      const distance = targetDate - now
      const totalDuration = targetDate - startDate
      // ความคืบหน้า = เวลาที่ผ่านไปจาก start ถึง now (0% ตอนเริ่ม → 100% เมื่อถึงวันเป้าหมาย)
      const elapsed = Math.max(0, now - startDate)
      const progressPercent = distance <= 0 ? 100 : Math.min(100, (elapsed / totalDuration) * 100)
      setProgress(progressPercent)

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setProgress(100)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate, startDate])

  return (
    <div className="min-h-screen bg-black text-[#00FF41] font-mono selection:bg-[#00FF41] selection:text-black overflow-x-hidden">
      {/* Background image - pangranger style */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/pangranger-bg.png"
          alt=""
          fill
          className="object-cover opacity-50 mix-blend-screen"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.15)_0%,transparent_60%)]" />
      </div>
      <MatrixBackground />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6">
        {/* Header: Logo สิ้นสุดทางเชื่อ */}
        <div className="mb-8 text-center">
          <div className="inline-block px-3 py-1 border border-[#00FF41] text-[10px] sm:text-xs mb-4 animate-pulse tracking-[0.2em] bg-black/60 backdrop-blur-sm">
            PROTOCOL: COUNTDOWN_ACTIVE
          </div>
          <div className="relative max-w-[85vw] sm:max-w-[75vw] md:max-w-2xl mx-auto mb-4">
            <div className="absolute -inset-6 sm:-inset-8 bg-[#00FF41]/15 blur-[50px] rounded-full opacity-40" />
            <Image
              src="/pangranger-logo.png"
              alt="สิ้นสุดทางเชื่อ"
              width={600}
              height={300}
              className="relative w-full h-auto object-contain drop-shadow-[0_0_20px_rgba(0,255,65,0.6)] brightness-110 contrast-110"
              priority
            />
          </div>
          <p className="text-sm sm:text-base text-[#00FF41]/80 tracking-widest uppercase">
            นับถอยหลังพังเรนเจอร์ · ชี้ดาบ X ชูโล่ #งานหนังสือ2569
          </p>
        </div>

        {/* Countdown Timer - Matrix cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 w-full max-w-2xl">
          {[
            { value: timeLeft.days, label: 'วัน' },
            { value: timeLeft.hours, label: 'ชั่วโมง' },
            { value: timeLeft.minutes, label: 'นาที' },
            { value: timeLeft.seconds, label: 'วินาที' }
          ].map(({ value, label }) => (
            <MatrixCard key={label} className="p-4 md:p-6 rounded-xl transition-all duration-300 hover:border-[#00FF41] hover:shadow-[0_0_20px_rgba(0,255,65,0.15)]">
              <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#00FF41] mb-1 tabular-nums drop-shadow-[0_0_8px_rgba(0,255,65,0.4)]">
                {value.toString().padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm text-[#00FF41]/70 uppercase tracking-wider">
                {label}
              </div>
            </MatrixCard>
          ))}
        </div>

        {/* Progress Bar - Matrix style */}
        <div className="w-full max-w-xl mx-auto mb-8">
          <MatrixCard className="p-4 rounded-xl">
            <div className="h-2 bg-black/80 rounded-full overflow-hidden border border-[#00FF41]/30">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${MATRIX_GREEN}99, ${MATRIX_GREEN})`,
                  boxShadow: `0 0 12px ${MATRIX_GREEN}80`
                }}
              />
            </div>
            <p className="text-[#00FF41]/60 mt-2 text-[10px] sm:text-xs uppercase tracking-wider">
              ความคืบหน้า
            </p>
          </MatrixCard>
        </div>

        {/* Steps */}
        <div className="w-full max-w-3xl mx-auto">
          <h2 className="text-sm sm:text-base font-bold text-[#00FF41] mb-4 uppercase tracking-widest">
            [ STEPS ]
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {steps.map((step) => (
              <MatrixCard
                key={step.id}
                cornerSize="w-2 h-2"
                className={`p-3 rounded-lg transition-all duration-300 ${
                  step.unlocked
                    ? 'border-[#00FF41]/60 hover:border-[#00FF41] hover:shadow-[0_0_12px_rgba(0,255,65,0.1)]'
                    : 'border-[#00FF41]/25 opacity-60'
                } ${step.stepNumber === 6 ? 'animate-pulse' : ''}`}
              >
                <div className="text-center">
                  <div className="text-lg sm:text-xl mb-1">{step.icon}</div>
                  <div className={`text-[10px] font-bold mb-0.5 uppercase tracking-wider ${step.unlocked ? 'text-[#00FF41]' : 'text-[#00FF41]/50'}`}>
                    Step {step.stepNumber}
                  </div>
                  <h3 className={`text-[10px] sm:text-xs font-bold leading-tight ${step.unlocked ? 'text-[#00FF41]' : 'text-[#00FF41]/50'}`}>
                    {step.title}
                  </h3>
                </div>
              </MatrixCard>
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center px-4 py-2 border border-[#00FF41]/50 bg-black/80 rounded-lg">
              <span className="w-1.5 h-1.5 bg-[#00FF41] rounded-full animate-pulse mr-2" />
              <span className="text-xs sm:text-sm text-[#00FF41]/90 uppercase tracking-wider">
                สถานะ: {steps.filter(s => s.unlocked).length}/{steps.length} ขั้นตอน
              </span>
            </div>
          </div>
        </div>

        {/* Floating accent */}
        <div className="fixed top-4 right-4 w-2 h-2 bg-[#00FF41] rounded-full animate-pulse opacity-70 pointer-events-none" style={{ boxShadow: `0 0 12px ${MATRIX_GREEN}` }} />
      </div>
    </div>
  )
}
