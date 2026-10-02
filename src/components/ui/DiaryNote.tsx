import React from 'react';
import { Paperclip, Sparkles } from 'lucide-react';

export interface DiaryNoteProps {
  title?: string;
  category?: 'Fato' | 'Corpo / Sensorial' | 'Relação' | 'Aprendizagem' | 'Pergunta-Mãe';
  note: string;
  handwrittenHighlight?: string;
  date?: string;
  paperColor?: 'yellow' | 'lilac' | 'pink' | 'white';
  rotation?: 'left' | 'right' | 'none';
  className?: string;
}

export const DiaryNote: React.FC<DiaryNoteProps> = ({
  title,
  category = 'Aprendizagem',
  note,
  handwrittenHighlight,
  date,
  paperColor = 'yellow',
  rotation = 'left',
  className = '',
}) => {
  const paperColors = {
    yellow: 'bg-[#fffde7] text-[var(--ink)]',
    lilac: 'bg-[#ede7f6] text-[var(--ink)]',
    pink: 'bg-[#fce4ec] text-[var(--ink)]',
    white: 'bg-white text-[var(--ink)]',
  }[paperColor];

  const rotationClass = {
    left: '-rotate-2 hover:rotate-0',
    right: 'rotate-2 hover:rotate-0',
    none: 'rotate-0',
  }[rotation];

  return (
    <aside
      className={`relative my-8 group transition-all duration-200 select-none ${rotationClass} ${className}`}
    >
      {/* Clipe metálico no topo */}
      <div className="absolute -top-3.5 right-6 z-20 text-[var(--ink)] drop-shadow-[2px_2px_0_rgba(22,17,36,0.3)]">
        <Paperclip className="w-7 h-7 transform rotate-45" />
      </div>

      {/* Cartão de Nota de Campo / Post-it */}
      <div
        className={`border-2 border-[var(--ink)] rounded-2xl p-6 sm:p-7 shadow-[4px_4px_0_var(--ink)] group-hover:shadow-[6px_6px_0_var(--k-pink)] group-hover:-translate-y-1 transition-all duration-200 ${paperColors}`}
      >
        <div className="flex items-center justify-between gap-3 mb-3 border-b border-[var(--ink)]/15 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--k-pink)]" />
            <span className="mono-font text-[10px] font-bold uppercase tracking-widest text-[var(--ink)] bg-[var(--k-acid)] px-2 py-0.5 border border-[var(--ink)] rounded-md shadow-[1px_1px_0_var(--ink)]">
              {category}
            </span>
            {title && (
              <span className="display-font font-bold text-sm text-[var(--ink)]">
                {title}
              </span>
            )}
          </div>
          {date && (
            <span className="mono-font text-[10px] text-neutral-600 uppercase tracking-widest">
              {date}
            </span>
          )}
        </div>

        <p className="text-base sm:text-lg leading-relaxed text-[#231b34] font-normal mb-3">
          {note}
        </p>

        {handwrittenHighlight && (
          <div className="mt-3 pt-3 border-t border-dashed border-[var(--ink)]/20 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--k-pink)] shrink-0" />
            <p className="hand-font text-2xl sm:text-3xl text-[var(--k-pink)] font-bold leading-none -rotate-1">
              {handwrittenHighlight}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
