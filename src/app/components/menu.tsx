'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Category } from '@/types/types'

interface IMenuProps {
  categories: Category[]
}

export default function Menu({ categories }: IMenuProps) {
  const pathname = usePathname()
  const router = useRouter()

  const currentCategory = categories.find(cat => pathname === `/category/${cat.slug}`)

  return (
    <nav
      className="bg-yellow-400 px-4 py-3 text-black font-semibold relative z-10"
      aria-label="หมวดหมู่บทความ"
    >
      {/* ✅ Mobile: Native <select> */}
      <div className="block sm:hidden">
        <label htmlFor="category-select" className="sr-only">
          เลือกหมวดหมู่
        </label>
        <select
          id="category-select"
          name="category"
          value={currentCategory?.slug || ''}
          onChange={(e) => router.push(`/category/${e.target.value}`)}
          className="w-full px-4 py-2 border border-black rounded-md bg-white text-sm shadow-sm"
        >
          <option value="" disabled>
            เลือกหมวดหมู่
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Desktop: Inline <ul><li><a> */}
      <ul className="hidden sm:flex flex-wrap gap-4 justify-center mt-2 mb-2" role="menubar">
        {categories.map((cat) => {
          const isActive = pathname === `/category/${cat.slug}`
          return (
            <li key={cat.id} role="none">
              <Link
                href={`/category/${cat.slug}`}
                className={`cursor-pointer px-4 py-1.5 border border-black rounded-full transition-all text-sm shadow-sm
                  ${isActive
                    ? 'bg-black text-yellow-400'
                    : 'bg-yellow-50 hover:bg-black hover:text-yellow-400'}
                `}
                aria-current={isActive ? 'page' : undefined}
                role="menuitem"
                title={`ไปยังหมวดหมู่ ${cat.name}`}
              >
                {cat.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
