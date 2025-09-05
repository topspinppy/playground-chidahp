"use client";
import React from 'react';
import Image from "next/image";
import Link from 'next/link';

export default function SouthDakotaAds() {
  return (
    <div className="relative group mx-2 my-3">
      <div className="relative flex items-center justify-between h-24 bg-gradient-to-br from-slate-900 via-purple-900/90 to-indigo-900 rounded-2xl shadow-2xl overflow-hidden border border-purple-500/20 backdrop-blur-sm transition-all duration-500 hover:shadow-purple-500/25 hover:shadow-2xl hover:scale-[1.02]">
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/5 to-blue-600/10 animate-pulse opacity-50"></div>
        
        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/5 to-transparent blur-xl"></div>
        
        {/* Background Image with Better Opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 group-hover:opacity-20 transition-opacity duration-300"
          style={{
            backgroundImage: `url('/sd-background.png')`,
            filter: 'blur(0.5px)',
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex items-center w-full px-5">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <div className="relative p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 group-hover:bg-white/15 transition-all duration-300">
              <Image
                src="/southdakota.png"
                alt="South Dakota"
                width={60}
                height={24}
                className="drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
                priority
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 ml-5">
            <h3 className="text-white text-base font-bold mb-1 drop-shadow-lg">
              South Dakota 18+
            </h3>
            <p className="text-purple-200/90 text-sm font-medium">
              พรีออเดอร์ / อ่านรีวิว กด Link ได้เลย!
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex-shrink-0 cursor-pointer">
            <Link href="/southdakota" className="cursor-pointer">
              <button className="relative px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 border border-purple-400/30 hover:border-purple-300/50 backdrop-blur-sm group/btn">
                <span className="relative z-10">กดที่นี่</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover/btn:opacity-100 rounded-xl transition-opacity duration-300"></div>
              </button>
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-2 right-4 w-2 h-2 bg-purple-400/60 rounded-full animate-ping"></div>
        <div className="absolute bottom-2 left-4 w-1.5 h-1.5 bg-pink-400/60 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}