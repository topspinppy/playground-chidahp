export interface Category {
  id: string
  name: string
  slug: string
  description: string
  count: number
}


export interface Page {
  title: string
  content: string
  slug: string
}



// --- POST ---
export interface Post {
  id: string
  title: string
  slug: string
  date: string
  excerpt: string
  content: string
  featuredImage: {
    node: {
      sourceUrl: string
      altText: string
    }
  }
  categories: Categories
  author: Author
}

export interface Categories {
  nodes: Node[]
}

export interface Node {
  name: string
  slug: string
}

export interface Author {
  node: Node2
}

export interface Node2 {
  name: string
  slug: string
  avatar: Avatar
  description: any
}

export interface Avatar {
  url: string
}
