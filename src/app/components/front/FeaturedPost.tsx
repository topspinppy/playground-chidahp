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
            className="block group cursor-pointer"
          >
            <div className="aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl relative group bg-gradient-to-br from-gray-900 to-black">
              {/* ป้าย Featured Post - ปรับให้มีเอฟเฟกต์สวยขึ้น */}
              <div className="absolute top-6 left-6 z-20 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-xl backdrop-blur-sm border border-white/20 animate-pulse">
                <span className="flex items-center gap-2">
                  🚨 <span>เรื่องราวแนะนำสุดจี๊ด!</span>
                </span>
              </div>

              {/* Overlay สำหรับเอฟเฟกต์ Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 z-10"></div>

              {/* รูปภาพพร้อม Hover Zoom และ Filter Effects */}
              <Image
                src={
                  featuredPost.featuredImage?.node.sourceUrl ??
                  `https://playground.chidahp.com/api/og?title=${
                    featuredPost.title
                  }&author=${
                    featuredPost.author?.node?.name ?? "นักเรียนชูโล่"
                  }`
                }
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-105"
                width={1000}
                height={1000}
              />

              {/* Content Area ปรับให้สวยขึ้น */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-8 z-15">
                {/* Title พร้อมเอฟเฟกต์ */}
                <h2 className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 bg-clip-text mb-4 leading-tight group-hover:from-yellow-300 group-hover:via-yellow-400 group-hover:to-orange-300 transition-all duration-500 drop-shadow-lg">
                  {featuredPost.title}
                </h2>

                {/* Meta Information */}
                <div className="flex items-center gap-4 text-sm">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-gray-300 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-medium">
                      {new Date(featuredPost.date).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-2 text-gray-300 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="font-medium">
                      {featuredPost.author.node.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Particles Effect (Optional) */}
              <div className="absolute inset-0 pointer-events-none z-5">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400/30 rounded-full animate-ping delay-1000"></div>
                <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-orange-400/30 rounded-full animate-ping delay-2000"></div>
                <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-red-400/30 rounded-full animate-ping delay-3000"></div>
              </div>
            </div>
          </a>
        ) : (
          <div className="text-center text-gray-400 italic border rounded-lg py-20">
            📰 ยังไม่มีเรื่องราวปักหมุดตอนนี้
            <br />
            ติดตามเรื่องราวล่าสุดทางด้านขวาได้เลยค้าบ
          </div>
        )}
      </div>

      {/* SIDEBAR */}
      <aside className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800">
            เรื่องราวล่าสุด 🔎
          </h3>
        </div>

        {latestPosts.map((post, i) => {
          const slug = post.categories?.nodes?.[0]?.slug ?? "-";
          const category = post.categories?.nodes.slice().reverse()[0];
          const formattedDate = new Date(post.date).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          );

          // กำหนดสีและ emoji จาก category name
          const categoryStyles: Record<
            string,
            { bg: string; text: string; emoji: string }
          > = {
            Default: { bg: "bg-orange-500", text: "text-white", emoji: "" },
          };

          const style =
            categoryStyles[category?.name] || categoryStyles["Default"];

          return (
            <div key={i} className="flex gap-4 border-t pt-4 group">
              <div className="w-24 h-16 bg-gray-200 rounded-xl overflow-hidden shadow group-hover:scale-105 transform transition-all duration-300">
                <Link
                  href={`/category/${slug}/${post.slug}`}
                  className="block w-full h-full"
                >
                  <Image
                    src={
                      post.featuredImage?.node.sourceUrl ||
                      "https://playground.chidahp.com/chidahp.png"
                    }
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
                    className="block w-[15rem] max-w-xs font-semibold text-gray-900 hover:text-yellow-600 transition truncate"
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
