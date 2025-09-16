export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  videoUrl?: string;
  status: 'draft' | 'published';
  slug: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor';
  name: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}