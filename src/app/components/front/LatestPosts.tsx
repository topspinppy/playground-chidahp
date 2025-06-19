import { Post } from "@/types/types";
import { BlogCard } from "./BlogCard";



interface ILatestPostProps {  //
  latestPosts?: Post[];
}

export default function LatestPosts(props: ILatestPostProps) {
  const { latestPosts } = props;
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 space-y-16 mb-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestPosts && latestPosts.map((post) => (
          <BlogCard post={post} key={post.id} />
        ))}
      </div>
    </section>
  );
}