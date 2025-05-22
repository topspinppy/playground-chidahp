export default function FeaturedPost() {
  const featuredPost = {
    title: '“Ground Control to Major Tom” ทำไมเนื้อเพลงท่อนนี้ แม่งถึงได้ผิดทุกคำ',
    slug: 'major-tom',
    excerpt: 'ถอดรหัสเนื้อเพลงของ David Bowie แบบจริงจัง',
    image: 'https://scontent-sin2-1.xx.fbcdn.net/v/t51.75761-15/476786213_18485968537042615_3950106635920743200_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=0QPdLm4rbc8Q7kNvwFWvoNy&_nc_oc=Adlp0vP59US1j9XXjz0AuAPFAXuugOIdKQ6nv_E2umtRHGPcmoYUQyR64vntmNx_nvTH5-qnmnXz5VWyfh2K29Z9&_nc_zt=23&_nc_ht=scontent-sin2-1.xx&_nc_gid=CFoSJyUBtZKquyTplrcFiA&oh=00_AfIFJK1pmdEji0Vqft30KEzSp3blgHywJXEPKI5Rzb0vgw&oe=683522AF',
    date: 'May 22, 2025',
    author: 'Teeranai Sottipinta',
  }

  const latestPosts = [
    {
      title: 'ธรณีวิทยาบนดาวศุกร์อาจน่าสนใจกว่าที่คิด กับทฤษฎีการแปรสภาพเปลือกดาว',
      date: 'May 19, 2025',
    },
    {
      title: 'NARIT เปิดตัวกล้อง VGOS ศึกษารรณีภาคโดยอาศัยวัตถุบนนท้องฟ้า กับจีนอย่างเป็นทางการ',
      date: 'May 16, 2025',
    },
    {
      title: 'Dragon หมายเลข C213 ยาน Dragon ลำสุดท้ายกับปัญหาเลื่อนการปล่อย',
      date: 'May 15, 2025',
    },
  ]

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 bg-white">
      {/* FEATURED POST */}
      <div className="md:col-span-2">
        <a href={`/post/${featuredPost.slug}`} className="block group">
          <div className="aspect-[16/9] overflow-hidden rounded-lg shadow">
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-extrabold group-hover:text-yellow-600 transition">
              {featuredPost.title}
            </h2>
            <p className="text-sm text-gray-500 mt-2">{featuredPost.date}</p>
            <p className="text-sm text-gray-600">{featuredPost.author}</p>
          </div>
        </a>
      </div>

      {/* SIDEBAR */}
      <aside className="space-y-6">
        <h3 className="text-sm font-semibold text-gray-600">บทความล่าสุด</h3>
        {latestPosts.map((post, i) => (
          <div key={i} className="border-t pt-4">
            <a
              href="#"
              className="text-base font-semibold text-gray-900 hover:text-yellow-600 transition"
            >
              {post.title}
            </a>
            <p className="text-sm text-gray-400 mt-1">{post.date}</p>
          </div>
        ))}
      </aside>
    </main>
  )
}
