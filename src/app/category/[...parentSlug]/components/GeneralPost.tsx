import { BlogCard } from "@/app/components/front/BlogCard";
import { Post } from "@/types/types";



function GeneralPost({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  )
}

export default GeneralPost;