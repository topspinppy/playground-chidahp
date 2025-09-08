'use client';

import { BlogCard } from "@/app/components/front/BlogCard";
import TrackViewClient from "@/app/components/TrackViewClient";
import { getPostsByCategory } from "@/lib/api";
import { Category, Post } from "@/types/types";
import { useState } from "react";

type Props = {
  slug: string;
  initialCategory: Category;
  initialPosts: Post[];
  initialHasNextPage: boolean;
  initialEndCursor: string;
};

export default function MainCategory({ 
  slug, 
  initialCategory, 
  initialPosts, 
  initialHasNextPage, 
  initialEndCursor 
}: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const [endCursor, setEndCursor] = useState(initialEndCursor);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (loading || !hasNextPage) return;
    
    setLoading(true);
    try {
      const result = await getPostsByCategory(slug, 6, endCursor);
      setPosts(prev => [...prev, ...result.nodes]);
      setHasNextPage(result.pageInfo.hasNextPage);
      setEndCursor(result.pageInfo.endCursor);
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <TrackViewClient postId={'category-001'} />

      <section className="mb-12">
        {/* 🔹 Heading */}
        <div className="bg-yellow-400 text-black inline-block px-4 py-1 rounded-t-md text-sm uppercase font-semibold tracking-wider">
          Category
        </div>
        <h1 className="text-4xl font-black text-yellow-600 mt-2">
          {initialCategory.name}
        </h1>
        <p className="text-yellow-800 max-w-2xl mt-3 text-base leading-relaxed">
          {initialCategory.description?.replace(/<[^>]*>/g, '')}
        </p>
        <hr className="border-t border-yellow-800 mt-6" />
      </section>

      {/* 🔹 Content */}
      {posts.length === 0 ? (
        <p className="text-center text-yellow-800 italic bg-yellow-50 border border-yellow-200 rounded-xl px-6 py-4 shadow-sm">
          หมวดหมู่นี้ยังไม่มีบทความในขณะนี้<br className="hidden sm:inline" />
          ไว้กลับมาเยี่ยมเราอีกครั้งเร็ว ๆ นี้นะครับ 🌼
        </p>
      ) : (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              return (
                <BlogCard key={post.slug} post={post} />
              )
            })}
          </div>
          
          {hasNextPage && (
            <div className="text-center mt-12">
              <button
                onClick={loadMore}
                disabled={loading}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                {loading ? 'กำลังโหลด...' : 'โหลดเพิ่มเติม'}
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
