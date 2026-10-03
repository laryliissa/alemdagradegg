import React from 'react';

export interface StickerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'pink' | 'cyan' | 'pill';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  shadowColor?: 'ink' | 'pink' | 'lilac' | 'acid';
}

export const StickerButton: React.FC<StickerButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  shadowColor = 'ink',
  children,
  className = '',
  disabled,
  ...props
}) => {
  // Tamanhos e paddings baseados em tipografia mono
  const sizeClasses = {
    sm: 'text-[10px] px-3 py-1.5 gap-1.5 tracking-wider',
    md: 'text-[11px] px-4 py-2 gap-2 tracking-widest',
    lg: 'text-[12px] px-6 py-3 gap-2.5 tracking-widest',
  }[size];

  // Variantes de cores do Design System
  const variantClasses = {
    primary:
      'bg-[var(--k-lilac)] text-[var(--ink)] hover:bg-[var(--k-pink)] hover:text-white hover:shadow-[5px_5px_0_var(--ink)]',
    secondary:
      'bg-white text-[var(--ink)] hover:bg-[var(--bg-dots)] hover:shadow-[5px_5px_0_var(--k-pink)]',
    accent:
      'bg-[var(--k-acid)] text-[var(--ink)] hover:bg-[var(--k-cyan)] hover:shadow-[5px_5px_0_var(--ink)]',
    pink:
      'bg-[var(--k-pink)] text-white hover:bg-[var(--k-lilac)] hover:text-[var(--ink)] hover:shadow-[5px_5px_0_var(--k-acid)]',
    cyan:
      'bg-[var(--k-cyan)] text-[var(--ink)] hover:bg-[var(--k-acid)] hover:shadow-[5px_5px_0_var(--ink)]',
    pill:
      'bg-white text-[var(--ink)] rounded-full hover:bg-[var(--k-lilac)] hover:text-[var(--ink)] hover:shadow-[4px_4px_0_var(--k-pink)]',
  }[variant];

  const roundedClass = variant === 'pill' ? 'rounded-full' : 'rounded-xl';

  // Sombras neobrutalistas
  const shadowBase =
    shadowColor === 'pink'
      ? 'shadow-[4px_4px_0_var(--k-pink)]'
      : shadowColor === 'lilac'
      ? 'shadow-[4px_4px_0_var(--k-lilac)]'
      : shadowColor === 'acid'
      ? 'shadow-[4px_4px_0_var(--k-acid)]'
      : 'shadow-[4px_4px_0_var(--ink)]';

  return (
    <button
      disabled={disabled}
      className={`mono-font font-bold uppercase inline-flex items-center justify-center border-2 border-[var(--ink)] transition-all duration-150 select-none cursor-pointer ${roundedClass} ${sizeClasses} ${variantClasses} ${shadowBase} ${
        disabled
          ? 'opacity-50 cursor-not-allowed shadow-[2px_2px_0_var(--ink)] hover:translate-x-0 hover:translate-y-0'
          : 'hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none'
      } ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </button>
  );
};
