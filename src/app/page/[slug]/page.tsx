// src/app/page/[slug]/page.tsx

import { getPageBySlug } from '@/lib/api';
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

type Props = {
  params: { slug: string }
}

export default async function ContentPage({ params }: Props) {
  const page = await getPageBySlug(params.slug);

  if (!page) return notFound()

  return (
    <main className="max-w-3xl mx-auto px-4 py-16  min-h-screen">
      {/* TITLE */}
      <h1 className="text-4xl font-bold text-yellow-800 mb-6 border-b border-yellow-700 pb-2">
        {page.title}
      </h1>

      {/* CONTENT */}
      <div
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </main>
  )
}
