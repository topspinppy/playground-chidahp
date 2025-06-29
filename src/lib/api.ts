import { graphqlClient } from './graphql-client'
import { GET_ALL_CATEGORIES, GET_ALL_CATEGORIES_WITH_CHILDREN, GET_ALL_PAGES, GET_ALL_POSTS, GET_ALL_TAGS, GET_CATEGORY_BY_SLUG, GET_FEATURED_POST, GET_FIRST_3_POSTS_CURSOR, GET_LATEST_POSTS, GET_MAIN_CATEGORIES, GET_NOT_LATEST_POSTS, GET_PAGE_BY_SLUG, GET_POSTS_BY_CATEGORY, GET_POSTS_BY_TAG, GET_POSTS_IN_SERIES, GET_POSTS_SERIES, GET_SINGLE_POST, GET_VIEW_COUNT_POST } from './queries'
import { Category, ICursor, ITagHelperData, Page, Post, PostSummary } from '../types/types'


export async function getMainCategories() {
  const data = await graphqlClient.request<{ posts: { nodes: Post[] } }>(GET_MAIN_CATEGORIES);
  const filterMainCategoryOnly = (posts: Post[], categorySlug: string) =>
    posts.filter(post =>
      post.categories.nodes.some(cat => cat.slug === categorySlug && !cat.parent)
    );
  
  const onlyMainCategoryPosts = filterMainCategoryOnly(data.posts.nodes, "chidahp-podcast");
  return onlyMainCategoryPosts;
}

export async function getCategories() {
  const data = await graphqlClient.request<{ categories: { nodes: Category[] } }>(GET_ALL_CATEGORIES);
  const filtered = data.categories.nodes.filter(cat => cat.slug !== 'uncategorized' && cat.slug !== 'featured-post' && cat.parent === null)

  return filtered;
}

export async function getCategoriesAll() {
  const data = await graphqlClient.request<{ categories: { nodes: Category[] } }>(GET_ALL_CATEGORIES);
  const filtered = data.categories.nodes.filter(cat => cat.slug !== 'uncategorized' && cat.slug !== 'featured-post')

  return filtered;
}

export async function getCategoryDetail(slug: string): Promise<Category> {
  const variables = { slug }
  const data = await graphqlClient.request<{ category: Category }>(
    GET_CATEGORY_BY_SLUG,
    variables
  )
  return data.category
}

export async function getPageBySlug(slug: string): Promise<Page> {
  const variables = { slug }
  const data = await graphqlClient.request<{ page: Page }>(
    GET_PAGE_BY_SLUG,
    variables
  )
  return data.page
}

export async function getSinglePost(slug: string, categorySlug: string) {
  const variables = { slug, categorySlug }
  const data = await graphqlClient.request<{ post: Post }>(
    GET_SINGLE_POST,
    variables
  )
  return data.post
}

export async function getFeaturedPost() {
  const data = await graphqlClient.request<{ posts: { nodes: Post[] } }>(GET_FEATURED_POST)
  return data.posts.nodes[0]
}

export async function getLatestPosts() {
  const data = await graphqlClient.request<{ posts: { nodes: Post[] } }>(GET_LATEST_POSTS)
  return data.posts.nodes
}

export async function getPostsByCategory(category: string) {
  const variables = { slug: category }
  const data = await graphqlClient.request<{ posts: { nodes: Post[] } }>(GET_POSTS_BY_CATEGORY, variables)
  return data.posts.nodes
}



type TagData = {
  tags: {
    nodes: {
      name: string
      posts: { nodes: Post[] }
      slug: string
    }[]
  }
}
export async function getPostsByTag(tag: string) {
  const variables = { slug: tag }
  const data = await graphqlClient.request<TagData>(GET_POSTS_BY_TAG, variables)
  return data
}

export async function getAllPosts(): Promise<PostSummary[]> {
  const data = await graphqlClient.request<{ posts: { nodes: PostSummary[] } }>(GET_ALL_POSTS)
  return data.posts.nodes
}

export async function getAllTags(): Promise<ITagHelperData> {
  const data = await graphqlClient.request<ITagHelperData>(GET_ALL_TAGS)
  return data
}

export async function getAllCategories(): Promise<Category[]> {
  const data = await graphqlClient.request<{ categories: { nodes: Category[] } }>(GET_ALL_CATEGORIES)
  return data.categories.nodes
}

export async function getAllPages(): Promise<Page[]> {
  const data = await graphqlClient.request<{ pages: { nodes: Page[] } }>(GET_ALL_PAGES)
  return data.pages.nodes
}

export async function getPostInSeries(seriesId: string): Promise<Post[]> {
  const variables = { seriesId }
  const data = await graphqlClient.request<{ posts: { nodes: Post[] } }>(GET_POSTS_IN_SERIES, variables)
  return data.posts.nodes
}

export async function getAllCategoriesWithChildren(): Promise<Category[]> {
  const data = await graphqlClient.request<{ categories: { nodes: Category[] } }>(GET_ALL_CATEGORIES_WITH_CHILDREN)
  const categories = data.categories.nodes.filter(cat => cat.parent === null && cat.slug !== 'uncategorized' && cat.slug !== 'featured-post')
  return categories
}


export async function getViewCount(id: number): Promise<number> {
  const variables = { postId: id }
  const data = await graphqlClient.request<{ post: { viewCount: number } }>(GET_VIEW_COUNT_POST, variables)
  return data.post.viewCount
}

export async function getNotLatestPosts() {
  // ดึง cursor ตัวที่ 3
  const cursorRes = await graphqlClient.request<ICursor>(GET_FIRST_3_POSTS_CURSOR)
  const afterCursor = cursorRes?.posts?.pageInfo?.endCursor

  // ใช้ cursor ดึงโพสต์ถัดไป
  const postsRes = await graphqlClient.request<{ posts: { nodes: Post[] } }>(GET_NOT_LATEST_POSTS, {
    afterCursor
  })

  return postsRes.posts.nodes
}


export async function getPostSeries() {
  const res = await graphqlClient.request<{ posts: { nodes: Post[] }}>(GET_POSTS_SERIES);
  // กรองเฉพาะโพสต์ที่มี seriesId จริง ๆ
  const postsWithSeries = res.posts.nodes.filter(
    (p) => p.storySeries?.seriesId && p.storySeries.seriesId.trim() !== ''
  )

  // จัดกลุ่มตาม seriesId
  const grouped = postsWithSeries.reduce((acc, post) => {
    const key = post.storySeries.seriesId
    if (!acc[key]) acc[key] = []
    acc[key].push(post)
    return acc
  }, {} as Record<string, Post[]>)

  // เลือกโพสต์แรกสุดจากแต่ละกลุ่ม (เรียงตาม date หรือ slug ก็ได้)
  const firstInEachSeries = Object.values(grouped).map((group) => {
    return group.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )[0]
  })

  return firstInEachSeries
}