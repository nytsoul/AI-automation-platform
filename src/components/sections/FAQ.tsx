// ============================================================
// FAQ — Accordion with animated expand/collapse
// Uses chevron-down SVG from provided assets
// ============================================================

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FAQ_ITEMS } from '../../data/content';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const NeuralBackgroundScene = React.lazy(() => import('../three/NeuralBackgroundScene'));

// ── Individual FAQ Item ─────────────────────────────────────
interface FAQItemProps {
  item: typeof FAQ_ITEMS[number];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FAQAccordionItem: React.FC<FAQItemProps> = React.memo(({ item, isOpen, onToggle, index }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <article
      className={`border-b border-noir/10 last:border-b-0 transition-colors duration-300 var(--ease-apple) ${isOpen ? 'bg-mint/10' : 'hover:bg-noir/5'}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        className="w-full flex items-center justify-between py-5 sm:py-6 px-4 text-left group"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-question-${item.id}`}
      >
        <h3 className={`
          font-heading text-base sm:text-lg font-semibold pr-8
          transition-colors duration-300 var(--ease-apple)
          ${isOpen ? 'text-nocturnal' : 'text-noir group-hover:text-nocturnal'}
        `}>
          {item.question}
        </h3>

        {/* Chevron — uses chevron-down from provided SVGs */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`
            w-5 h-5 flex-shrink-0 transition-transform duration-400 var(--ease-spring)
            ${isOpen ? 'rotate-180 text-forsythia' : 'text-noir/30'}
          `}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Answer */}
      <div
        id={`faq-answer-${item.id}`}
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: isOpen ? `${height}px` : '0px' }}
        role="region"
        aria-labelledby={`faq-question-${item.id}`}
      >
        <div ref={contentRef} className="pb-6">
          <p className="font-body text-noir/60 leading-relaxed max-w-3xl">
            {item.answer}
          </p>
        </div>
      </div>
    </article>
  );
});
FAQAccordionItem.displayName = 'FAQAccordionItem';

// ── FAQ Section ─────────────────────────────────────────────
const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.05 });

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-arctic"
      aria-labelledby="faq-heading"
    >
      <React.Suspense fallback={null}>
        <NeuralBackgroundScene />
      </React.Suspense>
      <div className={`relative z-10 max-w-3xl mx-auto transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block font-body text-xs font-semibold text-forsythia uppercase tracking-widest mb-4 px-3 py-1 bg-forsythia/10 rounded-full">
            FAQ
          </span>
          <h2 id="faq-heading" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-noir mb-6">
            Frequently Asked{' '}
            <span className="text-gradient">Questions</span>
          </h2>
        </div>

        {/* FAQ List */}
        <div className="bg-white/60 border border-noir/5 rounded-2xl px-6 sm:px-8">
          {FAQ_ITEMS.map((item, index) => (
            <FAQAccordionItem
              key={item.id}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(FAQ);
