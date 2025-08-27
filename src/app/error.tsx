// app/blog/error.tsx
"use client";

import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="text-5xl animate-bounce">⚠️</div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800">
          เกิดข้อผิดพลาดกับระบบ Playground
        </h1>

        {/* Description */}
        <p className="mt-3 text-gray-600 text-sm break-words">
          {error?.message || "เกิดปัญหาบางอย่าง โปรดลองอีกครั้ง"}
        </p>

        {/* Retry Button */}
        <button
          onClick={() => reset()}
          className="mt-6 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-medium rounded-lg shadow"
        >
          ลองใหม่อีกครั้ง
        </button>

        {/* Back to Homepage */}
        <Link
          href="/"
          className="mt-4 inline-block text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          ⬅ กลับหน้าแรก
        </Link>
      </div>
    </div>
  );
}
