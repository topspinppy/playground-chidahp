

export default function Footer() {
  return (
    <footer className="bg-black text-yellow-200 text-sm pt-12 pb-6 border-t border-yellow-800" >
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* หมวดหมู่ */}
        <div>
          <h4 className="text-yellow-400 font-bold mb-3">หมวดหมู่</h4>
          <ul className="space-y-1 text-yellow-300 text-sm">
            <li><a href="/category/sandbox-living">Sandbox Living</a></li>
            <li><a href="/category/runaway-route">Runaway Route</a></li>
            <li><a href="/category/broke-but-breathing">Broke but Breathing</a></li>
            <li><a href="/category/flip-frame">Flip Frame</a></li>
            <li><a href="/category/unsaid-club">Unsaid Club</a></li>
          </ul>
        </div>

        {/* เกี่ยวกับ */}
        <div>
          <h4 className="text-yellow-400 font-bold mb-3">เกี่ยวกับ</h4>
          <ul className="space-y-1 text-yellow-300 text-sm">
            <li><a href="#">เกี่ยวกับ Playground</a></li>
            <li><a href="#">ติดต่อทีมงาน</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* เขียนกับเรา */}
        <div>
          <h4 className="text-yellow-400 font-bold mb-3">เขียนกับเรา</h4>
          <ul className="space-y-1 text-yellow-300 text-sm">
            <li><a href="mailto:hello@chidahp.com">hello@chidahp.com</a></li>
            <li><a href="#">ร่วมเป็นนักเขียน</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-yellow-400 font-bold mb-3">ติดตามชี้ดาบ</h4>
          <div className="flex gap-4 text-yellow-300">
            <a href="https://www.instagram.com/chidahp" target="_blank">IG</a>
            <a href="https://chidahp.com" target="_blank">Website</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 text-center text-yellow-500 text-xs border-t border-yellow-800 pt-4">
        © {new Date().getFullYear()} playground.chidahp.com. All rights reserved.
      </div>
    </footer >

  )
}