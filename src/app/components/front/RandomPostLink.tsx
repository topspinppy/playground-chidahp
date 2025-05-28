'use client'

import { useEffect, useState } from "react";

export default function RandomPostLink({ posts }: { posts: Post[] }) {
  const [randomSlug, setRandomSlug] = useState<string | null>(null);
  const [categorySlug, setCategorySlug] = useState<string | null>(null);

  useEffect(() => {
    const random = posts[Math.floor(Math.random() * posts.length)];
    setRandomSlug(random.slug);
    setCategorySlug(random.categories.nodes[0]?.slug);
  }, [posts]);

  if (!randomSlug || !categorySlug) return null;

  return (
    <a
      href={`/category/${categorySlug}/${randomSlug}`}
      className="inline-block bg-yellow-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-yellow-700 transition"
    >
      อ่านบทความสุ่ม
    </a>
  );
}
