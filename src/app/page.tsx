// src/app/page.tsx
import FeaturedPost from "./components/front/FeaturedPost";
import { getFeaturedPost, getLatestPosts, getNotLatestPosts, getPostSeries } from "@/lib/api";
import RoadTo100K from "./components/front/RoadTo100K";
import LatestPosts from "./components/front/LatestPosts";
import SeriesSection from "./components/front/SeriesSection";
import SouthDakotaBanner from "./components/front/SouthDakotaBanner";
import GoogleAdsense from "./components/GoogleAdsense";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const featuredPost = await getFeaturedPost();
  const latestPosts = await getLatestPosts();
  const notLatestPosts = await getNotLatestPosts();
  const postSeries = await getPostSeries();

  return (
    <div>
      <SouthDakotaBanner />
      <GoogleAdsense adSlot="Ads" />
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-16 mb-0">
        <FeaturedPost featuredPost={featuredPost} latestPosts={latestPosts} />
        <LatestPosts latestPosts={notLatestPosts} />
        <SeriesSection postSeries={postSeries} />
        <RoadTo100K />
      </main>
    </div>
  );
  
}
