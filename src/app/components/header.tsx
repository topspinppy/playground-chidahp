'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main header */}
        <div className="py-5 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-4 group"
            title="กลับสู่หน้าแรกของ Playground by Chidahp"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl opacity-75 group-hover:opacity-100 transition-opacity blur-sm"></div>
              <Image
                src="/chuloh.png"
                alt="โลโก้ Playground by Chidahp"
                width={40}
                height={40}
                className="relative rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 p-2 shadow-sm"
              />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 group-hover:text-gray-700 transition-colors tracking-tight">
                PLAYGROUND
              </h1>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-medium -mt-1">
                by Chidahp
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <blockquote className="text-gray-500 text-sm font-light italic max-w-sm">
              พื้นที่เล่า พื้นที่เล่น พื้นที่ปล่อยของทุกอารมณ์
            </blockquote>
          </div>
        </div>
      </div>
    </header>
  )
}