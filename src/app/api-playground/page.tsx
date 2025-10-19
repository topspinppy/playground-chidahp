'use client';

import { useState, useEffect } from 'react';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  author: {
    node: {
      name: string;
      slug: string;
      avatar?: {
        url: string;
      };
      description: string;
    };
  };
  categories: {
    nodes: Array<{
      parentId: string | null;
      name: string;
      slug: string;
    }>;
  };
}

interface ApiResponse {
  success: boolean;
  data: {
    posts: Post[];
    pagination: {
      hasNextPage: boolean;
      endCursor: string;
    };
    meta: {
      category: string;
      total: number;
      limit: number;
    };
  };
}

export default function ApiPlayground() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState(10);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [response, setResponse] = useState<string>('');

  const fetchPosts = async (newLimit?: number, newCursor?: string | null) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      if (newLimit === undefined) {
        params.append('limit', limit.toString());
      } else {
        params.append('limit', newLimit.toString());
      }
      if (newCursor) {
        params.append('cursor', newCursor);
      }

      const url = `/api/book-reviewer?${params.toString()}`;
      const res = await fetch(url);
      const data: ApiResponse = await res.json();

      if (res.ok) {
        setPosts(data.data.posts);
        setHasNextPage(data.data.pagination.hasNextPage);
        setEndCursor(data.data.pagination.endCursor);
        setResponse(JSON.stringify(data, null, 2));
      } else {
        throw new Error(data.error || 'Failed to fetch posts');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setResponse('');
    } finally {
      setLoading(false);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setCursor(null);
    fetchPosts(newLimit, null);
  };

  const handleNextPage = () => {
    if (hasNextPage && endCursor) {
      setCursor(endCursor);
      fetchPosts(limit, endCursor);
    }
  };

  const handleReset = () => {
    setCursor(null);
    setLimit(10);
    fetchPosts(10, null);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Book Reviewer API Playground
          </h1>
          <p className="text-gray-600 mb-6">
            Test the API endpoint for fetching posts from the "chidahp-book-reviewer" category.
            This API can be used by other websites to integrate book review content.
          </p>

          {/* API Endpoint Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">API Endpoint</h2>
            <code className="text-blue-800 bg-blue-100 px-2 py-1 rounded">
              GET /api/book-reviewer
            </code>
            <div className="mt-2 text-sm text-blue-700">
              <p><strong>Parameters:</strong></p>
              <ul className="list-disc list-inside ml-4">
                <li><code>limit</code> (optional): Number of posts to return (1-50, default: 10)</li>
                <li><code>cursor</code> (optional): Pagination cursor for next page</li>
              </ul>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Limit:
              </label>
              <select
                value={limit}
                onChange={(e) => handleLimitChange(Number.parseInt(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2"
                disabled={loading}
              >
                <option value={5}>5 posts</option>
                <option value={10}>10 posts</option>
                <option value={20}>20 posts</option>
                <option value={50}>50 posts</option>
              </select>
            </div>
            
            <div className="flex items-end gap-2">
              <button
                onClick={handleNextPage}
                disabled={!hasNextPage || loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Next Page
              </button>
              <button
                onClick={handleReset}
                disabled={loading}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Status */}
          {loading && (
            <div className="text-blue-600 mb-4">Loading...</div>
          )}
          {error && (
            <div className="text-red-600 mb-4">Error: {error}</div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Posts Display */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Posts ({posts.length})
            </h2>
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                    {post.excerpt.replaceAll(/<[^>]*>/g, '')}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>By {post.author.node.name}</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  {post.featuredImage && (
                    <img
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.featuredImage.node.altText}
                      className="w-full h-32 object-cover rounded mt-2"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* API Response */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              API Response
            </h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
              {response || 'No response yet...'}
            </pre>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Usage Examples
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">JavaScript/Fetch</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
{`const response = await fetch('/api/book-reviewer?limit=10');
const data = await response.json();
console.log(data.data.posts);`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">cURL</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
{`curl -X GET "https://yourdomain.com/api/book-reviewer?limit=10" \\
  -H "Content-Type: application/json"`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Pagination</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
{`// First page
const firstPage = await fetch('/api/book-reviewer?limit=10');

// Next page using cursor
const nextPage = await fetch(\`/api/book-reviewer?limit=10&cursor=\${endCursor}\`);`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
