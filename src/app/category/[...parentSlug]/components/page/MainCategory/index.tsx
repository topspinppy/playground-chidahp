import { BlogCard } from "@/app/components/front/BlogCard";
import { getCategoryDetail, getPostsByCategory } from "@/lib/api";
import Link from "next/link";

type Props = Promise<{ slug: string }>;

export default async function MainCategory(params: Props) {
  const { slug } = await params;
  const categoryDetail = await getCategoryDetail(slug);
  const posts = await getPostsByCategory(slug);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="mb-12">
        {/* 🔹 Heading */}
        <div className="bg-yellow-400 text-black inline-block px-4 py-1 rounded-t-md text-sm uppercase font-semibold tracking-wider">
          Category
        </div>
        <h1 className="text-4xl font-black text-yellow-600 mt-2">
          {categoryDetail.name}
        </h1>
        <p className="text-yellow-800 max-w-2xl mt-3 text-base leading-relaxed">
          {categoryDetail.description?.replace(/<[^>]*>/g, '')}
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
