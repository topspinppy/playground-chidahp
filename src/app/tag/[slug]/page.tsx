import { BlogCard } from "@/app/components/front/BlogCard";
import { getPostsByTag } from "@/lib/api";
import { Post } from "@/types/types";
import Link from "next/link";

type Props = Promise<{ slug: string }>


export default async function TagPage({
  params,
}: { params: Props }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const data = await getPostsByTag(decodedSlug);
  const posts = data.tags.nodes[0]?.posts.nodes ?? []

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">
        บทความแท็ก: {`#${decodedSlug}`}
      </h1>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-yellow-600">
          <p className="text-sm italic mb-4">
            🧐 แท็กนี้ยังไม่มีบทความในตอนนี้
          </p>
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-yellow-300 text-black font-semibold rounded-full hover:bg-yellow-400 transition"
          >
            กลับหน้าแรก
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post: Post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
