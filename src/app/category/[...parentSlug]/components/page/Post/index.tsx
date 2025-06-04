import { getPostInSeries, getSinglePost, getViewCount } from "@/lib/api";
import { Node } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Tag from "@/app/components/front/Tag";
import ShareButtons from "@/app/components/front/SharedButton";
import CommentSection from "@/app/components/CommentSection";
import dynamic from "next/dynamic";
import TrackViewClient from "@/app/components/TrackViewClient";


const SeriesNavigator = dynamic(() => import("../../../../../components/front/SeriesNavigator"), {
  ssr: true, // ไม่ render บน server
  loading() {
    return (
      <div className="flex justify-center items-center h-16">
        <span className="text-yellow-500">กำลังโหลด...</span>
      </div>
    );
  },
});


type RouteParams = Promise<{
  parentSlug: string[];
  third?: boolean;
}>;

function formatViewCount(count: number): string {
  if (count < 1_000) return `${count}`;
  if (count < 1_000_000) return `${(count / 1_000).toFixed(1)}k`;
  return `${(count / 1_000_000).toFixed(1)}M `;
}

export async function generateMetadata(params: RouteParams): Promise<Metadata> {
  const { parentSlug, third } = await params;
  const [slugLv1, slugLv2, slugLv3] = parentSlug;
  const post = third
    ? await getSinglePost(slugLv3, slugLv2)
    : await getSinglePost(slugLv2, slugLv1);

  if (!post) return {};
  const postExcerpt = post.excerpt?.replace(/<[^>]+>/g, "") || "";
  const tags = post.tags?.nodes || [];
  const keywords = tags.map((tag) => tag.name).join(", ");
  return {
    title: post.title,
    description: postExcerpt || post.title,
    keywords,
    openGraph: {
      title: post.title,
      description: postExcerpt || post.title,
      type: "article",
      url: `https://playground.chidahp.com/category/${parentSlug.join("/")}`,
      images: [
        {
          url:
            post.featuredImage?.node?.sourceUrl ||
            `https://playground.chidahp.com/api/og?title=${post.title}&author=${post.author?.node?.name ?? "นักเรียนชูโล่"
            }`,
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
      images: [
        post.featuredImage?.node?.sourceUrl ||
        `https://playground.chidahp.com/api/og?title=${post.title}&author=${post.author?.node?.name ?? "นักเรียนชูโล่"
        }`,
      ],
    },
    alternates: {
      canonical: `https://playground.chidahp.com/category/${parentSlug.join(
        "/"
      )}`,
    },
  };
}

const articleClassName = `
  [&_iframe]:w-full
  [&_iframe]:aspect-video
  [&_iframe]:max-w-full
  [&_iframe]:mx-auto
`;

const proseClassName = `
  prose prose-invert prose-yellow max-w-none leading-relaxed
`;

const wpContentClassName = `
  wp-content
`;

export default async function Post(params: RouteParams) {
  const { parentSlug, third } = await params;
  const [slugLv1, slugLv2, slugLv3] = parentSlug;
  const post = third
    ? await getSinglePost(slugLv3, slugLv2)
    : await getSinglePost(slugLv2, slugLv1);

  const postInSeries = post?.storySeries.seriesId ? await getPostInSeries(post.storySeries.seriesId) : [];
  if (!post) return notFound();
  const rawId = atob(post.id)
  const postId = rawId.split(":")[1]
  const belongsToCategory = post.categories.nodes.some(
    (cat: Node) => cat.slug === slugLv1
  );
  const view = await getViewCount(Number(postId));
  if (!belongsToCategory) return notFound();
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {!!postId && <TrackViewClient postId={Number(postId)} />}
      {/* หมวดหมู่ */}
      <div className="mb-4">
        {post.categories.nodes
          .filter((cat: Node) => cat.slug !== "featured-post")
          .map((cat: Node, index: number) => {
            if (index === 0) {
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="text-xs uppercase font-bold text-yellow-500 bg-yellow-800 px-2 py-1 rounded mr-2"
                >
                  {cat.name}
                </Link>
              );
            }
            return null;
          })}
      </div>

      {/* หัวเรื่อง */}
      <h1 className="text-4xl font-black text-yellow-600 mb-2">{post.title}</h1>

      {/* วันที่ + ผู้เขียน */}
      <div className="text-sm text-yellow-600 mb-10 flex flex-wrap items-center gap-x-4 gap-y-4">
        {/* วันที่ */}
        <span>{new Date(post.date).toLocaleDateString("th-TH")}</span>

        {/* ผู้เขียน + avatar + views */}
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

            {/* 👁️ จำนวนวิว */}
            <div className="flex items-center gap-1 text-yellow-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-[1em] w-[1em] fill-yellow-600" viewBox="0 0 24 24">
                <path d="M12 4.5C6 4.5 1.73 9.11 1 12c.73 2.89 5 7.5 11 7.5s10.27-4.61 11-7.5c-.73-2.89-5-7.5-11-7.5zm0 13c-3.03 0-5.5-2.47-5.5-5.5S8.97 6.5 12 6.5s5.5 2.47 5.5 5.5S15.03 17.5 12 17.5zm0-9a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
              </svg>
              <span className="leading-none">{formatViewCount(view)} ครั้ง</span>
            </div>
          </div>
        )}
      </div>


      {/* เนื้อหา */}
      <article
        className={`
          ${slugLv1 === "chidahp-content" ? proseClassName : wpContentClassName}
          ${articleClassName}
        `}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* ถ้ามีตอนก่อนหน้าและถัดไป */}
      {post.storySeries?.seriesId && (
        <SeriesNavigator
          seriesPosts={postInSeries}
          parentSlug={parentSlug}
          currentSlug={post.slug}
        />
      )}


      <Tag nodes={post.tags.nodes} />

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
      <ShareButtons
        url={`https://playground.chidahp.com/category/${parentSlug.join("/")}`}
        title={post.title}
      />

      {/* คอมเมนต์ */}
      {post.commentStatus === "open" && (
        <section className="mt-12">
          <CommentSection
            postId={Number(postId)}
          />
        </section>
      )}
    </main>
  );
}
