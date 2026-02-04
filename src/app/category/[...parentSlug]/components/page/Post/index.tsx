import { getPostInSeries, getSinglePost, getViewCount } from "@/lib/api";
import { Node } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Tag from "@/app/components/front/Tag";
import ShareButtons from "@/app/components/front/SharedButton";
import CommentSection from "@/app/components/CommentSection";
import dynamic from "next/dynamic";
import TrackViewClient from "@/app/components/TrackViewClient";
import WordPressContent from "@/app/components/WordPressContent";
import WarningComponent from "@/app/components/front/WarningComponent";
import AdvertisementSection from "@/app/components/AdvertisementSection";
import CategoryAd from "../../CategoryAd";

const SeriesNavigator = dynamic(() => import("../../../../../components/front/SeriesNavigator"), {
  ssr: true,
  loading() {
    return (
      <div className="flex justify-center items-center h-16 bg-yellow-900/5 rounded-xl border border-yellow-800/20">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin"></div>
          <span className="text-yellow-600">กำลังโหลด...</span>
        </div>
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
  const isArtGallery = post.categories.nodes.find((cat: Node) => cat.slug === "art-class");
  
    // Determine content type based on category or content analysis
  const getContentType = (): 'gutenberg' | 'classic' | 'prose' => {
    if (slugLv1 === "chidahp-content") return 'prose';
    
    // Check if content contains Gutenberg block classes
    if (post.content?.includes('wp-block-')) return 'gutenberg';
    
    // Check if WordPress CSS should be hidden
    if (post.hidewordpresscss?.ishidewordpresscss) return 'classic';
    
    return 'gutenberg'; // Default to gutenberg for better compatibility
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 lg:py-12">
      {/* Advertisement Section */}
      <div className="mt-8 md:block flex justify-center">
        <AdvertisementSection adSlot="5899108832" />
      </div>

      {!!postId && <TrackViewClient postId={Number(postId)} />}
      
      {/* Header Section - Clean and Simple */}
      <div className="mb-8 space-y-4">
        {/* หมวดหมู่ */}
        <div>
          {post.categories.nodes
            .filter((cat: Node) => cat.slug !== "featured-post")
            .map((cat: Node, index: number) => {
              if (index === 0) {
                return (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="inline-flex items-center text-xs uppercase font-bold text-yellow-900 bg-yellow-500 px-3 py-1.5 rounded-md hover:bg-yellow-600 hover:text-white transition-colors duration-200 shadow-sm"
                  >
                    {cat.name}
                  </Link>
                );
              }
              return null;
            })}
        </div>

        {/* หัวเรื่อง */}
        <h1 className="text-3xl lg:text-5xl font-black text-yellow-700 leading-tight">
          {post.title}
        </h1>

        {/* วันที่ + ผู้เขียน */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600">
          {/* วันที่ */}
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{new Date(post.date).toLocaleDateString("th-TH")}</span>
          </div>

          {/* ผู้เขียน + avatar */}
          {post.author?.node && (
            <div className="flex items-center gap-2">
              {post.author.node.avatar?.url && (
                <Image
                  src={post.author.node.avatar.url}
                  alt={post.author.node.name}
                  width={24}
                  height={24}
                  className="rounded-full border border-gray-200"
                />
              )}
              <span>{post.author.node.name}</span>
            </div>
          )}

          {/* Views */}
          <div className="flex items-center gap-1.5 text-yellow-700 bg-yellow-50 px-2.5 py-1 rounded-full text-xs font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4.5C6 4.5 1.73 9.11 1 12c.73 2.89 5 7.5 11 7.5s10.27-4.61 11-7.5c-.73-2.89-5-7.5-11-7.5zm0 13c-3.03 0-5.5-2.47-5.5-5.5S8.97 6.5 12 6.5s5.5 2.47 5.5 5.5S15.03 17.5 12 17.5zm0-9a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
            </svg>
            <span>{formatViewCount(view)} ครั้ง</span>
          </div>
        </div>
      </div>

      {/* Warning Section */}
      <WarningComponent istriggerwarning={post.triggerwarning?.istriggerwarning}
        triggerWarningMessage={post.triggerWarningMessage.triggerWarningMessage}
      />

      {/* Series Navigator */}
      {post.storySeries?.seriesId && (
        <div className="mb-8">
          <SeriesNavigator
            seriesPosts={postInSeries}
            parentSlug={parentSlug}
            currentSlug={post.slug}
          />
        </div>
      )}

      {/* Featured Image */}
      {post.hidefeaturelabel.ishidefeaturelabel === false && post.featuredImage?.node && (
        <div className="mb-8 group">
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              width={1200}
              height={630}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      )}

      {/* Content - Clean White Background */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8 mb-8">
        <WordPressContent
          content={post.content}
          contentType={getContentType()}
          enableSantization={true}
          className="post-content"
        />
      </div>

      <CategoryAd parentSlug={parentSlug} />

      {/* Tags */}
      <div className="mb-8">
        <Tag nodes={post.tags.nodes} />
      </div>

      {/* Author Bio - Simple Card */}
      {post.author?.node && (
        <section className="mb-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              {post.author.node.avatar?.url && (
                <Image
                  src={post.author.node.avatar.url}
                  alt={post.author.node.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-yellow-300"
                  width={64}
                  height={64}
                />
              )}
              <div>
                <h3 className="text-lg font-bold text-yellow-800 mb-1">
                  {isArtGallery ? 'วาดโดย' : 'เขียนโดย'}
                  <Link
                    href={`/author/${post.author.node.userId}`}
                    className="text-yellow-600 ml-2"
                  >
                    {post.author.node.name}
                  </Link>
                </h3>
                {post.author.node.description && (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {post.author.node.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      

      {/* Share Buttons */}
      <div className="mb-8">
        <ShareButtons
          url={`https://playground.chidahp.com/category/${parentSlug.join("/")}`}
          title={post.title}
        />
      </div>

      {/* Advertisement Section */}
      <AdvertisementSection adSlot="8467256373" />

      {/* Comments Section */}
      {post.commentStatus === "open" && (
        <section>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800">แสดงความคิดเห็น</h2>
              </div>
              <CommentSection postId={Number(postId)} />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}