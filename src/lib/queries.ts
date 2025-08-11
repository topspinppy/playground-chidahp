import { gql } from 'graphql-request'


export const GET_MAIN_CATEGORIES = gql`
  query GetPostsByCategory(
  $categoryName: String!
  $first: Int = 10
  $after: String
) {
  posts(
    where: { categoryName: $categoryName }
    first: $first
    after: $after
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        title
        slug
        categories {
          nodes {
            name
            slug
            parent {
              node {
                name
                slug
              }
            }
          }
        }
      }
    }
  }
}

`

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories(first: 100) {
      nodes {
        id
        name
        slug
        parent {
          node {
            name
            slug
          }
        }
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
      commentStatus
      storySeries {
        seriesId
      }
      triggerwarning {
        istriggerwarning
      }
      hidefeaturelabel {
        ishidefeaturelabel
      }
      hidewordpresscss {
        ishidewordpresscss
      }
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
      tags {
        nodes {
          name
          slug
        }
      }
      author {
        node {
          userId
          name
          slug
          avatar {
            url
          }
          description
          slugAuthor {
            slugAuthor
          }
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



export const GET_POSTS_BY_CATEGORY = gql`
  query GetPostsByCategorySlug($slug: String!) {
    posts(where: { categoryName: $slug }, first: 100) {
      nodes {
        id
        title
        slug
        excerpt
        date
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
            avatar {
              url
            }
            description
          }
        }
        categories {
          nodes {
            parentId
            name
            slug
          }
        }
      }
    }
  }
`


export const GET_POSTS_BY_TAG = gql`
  query GetPostsByTag($slug: String!) {
    tags(where: { slug: [$slug] }) {
      nodes {
        name
        slug
        posts {
          nodes {
            id
            title
            slug
            excerpt
            date
            categories {
              nodes {
                slug
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
              }
            }
          }
        }
      }
    }
  }
`


export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts(first: 10000) {
      nodes {
        slug
        date
        categories {
          nodes {
            slug
          }
        }
      }
    }
  }
`


export const GET_ALL_TAGS = gql`
  query GetAllTags {
    tags(first: 10000) {
      nodes {
        name
        slug
        count
      }
    }
  }
`

export const GET_ALL_PAGES = gql`
  query GetAllPages {
    pages(first: 10000) {
      nodes {
        slug
        title
      }
    }
  }
`

export const GET_POSTS_IN_SERIES = gql`
  query GetPostsInSeries($seriesId: String!) {
    posts(
      where: {
        metaQuery: {
          metaArray: [
            {
              key: "series_id",
              value: $seriesId,
              compare: EQUAL_TO
            }
          ]
        }
        orderby: { field: DATE, order: ASC }
      }
    ) {
      nodes {
        title
        slug
        date
      }
    }
  }
`


export const GET_ALL_CATEGORIES_WITH_CHILDREN = gql`
query GetAllCategoriesWithChildren {
  categories(first: 100) {
    nodes {
      id
      name
      slug
      description
      count
      parent {
        node {
          id
        }
      }
      children {
        nodes {
          id
          name
          slug
          count
        }
      }
    }
  }
}
`


export const GET_VIEW_COUNT_POST = gql`
  query GetViewCountPost($postId: ID!) {
    post(id: $postId, idType: DATABASE_ID) {
      id
      databaseId
      viewCount
    }
  }
`

// 1. ดึง endCursor จาก 3 โพสต์แรก
export const GET_FIRST_3_POSTS_CURSOR = gql`
  query {
    posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
      pageInfo {
        endCursor
      }
    }
  }
`

export const GET_NOT_LATEST_POSTS = gql`
  query GetNotLatestPosts($afterCursor: String!) {
    posts(
      first: 3
      after: $afterCursor
      where: { orderby: { field: DATE, order: DESC } }
    ) {
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

export const GET_POSTS_SERIES = gql`
  query PostsWithSeriesId {
    posts(
      first: 1000
      where: {
        metaQuery: {
          metaArray: [
            {
              key: "series_id",
              compare: EXISTS
            },
            {
              key: "series_id",
              value: "",
              compare: NOT_EQUAL_TO
            }
          ],
          relation: AND
        }
      }
    ) {
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
        storySeries {
          seriesId
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

export const GET_AUTHORS_ALL = gql`
query GetAllAuthorsSlug {
  users(first: 1000) {
    nodes {
      slug
      name
    	slugAuthor {
        slug
      }
    }
  }
}
`

export const GET_AUTHOR_BY_ID = gql`
  query GetAuthorById($id: ID!) {
  user(id: $id, idType: DATABASE_ID) {
    id
    name
    email
    description
    slugAuthor {
      slugAuthor
    }
    avatar {
      url
    }
    posts {
      nodes {
        title
        slug
        date
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
      }
    }
  }
}



`