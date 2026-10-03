import React from 'react';
import { Quote } from 'lucide-react';

export interface PullQuoteProps {
  quote: string;
  authorOrContext?: string;
  handwrittenNote?: string;
  colorScheme?: 'dots' | 'lilac' | 'pink' | 'acid' | 'cyan';
  rotation?: 'slight-left' | 'slight-right' | 'none';
  className?: string;
  hasTape?: boolean;
}

export const PullQuote: React.FC<PullQuoteProps> = ({
  quote,
  authorOrContext,
  handwrittenNote,
  colorScheme = 'dots',
  rotation = 'slight-left',
  className = '',
  hasTape = true,
}) => {
  // Configuração de cores
  const schemeClasses = {
    dots: 'bg-[var(--bg-dots)] text-[var(--ink)]',
    lilac: 'bg-[var(--k-lilac)] text-[var(--ink)]',
    pink: 'bg-[var(--k-pink)] text-white',
    acid: 'bg-[var(--k-acid)] text-[var(--ink)]',
    cyan: 'bg-[var(--k-cyan)] text-[var(--ink)]',
  }[colorScheme];

  // Rotação suave estilo papel recortado
  const rotationClasses = {
    'slight-left': '-rotate-1 hover:rotate-0',
    'slight-right': 'rotate-1 hover:rotate-0',
    none: 'rotate-0',
  }[rotation];

  // Cor da fita washi baseada no esquema
  const tapeColorClass =
    colorScheme === 'acid'
      ? 'bg-[var(--k-pink)]'
      : colorScheme === 'pink'
      ? 'bg-[var(--k-acid)]'
      : 'bg-[var(--k-acid)]';

  return (
    <div
      className={`relative my-8 sm:my-10 transition-all duration-200 group ${rotationClasses} ${className}`}
    >
      {/* Fita Washi colando a citação no caderno */}
      {hasTape && (
        <div
          className={`absolute -top-3 left-8 z-10 w-24 h-5.5 ${tapeColorClass} border border-[var(--ink)] opacity-95 shadow-[2px_2px_0_rgba(22,17,36,0.3)] transform -rotate-3 group-hover:rotate-0 transition-transform pointer-events-none`}
        />
      )}

      {/* Caixa de Citação */}
      <div
        className={`border-2 border-[var(--ink)] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0_var(--ink)] group-hover:shadow-[6px_6px_0_var(--k-pink)] transition-shadow duration-200 ${schemeClasses}`}
      >
        <div className="flex items-start gap-3">
          <Quote
            className={`w-7 h-7 shrink-0 opacity-40 ${
              colorScheme === 'pink' ? 'text-white' : 'text-[var(--ink)]'
            }`}
          />
          <div className="flex-1">
            <p
              className={`display-font text-xl sm:text-2xl font-bold leading-snug tracking-tight mb-3 ${
                colorScheme === 'pink' ? 'text-white' : 'text-[var(--ink)]'
              }`}
            >
              "{quote}"
            </p>

            {authorOrContext && (
              <p
                className={`mono-font text-[11px] font-bold uppercase tracking-widest ${
                  colorScheme === 'pink' ? 'text-white/80' : 'text-[var(--ink)]/80'
                }`}
              >
                — {authorOrContext}
              </p>
            )}

            {handwrittenNote && (
              <p className="hand-font text-2xl text-[var(--ink)] mt-3 pt-3 border-t border-[var(--ink)]/20 -rotate-1 font-bold">
                ✎ {handwrittenNote}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
