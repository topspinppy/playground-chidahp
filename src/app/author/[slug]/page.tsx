// import { GetAuthorBySlug } from '@/lib/api'
import { BlogCard } from '@/app/components/front/BlogCard'
import NotFound from '@/app/not-found'
import { getAuthorBySlug } from '@/lib/api'
import Image from 'next/image'

type Props = Promise<{ slug: string }>

export default async function AuthorPage(params: { params: Props }) {
  const slug = (await params.params).slug
  const { user } = await getAuthorBySlug(slug);
  console.log("Author Data:", user);
  if (!user) {
    return <NotFound />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="relative inline-block mb-8">
            <div className="w-40 h-40 relative rounded-full overflow-hidden shadow-2xl ring-4 ring-white/50 backdrop-blur">
              <Image 
                src={user.avatar.url} 
                alt={user.slug} 
                layout="fill" 
                objectFit="cover" 
                className="transition-transform duration-500 hover:scale-105"
              />
            </div>
            {/* Floating accent */}
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-sm opacity-70"></div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 mb-6 tracking-tight">
            {user.name}
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
            {user.description}
          </p>
          
          {/* Decorative line */}
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-8 rounded-full"></div>
        </div>

        {/* Articles Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Featured Works
            </h2>
            <p className="text-slate-600 font-light">
              บทความและผลงานโดย {user.name}
            </p>
          </div>
          
          {/* Grid with improved spacing and hover effects */}
          <div className="grid gap-8 md:gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {user.posts.nodes.map((article) => (
              <div 
                key={article.slug} 
                className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl opacity-0 animate-fade-in-up"
              >
                <BlogCard post={article} />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}