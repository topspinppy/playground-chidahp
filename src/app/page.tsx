export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen px-8 sm:px-20 py-16 sm:py-32 gap-8 bg-black text-white font-[family-name:var(--font-geist-sans)]">
      <header className="text-center">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-wide">🗞️ Playground by Chidahp</h1>
        <p className="text-lg sm:text-xl mt-4 text-gray-400">พื้นที่ข่าวสารสุดจัด ฟีลบอร์ดข่าวใต้หอ แต่เท่กว่า!</p>
      </header>

      <main className="flex flex-col items-center justify-center text-center">
        <div className="text-2xl sm:text-3xl font-semibold">🛠 Coming Soon</div>
        <p className="mt-4 max-w-xl text-gray-300">อีกไม่นานเกินรอ สำนักข่าวสายขี้แซะประจำจักรวาลจะเปิดให้โลกได้เห็นความจริง... และความบ้ง</p>
        <p className="mt-4 italic text-sm text-gray-500">*จงเตรียมตัวรับความปัง...หรือความพัง?*</p>
      </main>

      <footer className="text-center text-sm text-gray-500">
        &copy; 2025 Chidahp. All rights reserved.
      </footer>
    </div>
  );
}
