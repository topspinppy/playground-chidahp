import { getSinglePost } from "@/lib/api";
import { Node } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type RouteParams = Promise<{
  slug: string;
  postSlug: string;
}>


export async function generateMetadata(params: { params: RouteParams }): Promise<Metadata> {
  const { slug, postSlug } = await params.params;
  const post = await getSinglePost(postSlug, slug);

  if (!post) return {};

  const tags = post.tags?.nodes || [];
  const keywords = tags.map(tag => tag.name).join(', ');

  return {
    title: post.title,
    description: post.excerpt || post.title,
    keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: "article",
      url: `https://playground.chidahp.com/category/${slug}/${postSlug}`,
      images: [
        {
          url: post.featuredImage?.node?.sourceUrl || "https://playground.chidahp.com/og-default.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.title,
      images: [post.featuredImage?.node?.sourceUrl || "https://playground.chidahp.com/og-default.jpg"],
    },
  };
}


export default async function CategoryContentPage(params: { params: RouteParams }) {
  const { slug, postSlug } = await params.params;
  const post = await getSinglePost(postSlug, slug);
  if (!post) return notFound();

  const belongsToCategory = post.categories.nodes.some(
    (cat: Node) => cat.slug === slug
  );
  if (!belongsToCategory) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* หมวดหมู่ */}
      <div className="mb-4">
        {post.categories.nodes
          .filter((cat: Node) => cat.slug !== "featured-post")
          .map((cat: Node) => (
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
      <h1 className="text-4xl font-black text-yellow-600 mb-2">
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
        aria-label={post.title}
        className="prose prose-invert prose-yellow max-w-none leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content || '<p>ไม่มีเนื้อหาครับ</p>' }}
      />

      {/* แท็กของบทความ */}
      {post.tags?.nodes?.length > 0 && (
        <div className="mt-12">
          <h4 className="text-sm font-semibold text-yellow-600 mb-2">
            TAGS
          </h4>
          <ul className="flex flex-wrap gap-2">
            {post.tags.nodes.map((tag: Node) => (
              <Link
                key={tag.slug}
                href={`/tag/${tag.slug}`}
                className="bg-yellow-700 hover:bg-yellow-600 text-yellow-100 text-xs font-medium px-3 py-1 rounded-full transition"
              >
                #{tag.name}
              </Link>
            ))}
          </ul>
        </div>
      )}


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
