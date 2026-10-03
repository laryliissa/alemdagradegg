import React from 'react';
import { Calendar, Clock, ArrowRight, Edit2, Lock, Trash2, Eye, EyeOff } from 'lucide-react';
import { PostItem } from '../../data/postsData.ts';

export interface PostCardProps {
  post: PostItem;
  onOpen: (post: PostItem) => void;
  onEdit?: (post: PostItem, e: React.MouseEvent) => void;
  onDelete?: (postId: string, e: React.MouseEvent) => void;
  onToggleDraft?: (postId: string, e: React.MouseEvent) => void;
  isAuthorMode?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onOpen,
  onEdit,
  onDelete,
  onToggleDraft,
  isAuthorMode = false,
}) => {
  // Cores de tag por território da pesquisa
  const territoryBadgeBg: Record<string, string> = {
    'Espaços & Corpos': 'bg-[var(--k-pink)] text-white',
    'Mesa de Criação': 'bg-[var(--k-lilac)] text-[var(--ink)]',
    'Filtros & Limites': 'bg-[var(--k-acid)] text-[var(--ink)]',
    'Aprendizagens': 'bg-[var(--k-cyan)] text-[var(--ink)]',
  };

  return (
    <article
      onClick={() => onOpen(post)}
      className="group relative bg-white border-2 border-[var(--ink)] rounded-2xl shadow-[4px_4px_0_var(--ink)] hover:shadow-[6px_6px_0_var(--k-pink)] hover:-translate-x-0.5 hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col overflow-hidden"
    >
      {/* Imagem com Efeito Washi Tape Colada */}
      <div className="relative w-full h-56 sm:h-64 bg-[#fbf9f4] overflow-hidden border-b-2 border-[var(--ink)] flex items-center justify-center">
        {/* Fita Adesiva Decorativa no Topo */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-28 h-5.5 bg-[var(--k-acid)] border border-[var(--ink)] opacity-95 shadow-[1px_1px_0_rgba(22,17,36,0.3)] transform -rotate-2 group-hover:rotate-0 transition-transform duration-200 pointer-events-none" />

        <img
          src={post.coverImage}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-contain p-1 transition-transform duration-500 group-hover:scale-102"
        />

        {/* Badges de Território e Status */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 z-10 flex-wrap">
          <span
            className={`mono-font text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 border-2 border-[var(--ink)] rounded-full shadow-[2px_2px_0_var(--ink)] ${
              territoryBadgeBg[post.territory] || 'bg-white text-[var(--ink)]'
            }`}
          >
            {post.territory}
          </span>

          {post.isDraft && (
            <span className="mono-font text-[10px] font-bold uppercase tracking-widest bg-[var(--k-pink)] text-white px-2 py-0.5 border-2 border-[var(--ink)] rounded-full shadow-[2px_2px_0_var(--ink)] flex items-center gap-1">
              <Lock className="w-2.5 h-2.5" /> Rascunho
            </span>
          )}
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadados: Data e Leitura */}
          <div className="flex items-center gap-3 mono-font text-[11px] text-neutral-600 uppercase tracking-widest mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[var(--k-pink)]" /> {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[var(--k-lilac)]" /> {post.readTime}
            </span>
          </div>

          {/* Título Principal */}
          <h2 className="display-font text-xl sm:text-2xl font-bold text-[var(--ink)] group-hover:text-[var(--k-pink)] transition-colors leading-tight mb-2.5">
            {post.title}
          </h2>

          {/* Subtítulo / Frase do relato */}
          <p className="text-sm text-neutral-700 line-clamp-2 leading-relaxed mb-4">
            {post.subtitle}
          </p>
        </div>

        {/* Rodapé do Card com Intervenção Manuscrita e Ação */}
        <div className="pt-4 border-t border-[var(--ink)]/10 flex items-center justify-between gap-3">
          <span className="hand-font text-xl text-[var(--k-pink)] font-bold -rotate-2 select-none">
            ler relato ✎
          </span>

          <div className="flex items-center gap-2">
            {isAuthorMode && (
              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                {onToggleDraft && (
                  <button
                    onClick={(e) => onToggleDraft(post.id, e)}
                    className="p-1.5 rounded-lg border border-[var(--ink)] bg-white hover:bg-[var(--k-cyan)] text-[var(--ink)] transition-colors shadow-[1px_1px_0_var(--ink)]"
                    title={post.isDraft ? 'Tornar Público' : 'Tornar Rascunho'}
                  >
                    {post.isDraft ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                )}
                {onEdit && (
                  <button
                    onClick={(e) => onEdit(post, e)}
                    className="p-1.5 rounded-lg border border-[var(--ink)] bg-[var(--k-acid)] hover:bg-[var(--k-pink)] hover:text-white text-[var(--ink)] transition-colors shadow-[1px_1px_0_var(--ink)]"
                    title="Editar Post"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={(e) => onDelete(post.id, e)}
                    className="p-1.5 rounded-lg border border-[var(--ink)] bg-white hover:bg-rose-500 hover:text-white text-[var(--ink)] transition-colors shadow-[1px_1px_0_var(--ink)]"
                    title="Excluir Post"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            <span className="w-8 h-8 rounded-full border-2 border-[var(--ink)] bg-[var(--paper)] group-hover:bg-[var(--k-pink)] group-hover:text-white flex items-center justify-center transition-all shadow-[2px_2px_0_var(--ink)] shrink-0">
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
