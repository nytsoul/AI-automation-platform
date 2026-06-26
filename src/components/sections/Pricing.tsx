// ============================================================
// Pricing — Feature 1: Matrix-Driven Pricing
// Multi-dimensional config, performance-isolated currency switch
// ============================================================

import React, { useState, useCallback, useMemo } from 'react';
import { PRICING_MATRIX } from '../../data/pricing';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import PriceDisplay from '../ui/PriceDisplay';
import { CheckIcon, XMarkIcon } from '../../assets/icons';
import Button from '../ui/Button';
import type { Currency, BillingCycle, PricingTier } from '../../types';

// ── Currency Switcher (isolated state) ──────────────────────
const HolographicRingScene = React.lazy(() => import('../three/HolographicRingScene'));
interface CurrencySwitcherProps {
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
}

const CurrencySwitcher: React.FC<CurrencySwitcherProps> = React.memo(({ currency, onCurrencyChange }) => {
  const currencies = useMemo(() => Object.values(PRICING_MATRIX.currencies), []);

  return (
    <div className="flex items-center gap-1 bg-noir/5 rounded-xl p-1" role="radiogroup" aria-label="Currency selector">
      {currencies.map((c) => (
        <button
          key={c.code}
          onClick={() => onCurrencyChange(c.code)}
          className={`
            px-4 py-2 rounded-lg text-sm font-body font-medium
            transition-all duration-300 var(--ease-apple)
            ${currency === c.code
              ? 'bg-white text-noir shadow-premium'
              : 'text-noir/50 hover:text-noir/70'
            }
          `}
          role="radio"
          aria-checked={currency === c.code}
          aria-label={`${c.code} currency`}
        >
          {c.symbol} {c.code}
        </button>
      ))}
    </div>
  );
});
CurrencySwitcher.displayName = 'CurrencySwitcher';

// ── Billing Toggle (isolated state) ─────────────────────────
interface BillingToggleProps {
  cycle: BillingCycle;
  onCycleChange: (c: BillingCycle) => void;
}

const BillingToggle: React.FC<BillingToggleProps> = React.memo(({ cycle, onCycleChange }) => {
  return (
    <div className="flex items-center gap-3" role="radiogroup" aria-label="Billing period">
      <button
        onClick={() => onCycleChange('monthly')}
        className={`
          px-6 py-2 rounded-lg text-sm font-body font-medium
          transition-all duration-300 var(--ease-apple)
          ${cycle === 'monthly'
            ? 'bg-nocturnal text-arctic shadow-premium scale-105'
            : 'text-noir/50 hover:text-noir/70 bg-transparent'
          }
        `}
        role="radio"
        aria-checked={cycle === 'monthly'}
      >
        Monthly
      </button>
      <button
        onClick={() => onCycleChange('annual')}
        className={`
          relative px-6 py-2 rounded-lg text-sm font-body font-medium
          transition-all duration-300 var(--ease-apple)
          ${cycle === 'annual'
            ? 'bg-nocturnal text-arctic shadow-premium scale-105'
            : 'text-noir/50 hover:text-noir/70 bg-transparent'
          }
        `}
        role="radio"
        aria-checked={cycle === 'annual'}
      >
        Annual
        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-forsythia text-noir">
          -{PRICING_MATRIX.annualDiscountPercent}%
        </span>
      </button>
    </div>
  );
});
BillingToggle.displayName = 'BillingToggle';

// ── Pricing Card (memoized shell) ───────────────────────────
interface PricingCardProps {
  tier: PricingTier;
  currency: Currency;
  cycle: BillingCycle;
}

