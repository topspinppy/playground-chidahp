// src/app/global-error.tsx
"use client";
import "../globals.css"; // 👈 เพิ่มบรรทัดนี้

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="text-5xl animate-bounce">🚨</div>
            </div>

            <h1 className="text-2xl font-bold text-gray-800">
              เกิดข้อผิดพลาดกับระบบ Playground
            </h1>

            <p className="mt-3 text-gray-600 text-sm break-words">
              {error?.message || "ระบบล่ม โปรดลองรีเฟรชใหม่อีกครั้ง"}
            </p>

            <button
              onClick={() => reset()}
              className="mt-6 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-medium rounded-lg shadow"
            >
              ลองใหม่
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
