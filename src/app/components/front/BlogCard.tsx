import { Post } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'
import { decode } from 'html-entities';

function stripHtmlAndDecode(htmlString: string): string {
  let stripped = htmlString.replace(/<\/?[^>]+(>|$)/g, "");
  stripped = decode(stripped);
  stripped = stripped.replace(/\s*\[(\.{3}|&hellip;)\]\s*/gi, "");
  return stripped.trim();
}

export function BlogCard({ post }: { post: Post }) {
  const artClass = post.categories.nodes[0]?.slug === 'art-class';
  const categorySlug = post.categories.nodes.filter((category) => 
    category.slug !== 'uncategorized' && category.slug !== 'featured-post'
  );
  const sortedSlug = categorySlug
    .slice()
    .sort((a, b) => {
      if (a.parentId === null && b.parentId !== null) return -1;
      if (a.parentId !== null && b.parentId === null) return 1;
      return 0;
    });

  const finalSlug = sortedSlug.map((category) => category.slug);

  if (artClass) {
    return (
      <article className="group bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <Link href={`/category/${finalSlug.join('/')}/${post.slug}`}>
          <div className="relative">
            <Image
              src={post.featuredImage?.node?.sourceUrl ?? '/chidahp.png'}
              alt={post.title}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              width={500}
              height={500}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-lg">🎨</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm tracking-wide">
                  นิทรรศการผลงานศิลปะ
                </h3>
                <div className="w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mt-1"></div>
              </div>
            </div>
            <p className="text-gray-600 text-sm font-medium">
              {post.author?.node?.name ? `วาดโดย ${post.author.node.name}` : 'วาดโดย นักเรียนชูโล่วิทยาคม'}
            </p>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300">
      <Link href={`/category/${finalSlug.join('/')}/${post.slug}`}>
        <div className="relative overflow-hidden">
          <Image
            src={post.featuredImage?.node?.sourceUrl ?? '/chidahp.png'}
            alt={post.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            width={500}
            height={500}
          />
          
          {categorySlug.length > 0 && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full shadow-sm">
                {categorySlug[0].name || categorySlug[0].slug}
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-gray-700 transition-colors duration-200">
            {post.title ?? '-'}
          </h2>
          
          {/* Always show content area to maintain consistent height */}
          <div className="mb-6 min-h-[4rem] flex items-start">
            {post.excerpt ? (
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {stripHtmlAndDecode(post.excerpt)}
              </p>
            ) : (
              <p className="text-gray-400 text-sm italic leading-relaxed">
                คลิกเพื่ออ่านเนื้อหาทั้งหมด...
              </p>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
              <span className="font-medium">อ่านต่อ</span>
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}