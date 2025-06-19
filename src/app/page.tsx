// src/app/page.tsx
import FeaturedPost from "./components/front/FeaturedPost";
import { getFeaturedPost, getLatestPosts, getNotLatestPosts } from "@/lib/api";
import RoadTo100K from "./components/front/RoadTo100K";
import LatestPosts from "./components/front/LatestPosts";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const featuredPost = await getFeaturedPost();
  const latestPosts = await getLatestPosts();
  const notLatestPosts = await getNotLatestPosts();
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-16 mb-0">
      <FeaturedPost featuredPost={featuredPost} latestPosts={latestPosts} />
      <LatestPosts latestPosts={notLatestPosts} />
      <RoadTo100K />
    </main>
  );
}
