// ============================================================
// Button — Reusable CTA button component
// ============================================================

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  id?: string;
}

const variants = {
  primary: "bg-forsythia text-noir hover:bg-forsythia-light shadow-[0_0_15px_rgba(255,200,1,0.2)] hover:shadow-glow-forsythia hover:-translate-y-0.5",
  secondary: "bg-noir text-arctic hover:bg-noir-light shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5",
  outline: "border-2 border-noir/10 text-noir hover:border-noir/20 hover:bg-noir/5 hover:-translate-y-0.5",
  ghost: "text-noir hover:bg-noir/5",
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  id,
}) => {
  const classes = `
    relative group inline-flex items-center justify-center font-body font-medium rounded-lg transition-all duration-300 var(--ease-apple) focus-visible:outline-none overflow-hidden select-none active:scale-[0.98]
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `;

  const content = (
    <>
      {(variant === 'primary' || variant === 'secondary') && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      )}
      <span className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} id={id}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} id={id} type="button">
      {content}
    </button>
  );
};

export default React.memo(Button);
