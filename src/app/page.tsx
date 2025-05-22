export default async function HomePage() {
  const posts = [
    {
      title: 'ไปญี่ปุ่นด้วยเงิน 7,000 บาท',
      slug: 'japan-on-budget',
      excerpt: 'ถ้าไม่ไป ก็ไม่รู้ว่าจริง ๆ แล้วเราประหยัดได้แค่ไหน',
      category: 'Sandbox Living',
      image: '/mock/japan.jpg',
    },
    {
      title: 'ชีวิตในออฟฟิศที่ไม่มีเส้นชัย',
      slug: 'office-loop',
      excerpt: 'งานเยอะ เงินน้อย แต่ยังต้องหายใจต่อไป...',
      category: 'Broke but Breathing',
      image: '/mock/office.jpg',
    },
  ]

  const latestPosts = [
    'ชีวิตติดหนี้แต่ใจยังสู้',
    'เมื่อการเดินทางไม่ใช่แค่เที่ยว',
    'รักคือการฝึกใจหรือฝึกทน?',
  ]
  return (
    <main className="bg-white text-black font-sans">
      {/* CONTENT GRID + SIDEBAR */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT: Post Grid */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div key={post.slug} className="bg-white border shadow hover:shadow-lg transition">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <span className="text-xs uppercase text-yellow-500 font-semibold">{post.category}</span>
                <h2 className="text-lg font-bold mt-2">{post.title}</h2>
                <p className="text-sm text-gray-600">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Sidebar */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold border-b pb-2">Latest</h3>
          <ul className="space-y-3">
            {latestPosts.map((title, idx) => (
              <li key={idx} className="text-sm hover:text-yellow-500 cursor-pointer">
                • {title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
