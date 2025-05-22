import { graphqlClient } from './graphql-client'
import { GET_ALL_CATEGORIES, GET_CATEGORY_BY_SLUG } from './queries'
import { Category } from '../types/types'

export async function getCategories() {
  const data = await graphqlClient.request<{ categories: { nodes: Category[] } }>(GET_ALL_CATEGORIES);
  const filtered = data.categories.nodes.filter(cat => cat.slug !== 'uncategorized')

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