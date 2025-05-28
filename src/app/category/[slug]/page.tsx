// src/app/category/[slug]/page.tsx

import { BlogCard } from '@/app/components/front/BlogCard'
import { getCategoryDetail, getPostsByCategory } from '@/lib/api'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'


type Props = Promise<{ slug: string }>

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await getCategoryDetail(params.slug)

  if (!category) return {
    title: 'ไม่พบหมวดหมู่ | Playground by Chidahp',
  }

  return {
    title: `${category.name} | Playground by Chidahp`,
    description: category.description || `รวมบทความในหมวดหมู่ ${category.name}`,
    openGraph: {
      title: `${category.name} | Chidahp`,
      description: category.description || '',
      url: `https://playground.chidahp.com/category/${params.slug}`,
      type: 'website',
      images: [
        {
          url: `https://playground.chidahp.com/api/og?title=รวมบทความในหมวดหมู่ - ${category.name}&author=นักเรียนชูโล่`,
          width: 1200,
          height: 630,
          alt: category.name,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${category.name} | Chidahp`,
      description: category.description || '',
      images: [`https://playground.chidahp.com/api/og?title=รวมบทความในหมวดหมู่ - ${category.name}&author=นักเรียนชูโล่`],
    },
  }
}


export default async function CategoryPage(params: { params: Props }) {
  const { slug } = await params.params
  const posts = await getPostsByCategory(slug)
  const categoryDetail = await getCategoryDetail(slug)

  if (!categoryDetail) return notFound()

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">

      {/* HEADER */}
      <section className="mb-12">
        <div className="bg-yellow-400 text-black inline-block px-4 py-1 rounded-t-md text-sm uppercase font-semibold tracking-wider">
          Category
        </div>

        <h1 className="text-4xl font-black text-yellow-600 mt-2">
          {categoryDetail.name}
        </h1>

        <p className="text-yellow-800 max-w-2xl mt-3 text-base leading-relaxed">
          {categoryDetail.description}
        </p>

        <hr className="border-t border-yellow-800 mt-6" />
      </section>

      {posts.length === 0 ? (
        <p className="text-center text-yellow-800 italic bg-yellow-50 border border-yellow-200 rounded-xl px-6 py-4 shadow-sm">
          หมวดหมู่นี้ยังไม่มีบทความในขณะนี้<br className="hidden sm:inline" />
          ไว้กลับมาเยี่ยมเราอีกครั้งเร็ว ๆ นี้นะครับ 🌼
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}


    </main>
  )
}
