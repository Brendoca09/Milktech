@@ .. @@
 import React, { useState } from 'react';
 import { motion } from 'framer-motion';
-import { Plus, Edit, Trash2, Eye, Calendar, User, Tag, LogOut, Home } from 'lucide-react';
+import { Plus, Edit, Trash2, Eye, Calendar, User, Tag, LogOut, Home, BarChart3, MessageCircle, TrendingUp } from 'lucide-react';
 import { useAuth } from '../../contexts/AuthContext';
 import { useBlog } from '../../contexts/BlogContext';
 import { BlogPost } from '../../types/blog';
 import PostEditor from './PostEditor';
+import BlogAnalytics from './BlogAnalytics';
 
 const BlogDashboard = () => {
   const { user, logout } = useAuth();
-  const { posts, deletePost } = useBlog();
-  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
+  const { posts, deletePost, getBlogStats } = useBlog();
+  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit' | 'analytics'>('list');
   const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
+  const stats = getBlogStats();
 
   const handleEdit = (post: BlogPost) => {
@@ .. @@
   if (currentView === 'edit' && editingPost) {
     return <PostEditor post={editingPost} onBack={handleBackToList} />;
   }
+
+  if (currentView === 'analytics') {
+    return <BlogAnalytics onBack={handleBackToList} />;
+  }
 
   return (
@@ .. @@
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-center py-4">
             <div className="flex items-center space-x-4">
-              <h1 className="text-2xl font-bold text-gray-900">Dashboard - Blog Vaca Roxa</h1>
+              <h1 className="text-2xl font-bold text-gray-900">Dashboard - Blog Vaca Roxa</h1>
               <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                 {user?.role === 'admin' ? 'Administrador' : 'Editor'}
               </span>
@@ .. @@
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
+        {/* Stats Cards */}
+        <motion.div
+          initial={{ y: 20, opacity: 0 }}
+          animate={{ y: 0, opacity: 1 }}
+          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
+        >
+          <div className="bg-white rounded-xl shadow-lg p-6">
+            <div className="flex items-center justify-between">
+              <div>
+                <p className="text-sm font-medium text-gray-600">Total de Posts</p>
+                <p className="text-2xl font-bold text-gray-900">{stats.totalPosts}</p>
+              </div>
+              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
+                <Edit className="w-6 h-6 text-blue-600" />
+              </div>
+            </div>
+          </div>
+
+          <div className="bg-white rounded-xl shadow-lg p-6">
+            <div className="flex items-center justify-between">
+              <div>
+                <p className="text-sm font-medium text-gray-600">Total de Visualizações</p>
+                <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
+              </div>
+              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
+                <Eye className="w-6 h-6 text-green-600" />
+              </div>
+            </div>
+          </div>
+
+          <div className="bg-white rounded-xl shadow-lg p-6">
+            <div className="flex items-center justify-between">
+              <div>
+                <p className="text-sm font-medium text-gray-600">Total de Comentários</p>
+                <p className="text-2xl font-bold text-gray-900">{stats.totalComments}</p>
+              </div>
+              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
+                <MessageCircle className="w-6 h-6 text-purple-600" />
+              </div>
+            </div>
+          </div>
+
+          <div className="bg-white rounded-xl shadow-lg p-6">
+            <div className="flex items-center justify-between">
+              <div>
+                <p className="text-sm font-medium text-gray-600">Média de Views/Post</p>
+                <p className="text-2xl font-bold text-gray-900">
+                  {Math.round(stats.totalViews / Math.max(stats.totalPosts, 1))}
+                </p>
+              </div>
+              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
+                <TrendingUp className="w-6 h-6 text-orange-600" />
+              </div>
+            </div>
+          </div>
+        </motion.div>
+
         {/* Actions Bar */}
         <motion.div
           initial={{ y: 20, opacity: 0 }}
@@ .. @@
             <p className="text-gray-600">Total de {posts.length} posts</p>
           </div>
-          <motion.button
-            onClick={() => setCurrentView('create')}
-            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 flex items-center"
-            whileHover={{ scale: 1.05, y: -2 }}
-            whileTap={{ scale: 0.95 }}
-          >
-            <Plus className="w-5 h-5 mr-2" />
-            Novo Post
-          </motion.button>
+          <div className="flex space-x-4">
+            <motion.button
+              onClick={() => setCurrentView('analytics')}
+              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 flex items-center"
+              whileHover={{ scale: 1.05, y: -2 }}
+              whileTap={{ scale: 0.95 }}
+            >
+              <BarChart3 className="w-5 h-5 mr-2" />
+              Analytics
+            </motion.button>
+            <motion.button
+              onClick={() => setCurrentView('create')}
+              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 flex items-center"
+              whileHover={{ scale: 1.05, y: -2 }}
+              whileTap={{ scale: 0.95 }}
+            >
+              <Plus className="w-5 h-5 mr-2" />
+              Novo Post
+            </motion.button>
+          </div>
         </motion.div>
 
         {/* Posts List */}
@@ .. @@
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                         <div className="flex items-center">
                           <Calendar className="w-4 h-4 mr-1" />
                           {formatDate(post.publishedAt)}
                         </div>
+                        <div className="flex items-center mt-1 space-x-3">
+                          <div className="flex items-center text-xs">
+                            <Eye className="w-3 h-3 mr-1" />
+                            {post.views}
+                          </div>
+                          <div className="flex items-center text-xs">
+                            <MessageCircle className="w-3 h-3 mr-1" />
+                            {post.comments?.length || 0}
+                          </div>
+                        </div>
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">