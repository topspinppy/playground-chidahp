import { Category } from '@/types/types';
import Link from 'next/link';

export default function Footer({ categories }: { categories: Category[] }) {

  return (
    <footer className="bg-black text-yellow-200 text-sm pt-12 pb-6 border-t border-yellow-800" >
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* หมวดหมู่ */}
        <div>
          <h4 className="text-yellow-400 font-bold mb-3">หมวดหมู่</h4>
          <ul className="space-y-1 text-yellow-300 text-sm">
            {categories.map((category) => (
              <li key={category.id}><Link href={`/category/${category.slug}`}>{category.name}</Link></li>
            ))}
          </ul>
        </div>

        {/* เกี่ยวกับ */}
        <div>
          <h4 className="text-yellow-400 font-bold mb-3">เกี่ยวกับ</h4>
          <ul className="space-y-1 text-yellow-300 text-sm">
            <li><Link href="/page/about">เกี่ยวกับ Playground</Link></li>
            <li><Link href="#">ติดต่อทีมงาน</Link></li>
            <li><Link href="/page/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* เขียนกับเรา */}
        <div>
          <h4 className="text-yellow-400 font-bold mb-3">เขียนกับเรา</h4>
          <ul className="space-y-1 text-yellow-300 text-sm">
            <li><Link href="mailto:hello@chidahp.com">hello@chidahp.com</Link></li>
            <li><Link href="#">ร่วมเป็นนักเขียน</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-yellow-400 font-bold mb-3">ติดตามชี้ดาบ</h4>
          <div className="flex gap-4 text-yellow-300">
            <Link href="https://www.instagram.com/chidahp" target="_blank">IG</Link>
            <Link href="https://chidahp.com" target="_blank">Website</Link>
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