import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, Play, ArrowRight, Clock } from 'lucide-react';
import { useBlog } from '../../contexts/BlogContext';
import BlogPost from './BlogPost';

const BlogList = () => {
  const { getPublishedPosts } = useBlog();
  const posts = getPublishedPosts();
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  if (selectedPost) {
    return (
      <BlogPost 
        slug={selectedPost} 
        onBack={() => setSelectedPost(null)} 
      />
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-xl text-gray-600">
          Thoughts, insights, and updates from my journey
        </p>
      </motion.div>

      <div className="space-y-8">
        {posts.map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <time className="text-sm text-gray-500">
                  {formatDate(post.date)}
                </time>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-purple-600 transition-colors">
                {post.title}
              </h2>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime} min read
                </div>

                <div className="flex items-center space-x-4">
                  {/* Read More */}
                  <motion.button
                    onClick={() => setSelectedPost(post.slug)}
                    className="flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {posts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 text-lg">No blog posts yet. Check back soon!</p>
        </motion.div>
      )}
    </div>
  );
};

export default BlogList;