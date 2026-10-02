import { useState, useEffect } from 'react';
import { PostItem, INITIAL_POSTS } from './postsData.ts';

const STORAGE_KEY = 'alem_da_grade_posts_v2';

export function usePostsStore() {
  const [posts, setPosts] = useState<PostItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Garante que todos os posts possuem campos obrigatórios e blocks como array
          const validPosts = parsed
            .filter((p) => p && typeof p === 'object' && p.title && Array.isArray(p.blocks))
            .map((p) => {
              if (p.id === 'stray-kids-festival-2026') {
                return {
                  ...p,
                  coverImage: '01.png',
                };
              }
              return p;
            });
          if (validPosts.length > 0) {
            return validPosts;
          }
        }
      }
    } catch (e) {
      console.error('Falha ao ler posts do localStorage:', e);
    }
    return INITIAL_POSTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (e) {
      console.error('Falha ao salvar posts no localStorage:', e);
    }
  }, [posts]);

  const addPost = (newPostData: Omit<PostItem, 'id' | 'createdAt' | 'slug'> & { id?: string }) => {
    const slug = newPostData.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newPost: PostItem = {
      ...newPostData,
      id: newPostData.id || `post-${Date.now()}`,
      slug: slug || `post-${Date.now()}`,
      createdAt: Date.now(),
    };

    setPosts((prev) => [newPost, ...prev]);
    return newPost;
  };

  const updatePost = (id: string, updatedFields: Partial<PostItem>) => {
    setPosts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((item) => item.id !== id));
  };

  const resetDefaults = () => {
    setPosts(INITIAL_POSTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
  };

  const exportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(posts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `alem-da-grade-posts-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importBackup = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].title) {
        setPosts(parsed);
        return true;
      }
    } catch (e) {
      console.error('Erro ao importar backup:', e);
    }
    return false;
  };

  const toggleDraft = (id: string) => {
    setPosts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isDraft: !item.isDraft } : item))
    );
  };

  return {
    posts,
    addPost,
    updatePost,
    deletePost,
    toggleDraft,
    resetDefaults,
    exportBackup,
    importBackup,
  };
}
