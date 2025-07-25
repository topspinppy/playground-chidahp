import { Category } from '@/types/types';
import { FaFacebookSquare, FaLine, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Link from 'next/link';

export default function Footer({ categories }: { categories: Category[] }) {
  return (
    <footer className="bg-black text-yellow-200 text-sm pt-12 pb-6 border-t border-yellow-800">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* หมวดหมู่ */}
        <nav aria-label="หมวดหมู่บทความ">
          <h4 className="text-yellow-400 font-bold mb-3">หมวดหมู่</h4>
          <ul className="space-y-1 text-yellow-300 text-sm">
            {categories?.length > 0 ? (
              categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.slug}`}
                    title={`ดูบทความในหมวด ${category.name}`}
                    className="hover:text-yellow-400 transition-colors duration-200"
                  >
                    {category.name}
                  </Link>
                </li>
              ))
            ) : (
              <li className="text-yellow-500">กำลังโหลด...</li>
            )}
          </ul>
        </nav>

        {/* เกี่ยวกับ */}
        <nav aria-label="เกี่ยวกับเว็บไซต์ Playground">
          <h4 className="text-yellow-400 font-bold mb-3">เกี่ยวกับ</h4>
          <ul className="space-y-1 text-yellow-300 text-sm">
            <li>
              <Link 
                href="/page/about" 
                title="เกี่ยวกับ Playground"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                เกี่ยวกับ Playground
              </Link>
            </li>
            <li>
              <Link 
                href="/page/contact" 
                title="ติดต่อทีมงาน"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                ติดต่อทีมงาน
              </Link>
            </li>
            <li>
              <Link 
                href="/page/privacy-policy" 
                title="นโยบายความเป็นส่วนตัว"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link 
                href="/page/term-and-conditions" 
                title="ข้อกำหนดและเงื่อนไขการใช้งาน"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </nav>

        {/* เขียนกับเรา */}
        <nav aria-label="ช่องทางการเขียนกับ Playground">
          <h4 className="text-yellow-400 font-bold mb-3">เขียนกับเรา</h4>
          <ul className="space-y-1 text-yellow-300 text-sm">
            <li>
              <a
                href="mailto:story@mail.playground.chidahp.com"
                title="ส่งอีเมลถึงเรา"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                story@mail.playground.chidahp.com
              </a>
            </li>
            <li>
              <Link 
                href="/page/write-with-us" 
                title="ร่วมเป็นนักเขียนกับเรา"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                ร่วมเป็นนักเขียน
              </Link>
            </li>
          </ul>
        </nav>

        {/* Social */}
        <nav aria-label="ช่องทางติดตามชี้ดาบ">
          <h4 className="text-yellow-400 font-bold mb-3">ติดตามชี้ดาบ x ชูโล่</h4>
          <div className="flex gap-4 text-yellow-300 text-2xl">
            <a
              href="https://www.instagram.com/chidahp"
              target="_blank"
              rel="noopener noreferrer"
              title="ไปยัง Instagram ของชี้ดาบ"
              aria-label="ไปยัง Instagram ของชี้ดาบ"
              className="hover:text-yellow-400 transition-colors duration-200"
            >
              <FaInstagramSquare />
            </a>
            <a
              href="https://www.facebook.com/CHIDAHP"
              target="_blank"
              rel="noopener noreferrer"
              title="ไปยัง Facebook ของชี้ดาบ"
              aria-label="ไปยัง Facebook ของชี้ดาบ"
              className="hover:text-yellow-400 transition-colors duration-200"
            >
              <FaFacebookSquare />
            </a>
            <a
              href="https://app.chidahp.com/chulo-admission"
              target="_blank"
              rel="noopener noreferrer"
              title="Line OpenChat โรงเรียนชูโล่วิทยาคม"
              aria-label="Line OpenChat โรงเรียนชูโล่วิทยาคม"
              className="hover:text-yellow-400 transition-colors duration-200"
            >
              <FaLine />
            </a>
            <a
              href="https://x.com/chidahp"
              target="_blank"
              rel="noopener noreferrer"
              title="ไปยัง X (Twitter) ของชี้ดาบ"
              aria-label="ไปยัง X (Twitter) ของชี้ดาบ"
              className="hover:text-yellow-400 transition-colors duration-200"
            >
              <FaSquareXTwitter />
            </a>
          </div>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 text-center text-yellow-500 text-xs border-t border-yellow-800 pt-4">
        © {new Date().getFullYear()} playground.chidahp.com. All rights reserved.
      </div>
    </footer>
  );
}