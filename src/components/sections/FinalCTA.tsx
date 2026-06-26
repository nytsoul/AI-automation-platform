// ============================================================
// FinalCTA — Bottom conversion section
// ============================================================

import React from 'react';
import Button from '../ui/Button';
import { ArrowTrendingUpIcon } from '../../assets/icons';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const FinalCTA: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-nocturnal via-noir to-nocturnal overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-forsythia/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-saffron/5 blur-3xl" />
      </div>

      <div className={`relative max-w-4xl mx-auto text-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
          <span className="w-2 h-2 rounded-full bg-forsythia animate-pulse" />
          <span className="font-body text-xs font-medium text-arctic/70 tracking-wide uppercase">
            Start Automating Today
          </span>
        </div>

        <h2 id="cta-heading" className="font-heading text-3xl sm:text-4xl lg:text-6xl font-bold text-arctic mb-6 leading-tight">
          Ready to Transform{' '}
          <span className="text-gradient">Your Data?</span>
        </h2>

        <p className="font-body text-lg sm:text-xl text-arctic/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          Join 500+ enterprises using FinGuard AI to automate workflows, eliminate bottlenecks, and unlock the full potential of their data.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg" href="#pricing" id="final-cta-primary">
            Start Free Trial
            <ArrowTrendingUpIcon size={20} className="ml-1" />
          </Button>
          <Button variant="outline" size="lg" href="#" id="final-cta-secondary">
            Book a Demo
          </Button>
        </div>

        <p className="font-body text-sm text-arctic/30 mt-6">
          No credit card required · 14-day free trial · Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default React.memo(FinalCTA);
