"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";

function RoadTo100K() {
  const [subs, setSubs] = useState<number | undefined>(0);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await fetch(`/api/youtube-subs`);
        const data = await res.json();
        setSubs(Number(data.subscribers));
      } catch (error) {
        console.error('Failed to fetch subscribers:', error);
      }
    };
    fetchSubscribers();
    const interval = setInterval(fetchSubscribers, 300000);
    return () => clearInterval(interval);
  }, []);
  
  const remaining = subs !== undefined ? Math.max(100000 - subs, 0) : undefined;


  return (
    <section className="bg-gradient-to-r from-yellow-600 to-orange-700 text-white rounded-xl shadow-md p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Info */}
      <div>
        <h3 className="text-lg sm:text-xl font-bold">
          🛤️ Road to <span className="text-black">100k</span> Subscribers ส่งชี้ดาบไปเป็น Youtuber
        </h3>
        <p className="text-sm text-white/90 italic">
          เหลืออีก <span className="font-bold text-white">{remaining}</span> คน ถึง 100,000!
        </p>
      </div>

      {/* ตัวเลข */}
      <div className="bg-orange-700 rounded-lg px-4 py-2 text-center shadow text-white">
        <p className="text-xl font-bold leading-tight">
          {subs === undefined ? '...' : (
            <CountUp end={subs} duration={2.5} separator="," />
          )}
        </p>
        <p className="text-xs opacity-80">Subscribers</p>
      </div>

      {/* ปุ่ม */}
      <a
        href="https://www.youtube.com/@chidahp?sub_confirmation=1"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black text-yellow-300 hover:bg-yellow-800 hover:text-white px-4 py-2 rounded-full text-sm font-semibold transition"
      >
        🔔 Subscribe ให้ชี้ดาบเลย!
      </a>
    </section>


  );
}

export default RoadTo100K;
