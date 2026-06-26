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
  primary:
    'bg-forsythia text-noir hover:bg-saffron font-semibold shadow-lg shadow-forsythia/20 hover:shadow-saffron/30',
  secondary:
    'bg-nocturnal text-arctic hover:bg-noir-light font-semibold shadow-lg shadow-nocturnal/20',
  outline:
    'border-2 border-forsythia text-forsythia hover:bg-forsythia hover:text-noir font-semibold',
  ghost:
    'text-nocturnal hover:bg-nocturnal/10 font-medium',
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
    inline-flex items-center justify-center gap-2
    transition-all duration-200 ease-out
    cursor-pointer select-none
    focus-visible:outline-2 focus-visible:outline-forsythia focus-visible:outline-offset-2
    active:scale-[0.98]
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `;

  if (href) {
    return (
      <a href={href} className={classes} id={id}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} id={id} type="button">
      {children}
    </button>
  );
};

export default React.memo(Button);
