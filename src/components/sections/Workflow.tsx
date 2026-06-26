// ============================================================
// Workflow — Step-by-step process section
// ============================================================

import React from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import { WORKFLOW_STEPS } from '../../data/content';
import { ICON_MAP } from '../../assets/icons/iconMap';

const DigitalWaveScene = React.lazy(() => import('../three/DigitalWaveScene'));

const Workflow: React.FC = () => {
  return (
    <SectionWrapper id="workflow" dark className="relative">
      <React.Suspense fallback={null}>
        <DigitalWaveScene />
      </React.Suspense>
      
      <div className="relative z-10 text-center mb-16">
        <span className="inline-block font-body text-xs font-semibold text-forsythia uppercase tracking-widest mb-4 px-3 py-1 bg-forsythia/10 rounded-full">
          How It Works
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-arctic mb-6">
          Get Started in{' '}
          <span className="text-gradient">Minutes</span>
        </h2>
        <p className="font-body text-lg text-arctic/60 max-w-2xl mx-auto">
          Four simple steps from data chaos to automated intelligence.
        </p>
      </div>

      <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {WORKFLOW_STEPS.map((step, index) => {
          const IconComponent = ICON_MAP[step.icon];
          return (
            <article
              key={step.id}
              className="group relative p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-forsythia/20 transition-all duration-300 card-hover"
            >
              {/* Step number */}
              <div className="absolute -top-3 -left-1 font-heading text-6xl font-bold text-forsythia/10 select-none" aria-hidden="true">
                {step.step}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-forsythia/20 to-saffron/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200">
                {IconComponent && <IconComponent size={24} className="text-forsythia" />}
              </div>

              {/* Content */}
              <h3 className="font-heading text-lg font-bold text-arctic mb-3">
                <span className="text-forsythia mr-2">0{step.step}.</span>
                {step.title}
              </h3>
              <p className="font-body text-sm text-arctic/50 leading-relaxed">
                {step.description}
              </p>

              {/* Connector line — not on last item */}
              {index < WORKFLOW_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 lg:-right-4 w-8 h-px bg-gradient-to-r from-forsythia/30 to-transparent" aria-hidden="true" />
              )}
            </article>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default React.memo(Workflow);
