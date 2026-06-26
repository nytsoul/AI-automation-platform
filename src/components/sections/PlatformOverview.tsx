// ============================================================
// PlatformOverview — AI Platform value proposition section
// ============================================================

import React from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import { CubeSolidIcon, ArrowPathIcon, ChartPieIcon } from '../../assets/icons';

const highlights = [
  {
    icon: CubeSolidIcon,
    title: 'Modular by Design',
    description: 'Build complex data architectures from pre-built, battle-tested modules that auto-scale independently.',
  },
  {
    icon: ArrowPathIcon,
    title: 'Self-Healing Pipelines',
    description: 'AI monitors and automatically recovers from failures. Zero downtime, zero manual intervention.',
  },
  {
    icon: ChartPieIcon,
    title: 'Actionable Intelligence',
    description: 'Transform raw data into strategic insights with real-time dashboards and predictive analytics.',
  },
];

const PlatformOverview: React.FC = () => {
  return (
    <SectionWrapper id="platform">
      <div className="text-center mb-16">
        <span className="inline-block font-body text-xs font-semibold text-forsythia uppercase tracking-widest mb-4 px-3 py-1 bg-forsythia/10 rounded-full">
          The Platform
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-noir mb-6">
          Data Automation,{' '}
          <span className="text-gradient">Reimagined</span>
        </h2>
        <p className="font-body text-lg text-noir/60 max-w-2xl mx-auto leading-relaxed">
          FinGuard combines the power of AI with enterprise-grade infrastructure to deliver a data automation platform that thinks, adapts, and scales with your business.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {highlights.map((item, index) => (
          <article
            key={item.title}
            className="group relative p-8 rounded-2xl bg-white/60 border border-noir/5 card-hover"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-nocturnal to-noir flex items-center justify-center mb-6 transition-transform duration-200 ease-out group-hover:scale-110">
              <item.icon size={28} className="text-forsythia" />
            </div>

            {/* Content */}
            <h3 className="font-heading text-xl font-bold text-noir mb-3">
              {item.title}
            </h3>
            <p className="font-body text-noir/60 leading-relaxed">
              {item.description}
            </p>

            {/* Subtle gradient border on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-forsythia/0 to-saffron/0 group-hover:from-forsythia/5 group-hover:to-saffron/5 transition-all duration-300 pointer-events-none" aria-hidden="true" />
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default React.memo(PlatformOverview);
