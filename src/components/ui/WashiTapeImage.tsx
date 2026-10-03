import React, { useState } from 'react';

export interface WashiTapeImageProps {
  src: string;
  alt: string;
  caption?: string;
  fieldNoteTag?: string;
  tapeColor?: 'acid' | 'pink' | 'lilac' | 'cyan';
  tapePosition?: 'top-center' | 'top-left' | 'top-right' | 'dual-corners';
  aspectRatio?: 'video' | 'square' | 'photo' | 'auto';
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const WashiTapeImage: React.FC<WashiTapeImageProps> = ({
  src,
  alt,
  caption,
  fieldNoteTag,
  tapeColor = 'acid',
  tapePosition = 'top-center',
  aspectRatio = 'video',
  className = '',
  onClick,
  hoverEffect = true,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Mapeamento de cor da fita adesiva
  const tapeBgClasses = {
    acid: 'bg-[var(--k-acid)] text-[var(--ink)]',
    pink: 'bg-[var(--k-pink)] text-white',
    lilac: 'bg-[var(--k-lilac)] text-[var(--ink)]',
    cyan: 'bg-[var(--k-cyan)] text-[var(--ink)]',
  }[tapeColor];

  // Proporções
  const aspectClasses = {
    video: 'aspect-[16/9]',
    square: 'aspect-square',
    photo: 'aspect-[4/3]',
    auto: 'min-h-[220px]',
  }[aspectRatio];

  return (
    <figure
      onClick={onClick}
      className={`relative group my-6 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Elemento de Fita Adesiva (Washi Tape) - Posições */}
      {tapePosition === 'top-center' && (
        <div
          className={`absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-28 sm:w-36 h-6 ${tapeBgClasses} border border-[var(--ink)] opacity-95 shadow-[2px_2px_0_rgba(22,17,36,0.3)] transform -rotate-2 group-hover:rotate-0 transition-transform duration-200 pointer-events-none flex items-center justify-center`}
        >
          <div className="w-full h-[1px] bg-[var(--ink)] opacity-20 border-dashed border-b" />
        </div>
      )}

      {tapePosition === 'top-left' && (
        <div
          className={`absolute -top-3.5 -left-2 z-20 w-24 h-6 ${tapeBgClasses} border border-[var(--ink)] opacity-95 shadow-[2px_2px_0_rgba(22,17,36,0.3)] transform -rotate-12 pointer-events-none`}
        />
      )}

      {tapePosition === 'top-right' && (
        <div
          className={`absolute -top-3.5 -right-2 z-20 w-24 h-6 ${tapeBgClasses} border border-[var(--ink)] opacity-95 shadow-[2px_2px_0_rgba(22,17,36,0.3)] transform rotate-12 pointer-events-none`}
        />
      )}

      {tapePosition === 'dual-corners' && (
        <>
          <div
            className={`absolute -top-3 -left-3 z-20 w-20 h-5.5 ${tapeBgClasses} border border-[var(--ink)] opacity-95 shadow-[2px_2px_0_rgba(22,17,36,0.3)] transform -rotate-12 pointer-events-none`}
          />
          <div
            className={`absolute -top-3 -right-3 z-20 w-20 h-5.5 ${tapeBgClasses} border border-[var(--ink)] opacity-95 shadow-[2px_2px_0_rgba(22,17,36,0.3)] transform rotate-12 pointer-events-none`}
          />
        </>
      )}

      {/* Cartão Fotográfico / Polaroid com Sombra e Borda Sólida */}
      <div
        className={`bg-white p-2.5 sm:p-3 border-2 border-[var(--ink)] rounded-2xl shadow-[4px_4px_0_var(--ink)] ${
          hoverEffect
            ? 'transition-all duration-200 group-hover:shadow-[6px_6px_0_var(--k-pink)] group-hover:-translate-y-1'
            : ''
        }`}
      >
        <div
          className={`relative w-full ${aspectClasses} overflow-hidden rounded-xl bg-neutral-100 border border-[var(--ink)]`}
        >
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--paper)]">
              <span className="mono-font text-[10px] text-[var(--ink)] animate-pulse uppercase tracking-widest">
                Revelando imagem...
              </span>
            </div>
          )}

          {imageError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--bg-dots)] p-4 text-center">
              <span className="hand-font text-3xl text-[var(--k-pink)] -rotate-3 mb-1">
                Foto do Caderno ✦
              </span>
              <span className="mono-font text-[11px] text-[var(--ink)] font-bold uppercase">
                {alt}
              </span>
            </div>
          ) : (
            <img
              src={src}
              alt={alt}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } ${hoverEffect ? 'group-hover:scale-102' : ''}`}
            />
          )}

          {fieldNoteTag && (
            <div className="absolute bottom-2 left-2 z-10">
              <span className="mono-font text-[10px] font-bold uppercase tracking-widest bg-[var(--ink)] text-white px-2.5 py-0.5 rounded-full border border-white shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
                {fieldNoteTag}
              </span>
            </div>
          )}
        </div>

        {/* Legenda Estilo Caderno / Diário */}
        {caption && (
          <figcaption className="mt-2.5 px-1.5 flex items-center justify-between gap-2 flex-wrap">
            <p className="hand-font text-xl text-[var(--ink)] font-bold leading-tight">
              {caption}
            </p>
            <span className="mono-font text-[10px] text-neutral-500 uppercase tracking-widest">
              [Registro de Campo]
            </span>
          </figcaption>
        )}
      </div>
    </figure>
  );
};
