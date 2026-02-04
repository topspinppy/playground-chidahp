"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const MATRIX_GREEN = "#00FF41";

export default function PungRangerAds() {
  return (
    <div className="relative group mx-2 my-3">
      {/* Outer glow - extends beyond frame */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${MATRIX_GREEN}40, transparent 40%, transparent 60%, ${MATRIX_GREEN}30)`,
          filter: "blur(8px)",
        }}
        aria-hidden
      />
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-500"
        style={{
          boxShadow: `0 0 24px ${MATRIX_GREEN}60, 0 0 48px ${MATRIX_GREEN}30`,
          filter: "blur(1px)",
        }}
        aria-hidden
      />

      <div
        className="relative flex items-center justify-between h-24 bg-black rounded-2xl overflow-hidden border-2 border-[#00FF41]/60 backdrop-blur-sm transition-all duration-500 group-hover:border-[#00FF41] group-hover:shadow-[0_0_30px_rgba(0,255,65,0.2),inset_0_0_40px_rgba(0,255,65,0.03)]"
        style={{
          boxShadow: `inset 0 0 80px ${MATRIX_GREEN}12, inset 0 0 0 1px ${MATRIX_GREEN}20`,
        }}
      >
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `linear-gradient(${MATRIX_GREEN} 1px, transparent 1px), linear-gradient(90deg, ${MATRIX_GREEN} 1px, transparent 1px)`,
            backgroundSize: "10px 10px",
          }}
        />
        {/* Radial vignette + center glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 100% at 50% 50%, ${MATRIX_GREEN}18 0%, transparent 70%), linear-gradient(to right, black 0%, transparent 15%, transparent 85%, black 100%)`,
          }}
        />
        <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00FF41]/60 shadow-[0_0_8px_#00FF41] pointer-events-none" />

        {/* Corner accents with glow */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00FF41] shadow-[0_0_6px_#00FF4180]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00FF41] shadow-[0_0_6px_#00FF4180]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00FF41] shadow-[0_0_6px_#00FF4180]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00FF41] shadow-[0_0_6px_#00FF4180]" />

        {/* Content */}
        <div className="relative z-10 flex items-center w-full px-5">
          <div className="flex-shrink-0 w-[72px] sm:w-20 md:w-24 lg:w-28 min-w-0">
            <div
              className="relative p-1.5 sm:p-2 rounded-lg h-12 flex items-center transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(0,255,65,0.25)]"
              style={{
                border: `1px solid ${MATRIX_GREEN}60`,
                boxShadow: `inset 0 0 20px ${MATRIX_GREEN}15, 0 0 12px ${MATRIX_GREEN}20`,
                backgroundColor: "rgba(0,0,0,0.7)",
              }}
            >
              <Image
                src="/pangranger-logo-single.png"
                alt="สิ้นสุดทางเชื่อ"
                width={128}
                height={28}
                className="w-full h-auto max-h-8 object-contain object-center brightness-110 opacity-95 drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]"
                priority
                sizes="(max-width: 640px) 72px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
              />
            </div>
          </div>

          <div className="flex-1 ml-4 font-mono">
            <h3
              className="text-base font-bold mb-0.5 tracking-wide"
              style={{
                color: MATRIX_GREEN,
                textShadow: `0 0 12px ${MATRIX_GREEN}90, 0 0 24px ${MATRIX_GREEN}50, 0 0 4px ${MATRIX_GREEN}`,
              }}
            >
              สิ้นสุดทางเชื่อ
            </h3>
            <p className="text-[#00FF41]/80 text-xs font-medium tracking-widest uppercase">
              PRE-ORDER NOW!!!
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link href="/pangranger-2026" className="cursor-pointer">
              <button
                className="relative font-mono px-5 py-2.5 border-2 bg-black/90 text-sm font-bold uppercase tracking-widest rounded transition-all duration-300 hover:scale-[1.02] group/btn overflow-hidden"
                style={{
                  borderColor: MATRIX_GREEN,
                  color: MATRIX_GREEN,
                  boxShadow: `0 0 12px ${MATRIX_GREEN}40, inset 0 0 20px ${MATRIX_GREEN}08`,
                }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 z-0"
                  style={{ background: MATRIX_GREEN }}
                  aria-hidden
                />
                <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">
                  [ กดสั่งซื้อที่นี่ ]
                </span>
              </button>
            </Link>
          </div>
        </div>

        {/* Status + small accent */}
        <div
          className="absolute top-2 right-3 w-2 h-2 rounded-full animate-pulse"
          style={{
            background: MATRIX_GREEN,
            boxShadow: `0 0 8px ${MATRIX_GREEN}, 0 0 16px ${MATRIX_GREEN}80`,
          }}
        />
        <div
          className="absolute bottom-2 left-4 text-[8px] font-mono text-[#00FF41]/30 tracking-[0.2em] uppercase"
          aria-hidden
        >
          SYSTEM_ACTIVE
        </div>
      </div>
    </div>
  );
}
