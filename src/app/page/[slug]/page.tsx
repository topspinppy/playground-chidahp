// src/app/page/[slug]/page.tsx

import { getPageBySlug } from '@/lib/api';
import { notFound } from 'next/navigation'


export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import TrackViewClient from '@/app/components/TrackViewClient';

type Props = Promise<{ slug: string }>

export async function generateMetadata(params: { params: Props }): Promise<Metadata> {
  const slug = (await params.params).slug
  const page = await getPageBySlug(slug)

  if (!page) return {
    title: 'ไม่พบหน้าเพจ | Playground By Chidahp',
  }


  return {
    title: `${page.title} | Playground By Chidahp`,
    description: page.content,
    openGraph: {
      title: `${page.title} | Playground By Chidahp`,
      description: page.content,
      url: `https://playground.chidahp.com/page/${slug}`,
      type: 'article',
      images: [
        {
          url: `https://playground.chidahp.com/api/og?title=${page.title}&author=นักเรียนชูโล่`,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.title} | Playground By Chidahp`,
      description: page.content,
      images: [`https://playground.chidahp.com/api/og?title=${page.title}&author=นักเรียนชูโล่`],
    },
    alternates: {
      canonical: `https://playground.chidahp.com/page/${slug}`,
    },
  }
}


export default async function ContentPage(params: { params: Props }) {
  const { slug } = await params.params
  const page = await getPageBySlug(slug);

  if (!page) return notFound()

  return (
    <main className="max-w-3xl mx-auto px-4 py-16  min-h-screen">
      <TrackViewClient postId={`page-${slug}-001`} />
      
      {/* TITLE */}
      <h1 className="text-4xl font-bold text-yellow-800 mb-6 border-b border-yellow-700 pb-2">
        {page.title}
      </h1>

      {/* CONTENT */}
      <div className="wp-content" dangerouslySetInnerHTML={{ __html: page.content }} />
    </main>
  )
}
