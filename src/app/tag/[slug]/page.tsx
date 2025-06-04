import { BlogCard } from "@/app/components/front/BlogCard";
import TrackViewClient from "@/app/components/TrackViewClient";
import { getPostsByTag } from "@/lib/api";
import { Post } from "@/types/types";
import Link from "next/link";

export const dynamic = 'force-dynamic'

type Props = Promise<{ slug: string }>

export async function generateMetadata({
  params,
}: { params: Props }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const data = await getPostsByTag(decodedSlug);

  if (!data) return {
    title: 'ไม่พบหน้าเพจ | Playground By Chidahp',
  }


  return {
    title: `${data.tags.nodes[0]?.name} | Playground By Chidahp`,
    description: `บทความที่มีแท็ก ${data.tags.nodes[0]?.name}`,
    openGraph: {
      title: `${data.tags.nodes[0]?.name} | Playground By Chidahp`,
      description: `บทความที่มีแท็ก ${data.tags.nodes[0]?.name}`,
      url: `https://playground.chidahp.com/tag/${slug}`,
      type: 'article',
      images: [
        {
          url: `https://playground.chidahp.com/api/og?title=บทความที่มีแท็ก - ${data.tags.nodes[0]?.name}&author=นักเรียนชูโล่`,
          width: 1200,
          height: 630,
          alt: data.tags.nodes[0]?.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.tags.nodes[0]?.name} | Playground By Chidahp`,
      description: `บทความที่มีแท็ก ${data.tags.nodes[0]?.name}`,
      images: [`https://playground.chidahp.com/api/og?title=บทความที่มีแท็ก - ${data.tags.nodes[0]?.name}&author=นักเรียนชูโล่`],
    },
    alternates: {
      canonical: `https://playground.chidahp.com/tag/${slug}`,
    },
  }
}

export default async function TagPage({
  params,
}: { params: Props }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const data = await getPostsByTag(decodedSlug);
  const posts = data.tags.nodes[0]?.posts.nodes ?? []

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <TrackViewClient postId={`tag-${slug}-001`} />
      
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
