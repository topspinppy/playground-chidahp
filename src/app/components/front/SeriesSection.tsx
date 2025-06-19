'use client'

import { useRef } from 'react'
import { Post } from '@/types/types'
import { BlogCard } from './BlogCard'

interface ISeriesSection {
  postSeries: Post[]
}

export default function SeriesSection({ postSeries }: ISeriesSection) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (!container) return
    const scrollAmount = container.offsetWidth * 0.9
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="bg-white py-16 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* หัวข้อ */}
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-gray-900 text-2xl md:text-3xl font-extrabold tracking-tight">
            รวมซีรีส์จากชาวชูโล่
          </h2>
        </div>

        {/* คำโปรย */}
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 md:mb-5">
          เรื่องราวจากเพื่อนบ้านในจักรวาลชี้ดาบ ที่เล่าต่อเป็นตอน ๆ จนหยุดอ่านไม่ได้
        </p>

        {/* เส้น shimmer */}
        <div className="w-24 h-[4px] rounded-full bg-yellow-400 relative overflow-hidden mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 opacity-30 animate-[shimmer_2s_linear_infinite]" />
        </div>

        {/* ลูกศรเลื่อน */}
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center hover:bg-yellow-100 transition"
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center hover:bg-yellow-100 transition"
          >
            →
          </button>

          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none px-4 md:px-0"
          >
            {postSeries.map((post) => (
              <div
                key={post.id}
                className="snap-start shrink-0 w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-0.75rem)]"
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
