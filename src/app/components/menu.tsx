'use client'

import { Category } from '@/types/types'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

// interface SubCategory {
//   id: string
//   name: string
//   slug: string
//   count: number
// }

// interface Category {
//   id: string
//   name: string
//   slug: string
//   description?: string
//   count?: number | null
//   children: {
//     nodes: SubCategory[]
//   }
// }

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
          value={currentCategory?.slug ?? ''}
          onChange={(e) => router.push(e.target.value)}
          className="w-full px-4 py-2 border border-black rounded-md bg-white text-sm shadow-sm"
        >
          <option value="" disabled>
            เลือกหมวดหมู่
          </option>
          {categories.map((cat) => (
            <optgroup key={cat.id} label={cat.name}>
              {/* Main Category */}
              <option value={`/category/${cat.slug}`}>{cat.name}</option>

              {/* Subcategories */}
              {cat.children?.nodes.map((child) => (
                <option
                  key={child.id}
                  value={`/category/${cat.slug}/${child.slug}`}
                >
                  └ {child.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

      </div>

      {/* ✅ Desktop: Inline <ul><li><a> */}
      <ul className="hidden sm:flex flex-wrap gap-4 justify-center mt-2 mb-2" role="menubar">
        {categories.map((cat) => {
          const isActive = pathname === `/category/${cat.slug}`
          const hasChildren = cat.children?.nodes?.length > 0

          return (
            <li key={cat.id} role="none" className="relative group">
              {/* ปุ่มหลัก */}
              <Link
                href={`/category/${cat.slug}`}
                className={`cursor-pointer px-4 py-1.5 border border-black rounded-full transition-all text-sm shadow-sm
            ${isActive
                    ? 'bg-black text-yellow-400'
                    : 'bg-yellow-50 hover:bg-black hover:text-yellow-400'}
          `}
                aria-current={isActive ? 'page' : undefined}
                role="menuitem"
              >
                {cat.name}
              </Link>

              {/* Submenu */}
              {hasChildren && (
                <ul
                  className="absolute left-0 mt-2 bg-white border border-yellow-400 rounded shadow-lg z-50 w-max min-w-[200px]
            opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                >
                  {cat.children.nodes.map((sub) => (
                    <li key={sub.id}>
                      <Link
                        href={`/category/${cat.slug}/${sub.slug}`}
                        className="block px-4 py-2 text-sm text-yellow-800 hover:bg-yellow-100"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>


    </nav>
  )
}
