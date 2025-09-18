import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowLeft, Eye, MessageCircle, Send } from 'lucide-react';
import { useBlog } from '../../contexts/BlogContext';
import { Comment } from '../../types/blog';

interface BlogPostProps {
  slug: string;
  onBack: () => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ slug, onBack }) => {
  const { getPostBySlug, incrementViews, addComment, getPostComments } = useBlog();
  const [post, setPost] = useState(getPostBySlug(slug));
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    author: '',
    email: '',
    content: ''
  });

  useEffect(() => {
    if (post) {
      incrementViews(post.id);
      setComments(getPostComments(post.id));
    }
  }, [post]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (post && newComment.author && newComment.email && newComment.content) {
      addComment({
        postId: post.id,
        author: newComment.author,
        email: newComment.email,
        content: newComment.content,
        approved: true // Auto-approve for demo
      });
      setNewComment({ author: '', email: '', content: '' });
      setComments(getPostComments(post.id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      if (paragraph.startsWith('- ')) {
        return (
          <li key={index} className="text-gray-700 leading-relaxed mb-2 ml-4">
            {paragraph.replace('- ', '')}
          </li>
        );
      }
      if (paragraph.match(/^\d+\./)) {
        return (
          <li key={index} className="text-gray-700 leading-relaxed mb-2 ml-4 list-decimal">
            {paragraph.replace(/^\d+\.\s*/, '')}
          </li>
        );
      }
      if (paragraph.trim()) {
        return (
          <p key={index} className="text-gray-700 leading-relaxed mb-4">
            {paragraph}
          </p>
        );
      }
      return null;
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post não encontrado</h2>
          <button
            onClick={onBack}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Voltar ao Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b border-gray-200"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <motion.button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors mr-6"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar ao Blog
            </motion.button>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {post.views} visualizações
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" />
                {comments.length} comentários
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.article
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="h-64 md:h-96 overflow-hidden">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            {/* Category */}
            <div className="mb-4">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-8 space-x-6">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(post.publishedAt)}
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-8">
              {formatContent(post.content)}
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="border-t border-gray-200 pt-6 mb-8">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.article>

        {/* Comments Section */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mt-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Comentários ({comments.length})
          </h3>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Deixe seu comentário</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Seu nome"
                value={newComment.author}
                onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="email"
                placeholder="Seu email"
                value={newComment.email}
                onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <textarea
              placeholder="Escreva seu comentário..."
              value={newComment.content}
              onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none mb-4"
              required
            />
            <motion.button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar Comentário
            </motion.button>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Seja o primeiro a comentar neste post!
              </p>
            ) : (
              comments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="border-l-4 border-purple-200 pl-6 py-4"
                >
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <User className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">{comment.author}</h5>
                      <p className="text-sm text-gray-500">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed ml-13">
                    {comment.content}
                  </p>
                </motion.div>
              ))
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default BlogPost;