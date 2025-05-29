import { Post } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'

export function BlogCard({ post }: { post: Post }) {
  const categorySlug = post.categories.nodes.filter(category => category.slug !== 'featured-post').reverse();
  const finalSlug = categorySlug.map((category) => category.slug);
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
      <Link href={`/category/${finalSlug.join('/')}/${post.slug}`}>
        <Image
          src={post.featuredImage?.node?.sourceUrl ?? '/chidahp.png'}
          alt={post.title}
          className="w-full h-48 object-cover"
          width={500}
          height={500}
        />
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title ?? '-'}</h2>
          <p className="text-gray-700 text-sm line-clamp-3">{post.excerpt
            ? post.excerpt.replace(/<[^>]+>/g, '').substring(0, 55) + '...'
            : '-'}</p>
          <p className="text-yellow-600 mt-2 text-sm font-medium">Read more →</p>
        </div>
      </Link>
    </article>
  )
}
