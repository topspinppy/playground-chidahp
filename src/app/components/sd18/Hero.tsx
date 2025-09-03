"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Typewriter from 'typewriter-effect';

export default function Hero() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-[#0b0c16] text-center px-4">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
        style={{
          backgroundImage: `url('/sd-background.png')`,
          transform: `translateY(${offsetY * 0.3}px) scale(1.1)`,
          opacity: 0.15,
        }}
      />

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c16]/90 via-[#1a0f2a]/60 to-transparent animate-gradient-flow"></div>

      {/* Neon Floating Glow */}
      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-pink-500/10 blur-2xl animate-pulse"></div>

      {/* Logo */}
      <Image
        src="/southdakota.png"
        alt="South Dakota Logo"
        width={500}
        height={400}
        style={{
          transform: `translateY(${offsetY * 0.15}px)`,
        }}
        className="relative z-10 drop-shadow-[0_0_40px_rgba(236,72,153,0.5)] transition-transform duration-1000 hover:scale-105 animate-zoom-fade"
        priority
      />

      {/* Tagline with typewriter effect */}
      <br />
      <p
        style={{
          transform: `translateY(${offsetY * 0.25}px)`,
        }}
        className="mt-8 text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-2xl leading-relaxed relative z-10 animate-fade-in delay-700"
      >
        <Typewriter
          options={{
            strings: ['เมื่ออิสรภาพและความฝัน...\n มาพร้อมกับความพังและความจริง'],
            autoStart: true,
            loop: true,
          }}
        />
      </p>

      {/* Floating Center Glow */}
      <div className="text- absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-fuchsia-500/10 blur-[140px] animate-pulse"></div>
    </section>
  );
}
