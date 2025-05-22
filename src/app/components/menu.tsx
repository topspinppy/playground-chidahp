'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Category } from '@/types/types'

interface IMenuProps {
  categories: Category[]
}

export default function Menu({ categories }: IMenuProps) {
  const pathname = usePathname()

  return (
    <div className="bg-yellow-400 px-4 py-3 flex flex-wrap gap-3 justify-center text-black font-semibold">
      {categories.map((cat) => {
        const isActive = pathname === `/category/${cat.slug}`

        return (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className={`px-3 py-1 border border-black rounded-full transition
              ${isActive ? 'bg-black text-yellow-400' : 'hover:bg-black hover:text-yellow-400'}`}
          >
            {cat.name}
          </Link>
        )
      })}
    </div>
  )
}
