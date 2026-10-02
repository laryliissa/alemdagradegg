import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Plus,
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Mail,
  Instagram,
  Twitter,
  Scissors,
  MapPin,
  Shield,
  BookOpen,
  Edit2,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  Check,
  Heart,
  Menu,
  X,
  Lock,
  Unlock,
  Eye,
  EyeOff,
} from 'lucide-react';
import { usePostsStore } from './data/usePostsStore.ts';
import { PostItem, Territory } from './data/postsData.ts';
import { useAuthorAuth } from './data/useAuthorAuth.ts';
import { DedicatedPostView } from './components/DedicatedPostView.tsx';
import { PostEditorModal } from './components/PostEditorModal.tsx';
import { ToploaderBoardModal } from './components/ToploaderBoardModal.tsx';
import { ManifestoDrawerModal } from './components/ManifestoDrawerModal.tsx';
import { AmbientSoundPlayer } from './components/AmbientSoundPlayer.tsx';
import { AuthorAuthModal } from './components/AuthorAuthModal.tsx';
import { Logo } from './components/Logo.tsx';
import { FestivalPhotoCard } from './components/FestivalPhotoCard.tsx';
import { PostCard } from './components/ui/PostCard.tsx';
import { StickerButton } from './components/ui/StickerButton.tsx';
import { DiaryNote } from './components/ui/DiaryNote.tsx';
import { LentesDeApoioSection } from './components/LentesDeApoioSection.tsx';

