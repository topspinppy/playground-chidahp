export interface Category {
  id: string
  name: string
  slug: string
  parent: {
    node: {
      id: string
      name: string
      slug: string
    }
  } | null
  children: {
    nodes: Category[]
  }
  description: string
  count: number
}

export interface Author {
  id: string
  name: string
  slug: string
  email: string
  description: string
  avatar: {
    url: string
  }
  posts: {
    nodes: Post[]
  }
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
  commentStatus: "open" | "closed"
  storySeries: {
    seriesId: string
  }
  hidefeaturelabel: {
    ishidefeaturelabel: boolean
  }
  hidewordpresscss: {
    ishidewordpresscss: boolean
  }
  featuredImage: {
    node: {
      sourceUrl: string
      altText: string
    }
  }
  categories: Categories
  tags: Tags
  author: Author
}

interface Tags {
  nodes: Node[]
}

export interface Categories {
  nodes: Node[]
}

export interface Node {
  name: string
  slug: string
  parentId: string | null
  parent?: Node[] | null
}

export interface Author {
  node: Node2
}

export interface Node2 {
  name: string
  slug: string
  avatar: Avatar
  description: string;
  slugAuthor?: {
    slug?: string;
  }
}



export interface Avatar {
  url: string
}



export type PostSummary = {
  slug: string
  date: string
  categories: {
    nodes: {
      slug: string
    }[]
  }
}

export interface ITagHelper {
  data: ITagHelperData
}

export interface ITagHelperData {
  tags: Tags
}

export interface ITagHelperTags {
  nodes: ITagHelperNode[]
}

export interface ITagHelperNode {
  name: string
  slug: string
  count?: number
}


export interface ICursor {
  posts: Posts
}

export interface Posts {
  pageInfo: PageInfo
}

export interface PageInfo {
  endCursor: string
}


