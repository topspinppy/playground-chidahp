'use client'

import { Category } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Menu from './menu'

interface IHeaderProps {
  categories: Category[]
}

export default function Header(props: IHeaderProps) {
  const { categories } = props
  const [isVisible, setIsVisible] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const rotatingTexts = [
    "บางเรื่องแค่ได้เล่า...ใจก็เบาแล้ว",
    "ไม่ต้องเก่ง ไม่ต้องถูก แค่อยากให้คุณเล่า",
    "เรื่องของคุณสำคัญเสมอ ที่นี่มีที่ให้เสมอ"
  ];

  // Animation on mount
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Rotate text every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [rotatingTexts.length])

  return (
    <>
      <header className="border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Main header */}
          <div className="py-3 md:py-5 flex items-center justify-between">
            <Link
              href="/"
              className={`flex items-center gap-2 md:gap-4 group transform transition-all duration-700 hover:scale-105 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                }`}
              title="กลับสู่หน้าแรกของ Playground by Chidahp"
            >
              <div className="relative">
                {/* Glowing background */}
                <div
                  className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-xl opacity-75 group-hover:opacity-100 transition-all duration-500 blur-sm group-hover:blur-md animate-pulse"
                ></div>

                {/* Logo with better animation */}
                <div className="relative transform group-hover:scale-140 transition-transform duration-300">
                  <Image
                    src="/chuloh.png"
                    alt="โลโก้ Playground by Chidahp"
                    width={32}
                    height={32}
                    className="md:w-12 md:h-15 relative rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 p-1.5 md:p-2 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  />

                  {/* Floating sparkles - ซ่อนใน mobile */}
                  <div className="hidden md:block absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                  <div className="hidden md:block absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                </div>
              </div>

              <div className="overflow-hidden">
                {/* Title with slide-in animation */}
                <h1 className={`text-lg md:text-2xl font-black text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-600 group-hover:to-amber-600 transition-all duration-500 tracking-tight transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: '200ms' }}>
                  {'PLAYGROUND'.split('').map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block hover:animate-bounce"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationDuration: '0.6s'
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>

                {/* Subtitle */}
                <div className={`text-xs text-gray-400 uppercase tracking-wider font-medium -mt-1 transition-all duration-700 transform group-hover:text-gray-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{
                    transitionDelay: '400ms'
                  }}>
                  by Chidahp
                </div>
              </div>
            </Link>

            {/* Rotating quote with fade effect - ซ่อนใน mobile, แสดงใน tablet+ */}
            <div className={`hidden md:flex items-center gap-6 transform transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}
              style={{ transitionDelay: '600ms' }}>
              {/* Text container */}
              <div className="relative min-h-[3rem] flex items-center">
                <div className="w-full max-w-sm">
                  {rotatingTexts.map((text, index) => (
                    <blockquote
                      key={index}
                      className={`text-gray-500 text-sm font-light italic transition-all duration-700 ease-in-out ${index === textIndex
                          ? 'opacity-100 transform translate-y-0'
                          : 'opacity-0 transform translate-y-4 absolute inset-0'
                        }`}
                    >
                      <span className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-500 bg-clip-text text-transparent">
                        {text}
                      </span>
                    </blockquote>
                  ))}
                </div>
              </div>

              {/* Floating dots indicator */}
              <div className="flex gap-1 ml-2">
                {rotatingTexts.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === textIndex
                        ? 'bg-yellow-400 scale-110'
                        : 'bg-gray-300 scale-75'
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Mobile: Hamburger Menu Button แทน dots indicator */}
            <div 
              className={`md:hidden transform transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
              style={{ transitionDelay: '600ms' }}
            >
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="flex items-center justify-center w-10 h-10 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="เปิดเมนู"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <Menu categories={categories} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
    </>
  )
}