export default function App() {
  const {
    posts,
    addPost,
    updatePost,
    deletePost,
    toggleDraft,
    resetDefaults,
    exportBackup,
    importBackup,
  } = usePostsStore();

  const { isAuthenticated, login, logout, updatePin, defaultPinHint } = useAuthorAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authorViewFilter, setAuthorViewFilter] = useState<'all' | 'published' | 'drafts'>('all');

  // Estados de Navegação e Filtros
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | 'Todos'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Estados de Modais
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState<PostItem | null>(null);
  const [isToploaderOpen, setIsToploaderOpen] = useState(false);
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

  // Estados de Feedback
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [backupNotice, setBackupNotice] = useState<string | null>(null);

  // Sincronização robusta com Hash para suporte a GitHub Pages e histórico do navegador
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash || '';
      // Normaliza hash aceitando tanto '#post/...' quanto '#/post/...'
      const normalized = rawHash.replace(/^#\/?/, '#');

      if (normalized.startsWith('#post/')) {
        const slug = normalized.replace('#post/', '');
        const found = posts.find((p) => p.slug === slug || p.id === slug);
        if (found) {
          setSelectedPostId(found.id);
        }
      } else if (normalized === '#manifesto') {
        setIsManifestoOpen(true);
      } else if (normalized === '#novo-post') {
        setPostToEdit(null);
        setIsEditorOpen(true);
      } else if (!rawHash || rawHash === '#' || rawHash === '#/') {
        setSelectedPostId(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [posts]);

  const openPost = (post: PostItem) => {
    setSelectedPostId(post.id);
    window.location.hash = `#post/${post.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToFeed = () => {
    setSelectedPostId(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditClick = (post: PostItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPostToEdit(post);
    setIsEditorOpen(true);
  };

  const handleDeleteClick = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmed = window.confirm(`Deseja realmente remover o relato "${title}"?`);
    if (confirmed) {
      deletePost(id);
      if (selectedPostId === id) {
        backToFeed();
      }
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 4000);
  };

  // Contagem dinâmica de territórios
  const territoryCounts = useMemo(() => {
    const counts: Record<Territory, number> = {
      'Espaços & Corpos': 0,
      'Mesa de Criação': 0,
      'Filtros & Limites': 0,
      'Aprendizagens': 0,
    };
    posts.forEach((p) => {
      if (counts[p.territory] !== undefined) {
        counts[p.territory]++;
      }
    });
    return counts;
  }, [posts]);

  // Filtragem de posts no feed (com proteção total para rascunhos da autora)
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Visitantes comuns NUNCA veem rascunhos
      if (!isAuthenticated && post.isDraft) return false;

      // Autora pode alternar visualização
      if (isAuthenticated) {
        if (authorViewFilter === 'published' && post.isDraft) return false;
        if (authorViewFilter === 'drafts' && !post.isDraft) return false;
      }

      const matchTerritory =
        selectedTerritory === 'Todos' || post.territory === selectedTerritory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        (post.title || '').toLowerCase().includes(q) ||
        (post.subtitle || '').toLowerCase().includes(q) ||
        (post.fieldNoteQuestion || '').toLowerCase().includes(q) ||
        (Array.isArray(post.blocks) &&
          post.blocks.some((b) =>
            typeof b.content === 'string'
              ? b.content.toLowerCase().includes(q)
              : Array.isArray(b.content) &&
                b.content.some((c) => typeof c === 'string' && c.toLowerCase().includes(q))
          ));
      return matchTerritory && matchSearch;
    });
  }, [posts, selectedTerritory, searchQuery, isAuthenticated, authorViewFilter]);

  // Post atualmente visualizado na página dedicada
  const activePost = useMemo(() => {
    if (!selectedPostId) return null;
    const found = posts.find((p) => p.id === selectedPostId);
    if (!found) return null;
    if (!isAuthenticated && found.isDraft) return null;
    return found;
  }, [posts, selectedPostId, isAuthenticated]);

  // Post destacado no topo do feed (o primeiro público ou o marcado como destaque)
  const featuredPost = useMemo(() => {
    const pool = isAuthenticated ? posts : posts.filter((p) => !p.isDraft);
    return pool.find((p) => p.isFeatured) || pool[0] || null;
  }, [posts, isAuthenticated]);

  return (
    <div className="w-full min-h-screen flex flex-col relative text-[var(--ink)]">
      {/* ==============================================================
          HEADER FIXO
      ============================================================== */}
      <header className="w-full bg-white border-b-2 border-[var(--ink)] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Logo & Manifesto Button */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <button
              onClick={backToFeed}
              className="no-underline flex items-center gap-2 group text-left p-0.5 rounded-lg focus:outline-none"
              title="Voltar para a página inicial"
            >
              <Logo size="md" />
            </button>

            <button
              onClick={() => setIsManifestoOpen(true)}
              className="mono-font text-[10px] sm:text-[11px] uppercase font-bold bg-[var(--k-pink)] text-white px-3 sm:px-4 py-2 border-2 border-[var(--ink)] rounded-full hover:bg-[var(--k-lilac)] hover:-translate-y-0.5 transition-all shadow-[2px_2px_0_var(--ink)] flex items-center gap-1.5"
            >
              <span>Comece por aqui</span>
              <span className="text-[var(--k-acid)]">✦</span>
            </button>
          </div>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <button
              onClick={() => {
                backToFeed();
                setSelectedTerritory('Todos');
              }}
              className={`nav-link ${!selectedPostId && selectedTerritory === 'Todos' ? 'active' : ''}`}
            >
              Início
            </button>
            <button
              onClick={() => {
                backToFeed();
                const el = document.getElementById('feed-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`nav-link ${selectedPostId ? 'active' : ''}`}
            >
              Diário de Campo
            </button>
            <button
              onClick={() => {
                backToFeed();
                const el = document.getElementById('territorios-widget');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="nav-link"
            >
              Territórios
            </button>
            <button
              onClick={() => setIsToploaderOpen(true)}
              className="nav-link flex items-center gap-1 text-[var(--k-pink)] hover:text-[var(--k-lilac)]"
              title="Decorar photocards virtuais"
            >
              <Scissors className="w-3.5 h-3.5" /> Toploaders
            </button>
          </nav>

          {/* Ações: Modo Autora + Novo Escrito se autenticada */}
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => {
                  setPostToEdit(null);
                  setIsEditorOpen(true);
                }}
                className="mono-font text-xs font-bold uppercase bg-[var(--k-acid)] text-[var(--ink)] px-3 sm:px-4 py-2 rounded-full border-2 border-[var(--ink)] hover:bg-yellow-300 transition-all shadow-[2px_2px_0_var(--ink)] hover:-translate-y-0.5 flex items-center gap-1.5"
                title="Escrever novo relato"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span className="hidden sm:inline">Novo Escrito</span>
              </button>
            )}

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className={`mono-font text-[11px] font-bold uppercase px-3 py-2 rounded-full border-2 border-[var(--ink)] transition-all shadow-[2px_2px_0_var(--ink)] flex items-center gap-1.5 ${
                isAuthenticated
                  ? 'bg-emerald-400 text-[var(--ink)] font-bold'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100'
              }`}
              title={isAuthenticated ? 'Modo Autora Ativo (Gerenciar)' : 'Acesso da Autora (PIN)'}
            >
              {isAuthenticated ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">
                {isAuthenticated ? 'Modo Autora' : 'Autora'}
              </span>
            </button>

            {/* Menu Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[var(--ink)] rounded-lg hover:bg-neutral-100"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Faixa do Modo Autora (visível apenas para a Autora logada com PIN) */}
        {isAuthenticated && (
          <div className="bg-[var(--k-acid)] border-t border-b-2 border-[var(--ink)] px-4 py-2">
            <div className="max-w-6xl mx-auto flex items-center justify-between text-xs flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold display-font text-[var(--ink)] flex items-center gap-1">
                  👑 Modo Autora Ativo
                </span>
                <span className="mono-font text-[10px] bg-white border border-[var(--ink)] px-2 py-0.5 rounded-full font-bold">
                  {posts.filter((p) => p.isDraft).length} rascunho(s)
                </span>
              </div>

              <div className="flex items-center gap-1 bg-white border border-[var(--ink)] rounded-lg p-0.5 shadow-xs">
                <button
                  onClick={() => setAuthorViewFilter('all')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    authorViewFilter === 'all'
                      ? 'bg-[var(--ink)] text-white'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  Todos ({posts.length})
                </button>
                <button
                  onClick={() => setAuthorViewFilter('published')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    authorViewFilter === 'published'
                      ? 'bg-emerald-600 text-white'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  Publicados ({posts.filter((p) => !p.isDraft).length})
                </button>
                <button
                  onClick={() => setAuthorViewFilter('drafts')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    authorViewFilter === 'drafts'
                      ? 'bg-[var(--k-pink)] text-white'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  Rascunhos ({posts.filter((p) => p.isDraft).length})
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => {
                    setPostToEdit(null);
                    setIsEditorOpen(true);
                  }}
                  className="font-bold underline text-[var(--ink)] hover:text-[var(--k-pink)] flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Escrever
                </button>
                <span className="text-neutral-400">·</span>
                <button
                  onClick={exportBackup}
                  className="text-neutral-700 hover:text-[var(--ink)] flex items-center gap-1 font-semibold"
                  title="Baixar backup em arquivo JSON"
                >
                  <Download className="w-3 h-3" /> Backup
                </button>
                <span className="text-neutral-400">·</span>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-neutral-700 hover:text-[var(--ink)] font-semibold"
                  title="Alterar PIN"
                >
                  PIN
                </button>
                <span className="text-neutral-400">·</span>
                <button
                  onClick={logout}
                  className="text-red-700 hover:underline font-bold"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Drawer Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t-2 border-[var(--ink)] p-4 flex flex-col gap-3">
            <button
              onClick={() => {
                backToFeed();
                setSelectedTerritory('Todos');
                setMobileMenuOpen(false);
              }}
              className="text-left font-bold text-sm py-2 px-3 hover:bg-[var(--bg-dots)] rounded-lg"
            >
              Início
            </button>
            <button
              onClick={() => {
                setIsManifestoOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-left font-bold text-sm py-2 px-3 bg-[var(--k-pink)] text-white rounded-lg"
            >
              Ler o Manifesto Oficial
            </button>
            <button
              onClick={() => {
                setIsToploaderOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-left font-bold text-sm py-2 px-3 hover:bg-[var(--bg-dots)] rounded-lg flex items-center gap-2"
            >
              <Scissors className="w-4 h-4 text-[var(--k-pink)]" /> Mural de Toploaders
            </button>
            <button
              onClick={() => {
                setIsAuthModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-left font-bold text-sm py-2 px-3 hover:bg-[var(--bg-dots)] rounded-lg flex items-center gap-2"
            >
              <Lock className="w-4 h-4 text-neutral-500" />
              <span>{isAuthenticated ? 'Gerenciar Modo Autora' : 'Acesso da Autora (PIN)'}</span>
            </button>
            {isAuthenticated && (
              <button
                onClick={() => {
                  setPostToEdit(null);
                  setIsEditorOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="text-left font-bold text-sm py-2 px-3 bg-[var(--k-acid)] text-[var(--ink)] border-2 border-[var(--ink)] rounded-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Escrever Novo Relato
              </button>
            )}
          </div>
        )}
      </header>

      {/* ==============================================================
          CORPO PRINCIPAL (Alterna entre Feed e Post Dedicado)
      ============================================================== */}
      {activePost ? (
        <DedicatedPostView
          post={activePost}
          allPosts={posts}
          onBack={backToFeed}
          onEditPost={(p) => handleEditClick(p)}
          onNavigatePost={(postId) => {
            const nextP = posts.find((p) => p.id === postId);
            if (nextP) openPost(nextP);
          }}
          isAuthorMode={isAuthenticated}
        />
      ) : (
        <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
          <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">
            {/* ==========================================
                COLUNA PRINCIPAL (POSTS E DESTAQUES)
            =========================================== */}
            <div className="flex flex-col gap-10">
              {/* DESTAQUE PRINCIPAL (Rock in Rio / Stray Kids) */}
              {featuredPost && (
                <article className="sticker-card p-5 sm:p-7 bg-white flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start">
                  <div className="w-full md:w-5/12 flex items-center justify-center shrink-0">
                    <div className="w-full max-w-xs sm:max-w-sm relative washi-tape-img my-0 flex justify-center">
                      <FestivalPhotoCard
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        className="img-border w-full h-auto shadow-[4px_4px_0_var(--ink)]"
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-7/12 flex flex-col justify-between py-2 self-stretch">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="pill bg-[var(--k-acid)] text-[var(--ink)] w-fit">
                        Destaque
                      </span>
                      <span className="mono-font text-[10px] text-neutral-500">
                        {featuredPost.territory}
                      </span>
                    </div>

                    <h2
                      onClick={() => openPost(featuredPost)}
                      className="display-font text-2xl sm:text-3xl font-bold text-[var(--ink)] leading-tight mb-3 cursor-pointer hover:text-[var(--k-pink)] transition-colors"
                    >
                      {featuredPost.title}
                    </h2>

                    <p className="text-sm text-neutral-600 font-medium mb-3 line-clamp-3 leading-relaxed">
                      {featuredPost.subtitle}
                    </p>

                    {featuredPost.italicPrompt && (
                      <p className="text-xs sm:text-sm italic text-[var(--k-pink)] font-bold mb-5 leading-snug">
                        "{featuredPost.italicPrompt}"
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-dashed border-neutral-200">
                      <div className="mono-font text-[10px] text-neutral-500 flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[var(--k-lilac)]" /> {featuredPost.date}
                        </span>
                        <span>•</span>
                        <span className="text-[var(--k-cyan)] font-bold">{featuredPost.readTime}</span>
                      </div>

                      <button
                        onClick={() => openPost(featuredPost)}
                        className="mono-font text-[10px] font-bold uppercase bg-[var(--k-lilac)] text-white px-4 py-2 border-2 border-[var(--ink)] rounded-full hover:bg-[var(--k-pink)] transition-colors shadow-[2px_2px_0_var(--ink)] hover:-translate-y-0.5 flex items-center gap-1.5"
                      >
                        <span>Ler mais</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </article>
              )}

              {/* BANNER DO MANIFESTO */}
              <div className="sticker-card bg-[#f0e6ff] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 border-[var(--k-lilac)]">
                <div className="flex-grow text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                    <span className="p-1 bg-[var(--k-pink)] text-white rounded">
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>
                    <h3 className="display-font text-2xl font-bold text-[var(--ink)]">
                      Afinal, o que é o Além da Grade?
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-neutral-800 leading-relaxed">
                    Ficar além da grade é escolher ser fã sem abrir mão da própria integridade e do respeito ao próprio corpo e mente. Minha pesquisa investiga como a recusa da devoção sacrificial exacerbada e a criação de limites saudáveis geram uma aprendizagem viva, aquela que nasce justamente quando a comunidade se mostra imperfeita ou desafiadora. É esse aprendizado prático de impor filtros e proteger nossa sensibilidade que reconstrói nosso pertencimento real e devolve a qualidade de vida à caminhada adulta.
                  </p>
                </div>
                <div className="shrink-0">
                  <button
                    onClick={() => setIsManifestoOpen(true)}
                    className="mono-font text-[11px] font-bold uppercase bg-[var(--ink)] text-white px-6 py-3 rounded-full hover:bg-[var(--k-acid)] hover:text-[var(--ink)] transition-colors shadow-[4px_4px_0_var(--k-pink)] border-2 border-[var(--ink)]"
                  >
                    Ler Manifesto
                  </button>
                </div>
              </div>

              {/* LISTA DE ÚLTIMOS ESCRITOS & FILTRO DE TERRITÓRIOS */}
              <section id="feed-section">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[var(--ink)] pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <h3 className="display-font text-2xl font-bold text-[var(--ink)]">
                      Últimos escritos
                    </h3>
                    <Sparkles className="w-5 h-5 text-[var(--k-lilac)]" />
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    {/* Alternador de Visualização Cards / Lista */}
                    <div className="flex items-center gap-1 bg-white border-2 border-[var(--ink)] p-0.5 rounded-xl shadow-[2px_2px_0_var(--ink)]">
                      <button
                        onClick={() => setViewMode('cards')}
                        className={`mono-font text-[10px] font-bold uppercase px-2.5 py-1 rounded-lg transition-colors ${
                          viewMode === 'cards'
                            ? 'bg-[var(--k-acid)] text-[var(--ink)]'
                            : 'text-neutral-600 hover:bg-neutral-100'
                        }`}
                        title="Visualização em Cartões Scrapbook com Washi Tape"
                      >
                        ✦ Cards
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`mono-font text-[10px] font-bold uppercase px-2.5 py-1 rounded-lg transition-colors ${
                          viewMode === 'list'
                            ? 'bg-[var(--k-acid)] text-[var(--ink)]'
                            : 'text-neutral-600 hover:bg-neutral-100'
                        }`}
                        title="Visualização em Lista Compacta"
                      >
                        ≡ Lista
                      </button>
                    </div>

                    {/* Barra de Filtro de Territórios Rápida */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                      {(['Todos', 'Espaços & Corpos', 'Mesa de Criação', 'Filtros & Limites', 'Aprendizagens'] as const).map(
                        (ter) => {
                          const active = selectedTerritory === ter;
                          return (
                            <button
                              key={ter}
                              onClick={() => setSelectedTerritory(ter)}
                              className={`mono-font text-[10px] uppercase font-bold px-3 py-1.5 rounded-full border-2 whitespace-nowrap transition-all ${
                                active
                                  ? 'bg-[var(--ink)] text-white border-[var(--ink)] shadow-[2px_2px_0_var(--k-acid)]'
                                  : 'bg-white text-neutral-700 border-neutral-300 hover:border-[var(--ink)]'
                              }`}
                            >
                              {ter} {ter !== 'Todos' && `(${territoryCounts[ter] || 0})`}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>

                {/* Espaço dedicado das Lentes de Apoio dentro do Território Aprendizagens */}
                {selectedTerritory === 'Aprendizagens' && (
                  <LentesDeApoioSection />
                )}

                {/* Se não houver posts filtrados */}
                {filteredPosts.length === 0 ? (
                  <div className="sticker-card p-10 text-center bg-white">
                    <p className="text-base text-neutral-600 mb-4 font-medium">
                      Nenhum relato encontrado com os filtros atuais.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedTerritory('Todos');
                        setSearchQuery('');
                      }}
                      className="mono-font text-xs font-bold uppercase bg-[var(--k-acid)] px-4 py-2 border-2 border-[var(--ink)] rounded-full shadow-[2px_2px_0_var(--ink)]"
                    >
                      Limpar Filtros
                    </button>
                  </div>
                ) : viewMode === 'cards' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filteredPosts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onOpen={openPost}
                        onEdit={(p, e) => handleEditClick(p, e)}
                        onDelete={(id, e) => handleDeleteClick(id, post.title, e)}
                        onToggleDraft={(id, e) => {
                          e.stopPropagation();
                          toggleDraft(id);
                        }}
                        isAuthorMode={isAuthenticated}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {filteredPosts.map((post) => {
                      const territoryColor =
                        post.territory === 'Espaços & Corpos'
                          ? 'var(--k-cyan)'
                          : post.territory === 'Mesa de Criação'
                          ? 'var(--k-lilac)'
                          : post.territory === 'Filtros & Limites'
                          ? 'var(--k-acid)'
                          : 'var(--k-pink)';

                      return (
                        <article
                          key={post.id}
                          onClick={() => openPost(post)}
                          className="flex flex-col sm:flex-row gap-5 items-start group border-b-2 border-dashed border-[var(--ink)] pb-6 last:border-0 cursor-pointer hover:bg-white/60 p-2 rounded-xl transition-colors"
                        >
                          <div className="w-full sm:w-36 h-40 sm:h-28 shrink-0 overflow-hidden rounded-xl border-2 border-[var(--ink)] bg-neutral-100 relative group-hover:shadow-[4px_4px_0_var(--k-pink)] transition-shadow">
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  'https://images.unsplash.com/photo-1540039155732-d674140ca1d4?auto=format&fit=crop&q=80&w=800';
                              }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <span
                              className="absolute top-1.5 left-1.5 text-[9px] mono-font uppercase font-bold px-2 py-0.5 rounded border border-[var(--ink)] shadow-[1px_1px_0_var(--ink)] text-[var(--ink)]"
                              style={{ backgroundColor: territoryColor }}
                            >
                              {post.format}
                            </span>
                          </div>

                          <div className="flex-grow">
                            <h4 className="display-font text-lg font-bold text-[var(--ink)] group-hover:text-[var(--k-pink)] transition-colors mb-2 leading-snug">
                              {post.title}
                            </h4>
                            <p className="text-sm text-neutral-600 font-medium line-clamp-2 mb-2">
                              {post.subtitle}
                            </p>
                            {post.italicPrompt && (
                              <p className="text-xs italic text-[var(--k-lilac)] font-bold line-clamp-1 mb-2">
                                {post.italicPrompt}
                              </p>
                            )}

                            {/* Controles de Autor (Editar / Excluir) */}
                            <div className="flex items-center gap-3 pt-1 flex-wrap">
                              <span className="mono-font text-[10px] text-neutral-500 flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {post.date}
                              </span>
                              <span>•</span>
                              <span className="mono-font text-[10px] font-bold text-[var(--k-pink)]">
                                {post.territory}
                              </span>
                              {post.isDraft && (
                                <>
                                  <span>•</span>
                                  <span className="mono-font text-[9px] font-bold uppercase bg-[var(--k-pink)] text-white px-2 py-0.5 rounded">
                                    🔒 Rascunho
                                  </span>
                                </>
                              )}
                              {isAuthenticated && (
                                <>
                                  <span>•</span>
                                  <button
                                    onClick={(e) => handleEditClick(post, e)}
                                    className="mono-font text-[10px] font-bold text-neutral-600 hover:text-[var(--ink)] flex items-center gap-1 underline underline-offset-2"
                                    title="Editar este texto"
                                  >
                                    <Edit2 className="w-3 h-3" /> Editar
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleDraft(post.id);
                                    }}
                                    className="mono-font text-[10px] font-bold text-neutral-600 hover:text-[var(--ink)] flex items-center gap-1"
                                    title="Alternar entre rascunho e público"
                                  >
                                    {post.isDraft ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                    <span>{post.isDraft ? 'Publicar' : 'Ocultar'}</span>
                                  </button>
                                  <button
                                    onClick={(e) => handleDeleteClick(post.id, post.title, e)}
                                    className="mono-font text-[10px] font-bold text-neutral-400 hover:text-red-600 flex items-center gap-1"
                                    title="Excluir do diário"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="sm:self-center shrink-0">
                            <span className="mono-font text-[10px] font-bold uppercase bg-white border-2 border-[var(--ink)] px-3 py-1.5 rounded-full group-hover:bg-[var(--k-acid)] transition-colors shadow-[2px_2px_0_var(--ink)] inline-flex items-center gap-1">
                              Ler relato <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </section>
            </div>

            {/* ==========================================
                COLUNA LATERAL (SIDEBAR)
            =========================================== */}
            <aside className="flex flex-col gap-8">
              {/* Widget: Sobre Mim com Efeito Polaroid & Washi Tape */}
              <div className="sticker-card bg-[var(--paper)] p-6 text-center">
                <div className="w-32 h-36 mx-auto mb-5 relative group cursor-pointer">
                  {/* Washi tape superior esquerda */}
                  <div className="absolute -top-2 -left-3 w-12 h-5 bg-[var(--k-acid)] opacity-90 rotate-[-15deg] z-10 border border-[var(--ink)] shadow-[2px_2px_0_rgba(0,0,0,0.2)]" />
                  {/* Washi tape inferior direita */}
                  <div className="absolute -bottom-2 -right-3 w-12 h-5 bg-[var(--k-cyan)] opacity-90 rotate-[-10deg] z-10 border border-[var(--ink)] shadow-[2px_2px_0_rgba(0,0,0,0.2)]" />

                  {/* Moldura Polaroid */}
                  <div className="w-full h-full rounded-md border-2 border-[var(--ink)] overflow-hidden shadow-[4px_4px_0_var(--ink)] group-hover:shadow-[6px_6px_0_var(--k-pink)] group-hover:-translate-y-1 transition-all duration-300 bg-white p-1.5 pb-5 transform rotate-3 group-hover:rotate-0">
                    <img
                      src="foto-lary.jpg"
                      alt="Laryliissa"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400';
                      }}
                      className="w-full h-full object-cover border border-[var(--ink)] sepia-[.2] contrast-[1.05] group-hover:sepia-0 transition-all duration-500"
                    />
                  </div>
                </div>

                <p className="hand-font text-2xl text-[var(--ink)] leading-none mb-1">
                  Oi, eu sou
                </p>
                <h3 className="display-font text-2xl font-bold text-[var(--k-pink)] mb-3">
                  Laryliissa
                </h3>

                <p className="text-xs font-medium text-neutral-700 leading-relaxed mb-5">
                  Pedagoga, psicopedagoga e fã. Com um diagnóstico tardio de neurodivergência aos 30+,
                  encontrei na cultura asiática e no K-pop o caminho para resgatar a própria identidade.
                </p>

                <button
                  onClick={() => setIsManifestoOpen(true)}
                  className="mono-font text-[10px] font-bold uppercase bg-white border-2 border-[var(--ink)] px-4 py-2 rounded-md hover:bg-[var(--k-cyan)] transition-colors inline-block w-full shadow-[2px_2px_0_var(--ink)]"
                >
                  Conheça o Manifesto &rarr;
                </button>
              </div>

              {/* Widget: Busca Instantânea */}
              <div className="sticker-card p-2 bg-white flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar no diário..."
                  className="flex-grow px-3 py-2 text-sm focus:outline-none bg-transparent font-medium placeholder-neutral-400"
                />
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-2 text-neutral-400 hover:text-[var(--k-pink)]"
                >
                  {searchQuery ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
                </button>
              </div>

              {/* Widget: Territórios / Categorias */}
              <div id="territorios-widget" className="sticker-card p-6 bg-white">
                <h3 className="display-font text-lg font-bold border-b-2 border-dashed border-[var(--ink)] pb-2 mb-4">
                  Territórios
                </h3>

                <ul className="flex flex-col gap-3 text-sm font-medium text-neutral-700">
                  <li>
                    <button
                      onClick={() => setSelectedTerritory('Mesa de Criação')}
                      className={`w-full flex justify-between items-center group transition-colors ${
                        selectedTerritory === 'Mesa de Criação' ? 'text-[var(--k-lilac)] font-bold' : 'hover:text-[var(--k-lilac)]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Scissors className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                        Mesa de Criação
                      </span>
                      <span className="mono-font text-[10px] bg-[var(--bg-dots)] px-2 py-0.5 rounded border border-[var(--ink)]">
                        {territoryCounts['Mesa de Criação']}
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setSelectedTerritory('Espaços & Corpos')}
                      className={`w-full flex justify-between items-center group transition-colors ${
                        selectedTerritory === 'Espaços & Corpos' ? 'text-[var(--k-cyan)] font-bold' : 'hover:text-[var(--k-cyan)]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                        Espaços & Corpos
                      </span>
                      <span className="mono-font text-[10px] bg-[var(--bg-dots)] px-2 py-0.5 rounded border border-[var(--ink)]">
                        {territoryCounts['Espaços & Corpos']}
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setSelectedTerritory('Filtros & Limites')}
                      className={`w-full flex justify-between items-center group transition-colors ${
                        selectedTerritory === 'Filtros & Limites' ? 'text-[var(--k-acid)] font-bold' : 'hover:text-[var(--k-acid)]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Shield className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                        Filtros & Limites
                      </span>
                      <span className="mono-font text-[10px] bg-[var(--bg-dots)] px-2 py-0.5 rounded border border-[var(--ink)]">
                        {territoryCounts['Filtros & Limites']}
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setSelectedTerritory('Aprendizagens');
                        const el = document.getElementById('feed-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full flex justify-between items-center group transition-colors ${
                        selectedTerritory === 'Aprendizagens' ? 'text-[var(--k-pink)] font-bold' : 'hover:text-[var(--k-pink)]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                        Aprendizagens
                      </span>
                      <span className="mono-font text-[10px] bg-[var(--bg-dots)] px-2 py-0.5 rounded border border-[var(--ink)]">
                        {territoryCounts['Aprendizagens']}
                      </span>
                    </button>
                    <div className="mt-1 pl-6">
                      <span
                        onClick={() => {
                          setSelectedTerritory('Aprendizagens');
                          const el = document.getElementById('feed-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-1 mono-font text-[9px] font-bold uppercase text-[var(--ink)] bg-[var(--k-cyan)] hover:bg-[var(--k-pink)] hover:text-white transition-colors px-2 py-0.5 rounded-full border border-[var(--ink)] shadow-[1px_1px_0_var(--ink)] cursor-pointer"
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        Lentes de Apoio ✦
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Widget: Mural de Toploaders Chamada */}
              <div className="sticker-card p-6 bg-gradient-to-br from-[#f0e6ff] to-[#ffe6f2] border-[var(--k-lilac)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-1.5 bg-[var(--k-lilac)] text-white rounded-lg border border-[var(--ink)]">
                    <Scissors className="w-4 h-4" />
                  </span>
                  <h3 className="display-font text-base font-bold text-[var(--ink)]">
                    Mural de Toploaders
                  </h3>
                </div>
                <p className="text-xs text-neutral-700 font-medium mb-4">
                  Monte e decore photocards com adesivos e washi tape virtual.
                </p>
                <button
                  onClick={() => setIsToploaderOpen(true)}
                  className="w-full mono-font text-[10px] font-bold uppercase bg-white border-2 border-[var(--ink)] py-2 rounded-md hover:bg-[var(--k-pink)] hover:text-white transition-colors shadow-[2px_2px_0_var(--ink)]"
                >
                  Abrir Estúdio de Decoração ✦
                </button>
              </div>

              {/* Widget: Nota de Campo do Caderno (Scrapbook DiaryNote) */}
              <DiaryNote
                category="Pergunta-Mãe"
                title="Caderno de Campo"
                note="“O que acontece quando aquilo que amamos nos coloca em movimento?”"
                handwrittenHighlight="começar sempre pelo afeto"
                date="Investigação Viva"
                paperColor="yellow"
                rotation="left"
              />

              {/* Widget: Newsletter */}
              <div className="sticker-card p-6 bg-[var(--k-lilac)] text-[var(--ink)]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white p-2 rounded-lg border-2 border-[var(--ink)]">
                    <Mail className="w-5 h-5 text-[var(--ink)]" />
                  </div>
                  <h3 className="display-font text-lg font-bold">Receba novos escritos</h3>
                </div>
                <p className="text-xs font-medium mb-4 text-[var(--ink)] opacity-85">
                  Assine a newsletter e receba notas de campo e reflexões da semana no seu e-mail.
                </p>

                {newsletterSubscribed ? (
                  <div className="bg-white p-3 rounded-lg border-2 border-[var(--ink)] text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    Obrigada! Você receberá as próximas notas de campo.
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="px-3 py-2 rounded-md border-2 border-[var(--ink)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--k-acid)] bg-white"
                    />
                    <button
                      type="submit"
                      className="mono-font text-[10px] font-bold uppercase bg-[var(--ink)] text-white px-4 py-2.5 rounded-md hover:bg-[var(--k-acid)] hover:text-[var(--ink)] transition-colors shadow-[2px_2px_0_#ffffff]"
                    >
                      Quero receber
                    </button>
                  </form>
                )}
              </div>

              {/* Widget: Backup e Manutenção do Diário (Para a Autora) */}
              <div className="sticker-card p-5 bg-white border-dashed">
                <h4 className="mono-font text-[11px] font-bold uppercase text-neutral-500 mb-2">
                  Cópia de Segurança
                </h4>
                <p className="text-[11px] text-neutral-600 mb-3">
                  Baixe uma cópia de segurança dos seus textos ou restaure os ensaios originais.
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={exportBackup}
                    className="mono-font text-[10px] font-bold uppercase py-1.5 px-3 rounded border border-[var(--ink)] bg-neutral-50 hover:bg-[var(--k-cyan)] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" /> Baixar Backup dos Posts
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('Deseja recarregar a coleção original de ensaios?')) {
                        resetDefaults();
                        setBackupNotice('Textos originais restaurados com sucesso!');
                        setTimeout(() => setBackupNotice(null), 3000);
                      }
                    }}
                    className="mono-font text-[10px] text-neutral-500 hover:text-red-600 flex items-center justify-center gap-1 py-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Restaurar Ensaios Originais
                  </button>

                  {backupNotice && (
                    <div className="text-[10px] text-emerald-700 font-bold text-center mt-1">
                      {backupNotice}
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </main>
      )}

      {/* ==============================================================
          FOOTER
      ============================================================== */}
      <footer className="w-full bg-white border-t-2 border-[var(--ink)] mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="mono-font text-[10px] uppercase font-bold text-neutral-500 text-center md:text-left">
            © 2026 Além da Grade — Diário de Campo por Laryliissa.
          </p>

          <div className="flex items-center gap-5 text-[var(--ink)]">
            <a
              href="https://instagram.com/laryliissa"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--k-pink)] transition-colors flex items-center gap-1 text-xs font-semibold"
            >
              <Instagram className="w-4 h-4" /> @laryliissa
            </a>
            <a
              href="mailto:contato@alemdagrade.com.br"
              className="hover:text-[var(--k-lilac)] transition-colors flex items-center gap-1 text-xs font-semibold"
            >
              <Mail className="w-4 h-4" /> Contato
            </a>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="hover:text-[var(--k-pink)] transition-colors flex items-center gap-1 text-xs font-semibold text-neutral-400 hover:underline"
              title="Acesso exclusivo para Lary (Autora)"
            >
              <Lock className="w-3.5 h-3.5" /> Área da Autora
            </button>
          </div>
        </div>
      </footer>

      {/* ==============================================================
          MODAIS E DOCK SONORO
      ============================================================== */}
      {/* 1. Modal Editor de Posts (Super descomplicado, com upload de fotos) */}
      <PostEditorModal
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setPostToEdit(null);
        }}
        postToEdit={postToEdit}
        onSave={(data) => {
          if (postToEdit) {
            updatePost(postToEdit.id, data);
            if (selectedPostId === postToEdit.id) {
              // Atualiza visualização ativa
              setSelectedPostId(postToEdit.id);
            }
          } else {
            const created = addPost(data);
            openPost(created);
          }
        }}
      />

      {/* 2. Mural de Toploaders Decorados */}
      <ToploaderBoardModal
        isOpen={isToploaderOpen}
        onClose={() => setIsToploaderOpen(false)}
      />

      {/* 3. Gaveta Deslizante do Manifesto */}
      <ManifestoDrawerModal
        isOpen={isManifestoOpen}
        onClose={() => setIsManifestoOpen(false)}
      />

      {/* 4. Modal de Autenticação do Modo Autora por PIN */}
      <AuthorAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        isAuthenticated={isAuthenticated}
        onLogin={login}
        onLogout={logout}
        onUpdatePin={updatePin}
        defaultPinHint={defaultPinHint}
      />

      {/* 5. Dock de Som Ambiente Lo-Fi (Web Audio API) */}
      <AmbientSoundPlayer />
    </div>
  );
}
