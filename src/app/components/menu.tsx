'use client'

import { Category } from '@/types/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useCallback } from 'react'

interface IMenuProps {
  categories: Category[]
}

export default function Menu({ categories }: IMenuProps) {
  const pathname = usePathname()
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => {
    // Initialize expanded categories based on current pathname
    const activeCategory = categories.find(cat =>
      pathname === `/category/${cat.slug}` || pathname.startsWith(`/category/${cat.slug}/`)
    )
    return activeCategory ? new Set([activeCategory.slug]) : new Set()
  })

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  const toggleCategoryExpansion = useCallback((categorySlug: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(categorySlug)) {
        newSet.delete(categorySlug)
      } else {
        newSet.add(categorySlug)
      }
      return newSet
    })
  }, [])

  const handleCategoryHover = useCallback((categorySlug: string | null) => {
    setHoveredCategory(categorySlug)
  }, [])

  return (
    <>
      <nav
        className="bg-white border-b border-gray-100 px-4 py-3 relative z-10"
        aria-label="หมวดหมู่บทความ"
      >
        {/* Mobile: Header with Hamburger Menu */}
        <div className="flex justify-between items-center sm:hidden cursor-pointer">
          <div className="text-lg font-medium text-gray-900" />
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="เปิดเมนู"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop: Horizontal Menu */}
        <div className="hidden sm:block">
          <div className="flex flex-wrap items-center justify-center gap-1">
            {categories.map((cat) => {
              // Check if this category or any of its subcategories is active
              const isDirectActive = pathname === `/category/${cat.slug}`
              const isSubActive = pathname.startsWith(`/category/${cat.slug}/`)
              const isActive = isDirectActive || isSubActive
              const hasChildren = cat.children?.nodes?.length > 0
              const isHovered = hoveredCategory === cat.slug

              return (
                <div
                  key={cat.id}
                  className="relative"
                  onMouseEnter={() => hasChildren && handleCategoryHover(cat.slug)}
                  onMouseLeave={() => handleCategoryHover(null)}
                >
                  {/* Main Category Link */}
                  <Link
                    href={`/category/${cat.slug}`}
                    className={`
                      inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                      ${isActive
                        ? 'bg-yellow-400 text-gray-900 shadow-sm font-semibold'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-md'
                      }
                    `}
                    role="menuitem"
                  >
                    {cat.name}
                    {hasChildren && (
                      <svg
                        className={`w-3 h-3 ml-1 transition-transform duration-200 ${isHovered ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown */}
                  {hasChildren && (
                    <div
                      className={`
                        absolute top-full left-0 mt-1 min-w-[200px] z-50
                        transition-all duration-200 origin-top
                        ${isHovered
                          ? 'opacity-100 visible scale-100'
                          : 'opacity-0 invisible scale-95'
                        }
                      `}
                    >
                      <div className="bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden">
                        {cat.children.nodes.map((sub) => {
                          const isSubActive = pathname === `/category/${cat.slug}/${sub.slug}`
                          return (
                            <Link
                              key={sub.id}
                              href={`/category/${cat.slug}/${sub.slug}`}
                              className={`
                                block px-4 py-2.5 text-sm transition-colors border-b border-gray-50 last:border-b-0
                                ${isSubActive
                                  ? 'bg-yellow-300 text-gray-800 font-medium'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                }
                              `}
                            >
                              {sub.name}
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div className={`
        fixed inset-0 ${mobileMenuOpen ? 'bg-black/25 visible' : 'bg-black/0 invisible'}
        transition-all duration-300 ease-out z-40 sm:hidden
      `} onClick={closeMobileMenu} />

      {/* Mobile Sidebar Menu */}
      <aside className={`
        fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out sm:hidden
        ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">หมวดหมู่</h2>
          <button
            onClick={closeMobileMenu}
            className="flex items-center justify-center w-8 h-8 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="ปิดเมนู"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2">
            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}` || pathname.startsWith(`/category/${cat.slug}/`)
              const hasChildren = cat.children?.nodes?.length > 0
              const isExpanded = expandedCategories.has(cat.slug)

              return (
                <div key={cat.id} className="space-y-2">
                  {/* Main Category */}
                  <div className="flex items-center">
                    <Link
                      href={`/category/${cat.slug}`}
                      onClick={closeMobileMenu}
                      className={`
                        flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                        ${isActive
                          ? 'bg-yellow-400 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      {cat.name}
                    </Link>

                    {/* Expand/Collapse button for subcategories */}
                    {hasChildren && (
                      <button
                        onClick={() => toggleCategoryExpansion(cat.slug)}
                        className="ml-2 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        aria-label={isExpanded ? 'ย่อหมวดหมู่ย่อย' : 'ขยายหมวดหมู่ย่อย'}
                        aria-expanded={isExpanded}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} cursor-pointer`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Subcategories */}
                  {hasChildren && (
                    <div className={`
                      ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out
                      ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                    `}>
                      {cat.children.nodes.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/category/${cat.slug}/${sub.slug}`}
                          onClick={closeMobileMenu}
                          className={`
                            block px-3 py-2 text-sm rounded-md transition-colors
                            ${pathname === `/category/${cat.slug}/${sub.slug}`
                              ? 'bg-yellow-300 text-gray-800'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }
                          `}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}