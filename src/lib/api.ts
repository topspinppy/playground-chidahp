import { graphqlRequest } from './graphql-client';
import {
  GET_ALL_CATEGORIES,
  GET_ALL_CATEGORIES_WITH_CHILDREN,
  GET_ALL_PAGES,
  GET_ALL_POSTS,
  GET_ALL_TAGS,
  GET_AUTHOR_BY_ID,
  GET_AUTHORS_ALL,
  GET_CATEGORY_BY_SLUG,
  GET_FEATURED_POST,
  GET_FIRST_3_POSTS_CURSOR,
  GET_LATEST_POSTS,
  GET_MAIN_CATEGORIES,
  GET_NOT_LATEST_POSTS,
  GET_PAGE_BY_SLUG,
  GET_POSTS_BY_CATEGORY,
  GET_POSTS_BY_TAG,
  GET_POSTS_IN_SERIES,
  GET_POSTS_SERIES,
  GET_SINGLE_POST,
  GET_VIEW_COUNT_POST,
} from './queries';
import { Category, ICursor, ITagHelperData, Node2, Page, Post, PostSummary } from '../types/types';

export async function getMainCategories() {
  const data = await graphqlRequest<{ posts: { nodes: Post[] } }>(
    GET_MAIN_CATEGORIES
  );

  const filterMainCategoryOnly = (posts: Post[], categorySlug: string) =>
    posts.filter(post =>
      post.categories.nodes.some(cat => cat.slug === categorySlug && !cat.parent)
    );

  return filterMainCategoryOnly(data.posts.nodes, "chidahp-podcast");
}

export async function getCategories(): Promise<Category[]> {
  const data = await graphqlRequest<{ categories: { nodes: Category[] } }>(
    GET_ALL_CATEGORIES
  );

  return data.categories.nodes.filter(
    cat => cat.slug !== 'uncategorized' && cat.slug !== 'featured-post' && cat.parent === null
  );
}

export async function getCategoriesAll(): Promise<Category[]> {
  const data = await graphqlRequest<{ categories: { nodes: Category[] } }>(
    GET_ALL_CATEGORIES
  );

  return data.categories.nodes.filter(
    cat => cat.slug !== 'uncategorized' && cat.slug !== 'featured-post'
  );
}

export async function getCategoryDetail(slug: string): Promise<Category> {
  return (
    await graphqlRequest<{ category: Category }>(
      GET_CATEGORY_BY_SLUG,
      { slug }
    )
  ).category;
}

export async function getPageBySlug(slug: string): Promise<Page> {
  return (
    await graphqlRequest<{ page: Page }>(
      GET_PAGE_BY_SLUG,
      { slug }
    )
  ).page;
}

export async function getSinglePost(slug: string, categorySlug: string): Promise<Post> {
  return (
    await graphqlRequest<{ post: Post }>(
      GET_SINGLE_POST,
      { slug, categorySlug }
    )
  ).post;
}

export async function getFeaturedPost(): Promise<Post> {
  const data = await graphqlRequest<{ posts: { nodes: Post[] } }>(
    GET_FEATURED_POST
  );
  return data.posts.nodes[0];
}

export async function getLatestPosts(): Promise<Post[]> {
  const data = await graphqlRequest<{ posts: { nodes: Post[] } }>(
    GET_LATEST_POSTS
  );
  return data.posts.nodes;
}

export async function getPostsByCategory(
  category: string, 
  first: number = 6, 
  after?: string
): Promise<{ nodes: Post[], pageInfo: { hasNextPage: boolean, endCursor: string } }> {
  const data = await graphqlRequest<{ posts: { nodes: Post[], pageInfo: { hasNextPage: boolean, endCursor: string } } }>(
    GET_POSTS_BY_CATEGORY,
    { slug: category, first, after }
  );
  return data.posts;
}

type TagData = {
  tags: {
    nodes: {
      name: string;
      posts: { nodes: Post[] };
      slug: string;
    }[];
  };
};

export async function getPostsByTag(tag: string): Promise<TagData> {
  return await graphqlRequest<TagData>(
    GET_POSTS_BY_TAG,
    { slug: tag }
  );
}

export async function getAllPosts(): Promise<PostSummary[]> {
  const data = await graphqlRequest<{ posts: { nodes: PostSummary[] } }>(
    GET_ALL_POSTS
  );
  return data.posts.nodes;
}

export async function getAllTags(): Promise<ITagHelperData> {
  return await graphqlRequest<ITagHelperData>(
    GET_ALL_TAGS
  );
}

export async function getAllCategories(): Promise<Category[]> {
  const data = await graphqlRequest<{ categories: { nodes: Category[] } }>(
    GET_ALL_CATEGORIES
  );
  return data.categories.nodes;
}

export async function getAllPages(): Promise<Page[]> {
  const data = await graphqlRequest<{ pages: { nodes: Page[] } }>(
    GET_ALL_PAGES
  );
  return data.pages.nodes;
}

export async function getPostInSeries(seriesId: string): Promise<Post[]> {
  const data = await graphqlRequest<{ posts: { nodes: Post[] } }>(
    GET_POSTS_IN_SERIES,
    { seriesId }
  );
  return data.posts.nodes;
}

export async function getAllCategoriesWithChildren(): Promise<Category[]> {
  const data = await graphqlRequest<{ categories: { nodes: Category[] } }>(
    GET_ALL_CATEGORIES_WITH_CHILDREN
  );

  return data.categories.nodes.filter(
    cat => cat.parent === null && cat.slug !== 'uncategorized' && cat.slug !== 'featured-post'
  );
}

export async function getViewCount(id: number): Promise<number> {
  const data = await graphqlRequest<{ post: { viewCount: number } }>(
    GET_VIEW_COUNT_POST,
    { postId: id }
  );
  return data.post.viewCount;
}

export async function getNotLatestPosts(): Promise<Post[]> {
  const cursorRes = await graphqlRequest<ICursor>(
    GET_FIRST_3_POSTS_CURSOR
  );

  const afterCursor = cursorRes?.posts?.pageInfo?.endCursor;

  const postsRes = await graphqlRequest<{ posts: { nodes: Post[] } }>(
    GET_NOT_LATEST_POSTS,
    { afterCursor }
  );

  return postsRes.posts.nodes;
}

export async function getPostSeries(): Promise<Post[]> {
  const res = await graphqlRequest<{ posts: { nodes: Post[] } }>(
    GET_POSTS_SERIES
  );

  const postsWithSeries = res.posts.nodes.filter(
    p => p.storySeries?.seriesId && p.storySeries.seriesId.trim() !== ''
  );

  const grouped = postsWithSeries.reduce((acc, post) => {
    const key = post.storySeries.seriesId;
    if (!acc[key]) acc[key] = [];
    acc[key].push(post);
    return acc;
  }, {} as Record<string, Post[]>);

  return Object.values(grouped).map(group =>
    group.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]
  );
}

export async function getAuthorById(id: number): Promise<{ user: Node2 }> {
  return await graphqlRequest<{ user: Node2 }>(
    GET_AUTHOR_BY_ID,
    { id }
  );
}

export async function getAuthorsAll(): Promise<{ users: { nodes: Node2[] }}> {
  return await graphqlRequest<{ users: { nodes: Node2[] }}>(
    GET_AUTHORS_ALL
  );
}
