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

export const GET_SINGLE_POST = gql`
  query GetSinglePost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      slug
      date
      excerpt
      content
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      author {
        node {
          name
          slug
          avatar {
            url
          }
          description
        }
      }
    }
  }

`

export const GET_FEATURED_POST = gql`
  query GetFeaturedPost {
  posts(where: { categoryName: "featured-post" }, first: 1) {
    nodes {
      id
      title
      slug
      date
      excerpt
      categories {
        nodes {
          slug
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
          description
        }
      }
    }
  }
}
`

export const GET_LATEST_POSTS = gql`
  query GetLatestPosts {
    posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        slug
        date
        excerpt
        categories {
          nodes {
            slug
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
            slug
          }
        }
      }
    }
  }
`