const PricingCard: React.FC<PricingCardProps> = React.memo(({ tier, currency, cycle }) => {
  return (
    <article
      className={`
        relative p-8 rounded-3xl flex flex-col h-full card-hover transition-all duration-300 var(--ease-apple)
        ${tier.highlighted
          ? 'bg-nocturnal text-arctic shadow-premium-hover scale-105 border-none'
          : 'bg-white text-noir border border-noir/5 shadow-premium'
        }
      `}
      aria-label={`${tier.name} plan`}
    >
      {/* Badge */}
      {tier.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex px-4 py-1 rounded-full text-xs font-body font-bold bg-forsythia text-noir shadow-lg shadow-forsythia/20">
            {tier.badge}
          </span>
        </div>
      )}

      {/* Tier Name */}
      <h3 className="font-heading text-xl font-bold mb-2">{tier.name}</h3>
      <p className={`font-body text-sm mb-6 ${tier.highlighted ? 'text-arctic/60' : 'text-noir/50'}`}>
        {tier.description}
      </p>

      {/* Price — This is the ONLY part that updates on currency/cycle change */}
      <div className="mb-8">
        <PriceDisplay
          tierName={tier.name}
          currency={currency}
          cycle={cycle}
        />
        {cycle === 'annual' && (
          <p className={`font-body text-xs mt-2 ${tier.highlighted ? 'text-forsythia' : 'text-forsythia'}`}>
            Save {PRICING_MATRIX.annualDiscountPercent}% with annual billing
          </p>
        )}
      </div>

      {/* CTA */}
      <Button
        variant={tier.highlighted ? 'primary' : 'secondary'}
        size="md"
        className="w-full mb-8"
        href="#"
        id={`pricing-cta-${tier.name.toLowerCase()}`}
      >
        {tier.cta}
      </Button>

      {/* Features */}
      <ul className="space-y-3 flex-1" aria-label={`${tier.name} features`}>
        {tier.features.map((feature) => (
          <li key={feature.text} className="flex items-start gap-3">
            {feature.included ? (
              <CheckIcon
                size={18}
                className={`flex-shrink-0 mt-0.5 ${tier.highlighted ? 'text-forsythia' : 'text-nocturnal'}`}
              />
            ) : (
              <XMarkIcon
                size={18}
                className={`flex-shrink-0 mt-0.5 ${tier.highlighted ? 'text-arctic/20' : 'text-noir/20'}`}
              />
            )}
            <span className={`font-body text-sm ${
              feature.included
                ? (tier.highlighted ? 'text-arctic/80' : 'text-noir/70')
                : (tier.highlighted ? 'text-arctic/30' : 'text-noir/30')
            }`}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}, (prevProps, nextProps) => {
  // Custom comparison: only re-render if currency or cycle changes
  // (the tier data is static, so we compare by name)
  return (
    prevProps.tier.name === nextProps.tier.name &&
    prevProps.currency === nextProps.currency &&
    prevProps.cycle === nextProps.cycle
  );
});
PricingCard.displayName = 'PricingCard';

// ── Main Pricing Section ────────────────────────────────────
const Pricing: React.FC = () => {
  // Isolated state — only controls and PriceDisplay re-render
  const [currency, setCurrency] = useState<Currency>('USD');
  const [cycle, setCycle] = useState<BillingCycle>('monthly');
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.05 });

  const handleCurrencyChange = useCallback((c: Currency) => setCurrency(c), []);
  const handleCycleChange = useCallback((c: BillingCycle) => setCycle(c), []);

  // Memoize tiers to prevent unnecessary re-renders
  const tiers = useMemo(() => PRICING_MATRIX.tiers, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-mint/30"
      aria-labelledby="pricing-heading"
    >
      <React.Suspense fallback={null}>
        <HolographicRingScene />
      </React.Suspense>
      <div className={`relative z-10 max-w-7xl mx-auto transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block font-body text-xs font-semibold text-forsythia uppercase tracking-widest mb-4 px-3 py-1 bg-forsythia/10 rounded-full">
            Pricing
          </span>
          <h2 id="pricing-heading" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-noir mb-6">
            Simple,{' '}
            <span className="text-gradient">Transparent</span>{' '}
            Pricing
          </h2>
          <p className="font-body text-lg text-noir/60 max-w-2xl mx-auto mb-8">
            Choose the plan that fits your team. Scale up or down at any time.
          </p>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <BillingToggle cycle={cycle} onCycleChange={handleCycleChange} />
            <div className="w-px h-8 bg-noir/10 hidden sm:block" aria-hidden="true" />
            <CurrencySwitcher currency={currency} onCurrencyChange={handleCurrencyChange} />
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <PricingCard
              key={tier.name}
              tier={tier}
              currency={currency}
              cycle={cycle}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Pricing);
