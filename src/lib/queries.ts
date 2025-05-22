import { gql } from 'graphql-request'

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories(first: 100) {
      nodes {
        id
        name
        slug
        description
        count
      }
    }
  }
`

export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoryBySlug($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      id
      name
      slug
      description
      count
    }
  }
`

export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      title
      content
      slug
    }
  }
`