// ============================================================
// Statistics — Animated count-up statistics section
// ============================================================

import React from 'react';
import { STATISTICS } from '../../data/content';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useCountUp } from '../../hooks/useCountUp';
import type { StatItem } from '../../types';

// ── Individual Stat Counter ─────────────────────────────────
interface StatCounterProps {
  stat: StatItem;
  isVisible: boolean;
}

const StatCounter: React.FC<StatCounterProps> = React.memo(({ stat, isVisible }) => {
  const decimals = stat.value % 1 !== 0 ? 2 : 0;
  const displayValue = useCountUp({
    end: stat.value,
    duration: 2500,
    decimals,
    enabled: isVisible,
  });

  return (
    <article className="text-center p-6 lg:p-8 group">
      <div className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-forsythia mb-3 transition-transform duration-200 group-hover:scale-105">
        {stat.prefix || ''}{displayValue}{stat.suffix}
      </div>
      <p className="font-body text-sm sm:text-base text-arctic/60">
        {stat.label}
      </p>
    </article>
  );
});
StatCounter.displayName = 'StatCounter';

// ── Statistics Section ──────────────────────────────────────
const Statistics: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-nocturnal via-noir to-nocturnal overflow-hidden"
      aria-label="Platform statistics"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,200,1,0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className={`relative max-w-6xl mx-auto transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {STATISTICS.map((stat) => (
            <StatCounter key={stat.id} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Statistics);
