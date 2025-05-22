// src/app/category/[slug]/page.tsx

import { getCategoryDetail } from '@/lib/api'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'

// ✅ ให้ Next.js รู้ว่า route นี้ dynamic
export const dynamic = 'force-dynamic'

type Props = {
  params: { slug: string }
}

// ✅ dynamic metadata สำหรับ SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategoryDetail(params.slug)
  if (!category) return { title: 'ไม่พบหมวดหมู่ | Playground' }

  return {
    title: `${category.name} | Playground`,
    description: category.description,
    openGraph: {
      title: `${category.name} | Playground`,
      description: category.description,
      url: `https://playground.chidahp.com/category/${category.slug}`,
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = params
  const categoryDetail = await getCategoryDetail(slug)

  if (!categoryDetail) return notFound()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts: any[] = []

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">

      {/* HEADER */}
      <section className="mb-12">
        <div className="bg-yellow-400 text-black inline-block px-4 py-1 rounded-t-md text-sm uppercase font-semibold tracking-wider">
          Category
        </div>

        <h1 className="text-4xl font-black text-yellow-300 mt-2">
          {categoryDetail.name}
        </h1>

        <p className="text-yellow-500 max-w-2xl mt-3 text-base leading-relaxed">
          {categoryDetail.description}
        </p>

        <hr className="border-t border-yellow-800 mt-6" />
      </section>

      {/* POSTS */}
      {posts.length === 0 ? (
        <p className="text-gray-500 italic">ยังไม่มีบทความในหมวดนี้</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/post/${post.slug}`} className="group">
              <div className="border border-yellow-200 hover:border-yellow-400 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition">
                <div className="aspect-[4/3] bg-yellow-100 flex items-center justify-center text-gray-500 text-xs">
                  (รูปภาพ)
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-yellow-300 group-hover:text-yellow-400 line-clamp-2">
                    {post.title}
                  </h2>
                  <p
                    className="text-sm text-gray-500 mt-1 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
