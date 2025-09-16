@@ .. @@
 import React, { createContext, useContext, useState, ReactNode } from 'react';
-import { BlogPost } from '../types/blog';
+import { BlogPost, Comment, BlogStats } from '../types/blog';
 
 interface BlogContextType {
   posts: BlogPost[];
+  comments: Comment[];
   addPost: (post: Omit<BlogPost, 'id' | 'publishedAt' | 'updatedAt' | 'slug'>) => void;
   updatePost: (id: string, post: Partial<BlogPost>) => void;
   deletePost: (id: string) => void;
   getPost: (id: string) => BlogPost | undefined;
+  getPostBySlug: (slug: string) => BlogPost | undefined;
   getPublishedPosts: () => BlogPost[];
+  incrementViews: (postId: string) => void;
+  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
+  approveComment: (commentId: string) => void;
+  deleteComment: (commentId: string) => void;
+  getPostComments: (postId: string) => Comment[];
+  getBlogStats: () => BlogStats;
 }
 
 const BlogContext = createContext<BlogContextType | undefined>(undefined);
@@ .. @@
     slug: 'revolucao-analise-leite-tecnologia-vaca-roxa'
+    views: 1250,
+    comments: []
   },
   {
     id: '2',
@@ .. @@
     slug: 'casos-sucesso-empresas-vaca-roxa'
+    views: 890,
+    comments: []
   }
 ];
 
+const initialComments: Comment[] = [
+  {
+    id: '1',
+    postId: '1',
+    author: 'João Silva',
+    email: 'joao@empresa.com',
+    content: 'Excelente artigo! Estamos considerando implementar o sistema na nossa empresa.',
+    createdAt: '2024-01-16T10:30:00Z',
+    approved: true
+  },
+  {
+    id: '2',
+    postId: '1',
+    author: 'Maria Santos',
+    email: 'maria@laticinio.com',
+    content: 'Já utilizamos o Vaca Roxa há 6 meses e posso confirmar todos os benefícios mencionados.',
+    createdAt: '2024-01-16T14:20:00Z',
+    approved: true
+  }
+];
+
 const generateSlug = (title: string): string => {
   return title
@@ .. @@
 export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
   const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
+  const [comments, setComments] = useState<Comment[]>(initialComments);
 
   const addPost = (postData: Omit<BlogPost, 'id' | 'publishedAt' | 'updatedAt' | 'slug'>) => {
@@ .. @@
       id: Date.now().toString(),
       publishedAt: now,
       updatedAt: now,
-      slug: generateSlug(postData.title)
+      slug: generateSlug(postData.title),
+      views: 0,
+      comments: []
     };
     setPosts(prev => [newPost, ...prev]);
   };
@@ .. @@
   const getPost = (id: string) => {
     return posts.find(post => post.id === id);
   };
 
+  const getPostBySlug = (slug: string) => {
+    return posts.find(post => post.slug === slug);
+  };
+
   const getPublishedPosts = () => {
     return posts.filter(post => post.status === 'published');
   };
 
+  const incrementViews = (postId: string) => {
+    setPosts(prev => prev.map(post => 
+      post.id === postId 
+        ? { ...post, views: post.views + 1 }
+        : post
+    ));
+  };
+
+  const addComment = (commentData: Omit<Comment, 'id' | 'createdAt'>) => {
+    const newComment: Comment = {
+      ...commentData,
+      id: Date.now().toString(),
+      createdAt: new Date().toISOString()
+    };
+    setComments(prev => [newComment, ...prev]);
+  };
+
+  const approveComment = (commentId: string) => {
+    setComments(prev => prev.map(comment => 
+      comment.id === commentId 
+        ? { ...comment, approved: true }
+        : comment
+    ));
+  };
+
+  const deleteComment = (commentId: string) => {
+    setComments(prev => prev.filter(comment => comment.id !== commentId));
+  };
+
+  const getPostComments = (postId: string) => {
+    return comments.filter(comment => comment.postId === postId && comment.approved);
+  };
+
+  const getBlogStats = (): BlogStats => {
+    const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
+    const totalPosts = posts.filter(post => post.status === 'published').length;
+    const totalComments = comments.filter(comment => comment.approved).length;
+
+    // Mock data for charts - in production, this would come from real analytics
+    const viewsByMonth = [
+      { month: 'Jan', views: 2400 },
+      { month: 'Fev', views: 3200 },
+      { month: 'Mar', views: 2800 },
+      { month: 'Abr', views: 4100 },
+      { month: 'Mai', views: 3600 },
+      { month: 'Jun', views: 4800 }
+    ];
+
+    const postsByCategory = posts.reduce((acc, post) => {
+      const existing = acc.find(item => item.category === post.category);
+      if (existing) {
+        existing.count++;
+      } else {
+        acc.push({ category: post.category, count: 1 });
+      }
+      return acc;
+    }, [] as { category: string; count: number }[]);
+
+    const topPosts = posts
+      .filter(post => post.status === 'published')
+      .sort((a, b) => b.views - a.views)
+      .slice(0, 5)
+      .map(post => ({ title: post.title, views: post.views }));
+
+    return {
+      totalViews,
+      totalPosts,
+      totalComments,
+      viewsByMonth,
+      postsByCategory,
+      topPosts
+    };
+  };
+
   return (
     <BlogContext.Provider value={{
       posts,
+      comments,
       addPost,
       updatePost,
       deletePost,
       getPost,
-      getPublishedPosts
+      getPostBySlug,
+      getPublishedPosts,
+      incrementViews,
+      addComment,
+      approveComment,
+      deleteComment,
+      getPostComments,
+      getBlogStats
     }}>
       {children}
     </BlogContext.Provider>