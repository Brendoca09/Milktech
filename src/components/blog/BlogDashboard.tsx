import { useBlog } from '../../contexts/BlogContext';
import { BlogPost } from '../../types/blog';
import PostEditor from './PostEditor';
import BlogAnalytics from './BlogAnalytics';

const BlogDashboard = () => {
  const { user, logout } = useAuth();
  const { posts, deletePost } = useBlog();
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit' | 'analytics'>('list');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setCurrentView('edit');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setEditingPost(null);
  };

  const handleViewAnalytics = () => {
    setCurrentView('analytics');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (currentView === 'create') {
    return <PostEditor onBack={handleBackToList} />;
  }

  if (currentView === 'edit' && editingPost) {
    return <PostEditor post={editingPost} onBack={handleBackToList} />;
  }

  if (currentView === 'analytics') {
    return <BlogAnalytics onBack={handleBackToList} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Dashboard do Blog
            </h1>
            <p className="text-gray-600">Total de {posts.length} posts</p>
          </div>
          <div className="flex space-x-4">
            <motion.button
              onClick={handleViewAnalytics}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 flex items-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-5 h-5 mr-2" />
              Analytics
            </motion.button>
            <motion.button
              onClick={() => setCurrentView('create')}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 flex items-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-5 h-5 mr-2" />
              Novo Post
            </motion.button>
          </div>
        </motion.div>