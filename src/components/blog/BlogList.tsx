@@ .. @@
-import React from 'react';
+import React, { useState } from 'react';
 import { motion } from 'framer-motion';
-import { Calendar, User, Tag, Play, ArrowRight } from 'lucide-react';
+import { Calendar, User, Tag, Play, ArrowRight, Eye, MessageCircle } from 'lucide-react';
 import { useBlog } from '../../contexts/BlogContext';
+import BlogPost from './BlogPost';
 
 const BlogList = () => {
-  const { getPublishedPosts } = useBlog();
+  const { getPublishedPosts, getPostComments } = useBlog();
   const posts = getPublishedPosts();
+  const [selectedPost, setSelectedPost] = useState<string | null>(null);
+
+  if (selectedPost) {
+    return <BlogPost slug={selectedPost} onBack={() => setSelectedPost(null)} />;
+  }
 
   const formatDate = (dateString: string) => {
@@ .. @@
                     {/* Read More */}
                     <motion.button
+                      onClick={() => setSelectedPost(post.slug)}
                       className="flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors group"
                       whileHover={{ x: 5 }}
                     >
@@ .. @@
                       <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                     </motion.button>
+
+                    {/* Stats */}
+                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
+                      <div className="flex items-center space-x-4 text-sm text-gray-500">
+                        <div className="flex items-center">
+                          <Eye className="w-4 h-4 mr-1" />
+                          {post.views}
+                        </div>
+                        <div className="flex items-center">
+                          <MessageCircle className="w-4 h-4 mr-1" />
+                          {getPostComments(post.id).length}
+                        </div>
+                      </div>
+                    </div>
                   </div>
                 </motion.article>
               ))}