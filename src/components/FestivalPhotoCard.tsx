import React, { useState } from 'react';
import { Camera, Sparkles, Heart } from 'lucide-react';

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

  // Se a imagem carregar com sucesso (ex: no GitHub Pages ou quando adicionada à pasta), exibe a foto real
  if (!loadFailed && src) {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setLoadFailed(true)}
        className={`${className} object-cover`}
      />
    );
  }

  return (
    <div
      className={`w-full ${
        isDetailedView ? 'h-[420px] sm:h-[480px]' : 'h-64 sm:h-72'
      } rounded-xl border-2 border-[var(--ink)] overflow-hidden shadow-[4px_4px_0_var(--ink)] bg-neutral-200 flex items-center justify-center select-none ${className}`}
    >
      <Camera className="w-12 h-12 text-neutral-400" />
    </div>
  );
};
