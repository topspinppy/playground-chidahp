import { Post } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'
import { decode } from 'html-entities';

function stripHtmlAndDecode(htmlString: string): string {
  // 1. ลบ tag HTML
  let stripped = htmlString.replace(/<\/?[^>]+(>|$)/g, "");

  // 2. แปลง HTML entities เช่น &hellip;
  stripped = decode(stripped);

  // 3. ลบ [...] หรือ [&hellip;] ที่ WordPress มักแถมท้าย excerpt
  stripped = stripped.replace(/\s*\[(\.{3}|&hellip;)\]\s*/gi, "");

  // 4. ตัดช่องว่างหัวท้าย
  return stripped.trim();
}

export function BlogCard({ post }: { post: Post }) {
  const artClass = post.categories.nodes[0]?.slug === 'art-class';
  const categorySlug = post.categories.nodes.filter((category) => category.slug !== 'uncategorized' && category.slug !== 'featured-post');
  const sortedSlug = categorySlug
    .slice() // เผื่อไม่อยาก mutate ของเดิม
    .sort((a, b) => {
      // เอา parentId null (คือ root) มาก่อน
      if (a.parentId === null && b.parentId !== null) return -1;
      if (a.parentId !== null && b.parentId === null) return 1;
      return 0; // เทียบเท่ากัน
    });

  const finalSlug = sortedSlug.map((category) => category.slug);

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
        {artClass ? (
          <div className="p-5 border-t border-gray-100 bg-gradient-to-t from-white via-pink-50 to-white rounded-b-xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎨</span>
              <span className="text-base font-bold text-pink-700 tracking-tight">
                Art Class Exhibition
              </span>
            </div>
            <p className="text-lg font-bold text-gray-500 leading-relaxed">
              {post.author?.node?.name ? `วาดโดย ${post.author.node.name}` : 'วาดโดย นักเรียนชูโล่วิทยาคม'}
            </p>
          </div>
        ) : (
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title ?? '-'}</h2>
            <p className="text-gray-700 text-sm line-clamp-3">{stripHtmlAndDecode(post.excerpt)}</p>
            <p className="text-yellow-600 mt-2 text-sm font-medium">Read more →</p>
          </div>
        )}

      </Link>
    </article>
  )
}
