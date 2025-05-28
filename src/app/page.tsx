// src/app/page.tsx
import FeaturedPost from "./components/front/FeaturedPost";
import { getFeaturedPost, getLatestPosts } from "@/lib/api";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const featuredPost = await getFeaturedPost();
  const latestPosts = await getLatestPosts();

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-16">

      {/* 1. Featured Post */}
      <section>
        <FeaturedPost featuredPost={featuredPost} latestPosts={latestPosts} />
      </section>

    </main>
  );
}
