'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  User,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Tag,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../hook/useAuth';
import RichTextEditor from '../../../components/RichTextEditor';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published' | 'archived';
  category: string;
  tags: string[];
  author_id: string;
  author_name: string;
  created_at: string;
  updated_at: string;
  wordpress_id?: number;
  wordpress_synced: boolean;
  wordpress_category_id?: number;
  wordpress_category_slug?: string;
}

interface CreateArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: Partial<Article>) => void;
  editingArticle?: Article | null;
}

function CreateArticleModal({ isOpen, onClose, onSave, editingArticle }: CreateArticleModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    status: 'draft' as 'draft' | 'published' | 'archived'
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editingArticle) {
      setFormData({
        title: editingArticle.title,
        slug: editingArticle.slug || '',
        content: editingArticle.content,
        excerpt: editingArticle.excerpt,
        category: editingArticle.category,
        tags: editingArticle.tags.join(', '),
        status: editingArticle.status
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        category: '',
        tags: '',
        status: 'draft'
      });
    }
  }, [editingArticle, isOpen]);

  // Function to generate slug from title
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  };

  // Function to validate English-only slug
  const validateSlug = (slug: string): boolean => {
    return /^[a-z0-9-]+$/.test(slug);
  };

  // Auto-generate slug when title changes (only for new articles)
  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: editingArticle ? prev.slug : generateSlug(title) // Only auto-generate for new articles
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate slug
      if (!validateSlug(formData.slug)) {
        alert('Slug ต้องเป็นภาษาอังกฤษเท่านั้น (a-z, 0-9, -)');
        setIsLoading(false);
        return;
      }

      const articleData = {
        ...formData,
        category: 'chulo-reviewer', // Force category to chulo-reviewer
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        author_id: 'current-user-id', // This would come from auth context
        author_name: 'Chulo Reviewer', // This would come from auth context
        wordpress_synced: false,
        wordpress_category_id: 107,
        wordpress_category_slug: 'chidahp-book-reviewer'
      };

      console.log(articleData, 'articleData');
      await onSave(articleData);
      onClose();
    } catch (error) {
      console.error('Error saving article:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-yellow-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingArticle ? 'แก้ไขบทความ' : 'สร้างบทความใหม่'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ชื่อบทความ *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="กรอกชื่อบทความ"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL) *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => {
                const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                setFormData({ ...formData, slug: value });
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 ${
                formData.slug && !validateSlug(formData.slug) 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-yellow-300'
              }`}
              placeholder="article-slug-url"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              ใช้สำหรับ URL ของบทความ ต้องเป็นภาษาอังกฤษเท่านั้น (a-z, 0-9, -)
            </p>
            {formData.slug && !validateSlug(formData.slug) && (
              <p className="text-sm text-red-600 mt-1">
                Slug ต้องเป็นภาษาอังกฤษเท่านั้น (a-z, 0-9, -)
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              หมวดหมู่ *
            </label>
            <div className="w-full px-4 py-3 bg-gray-100 border border-yellow-300 rounded-lg text-gray-600">
              Chulo Reviewer (รีวิวหนังสือ)
            </div>
            <p className="text-sm text-gray-500 mt-1">
              หมวดหมู่เดียวที่รองรับคือ Chulo Reviewer สำหรับรีวิวหนังสือ
            </p>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              เนื้อหาย่อ
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="สรุปเนื้อหาบทความ"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              เนื้อหาบทความ *
            </label>
            <RichTextEditor
              key={editingArticle?.id || 'new'}
              content={formData.content}
              onChange={(content: string) => setFormData({ ...formData, content })}
              placeholder="เขียนเนื้อหาบทความที่นี่..."
              className="w-full"
              authToken={process.env.WORDPRESS_API_TOKEN}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              แท็ก (คั่นด้วยจุลภาค)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="หนังสือ, รีวิว, แนะนำ"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              สถานะ
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' | 'archived' })}
              className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="draft">ร่าง</option>
              <option value="published">เผยแพร่</option>
              <option value="archived">เก็บถาวร</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-yellow-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'กำลังบันทึก...' : (editingArticle ? 'อัปเดต' : 'สร้างบทความ')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();


  // Load articles from Supabase
  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const response = await fetch('/api/articles');
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error('Error loading articles:', error);
      // Fallback to empty array if API fails
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateArticle = async (articleData: Partial<Article>) => {
    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...articleData,
          user_id: user?.wordpress_user_id, // WordPress user_id for API call (not stored in Supabase)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create article');
      }

      const data = await response.json();
      const newArticle = data.article;

      setArticles(prev => [newArticle, ...prev]);
      
      // Article is already synced to WordPress during creation
      // No need to sync again
    } catch (error) {
      console.error('Error creating article:', error);
      alert(`เกิดข้อผิดพลาดในการสร้างบทความ: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleUpdateArticle = async (articleData: Partial<Article>) => {
    if (!editingArticle) return;

    console.log(articleData, 'articleData');
    try {
      const response = await fetch(`/api/articles/${editingArticle.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        throw new Error('Failed to update article');
      }

      const data = await response.json();
      const updatedArticle = data.article;

      setArticles(prev => prev.map(article => 
        article.id === editingArticle.id ? updatedArticle : article
      ));
      
      // Sync to WordPress if status is published
      if (updatedArticle.status === 'published') {
        await syncToWordPress(updatedArticle);
      }
    } catch (error) {
      console.error('Error updating article:', error);
      alert('เกิดข้อผิดพลาดในการอัปเดตบทความ');
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    try {
      const response = await fetch(`/api/articles/${articleId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete article');
      }

      setArticles(prev => prev.filter(article => article.id !== articleId));
      setDeleteConfirm(null);
      
      // Delete from WordPress if synced
      const article = articles.find(a => a.id === articleId);
      if (article?.wordpress_synced && article.wordpress_id) {
        await deleteFromWordPress(article.wordpress_id);
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('เกิดข้อผิดพลาดในการลบบทความ');
    }
  };

  const syncToWordPress = async (article: Article): Promise<void> => {
    try {
      const response = await fetch(`/api/articles/${article.id}/sync-wordpress`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to sync to WordPress');
      }

      const data = await response.json();
      
      setArticles(prev => prev.map(a => 
        a.id === article.id 
          ? { ...a, wordpress_id: data.wordpress_id, wordpress_synced: true }
          : a
      ));
      
      alert('บันทึกและ sync ไป WordPress เรียบร้อยแล้ว');
    } catch (error) {
      console.error('WordPress sync failed:', error);
      alert('เกิดข้อผิดพลาดในการ sync ไป WordPress');
    }
  };

  const deleteFromWordPress = async (wordpressId: number): Promise<void> => {
    try {
      // Mock WordPress delete - replace with real API call when WordPress is configured
      console.log('Deleting from WordPress:', wordpressId);
      // TODO: Implement real WordPress delete API call
      // await fetch(`${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts/${wordpressId}`, {
      //   method: 'DELETE',
      //   headers: { 'Authorization': `Bearer ${process.env.WORDPRESS_TOKEN}` }
      // });
    } catch (error) {
      console.error('WordPress delete failed:', error);
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'published') {
      return 'bg-green-100 text-green-800';
    }
    if (status === 'draft') {
      return 'bg-yellow-100 text-yellow-800';
    }
    if (status === 'archived') {
      return 'bg-gray-100 text-gray-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    if (status === 'published') {
      return 'เผยแพร่';
    }
    if (status === 'draft') {
      return 'ร่าง';
    }
    if (status === 'archived') {
      return 'เก็บถาวร';
    }
    return status;
  };

  const getCategoryText = (category: string) => {
    if (category === 'chulo-reviewer') {
      return 'Chulo Reviewer';
    }
    return category;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/affiliate/admin/dashboard')}
                className="mr-4 p-2 text-yellow-600 hover:text-yellow-700 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <FileText className="h-8 w-8 text-yellow-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">จัดการบทความ</h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>สร้างบทความ</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border border-yellow-200">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">บทความทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900">{articles.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-yellow-200">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">เผยแพร่แล้ว</p>
                <p className="text-2xl font-bold text-gray-900">
                  {articles.filter(a => a.status === 'published').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-yellow-200">
            <div className="flex items-center">
              <Edit className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">ร่าง</p>
                <p className="text-2xl font-bold text-gray-900">
                  {articles.filter(a => a.status === 'draft').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-yellow-200">
            <div className="flex items-center">
              <Tag className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Sync WordPress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {articles.filter(a => a.wordpress_synced).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Articles List */}
        <div className="bg-white rounded-lg shadow border border-yellow-200">
          <div className="px-6 py-4 border-b border-yellow-200">
            <h2 className="text-lg font-semibold text-gray-900">รายการบทความ</h2>
          </div>
          
          {articles.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">ยังไม่มีบทความ</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                สร้างบทความแรก
              </button>
            </div>
          ) : (
            <div className="divide-y divide-yellow-200">
              {articles.map((article) => (
                <div key={article.id} className="p-6 hover:bg-yellow-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(article.status)}`}>
                          {getStatusText(article.status)}
                        </span>
                        {article.wordpress_synced && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            WordPress
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-3">{article.excerpt}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Tag className="h-4 w-4 mr-1" />
                          <span>{getCategoryText(article.category)}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(article.created_at).toLocaleDateString('th-TH')}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span>{article.author_name}</span>
                        </div>
                      </div>
                      
                      {article.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {article.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => {
                          setEditingArticle(article);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-100 rounded-lg transition-colors"
                        title="แก้ไข"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      
                      {!article.wordpress_synced && article.status === 'published' && (
                        <button
                          onClick={() => syncToWordPress(article)}
                          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Sync ไป WordPress"
                        >
                          <Tag className="h-4 w-4" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => setDeleteConfirm(article.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors"
                        title="ลบ"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      <CreateArticleModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingArticle(null);
        }}
        onSave={editingArticle ? handleUpdateArticle : handleCreateArticle}
        editingArticle={editingArticle}
      />

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ยืนยันการลบ</h3>
            <p className="text-gray-600 mb-6">คุณแน่ใจหรือไม่ที่จะลบบทความนี้? การกระทำนี้ไม่สามารถย้อนกลับได้</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => handleDeleteArticle(deleteConfirm)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                ลบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
