
// import { GetAuthorBySlug } from '@/lib/api'
import { BlogCard } from '@/app/components/front/BlogCard'
import NotFound from '@/app/not-found'
import { getAuthorBySlug } from '@/lib/api'
import Image from 'next/image'

type Props = Promise<{ slug: string }>

export default async function AuthorPage(params: { params: Props }) {
  const slug = (await params.params).slug
  const { user } = await getAuthorBySlug(slug);
  if (!user) {
    return <NotFound />
  }

  console.log(user.posts)
  return (
    <div className="min-h-screen bg-white py-16 px-6 text-gray-900">
      <div className="max-w-5xl mx-auto">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
          <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg">
            <Image src={user.avatar.url} alt={user.slug} layout="fill" objectFit="cover" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{user.name}</h1>
            <p className="text-lg text-gray-600 max-w-xl">{user.description}</p>
          </div>
        </div>

        {/* Article List */}
        <div>
          <h2 className="text-2xl font-semibold text-yellow-600 mb-6">
            บทความโดย {user.name}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {user.posts.nodes.map((article) => {
              return (
                <BlogCard post={article} key={article.slug} />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
