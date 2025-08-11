import { BlogCard } from '@/app/components/front/BlogCard'
import NotFound from '@/app/not-found'
import { getAuthorById } from '@/lib/api'
import Image from 'next/image'

type Props = Promise<{ slug: string }>

export default async function AuthorPage(params: { params: Props }) {
  const slug = (await params.params).slug as unknown as number
  const data = await getAuthorById(slug)
  if (!data.user) {
    return <NotFound />
  }

  const author = data.user

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Author Profile */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16 p-8 bg-gray-50 rounded-xl">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg flex-shrink-0">
            <Image 
              src={author?.avatar?.url ?? ''} 
              alt={author.name} 
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {author.name}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {author.description}
            </p>
          </div>
        </div>

        {/* Articles Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            เนื้อหาโดย {author.name}
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {author.posts.nodes.map((article) => (
              <div key={article.slug} className="hover:shadow-lg transition-shadow duration-200">
                <BlogCard post={article} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}