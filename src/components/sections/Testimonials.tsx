// ============================================================
// Testimonials — Social proof carousel
// ============================================================

import React, { useState, useCallback, useEffect } from 'react';
import { TESTIMONIALS } from '../../data/content';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '../../assets/icons';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const FloatingCubesScene = React.lazy(() => import('../three/FloatingCubesScene'));

const AUTOPLAY_INTERVAL = 6000;

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Auto-advance every 5 seconds, pause on hover
  useEffect(() => {
    if (!isVisible || isPaused) return;
    const interval = setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isVisible, isPaused, goNext]);

  const testimonial = TESTIMONIALS[currentIndex];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-arctic"
      aria-labelledby="testimonials-heading"
    >
      <React.Suspense fallback={null}>
        <FloatingCubesScene />
      </React.Suspense>
      <div className={`relative z-10 max-w-7xl mx-auto transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-body text-xs font-semibold text-forsythia uppercase tracking-widest mb-4 px-3 py-1 bg-forsythia/10 rounded-full">
            Testimonials
          </span>
          <h2 id="testimonials-heading" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-noir mb-6">
            Loved by{' '}
            <span className="text-gradient">Teams</span>{' '}
            Worldwide
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <article
            key={testimonial.id}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative bg-white/60 border border-noir/5 rounded-3xl p-8 sm:p-12 shadow-premium hover:shadow-premium-hover transition-shadow duration-300 var(--ease-apple) animate-[fade-in_0.4s_var(--ease-apple)]"
            aria-label={`Testimonial from ${testimonial.name}`}
          >
            {/* Quote mark */}
            <div className="absolute top-6 left-8 text-forsythia/20 font-heading text-8xl leading-none select-none" aria-hidden="true">
              &ldquo;
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 mb-6" aria-label={`${testimonial.rating} out of 5 stars`}>
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <StarIcon key={i} size={20} className="text-forsythia" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-body text-lg sm:text-xl text-noir/80 leading-relaxed mb-8 relative z-10">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-nocturnal to-noir flex items-center justify-center">
                <span className="font-heading font-bold text-forsythia text-sm">
                  {testimonial.avatar}
                </span>
              </div>
              <div>
                <p className="font-heading font-bold text-noir">{testimonial.name}</p>
                <p className="font-body text-sm text-noir/50">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          </article>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goPrev}
              className="p-3 rounded-xl bg-white/60 border border-noir/10 hover:bg-white hover:border-noir/20 shadow-sm hover:shadow-premium transition-all duration-300 var(--ease-apple) hover:-translate-y-0.5 active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon size={20} className="text-noir" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2" role="tablist">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`
                    h-2 rounded-full transition-all duration-300 var(--ease-apple)
                    ${i === currentIndex ? 'w-6 bg-forsythia' : 'w-2 bg-noir/20 hover:bg-noir/40'}
                  `}
                  role="tab"
                  aria-selected={i === currentIndex}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="p-3 rounded-xl bg-white/60 border border-noir/10 hover:bg-white hover:border-noir/20 shadow-sm hover:shadow-premium transition-all duration-300 var(--ease-apple) hover:-translate-y-0.5 active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon size={20} className="text-noir" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Testimonials);
