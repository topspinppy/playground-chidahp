import { Category } from '@/types/types';
import { CiInstagram } from "react-icons/ci";
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
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/category/${category.slug}`}
                  title={`ดูบทความในหมวด ${category.name}`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* เกี่ยวกับ */}
        <nav aria-label="เกี่ยวกับเว็บไซต์ Playground">
          <h4 className="text-yellow-400 font-bold mb-3">เกี่ยวกับ</h4>
          <ul className="space-y-1 text-yellow-300 text-sm">
            <li>
              <Link href="/page/about" title="เกี่ยวกับ Playground">เกี่ยวกับ Playground</Link>
            </li>
            <li>
              <Link href="/page/contact" title="ติดต่อทีมงาน">ติดต่อทีมงาน</Link>
            </li>
            <li>
              <Link href="/page/privacy-policy" title="นโยบายความเป็นส่วนตัว">Privacy Policy</Link>
            </li>
          </ul>
        </nav>

        {/* เขียนกับเรา */}
        <nav aria-label="ช่องทางการเขียนกับ Playground">
          <h4 className="text-yellow-400 font-bold mb-3">เขียนกับเรา</h4>
          <ul className="space-y-1 text-yellow-300 text-sm">
            <li>
              <a
                href="mailto:hello@chidahp.com"
                title="ส่งอีเมลถึงเรา"
              >
                chidahp@gmail.com
              </a>
            </li>
            <li>
              <Link href="/page/write-with-us" title="ร่วมเป็นนักเขียนกับเรา">ร่วมเป็นนักเขียน</Link>
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
            >
              <FaInstagramSquare />
            </a>
            <a
              href="https://www.facebook.com/CHIDAHP"
              target="_blank"
              rel="noopener noreferrer"
              title="ไปยัง Facebook ของชี้ดาบ"
            >
              <FaFacebookSquare />
            </a>
            <a
              href="https://link.chidahp.com/moOmpm"
              target="_blank"
              rel="noopener noreferrer"
              title=""
            >
              <FaLine />
            </a>
            <a
              href="https://x.com/chidahp"
              target="_blank"
              rel="noopener noreferrer"
              title=""
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
