// src/app/sitemap.xml/route.ts
import { getAllCategories, getAllPages, getAllPosts, getAllTags } from '@/lib/api' // ดึงข้อมูล post จาก GraphQL / WordPress
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'


export async function GET() {
  const siteUrl = 'https://playground.chidahp.com'
  const posts = await getAllPosts()
  const data = await getAllTags()
  const categories = await getAllCategories()
  const pages = await getAllPages()

  const pagesRoute = pages.map((page) => {
    return `
      <url>
        <loc>${siteUrl}/page/${page.slug}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `
  }).join('')

  const categoryRoutes = categories.map((category) => {
    return `
      <url>
        <loc>${siteUrl}/category/${category.slug}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `
  }).join('')

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

  // const rawAuthors = authors.users.nodes.map((node) => {
  //   return `
  //     <url>
  //       <loc>${siteUrl}/author/${node.slugAuthor?.slug}</loc>
  //       <lastmod>${new Date().toISOString()}</lastmod>
  //     </url>
  //   `
  // }).join('')



  const staticRoutes = `
    <url>
      <loc>${siteUrl}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
  `

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${tags}
    ${pagesRoute}
    ${staticRoutes}
    ${categoryRoutes}
    ${routes}
  </urlset>`
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
