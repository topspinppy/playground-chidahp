
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const post = searchParams.get('post');
  const page = searchParams.get('page') ?? '1';
  const per_page = Math.min(Number(searchParams.get('per_page')) || 5, 20);
  const orderby = searchParams.get('orderby') ?? 'date';
  const order = searchParams.get('order') ?? 'asc';

  try {
    const apiUrl = `https://api.playground.chidahp.com/wp-json/wp/v2/comments?post=${post}&page=${page}&per_page=${per_page}&orderby=${orderby}&order=${order}`;
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Chidahp Playground API Client',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return Response.json(data);

  } catch (error) {
    console.error("Error fetching comments:", error);
    return Response.json(
      { error: "Failed to fetch comments. Please try again later." },
      { status: 500 }
    );
  }
}



export async function POST(request: Request) {
  // Simulate a POST request to create a comment
  // In a real application, you would handle the request body and create a comment in the database 
  const body = await request.json();
  const { post, author_name, author_email, content } = body;
  if (!post || !author_name || !author_email || !content) {
    return Response.json(
      { error: "Missing required fields: post, author_name, author_email, content" },
      { status: 400 }
    );
  }

  const wpRes = await fetch('https://api.playground.chidahp.com/wp-json/wp/v2/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      post,
      author_name,
      author_email,
      content
    })
  });

  if (!wpRes.ok) {
    const errorData = await wpRes.json();
    console.error("Error creating comment:", errorData);
    return Response.json(
      { error: "Failed to create comment. Please check your input and try again." },
      { status: wpRes.status }
    );
  }
  const postResult = await wpRes.json();

  if (!wpRes.ok) {
    return Response.json({ postResult }, { status: wpRes.status });
  }

  return Response.json({ post, author_name, author_email, content }, {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
  });
}
