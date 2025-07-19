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
    .slice()
    .sort((a, b) => {
      if (a.parentId === null && b.parentId !== null) return -1;
      if (a.parentId !== null && b.parentId === null) return 1;
      return 0;
    });

  const finalSlug = sortedSlug.map((category) => category.slug);

  return (
    <article className="group bg-white border-2 border-yellow-200 hover:border-yellow-300 transition-colors rounded-lg overflow-hidden">
      <Link href={`/category/${finalSlug.join('/')}/${post.slug}`}>
        <div className="relative">
          <Image
            src={post.featuredImage?.node?.sourceUrl ?? '/chidahp.png'}
            alt={post.title}
            className="w-full h-48 object-cover"
            width={500}
            height={500}
          />
          
          {/* Category tag */}
          {!artClass && categorySlug.length > 0 && (
            <div className="absolute top-3 left-3">
              <span className="bg-black text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                {categorySlug[0].name || categorySlug[0].slug}
              </span>
            </div>
          )}
        </div>

        {artClass ? (
          <div className="p-5 bg-yellow-50 border-t-4 border-yellow-400">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-yellow-300 p-2 rounded-full">
                <span className="text-xl">🎨</span>
              </div>
              <div>
                <span className="text-base font-bold text-gray-900">
                  นิทรรศการผลงานศิลปะ
                </span>
                <div className="w-12 h-1 bg-yellow-400 rounded-full mt-1"></div>
              </div>
            </div>
            <p className="text-gray-700 font-medium">
              {post.author?.node?.name ? `วาดโดย ${post.author.node.name}` : 'วาดโดย นักเรียนชูโล่วิทยาคม'}
            </p>
          </div>
        ) : (
          <div className="p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-snug group-hover:text-gray-700 transition-colors">
              {post.title ?? '-'}
            </h2>
            
            {post.excerpt && (
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                {stripHtmlAndDecode(post.excerpt)}
              </p>
            )}
            
            <div className="flex items-center justify-between pt-3 border-t border-yellow-200">
              <span className="text-sm font-medium text-black group-hover:text-gray-700 transition-colors">
                อ่านต่อ →
              </span>
            </div>
          </div>
        )}
      </Link>
    </article>
  )
}