"use client";

function RoadTo100K() {
  return (
    <section className="mx-auto px-6 py-6 bg-yellow-300 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-2xl font-extrabold text-black mb-2">
          🛤️ Road to 100K
        </h3>
        <p className="text-yellow-900 font-medium">
          ชาวชูโล่ร่วมสร้างตำนาน <br className="block md:hidden" />
          สานฝันชี้ดาบสู่ยูทูปเบอร์ 100,000 ซับ
        </p>
      </div>

      <div>
        <a
          href="https://www.youtube.com/@chidahp"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-black text-yellow-300 px-6 py-3 rounded-full font-bold text-sm hover:bg-yellow-800 hover:text-white transition"
        >
          🔔 Subscribe เลย!
        </a>
      </div>
    </section>
  );
}

export default RoadTo100K;
