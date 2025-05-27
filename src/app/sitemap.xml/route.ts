// src/app/sitemap.xml/route.ts
import { getAllPosts, get, getAllTags } from '@/lib/api' // ดึงข้อมูล post จาก GraphQL / WordPress
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'


export async function GET() {
  const siteUrl = 'https://playground.chidahp.com'
  const posts = await getAllPosts()
  const data = await getAllTags()

  const tags = data.tags.nodes.map((tag) => {
    return `
      <url>
        <loc>${siteUrl}/tag/${tag.slug}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `
  }).join('')

  const routes = posts.map((post) => {
    return `
      <url>
        <loc>${siteUrl}/category/${post.categories.nodes[0]?.slug}/${post.slug}</loc>
        <lastmod>${new Date(post.date).toISOString()}</lastmod>
      </url>
    `
  }).join('')



  const staticRoutes = `
    <url>
      <loc>${siteUrl}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    <url>
      <loc>${siteUrl}/tags</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
  `

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${tags}
    ${staticRoutes}
    ${routes}
  </urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
