import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Share2,
  Edit3,
  Bookmark,
  Sparkles,
  Check,
} from 'lucide-react';
import { PostItem } from '../data/postsData.ts';
import { FestivalPhotoCard } from './FestivalPhotoCard.tsx';
import { StickerButton } from './ui/StickerButton.tsx';
import { PullQuote } from './ui/PullQuote.tsx';
import { WashiTapeImage } from './ui/WashiTapeImage.tsx';

interface DedicatedPostViewProps {
  post: PostItem;
  allPosts: PostItem[];
  onBack: () => void;
  onEditPost: (post: PostItem) => void;
  onNavigatePost: (postId: string) => void;
  isAuthorMode?: boolean;
}

export const DedicatedPostView: React.FC<DedicatedPostViewProps> = ({
  post,
  allPosts,
  onBack,
  onEditPost,
  onNavigatePost,
  isAuthorMode = false,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Monitora progresso de leitura
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post.id]);

  // Encontra posts anterior e próximo
  const currentIndex = allPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}#post/${post.slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full relative">
      {/* Barra de Progresso de Leitura Fixa no Topo */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-neutral-200 z-50">
        <div
          className="h-full bg-[var(--k-pink)] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        {/* Barra Superior de Navegação Rápida */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={onBack}
            className="mono-font text-xs font-bold uppercase tracking-wider text-[var(--ink)] hover:text-[var(--k-pink)] flex items-center gap-2 transition-colors py-2 px-3 rounded-lg hover:bg-white border border-transparent hover:border-[var(--ink)]"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para o Início
          </button>

          <div className="flex items-center gap-2">
            {isAuthorMode && (
              <button
                onClick={() => onEditPost(post)}
                className="mono-font text-[11px] font-bold uppercase flex items-center gap-1.5 px-3 py-1.5 bg-[var(--k-acid)] text-[var(--ink)] border-2 border-[var(--ink)] rounded-full hover:bg-[var(--k-pink)] hover:text-white transition-all shadow-[2px_2px_0_var(--ink)]"
                title="Editar este relato (Modo Autora)"
              >
                <Edit3 className="w-3.5 h-3.5" /> Editar Post
              </button>
            )}
            <button
              onClick={handleShare}
              className="mono-font text-[11px] font-bold uppercase flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-[var(--ink)] rounded-full hover:bg-[var(--k-cyan)] transition-all shadow-[2px_2px_0_var(--ink)]"
              title="Copiar link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              {copied ? 'Copiado!' : 'Compartilhar'}
            </button>
          </div>
        </div>

        {/* Artigo Principal */}
        <article className="post-container p-6 sm:p-10 md:p-14 mb-10 bg-white">
          {/* Cabeçalho do Post */}
          <header className="mb-8 text-center flex flex-col items-center">
            <div className="flex items-center gap-2.5 mb-6 flex-wrap justify-center">
              {post.isDraft && (
                <span className="mono-font text-[10px] font-bold uppercase bg-[var(--k-pink)] text-white px-3 py-1 border-2 border-[var(--ink)] rounded-full shadow-[2px_2px_0_var(--ink)]">
                  🔒 Rascunho Privado
                </span>
              )}
              <span className="mono-font text-[11px] font-bold uppercase bg-[var(--k-cyan)] text-[var(--ink)] px-3.5 py-1 border-2 border-[var(--ink)] rounded-full shadow-[2px_2px_0_var(--ink)]">
                {post.territory}
              </span>
              <span className="mono-font text-[11px] font-bold uppercase bg-white text-[var(--ink)] px-3.5 py-1 border-2 border-[var(--ink)] rounded-full shadow-[1px_1px_0_var(--ink)]">
                Formato: {post.format}
              </span>
            </div>

            <h1 className="display-font text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] text-[var(--ink)] mb-6 text-balance max-w-3xl">
              {post.title}
            </h1>

            {post.subtitle && (
              <p className="text-base sm:text-lg text-neutral-600 font-medium max-w-2xl mx-auto mb-6 leading-relaxed">
                {post.subtitle}
              </p>
            )}

            <div className="mono-font text-xs text-neutral-500 flex flex-wrap justify-center items-center gap-3 sm:gap-4 pt-2 border-t border-dashed border-neutral-300 w-full max-w-xl">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[var(--k-lilac)]" /> {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[var(--k-pink)]" /> {post.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-[var(--k-pink)] font-bold">
                <User className="w-3.5 h-3.5" /> {post.author}
              </span>
            </div>
          </header>

          {/* Imagem de Destaque com Fita Adesiva (Washi Tape) */}
          <div className="washi-tape-img max-w-xl mx-auto flex flex-col items-center">
            <FestivalPhotoCard
              src={post.coverImage}
              alt={post.title}
              isDetailedView={true}
              className="w-full img-border shadow-[4px_4px_0_var(--ink)]"
            />
            {post.customCaption ? (
              <p className="mono-font text-xs text-center text-neutral-500 mt-2.5 italic">
                {post.customCaption}
              </p>
            ) : (
              <p className="hand-font text-xl text-center text-[var(--ink)] mt-3 font-bold">
                Gramado do Rock in Rio 2026 ✦ Registro de Campo
              </p>
            )}
          </div>

          {/* Corpo do Post */}
          <div className="post-content max-w-2xl mx-auto mt-10">
            {post.blocks.map((block, idx) => {
              if (block.type === 'p') {
                return (
                  <p key={idx} className="leading-relaxed">
                    {block.content as string}
                  </p>
                );
              }
              if (block.type === 'h2') {
                return (
                  <h2 key={idx} className="display-font text-2xl sm:text-3xl font-bold">
                    {block.content as string}
                  </h2>
                );
              }
              if (block.type === 'pull-quote') {
                const scheme =
                  block.colorScheme === 'lilac'
                    ? 'lilac'
                    : block.colorScheme === 'pink'
                    ? 'pink'
                    : block.colorScheme === 'acid'
                    ? 'acid'
                    : block.colorScheme === 'cyan'
                    ? 'cyan'
                    : 'dots';

                return (
                  <PullQuote
                    key={idx}
                    quote={block.content as string}
                    colorScheme={scheme}
                    rotation="slight-left"
                  />
                );
              }
              if (block.type === 'hand-note') {
                return (
                  <p
                    key={idx}
                    className="hand-font text-2xl sm:text-3xl text-[var(--k-pink)] my-8 text-center transform -rotate-2 font-bold"
                  >
                    {block.content as string}
                  </p>
                );
              }
              if (block.type === 'list' && Array.isArray(block.content)) {
                return (
                  <ul key={idx} className="space-y-2 my-6">
                    {block.content.map((item, itemIdx) => (
                      <li key={itemIdx}>{item}</li>
                    ))}
                  </ul>
                );
              }
              if (block.type === 'quote') {
                return (
                  <blockquote
                    key={idx}
                    className="bg-[var(--paper)] border-l-4 border-[var(--k-pink)] pl-6 py-3 my-8 italic text-xl text-neutral-800 font-medium"
                  >
                    "{block.content as string}"
                  </blockquote>
                );
              }
              if (block.type === 'image') {
                return (
                  <div key={idx} className="washi-tape-img my-8 max-w-sm mx-auto relative group">
                    <img
                      src={block.content as string}
                      alt={block.caption || 'Post image'}
                      className="w-full h-auto object-contain img-border shadow-[3px_3px_0_var(--ink)] rounded-xl"
                    />
                    {block.caption && (
                      <p className="mono-font text-xs text-center mt-3 text-neutral-500 italic">
                        {block.caption}
                      </p>
                    )}
                  </div>
                );
              }
              return null;
            })}

            {/* Pergunta Final / Nota de Campo */}
            {post.fieldNoteQuestion && (
              <div className="mt-12 bg-white border-2 border-[var(--ink)] p-6 sm:p-7 rounded-xl shadow-[4px_4px_0_var(--k-acid)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--k-pink)]" />
                  <h3 className="display-font text-lg font-bold text-[var(--ink)]">Nota de Campo:</h3>
                </div>
                <p className="text-[var(--k-pink)] text-base sm:text-lg font-bold italic mb-0 leading-snug">
                  {post.fieldNoteQuestion}
                </p>
              </div>
            )}

            {/* Assinatura da Autora */}
            <div className="mt-12 pt-8 border-t-2 border-dashed border-[var(--ink)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-12 h-12 rounded-full border-2 border-[var(--ink)] overflow-hidden bg-[var(--k-lilac)] shrink-0">
                  <img
                    src="profile.webp"
                    alt="Laryliissa"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="display-font text-sm font-bold text-[var(--ink)]">Escrito por Laryliissa</h4>
                  <p className="text-xs text-neutral-600">Pesquisadora de cultura fã, psicopedagoga e criadora.</p>
                </div>
              </div>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`mono-font text-xs font-bold uppercase px-3 py-2 rounded-lg border-2 border-[var(--ink)] transition-all flex items-center gap-1.5 shadow-[2px_2px_0_var(--ink)] ${
                  isSaved ? 'bg-[var(--k-acid)] text-[var(--ink)]' : 'bg-white hover:bg-neutral-100'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" /> {isSaved ? 'Salvo no Diário' : 'Salvar Relato'}
              </button>
            </div>
          </div>
        </article>

        {/* Navegação Entre Relatos (Anterior & Próximo) */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {prevPost ? (
            <button
              onClick={() => onNavigatePost(prevPost.id)}
              className="sticker-card p-5 text-left flex items-start gap-3 bg-white group hover:border-[var(--k-pink)]"
            >
              <ChevronLeft className="w-5 h-5 text-[var(--k-pink)] shrink-0 mt-0.5 group-hover:-translate-x-1 transition-transform" />
              <div>
                <span className="mono-font text-[10px] text-neutral-500 uppercase font-bold block mb-1">
                  Relato Anterior
                </span>
                <h4 className="display-font text-sm font-bold text-[var(--ink)] group-hover:text-[var(--k-pink)] transition-colors line-clamp-1">
                  {prevPost.title}
                </h4>
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextPost ? (
            <button
              onClick={() => onNavigatePost(nextPost.id)}
              className="sticker-card p-5 text-right flex items-start justify-end gap-3 bg-white group hover:border-[var(--k-cyan)]"
            >
              <div>
                <span className="mono-font text-[10px] text-neutral-500 uppercase font-bold block mb-1">
                  Próximo Relato
                </span>
                <h4 className="display-font text-sm font-bold text-[var(--ink)] group-hover:text-[var(--k-cyan)] transition-colors line-clamp-1">
                  {nextPost.title}
                </h4>
              </div>
              <ChevronRight className="w-5 h-5 text-[var(--k-cyan)] shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <div />
          )}
        </div>

        {/* Botão Retorno Centralizado */}
        <div className="text-center pt-4 pb-12">
          <button
            onClick={onBack}
            className="mono-font text-xs font-bold uppercase tracking-wider bg-white border-2 border-[var(--ink)] px-6 py-3 rounded-full hover:bg-[var(--k-lilac)] hover:text-white transition-all shadow-[4px_4px_0_var(--ink)] hover:-translate-y-0.5 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para o Feed Principal
          </button>
        </div>
      </main>
    </div>
  );
};
