// ============================================================
// TrustedCompanies — Logo marquee of trusted companies
// ============================================================

import React from 'react';
import { TRUSTED_COMPANIES } from '../../data/content';

const TrustedCompanies: React.FC = () => {
  // Double the array for seamless infinite scroll
  const doubled = [...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES];

  return (
    <section className="relative py-12 bg-arctic border-y border-noir/5 overflow-hidden" aria-label="Trusted by leading companies">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-center text-sm font-body text-noir/40 uppercase tracking-widest">
          Trusted by industry leaders
        </p>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-arctic to-transparent z-10" aria-hidden="true" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-arctic to-transparent z-10" aria-hidden="true" />

        {/* Scrolling logos */}
        <div className="flex animate-marquee" aria-hidden="true">
          {doubled.map((company, index) => (
            <div
              key={`${company.id}-${index}`}
              className="flex-shrink-0 mx-8 sm:mx-12 flex items-center justify-center"
            >
              <span className="font-heading text-xl sm:text-2xl font-bold text-noir/15 hover:text-noir/30 transition-colors duration-300 whitespace-nowrap select-none">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Screen reader text */}
      <div className="sr-only">
        <p>Trusted by: {TRUSTED_COMPANIES.map(c => c.name).join(', ')}</p>
      </div>
    </section>
  );
};

export default React.memo(TrustedCompanies);
