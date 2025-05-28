import { graphqlClient } from './graphql-client'
import { GET_ALL_CATEGORIES, GET_ALL_PAGES, GET_ALL_POSTS, GET_ALL_TAGS, GET_CATEGORY_BY_SLUG, GET_FEATURED_POST, GET_LATEST_POSTS, GET_PAGE_BY_SLUG, GET_POSTS_BY_CATEGORY, GET_POSTS_BY_TAG, GET_SINGLE_POST } from './queries'
import { Category, ITagHelperData, Page, Post, PostSummary } from '../types/types'

export async function getCategories() {
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
