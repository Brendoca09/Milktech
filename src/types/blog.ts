@@ .. @@
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
+  views: number;
+  comments: Comment[];
 }
 
+export interface Comment {
+  id: string;
+  postId: string;
+  author: string;
+  email: string;
+  content: string;
+  createdAt: string;
+  approved: boolean;
+}
+
+export interface BlogStats {
+  totalViews: number;
+  totalPosts: number;
+  totalComments: number;
+  viewsByMonth: { month: string; views: number }[];
+  postsByCategory: { category: string; count: number }[];
+  topPosts: { title: string; views: number }[];
+}
+
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