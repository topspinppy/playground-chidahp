import FeaturedPost from "./components/front/FeaturedPost";
import { getFeaturedPost, getLatestPosts } from "@/lib/api";

export const dynamic = 'force-dynamic'


export default async function HomePage() {
  const featuredPost = await getFeaturedPost()
  const latestPosts = await getLatestPosts()

  return (
    <main>
      <FeaturedPost featuredPost={featuredPost} latestPosts={latestPosts} />
    </main>
  )
}
