"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center gap-4">
      {/* โลโก้หมุน */}
      <div className="w-14 h-14 relative">
        <Image
          src="/real-chidahp.png" // ต้องใส่โลโก้ขนาดเล็กไว้ใน public
          alt="Loading"
          fill
          className="animate-spin-slow opacity-80"
        />
      </div>

      {/* ข้อความ */}
      <p className="text-yellow-700 text-sm italic opacity-80 text-center">
        เรียลชี้ดาบกำลังปูเสื่อ รอแป๊บนึงนะค้าบ ☁️
      </p>
    </div>
  );
}