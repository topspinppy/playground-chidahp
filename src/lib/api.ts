import { cachedGraphQLRequest } from './graphql-client';
import {
  GET_ALL_CATEGORIES,
  GET_ALL_CATEGORIES_WITH_CHILDREN,
  GET_ALL_PAGES,
  GET_ALL_POSTS,
  GET_ALL_TAGS,
  GET_AUTHOR_BY_SLUG,
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
import { Author, Category, ICursor, ITagHelperData, Node2, Page, Post, PostSummary } from '../types/types';

export async function getMainCategories() {
  const data = await cachedGraphQLRequest<{ posts: { nodes: Post[] } }>(
    GET_MAIN_CATEGORIES,
    undefined,
    { ttl: 3600, namespace: 'main-categories' }
  );

  const filterMainCategoryOnly = (posts: Post[], categorySlug: string) =>
    posts.filter(post =>
      post.categories.nodes.some(cat => cat.slug === categorySlug && !cat.parent)
    );

  return filterMainCategoryOnly(data.posts.nodes, "chidahp-podcast");
}

export async function getCategories(): Promise<Category[]> {
  const data = await cachedGraphQLRequest<{ categories: { nodes: Category[] } }>(
    GET_ALL_CATEGORIES,
    undefined,
    { ttl: 43200, namespace: "categories" }
  );

  return data.categories.nodes.filter(
    cat => cat.slug !== 'uncategorized' && cat.slug !== 'featured-post' && cat.parent === null
  );
}

export async function getCategoriesAll(): Promise<Category[]> {
  const data = await cachedGraphQLRequest<{ categories: { nodes: Category[] } }>(
    GET_ALL_CATEGORIES,
    undefined,
    { ttl: 43200, namespace: "categories" }
  );

  return data.categories.nodes.filter(
    cat => cat.slug !== 'uncategorized' && cat.slug !== 'featured-post'
  );
}

export async function getCategoryDetail(slug: string): Promise<Category> {
  return (
    await cachedGraphQLRequest<{ category: Category }>(
      GET_CATEGORY_BY_SLUG,
      { slug },
      { ttl: 43200, namespace: "category" }
    )
  ).category;
}

export async function getPageBySlug(slug: string): Promise<Page> {
  return (
    await cachedGraphQLRequest<{ page: Page }>(
      GET_PAGE_BY_SLUG,
      { slug },
      { ttl: 86400, namespace: "page" }
    )
  ).page;
}

export async function getSinglePost(slug: string, categorySlug: string): Promise<Post> {
  return (
    await cachedGraphQLRequest<{ post: Post }>(
      GET_SINGLE_POST,
      { slug, categorySlug },
      { ttl: 3600, namespace: "post" }
    )
  ).post;
}

export async function getFeaturedPost(): Promise<Post> {
  const data = await cachedGraphQLRequest<{ posts: { nodes: Post[] } }>(
    GET_FEATURED_POST,
    undefined,
    { ttl: 1800, namespace: "featured" }
  );
  return data.posts.nodes[0];
}

export async function getLatestPosts(): Promise<Post[]> {
  const data = await cachedGraphQLRequest<{ posts: { nodes: Post[] } }>(
    GET_LATEST_POSTS,
    undefined,
    { ttl: 300, namespace: "latest" }
  );
  return data.posts.nodes;
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const data = await cachedGraphQLRequest<{ posts: { nodes: Post[] } }>(
    GET_POSTS_BY_CATEGORY,
    { slug: category },
    { ttl: 3600, namespace: "posts-category" }
  );
  return data.posts.nodes;
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
  return await cachedGraphQLRequest<TagData>(
    GET_POSTS_BY_TAG,
    { slug: tag },
    { ttl: 3600, namespace: "posts-tag" }
  );
}

export async function getAllPosts(): Promise<PostSummary[]> {
  const data = await cachedGraphQLRequest<{ posts: { nodes: PostSummary[] } }>(
    GET_ALL_POSTS,
    undefined,
    { ttl: 3600, namespace: "all-posts" }
  );
  return data.posts.nodes;
}

export async function getAllTags(): Promise<ITagHelperData> {
  return await cachedGraphQLRequest<ITagHelperData>(
    GET_ALL_TAGS,
    undefined,
    { ttl: 43200, namespace: "tags" }
  );
}

export async function getAllCategories(): Promise<Category[]> {
  const data = await cachedGraphQLRequest<{ categories: { nodes: Category[] } }>(
    GET_ALL_CATEGORIES,
    undefined,
    { ttl: 43200, namespace: "categories" }
  );
  return data.categories.nodes;
}

export async function getAllPages(): Promise<Page[]> {
  const data = await cachedGraphQLRequest<{ pages: { nodes: Page[] } }>(
    GET_ALL_PAGES,
    undefined,
    { ttl: 86400, namespace: "pages" }
  );
  return data.pages.nodes;
}

export async function getPostInSeries(seriesId: string): Promise<Post[]> {
  const data = await cachedGraphQLRequest<{ posts: { nodes: Post[] } }>(
    GET_POSTS_IN_SERIES,
    { seriesId },
    { ttl: 3600, namespace: "series" }
  );
  return data.posts.nodes;
}

export async function getAllCategoriesWithChildren(): Promise<Category[]> {
  const data = await cachedGraphQLRequest<{ categories: { nodes: Category[] } }>(
    GET_ALL_CATEGORIES_WITH_CHILDREN,
    undefined,
    { ttl: 43200, namespace: "categories-children" }
  );

  return data.categories.nodes.filter(
    cat => cat.parent === null && cat.slug !== 'uncategorized' && cat.slug !== 'featured-post'
  );
}

export async function getViewCount(id: number): Promise<number> {
  const data = await cachedGraphQLRequest<{ post: { viewCount: number } }>(
    GET_VIEW_COUNT_POST,
    { postId: id },
    { ttl: 60, namespace: "viewcount" }
  );
  return data.post.viewCount;
}

export async function getNotLatestPosts(): Promise<Post[]> {
  const cursorRes = await cachedGraphQLRequest<ICursor>(
    GET_FIRST_3_POSTS_CURSOR,
    undefined,
    { ttl: 300, namespace: "cursor" }
  );

  const afterCursor = cursorRes?.posts?.pageInfo?.endCursor;

  const postsRes = await cachedGraphQLRequest<{ posts: { nodes: Post[] } }>(
    GET_NOT_LATEST_POSTS,
    { afterCursor },
    { ttl: 300, namespace: "not-latest" }
  );

  return postsRes.posts.nodes;
}

export async function getPostSeries(): Promise<Post[]> {
  const res = await cachedGraphQLRequest<{ posts: { nodes: Post[] } }>(
    GET_POSTS_SERIES,
    undefined,
    { ttl: 3600, namespace: "series-grouped" }
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

export async function getAuthorBySlug(name: string): Promise<{ users: Author }> {
  return await cachedGraphQLRequest<{ users: Author }>(
    GET_AUTHOR_BY_SLUG,
    { slugAuthor: name },
    { ttl: 6000, namespace: "author" }
  );
}

export async function getAuthorsAll(): Promise<{ users: { nodes: Node2[] }}> {
  return await cachedGraphQLRequest<{ users: { nodes: Node2[] }}>(GET_AUTHORS_ALL, undefined, { ttl: 6000, namespace: "authors" });
}
