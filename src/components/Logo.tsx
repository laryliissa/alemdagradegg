import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const [useFallback, setUseFallback] = useState(false);

  const heightClass =
    size === 'sm' ? 'h-10 sm:h-12' : size === 'lg' ? 'h-16 sm:h-20' : 'h-12 sm:h-14';

  // Se o arquivo logo.png existir (na pasta public ou no repositório), exibe-o diretamente!
  // Caso contrário, exibe o vetor SVG de altíssima fidelidade para nunca quebrar.
  if (!useFallback) {
    return (
      <img
        src="./logo.png"
        alt="Além da Grade"
        onError={() => setUseFallback(true)}
        className={`${heightClass} w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[2px_2px_0_var(--ink)] ${className}`}
      />
    );
  }

  // Vetor SVG completo reproduzindo todos os elementos da identidade visual oficial:
  // - Grade de palco com 3 refletores
  // - Tipografia "Além da" com estrela interna
  // - Tipografia "Grade" em lilás expressivo
  // - Ingresso/ticket de festival
  // - Coração rosa e traços em verde ácido
  return (
    <svg
      viewBox="0 0 400 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${heightClass} w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${className}`}
    >
      <defs>
        {/* Padrão de meio-tom (halftone) para a grade */}
        <pattern id="barrierMesh" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1.5" fill="#161124" fillOpacity="0.35" />
        </pattern>
        {/* Sombra 3D sólida */}
        <filter id="solidShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="4" dy="4" stdDeviation="0" floodColor="#161124" />
        </filter>
        <linearGradient id="gradeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#cbb0ff" />
          <stop offset="100%" stopColor="#9a62ff" />
        </linearGradient>
      </defs>

      {/* 1. Raios de luz amarelos dos refletores */}
      <path d="M 330 65 L 350 45" stroke="#d4ff00" strokeWidth="5" strokeLinecap="round" />
      <path d="M 345 80 L 370 70" stroke="#d4ff00" strokeWidth="5" strokeLinecap="round" />
      <path d="M 335 95 L 365 100" stroke="#d4ff00" strokeWidth="5" strokeLinecap="round" />

      {/* 2. Anel Orbital Lilás de fundo */}
      <ellipse
        cx="200"
        cy="210"
        rx="180"
        ry="75"
        stroke="#b388ff"
        strokeWidth="7"
        fill="none"
        strokeDasharray="450 150"
        transform="rotate(-12 200 210)"
      />

      {/* 3. A Grade de Show / Barricada de Palco com 3 Refletores */}
      <g id="barricada" transform="rotate(-6 230 140)">
        {/* Refletor 1 */}
        <path d="M 195 95 L 205 95 L 208 80 L 192 80 Z" fill="#161124" />
        <rect x="190" y="74" width="20" height="7" rx="2" fill="#161124" />

        {/* Refletor 2 */}
        <path d="M 245 88 L 255 88 L 258 73 L 242 73 Z" fill="#161124" />
        <rect x="240" y="67" width="20" height="7" rx="2" fill="#161124" />

        {/* Refletor 3 */}
        <path d="M 295 81 L 305 81 L 308 66 L 292 66 Z" fill="#161124" />
        <rect x="290" y="60" width="20" height="7" rx="2" fill="#161124" />

        {/* Painéis da Barricada */}
        <path
          d="M 160 100 L 330 80 C 335 80 340 85 340 92 L 345 190 L 155 205 Z"
          fill="#f0e6ff"
          stroke="#161124"
          strokeWidth="6"
        />
        {/* Grade com padrão perfurado */}
        <path
          d="M 165 105 L 325 86 C 330 86 335 90 335 95 L 340 185 L 160 198 Z"
          fill="url(#barrierMesh)"
        />
        {/* Barras verticais da grade */}
        <line x1="205" y1="100" x2="208" y2="200" stroke="#161124" strokeWidth="5" />
        <line x1="250" y1="95" x2="253" y2="195" stroke="#161124" strokeWidth="5" />
        <line x1="295" y1="90" x2="298" y2="190" stroke="#161124" strokeWidth="5" />
      </g>

      {/* 4. Estrelas de Brilho / Sparkles */}
      {/* Estrela preta esquerda */}
      <path
        d="M 75 140 Q 75 155 60 155 Q 75 155 75 170 Q 75 155 90 155 Q 75 155 75 140 Z"
        fill="#161124"
      />
      <circle cx="65" cy="165" r="3" fill="#d4ff00" />

      {/* Estrela lilás grande direita */}
      <path
        d="M 350 170 Q 350 190 330 190 Q 350 190 350 210 Q 350 190 370 190 Q 350 190 350 170 Z"
        fill="#b388ff"
        stroke="#ffffff"
        strokeWidth="3"
      />
      <circle cx="365" cy="215" r="3.5" fill="#d4ff00" />

      {/* 5. Ingresso / Ticket de Festival (inferior esquerdo) */}
      <g id="ticket" transform="rotate(-15 80 270)">
        <rect
          x="45"
          y="255"
          width="75"
          height="42"
          rx="5"
          fill="#b388ff"
          stroke="#161124"
          strokeWidth="5"
        />
        {/* Recorte circular do ticket */}
        <circle cx="45" cy="276" r="6" fill="#faf8ff" stroke="#161124" strokeWidth="4" />
        <circle cx="120" cy="276" r="6" fill="#faf8ff" stroke="#161124" strokeWidth="4" />
        {/* Estrela e linhas do código */}
        <path
          d="M 72 270 Q 72 276 66 276 Q 72 276 72 282 Q 72 276 78 276 Q 72 276 72 270 Z"
          fill="#161124"
        />
        <line x1="88" y1="265" x2="88" y2="287" stroke="#161124" strokeWidth="2.5" strokeDasharray="3 2" />
        <line x1="95" y1="265" x2="95" y2="287" stroke="#161124" strokeWidth="2" />
        <line x1="100" y1="265" x2="100" y2="287" stroke="#161124" strokeWidth="3" />
      </g>

      {/* 6. Traço Verde Ácido sob a palavra Grade */}
      <path
        d="M 175 305 Q 260 290 300 280"
        stroke="#d4ff00"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* 7. Texto "Além da" com borda grossa */}
      <g id="texto-alem-da" transform="rotate(-7 180 180)">
        {/* Contorno branco volumoso */}
        <text
          x="55"
          y="180"
          fontFamily="'Space Grotesk', Impact, sans-serif"
          fontWeight="900"
          fontSize="66"
          letterSpacing="-2"
          stroke="#ffffff"
          strokeWidth="18"
          strokeLinejoin="round"
          fill="#161124"
        >
          Além da
        </text>
        {/* Texto Preto Frontal */}
        <text
          x="55"
          y="180"
          fontFamily="'Space Grotesk', Impact, sans-serif"
          fontWeight="900"
          fontSize="66"
          letterSpacing="-2"
          stroke="#161124"
          strokeWidth="7"
          strokeLinejoin="round"
          fill="#161124"
        >
          Além da
        </text>
        {/* Estrela dentro da letra A */}
        <path
          d="M 82 148 Q 82 153 77 153 Q 82 153 82 158 Q 82 153 87 153 Q 82 153 82 148 Z"
          fill="#ffffff"
        />
      </g>

      {/* 8. Texto "Grade" estilizado em brush/caligrafia lilás */}
      <g id="texto-grade" transform="rotate(-8 230 250)">
        {/* Contorno externo branco para destacar */}
        <text
          x="95"
          y="275"
          fontFamily="'Caveat', cursive, sans-serif"
          fontWeight="900"
          fontSize="135"
          stroke="#ffffff"
          strokeWidth="24"
          strokeLinejoin="round"
          fill="#161124"
        >
          Grade
        </text>
        {/* Sombra 3D preta do texto Grade */}
        <text
          x="98"
          y="278"
          fontFamily="'Caveat', cursive, sans-serif"
          fontWeight="900"
          fontSize="135"
          stroke="#161124"
          strokeWidth="16"
          strokeLinejoin="round"
          fill="#161124"
        >
          Grade
        </text>
        {/* Frente Lilás Vibrante com Degradê */}
        <text
          x="95"
          y="275"
          fontFamily="'Caveat', cursive, sans-serif"
          fontWeight="900"
          fontSize="135"
          stroke="#161124"
          strokeWidth="8"
          strokeLinejoin="round"
          fill="url(#gradeGradient)"
        >
          Grade
        </text>
      </g>

      {/* 9. Coração Rosa no Canto Inferior Direito */}
      <g id="coracao" transform="rotate(12 350 260)">
        <path
          d="M 350 250 C 350 242 342 236 334 236 C 324 236 318 245 318 253 C 318 266 332 278 334 280 C 336 278 350 266 350 253 Z"
          stroke="#eb3f8f"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M 330 286 L 336 286 M 333 283 L 333 289" stroke="#b388ff" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
};
