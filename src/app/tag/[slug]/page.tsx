import { BlogCard } from "@/app/components/front/BlogCard";
import { getPostsByTag } from "@/lib/api";
import { Post } from "@/types/types";

export default async function TagPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = decodeURIComponent(params.slug);
  const data = await getPostsByTag(slug);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">
        บทความแท็ก: {`#${slug}`}
      </h1>
      {data[0].posts.nodes.length === 0 ? (
        <p className="text-center py-12">ไม่พบแท็กนี้</p>
      ) : (
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {data[0].posts.nodes.map((post: Post) => {
          return (
            <BlogCard key={post.slug} post={post} />
          );
        })}
      </div>
      )}
    </main>
  );
}
