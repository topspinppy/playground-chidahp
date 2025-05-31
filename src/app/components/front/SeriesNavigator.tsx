"use client";

import Link from "next/link";
import { useRef } from "react";

export default function SeriesNavigator({
  seriesPosts,
  parentSlug,
  currentSlug,
}: {
  seriesPosts: {
    title: string;
    slug: string;
    date: string;
  }[];
  parentSlug: string[];
  currentSlug: string;
}) {
  const rawParentSlug = parentSlug.slice(0, -1).join("/");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = 250;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-16 border-t border-yellow-800 pt-10 relative">
      <h2 className="text-xl font-bold text-yellow-600 mb-4">
        📖 อ่านเป็นซีรีส์ได้
      </h2>

      {/* ปุ่มลูกศร */}
      {seriesPosts.length < 2 && (
        <button
          onClick={() => scroll("left")}
          className="absolute -left-15 top-1/2 -translate-y-1/2 z-10 bg-white shadow px-2 py-1 rounded-full hidden md:block"
          aria-label="เลื่อนไปซ้าย"
        >
          ←
        </button>
      )}

      <div
        ref={scrollRef}
        className="overflow-x-auto flex gap-4 pb-2 scroll-smooth snap-x snap-mandatory"
      >
        {seriesPosts.map((post, idx) => {
          const isCurrent = post.slug === currentSlug;

          return (
            <Link
              key={post.slug}
              href={`/category/${rawParentSlug}/${post.slug}`}
              className={`min-w-[200px] max-w-[220px] snap-start p-4 rounded-lg shadow-sm transition flex-shrink-0 border
                ${
                  isCurrent
                    ? "bg-yellow-600 text-white border-yellow-700"
                    : "bg-yellow-50 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
                }`}
            >
              <div>
                <p className="text-sm font-medium">EP {idx + 1}</p>
                <h3 className="text-md font-semibold line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(post.date).toLocaleDateString("th-TH")}
                </p>
                {isCurrent && (
                  <p className="text-xs italic mt-1 text-yellow-200">
                    🔸 ตอนที่คุณกำลังอ่าน
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* ปุ่มลูกศรขวา */}
      {seriesPosts.length < 2 && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow px-2 py-1 rounded-full hidden md:block"
          aria-label="เลื่อนไปขวา"
        >
          →
        </button>
      )}
    </section>
  );
}
