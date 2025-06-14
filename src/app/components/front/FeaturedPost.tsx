import { Post } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedPost({
  featuredPost,
  latestPosts,
}: {
  featuredPost: Post;
  latestPosts: Post[];
}) {
  const slugFeaturedCategory =
    featuredPost?.categories.nodes.reverse()[0]?.slug ?? "-";
  return (
    <main className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 bg-white mb-0">
      {/* FEATURED POST */}
      <div className="md:col-span-2">
        {featuredPost ? (
          <a
            href={`/category/${slugFeaturedCategory}/${featuredPost.slug}`}
            className="block group"
          >
            <div className="aspect-[16/9] overflow-hidden rounded-lg shadow relative group">
              {/* ป้าย Featured Post */}
              <div className="absolute top-4 left-4 z-10 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                🚨 บทความแนะนำสุดจี๊ด!
              </div>

              {/* รูปภาพพร้อม Hover Zoom */}
              <Image
                src={
                  featuredPost.featuredImage?.node.sourceUrl ??
                  `https://playground.chidahp.com/api/og?title=${featuredPost.title
                  }&author=${featuredPost.author?.node?.name ?? "นักเรียนชูโล่"
                  }`
                }
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                width={1000}
                height={1000}
              />
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-extrabold group-hover:text-yellow-600 transition">
                {featuredPost.title}
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(featuredPost.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-sm text-gray-600">
                {featuredPost.author.node.name}
              </p>
            </div>
          </a>
        ) : (
          <div className="text-center text-gray-400 italic border rounded-lg py-20">
            📰 ยังไม่มีบทความปักหมุดตอนนี้
            <br />
            ติดตามบทความล่าสุดทางด้านขวาได้เลยค้าบ
          </div>
        )}
      </div>

      {/* SIDEBAR */}
      <aside className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800">บทความล่าสุด</h3>
        </div>

        {latestPosts.map((post, i) => {
          const slug = post.categories?.nodes?.[0]?.slug ?? "-";
          const category = post.categories?.nodes.slice().reverse()[0];
          const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          // กำหนดสีและ emoji จาก category name
          const categoryStyles: Record<string, { bg: string; text: string; emoji: string }> = {
            "Default": { bg: "bg-orange-500", text: "text-white", emoji: "" },
          };

          const style = categoryStyles[category?.name] || categoryStyles["Default"];

          return (
            <div key={i} className="flex gap-4 border-t pt-4 group">
              <div className="w-24 h-16 bg-gray-200 rounded-xl overflow-hidden shadow group-hover:scale-105 transform transition-all duration-300">
                <Link
                  href={`/category/${slug}/${post.slug}`}
                  className="block w-full h-full"
                >
                  <Image
                    src={post.featuredImage?.node.sourceUrl || "https://playground.chidahp.com/chidahp.png"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    width={96}
                    height={64}
                  />
                </Link>
              </div>
              <div className="flex-1">
                <div className="flex flex-col gap-1">
                  <Link
                    href={`/category/${category?.slug}`}
                    className={`${style.bg} ${style.text} text-xs font-bold px-3 py-1 rounded-full w-fit shadow-sm`}
                  >
                    {style.emoji} {category?.name ?? "ไม่มีหมวดหมู่"}
                  </Link>
                  <a
                    href={`/category/${slug}/${post.slug}`}
                    className="block font-semibold text-gray-900 hover:text-yellow-600 transition"
                  >
                    {post.title}
                  </a>
                </div>
                <p className="text-sm text-gray-500">{formattedDate}</p>
              </div>
            </div>
          );
        })}

      </aside>
    </main>
  );
}
