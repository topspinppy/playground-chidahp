import React from 'react';
import { ShoppingCart, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SouthDakotaBanner() {
  return (
    <div className="relative w-full max-w-8xl mx-auto overflow-hidden rounded-lg">
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src="/south-dakota-18.png"
          alt="South Dakota Book Background"
          className="w-full h-full object-cover"
          width={1200}
          height={600}
          priority
          quality={100}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent mix-blend-multiply"></div>

        {/* Radial gradient focal point */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.6)_0%,_transparent_70%)]"></div>

        <div className="absolute inset-0 flex flex-col md:flex-row items-center md:items-center justify-between p-6 md:p-8 space-y-4 md:space-y-0">
          <div className="flex-1 text-white">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">
              SOUTH DAKOTA 18+
            </h1>
            <p className="text-base md:text-lg mb-4 max-w-md italic drop-shadow-sm">
              เมื่ออิสรภาพและความฝัน แลกมาด้วยความพัง และความจริง...
            </p>
          </div>

          <div className="flex flex-col w-full md:w-auto space-y-3">
            <Link href="https://chidahp.page365.net/products/79228651">
              <button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:scale-105 transform transition-all duration-200 text-white px-6 py-3 rounded font-semibold flex items-center justify-center space-x-2 shadow-md">
                <ShoppingCart className="w-5 h-5" />
                <span>Pre-order</span>
              </button>
            </Link>
            <Link href="/category/chidahp-book-reviewer/southdakota">
              <button className="w-full border-2 border-pink-400 text-pink-300 hover:bg-pink-400 hover:text-white px-6 py-3 rounded font-medium transition-colors flex items-center justify-center space-x-2 shadow-sm">
                <BookOpen className="w-5 h-5" />
                <span>อ่าน Review</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
