"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";

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
  const currentRef = useRef<HTMLAnchorElement | null>(null); // 📌 ref สำหรับ current post

  // ✅ scroll to current post on mount
  useEffect(() => {
    if (currentRef.current) {
      currentRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, []);

  return (
    <section className="border-yellow-800 pt-2 relative">
      <h2 className="text-xl font-bold text-yellow-600 mb-4">
        📖 อ่านเป็นซีรีส์ได้
      </h2>

      <div
        ref={scrollRef}
        className="overflow-x-auto flex gap-4 pb-2 scroll-smooth snap-x snap-mandatory"
      >
        {seriesPosts.map((post, idx) => {
          const isCurrent = post.slug === currentSlug;

          return (
            <Link
              key={post.slug}
              ref={isCurrent ? currentRef : null} // 👁 ตั้ง ref ให้กับ current เท่านั้น
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
    </section>
  );
}
