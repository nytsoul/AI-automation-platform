// ============================================================
// SectionWrapper — Reusable section container with reveal animation
// ============================================================

import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  dark?: boolean;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, id, className = '', dark = false }) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.05 });

  return (
    <section
      ref={ref}
      id={id}
      className={`
        relative py-20 md:py-28 px-4 sm:px-6 lg:px-8
        ${dark ? 'bg-noir text-arctic' : 'bg-arctic text-noir'}
        ${className}
      `}
    >
      <div
        className={`
          max-w-7xl mx-auto
          transition-all duration-700 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        {children}
      </div>
    </section>
  );
};

export default React.memo(SectionWrapper);
