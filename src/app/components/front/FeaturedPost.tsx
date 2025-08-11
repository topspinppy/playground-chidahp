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
    <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white">
      {/* FEATURED POST */}
      <div className="lg:col-span-2">
        {featuredPost ? (
          <Link
            href={`/category/${slugFeaturedCategory}/${featuredPost.slug}`}
            className="block group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-2xl bg-gray-900 aspect-[16/9] shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.01]">
              {/* Simple Featured Badge */}
              <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md">
                🔥 เรื่องแนะนำสุดฮิต
              </div>

              {/* Image */}
              <Image
                src={
                  featuredPost.featuredImage?.node.sourceUrl ??
                  `https://playground.chidahp.com/api/og?title=${featuredPost.title}&author=${featuredPost.author?.node?.name ?? "นักเรียนชูโล่"}`
                }
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                width={800}
                height={450}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight line-clamp-2 group-hover:text-orange-300 transition-colors duration-300">
                  {featuredPost.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200">
                  <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2">
                    📅 {new Date(featuredPost.date).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>

                  <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2">
                    ✍️ {featuredPost.author.node.name}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div className="text-center border-2 border-dashed border-gray-300 rounded-2xl py-16 bg-gray-50">
            <div className="text-5xl mb-4">📰</div>
            <p className="text-lg font-semibold text-gray-700 mb-2">ยังไม่มีเรื่องแนะนำ</p>
            <p className="text-gray-500">มาดูเรื่องล่าสุดกันเถอะ</p>
          </div>
        )}
      </div>

      {/* SIDEBAR */}
      <aside className="space-y-6">
        {/* Clean Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white">
          <h3 className="text-lg font-bold flex items-center gap-2">
            🔥 เรื่องราวล่าสุด
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-medium">HOT</span>
          </h3>
        </div>

        <div className="space-y-3">
          {latestPosts.map((post, i) => {
            const slug = post.categories?.nodes?.[0]?.slug ?? "-";
            const category = post.categories?.nodes.slice().reverse()[0];
            const formattedDate = new Date(post.date).toLocaleDateString("th-TH", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });

            // Simple color scheme
            const badgeColors = [
              "bg-pink-500",
              "bg-blue-500", 
              "bg-green-500",
              "bg-purple-500",
              "bg-orange-500"
            ];
            const badgeColor = badgeColors[i % badgeColors.length];

            return (
              <article key={i} className="group">
                <Link
                  href={`/category/${slug}/${post.slug}`}
                  className="flex gap-3 p-3 rounded-xl transition-all duration-200 hover:shadow-md hover:bg-gray-50 border border-transparent hover:border-gray-200"
                >
                  {/* Simple Thumbnail with Number */}
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-16 bg-gray-200 rounded-lg overflow-hidden">
                      <Image
                        src={
                          post.featuredImage?.node.sourceUrl ||
                          "https://playground.chidahp.com/chidahp.png"
                        }
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        width={80}
                        height={64}
                      />
                    </div>
                    {/* Clean Number Badge */}
                    <div className={`absolute -top-1 -left-1 w-5 h-5 ${badgeColor} text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm`}>
                      {i + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {category && (
                      <span className={`inline-block ${badgeColor} text-white text-xs font-medium px-2 py-1 rounded-full mb-1`}>
                        {category.name}
                      </span>
                    )}
                    
                    <h4 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h4>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      🕒 <time>{formattedDate}</time>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </aside>
    </main>
  );
}