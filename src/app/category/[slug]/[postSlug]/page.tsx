import { getSinglePost } from "@/lib/api";
import { Node } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = Promise<{
  slug: string;        // category slug
  postSlug: string;    // post slug
}>

export default async function CategoryContentPage(params: { params: Props }) {
  const { slug, postSlug } = await params.params;
  const post = await getSinglePost(postSlug, slug);
  if (!post) return notFound();

  // ตรวจสอบว่าโพสต์อยู่ในหมวดหมู่ที่ระบุ
  const belongsToCategory = post.categories.nodes.some(
    (cat: Node) => cat.slug === slug
  );

  if (!belongsToCategory) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* หมวดหมู่ */}
      <div className="mb-4">
        {post.categories.nodes.filter((cat: Node) => cat.slug !== 'featured-post').map((cat: Node) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="text-xs uppercase font-bold text-yellow-500 bg-yellow-800 px-2 py-1 rounded mr-2"
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* หัวเรื่อง */}
      <h1 className="text-4xl font-black text-yellow-300 mb-2">
        {post.title}
      </h1>

      {/* วันที่ + ผู้เขียน */}
      <div className="text-sm text-yellow-600 mb-6 flex items-center gap-3">
        <span>{new Date(post.date).toLocaleDateString("th-TH")}</span>
        {post.author?.node && (
          <div className="flex items-center gap-2">
            {post.author.node.avatar?.url && (
              <Image
                src={post.author.node.avatar.url}
                alt={post.author.node.name}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span>{post.author.node.name}</span>
          </div>
        )}
      </div>

      {/* เนื้อหา */}
      <article
        className="prose prose-invert prose-yellow max-w-none leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Bio ผู้เขียน */}
      {post.author?.node && (
        <section className="mt-16 p-6 rounded-lg border border-yellow-800">
          <div className="flex items-start gap-4">
            {post.author.node.avatar?.url && (
              <Image
                src={post.author.node.avatar.url}
                alt={post.author.node.name}
                className="w-16 h-16 rounded-full object-cover"
                width={64}
                height={64}
              />
            )}
            <div>
              <h3 className="text-lg font-bold text-yellow-900">
                เขียนโดย {post.author.node.name}
              </h3>
              {post.author.node.description && (
                <p className="text-sm text-yellow-500 mt-1 leading-relaxed">
                  {post.author.node.description}
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
