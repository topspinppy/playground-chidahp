import { getPostInSeries, getSinglePost } from "@/lib/api";
import { Node } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Tag from "@/app/components/front/Tag";
import ShareButtons from "@/app/components/front/SharedButton";
import SeriesNavigator from "@/app/components/front/SeriesNavigator";

export const dynamic = "force-dynamic";

type RouteParams = Promise<{
  parentSlug: string[];
  third?: boolean;
}>;

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
            `https://playground.chidahp.com/api/og?title=${post.title}&author=${
              post.author?.node?.name ?? "นักเรียนชูโล่"
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
          `https://playground.chidahp.com/api/og?title=${post.title}&author=${
            post.author?.node?.name ?? "นักเรียนชูโล่"
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

  const postInSeries = await getPostInSeries(post.storySeries.seriesId);
  if (!post) return notFound();

  const belongsToCategory = post.categories.nodes.some(
    (cat: Node) => cat.slug === slugLv1
  );

  if (!belongsToCategory) return notFound();
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
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
        className={`
          ${slugLv1 === "chidahp-podcast" ? proseClassName : wpContentClassName}
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
    </main>
  );
}
