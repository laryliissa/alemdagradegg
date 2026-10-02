import React, { useState } from 'react';
import { Camera } from 'lucide-react';

interface FestivalPhotoCardProps {
  src: string;
  alt: string;
  className?: string;
  isDetailedView?: boolean;
}

export const FestivalPhotoCard: React.FC<FestivalPhotoCardProps> = ({
  src,
  alt,
  className = '',
  isDetailedView = false,
}) => {
  const [loadFailed, setLoadFailed] = useState(false);

  // Exibe a imagem real da autora sem nenhum corte (object-contain e altura proporcional)
  if (!loadFailed && src) {
    return (
      <div
        className={`relative overflow-hidden flex items-center justify-center bg-[#fdfcf9] rounded-xl ${className}`}
      >
        <img
          src={src}
          alt={alt}
          onError={() => setLoadFailed(true)}
          className="w-full h-auto object-contain block mx-auto rounded-xl transition-transform duration-300 hover:scale-[1.01]"
        />
      </div>
    );
  }

  // Fallback neutro caso ocorra falha no carregamento
  return (
    <div
      className={`w-full ${
        isDetailedView ? 'h-80 sm:h-96' : 'h-64 sm:h-72'
      } rounded-xl border-2 border-[var(--ink)] bg-[var(--paper)] flex flex-col items-center justify-center p-6 text-center shadow-[4px_4px_0_var(--ink)] ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-[var(--k-acid)] border-2 border-[var(--ink)] flex items-center justify-center shadow-[2px_2px_0_var(--ink)] mb-3">
        <Camera className="w-6 h-6 text-[var(--ink)]" />
      </div>
      <p className="mono-font text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
        {alt}
      </p>
      <p className="mono-font text-[11px] text-neutral-500 mt-1">
        Foto do Festival (01.png)
      </p>
    </div>
  );
};
