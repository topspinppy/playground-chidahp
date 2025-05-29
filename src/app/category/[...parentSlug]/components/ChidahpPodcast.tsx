import { BlogCard } from "@/app/components/front/BlogCard";
import { Post } from "@/types/types";


function ChidahpPodcast({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  )
}

export default ChidahpPodcast;