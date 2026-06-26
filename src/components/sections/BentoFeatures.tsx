// ============================================================
// BentoFeatures — Feature 2: Bento Grid ↔ Accordion
// Desktop: Interactive Bento Grid layout
// Mobile: Touch-optimized Accordion with state persistence
// ============================================================

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FEATURES } from '../../data/features';
import { ICON_MAP } from '../../assets/icons';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

// ── Bento Grid Item (Desktop) ───────────────────────────────
interface BentoItemProps {
  feature: typeof FEATURES[number];
  isActive: boolean;
  onActivate: () => void;
  index: number;
}

const BentoItem: React.FC<BentoItemProps> = React.memo(({ feature, isActive, onActivate, index }) => {
  const IconComponent = ICON_MAP[feature.icon];

  return (
    <article
      className={`
        group relative rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-400 ease-in-out
        ${isActive
          ? 'col-span-2 row-span-2 bg-gradient-to-br ' + feature.gradient
          : 'col-span-1 row-span-1 bg-white/60 border border-noir/5 hover:border-forsythia/20'
        }
      `}
      onClick={onActivate}
      onMouseEnter={onActivate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onActivate(); } }}
      aria-expanded={isActive}
      aria-label={`Feature: ${feature.title}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className={`p-6 lg:p-8 h-full flex flex-col transition-all duration-300 ${isActive ? 'justify-between' : 'justify-start'}`}>
        {/* Icon */}
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center mb-4
          transition-all duration-200 ease-out
          ${isActive
            ? 'bg-white/15'
            : 'bg-gradient-to-br from-nocturnal to-noir group-hover:scale-105'
          }
        `}>
          {IconComponent && (
            <IconComponent
              size={24}
              className={isActive ? 'text-white' : 'text-forsythia'}
            />
          )}
        </div>

        {/* Title */}
        <h3 className={`
          font-heading font-bold mb-2 transition-colors duration-200
          ${isActive ? 'text-white text-2xl lg:text-3xl' : 'text-noir text-lg'}
        `}>
          {feature.title}
        </h3>

        {/* Description */}
        <p className={`
          font-body leading-relaxed transition-all duration-300
          ${isActive ? 'text-white/80 text-base' : 'text-noir/50 text-sm line-clamp-2'}
        `}>
          {isActive ? feature.detail : feature.description}
        </p>

        {/* Stats — only visible when active */}
        {isActive && feature.stat && (
          <div className="mt-auto pt-6 flex items-end gap-3">
            <span className="font-heading text-4xl lg:text-5xl font-bold text-forsythia">
              {feature.stat}
            </span>
            <span className="font-body text-sm text-white/60 pb-1">
              {feature.statLabel}
            </span>
          </div>
        )}
      </div>

      {/* Hover shimmer — non-active only */}
      {!isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-forsythia/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden="true" />
      )}
    </article>
  );
});
BentoItem.displayName = 'BentoItem';

// ── Accordion Item (Mobile) ─────────────────────────────────
interface AccordionItemProps {
  feature: typeof FEATURES[number];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const AccordionItem: React.FC<AccordionItemProps> = React.memo(({ feature, isOpen, onToggle, index }) => {
  const IconComponent = ICON_MAP[feature.icon];
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <article
      className={`
        rounded-2xl overflow-hidden transition-all duration-300 ease-in-out
        ${isOpen
          ? 'bg-gradient-to-br ' + feature.gradient + ' shadow-lg'
          : 'bg-white/60 border border-noir/5'
        }
      `}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Header */}
      <button
        className="w-full flex items-center gap-4 p-5 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-${feature.id}`}
      >
        <div className={`
          w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
          ${isOpen ? 'bg-white/15' : 'bg-gradient-to-br from-nocturnal to-noir'}
        `}>
          {IconComponent && (
            <IconComponent size={20} className={isOpen ? 'text-white' : 'text-forsythia'} />
          )}
        </div>

        <h3 className={`
          font-heading font-bold text-lg flex-1
          ${isOpen ? 'text-white' : 'text-noir'}
        `}>
          {feature.title}
        </h3>

        {/* Chevron */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`
            w-5 h-5 flex-shrink-0 transition-transform duration-300
            ${isOpen ? 'rotate-180 text-white' : 'text-noir/40'}
          `}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Content */}
      <div
        id={`accordion-${feature.id}`}
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: isOpen ? `${contentHeight}px` : '0px' }}
        role="region"
        aria-labelledby={feature.id}
      >
        <div ref={contentRef} className="px-5 pb-5">
          <p className={`font-body leading-relaxed mb-4 ${isOpen ? 'text-white/80' : 'text-noir/50'}`}>
            {feature.detail}
          </p>
          {feature.stat && (
            <div className="flex items-center gap-3 pt-2 border-t border-white/10">
              <span className="font-heading text-3xl font-bold text-forsythia">
                {feature.stat}
              </span>
              <span className="font-body text-sm text-white/60">
                {feature.statLabel}
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
});
AccordionItem.displayName = 'AccordionItem';

// ── Main BentoFeatures Component ────────────────────────────
const BentoFeatures: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.05 });

  const handleActivate = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleToggle = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-arctic"
      aria-labelledby="features-heading"
    >
      <div className={`max-w-7xl mx-auto transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block font-body text-xs font-semibold text-forsythia uppercase tracking-widest mb-4 px-3 py-1 bg-forsythia/10 rounded-full">
            Features
          </span>
          <h2 id="features-heading" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-noir mb-6">
            Everything You Need to{' '}
            <span className="text-gradient">Scale</span>
          </h2>
          <p className="font-body text-lg text-noir/60 max-w-2xl mx-auto">
            Six powerful capabilities that transform how your organization handles data.
          </p>
        </div>

        {/* Desktop: Bento Grid */}
        {!isMobile && (
          <div className="hidden md:grid grid-cols-3 gap-4 lg:gap-6 auto-rows-[200px] lg:auto-rows-[220px]">
            {FEATURES.map((feature, index) => (
              <BentoItem
                key={feature.id}
                feature={feature}
                isActive={activeIndex === index}
                onActivate={() => handleActivate(index)}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Mobile: Accordion */}
        {isMobile && (
          <div className="md:hidden flex flex-col gap-3">
            {FEATURES.map((feature, index) => (
              <AccordionItem
                key={feature.id}
                feature={feature}
                isOpen={activeIndex === index}
                onToggle={() => handleToggle(index)}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(BentoFeatures);
