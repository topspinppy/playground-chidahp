'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="relative bg-gradient-to-b from-black via-zinc-900 to-black text-yellow-400 py-10 text-center border-b border-yellow-600 shadow-inner">
      <div className="relative z-10 max-w-3xl mx-auto px-4 animate-fade-in-up space-y-4">

        {/* คลิกแล้วกลับหน้าหลัก */}
        <h1 className="text-4xl md:text-5xl font-logo font-extrabold tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 hover:opacity-90 transition"
            title="กลับสู่หน้าแรกของ Playground by Chidahp"
            aria-label="กลับสู่หน้าแรกของ Playground by Chidahp"
          >
            <Image
              src="/chuloh.png"
              alt="โลโก้ Playground by Chidahp"
              width={42}
              height={42}
              className="drop-shadow-sm bg-yellow-400 p-1.5 rounded-2xl"
            />
            <span>PLAYGROUND</span>
          </Link>
        </h1>

        {/* คำโปรย */}
        <blockquote className="italic text-yellow-200 text-base md:text-lg max-w-md mx-auto leading-relaxed">
          “พื้นที่เล่า พื้นที่เล่น พื้นที่ปล่อยของทุกอารมณ์”
        </blockquote>
      </div>
    </header>
  )
}
