// ============================================================
// Pricing Matrix — Multi-dimensional configuration object
// All pricing is computed dynamically, NEVER hardcoded in JSX
// ============================================================

import type { PricingMatrix } from '../types';

export const PRICING_MATRIX: PricingMatrix = {
  annualDiscountPercent: 20,

  currencyRates: {
    USD: 1,
    INR: 83.5,
    EUR: 0.92,
  },

  regionalTariffs: {
    USD: 1.0,  // No extra tariff for US
    INR: 1.18, // 18% GST / tariff for India
    EUR: 1.05, // 5% VAT / tariff for Europe
  },

  currencies: {
    USD: { symbol: '$', code: 'USD', locale: 'en-US' },
    INR: { symbol: '₹', code: 'INR', locale: 'en-IN' },
    EUR: { symbol: '€', code: 'EUR', locale: 'de-DE' },
  },

  tiers: [
    {
      name: 'Starter',
      description: 'Perfect for small teams getting started with AI automation.',
      baseMonthlyUSD: 29,
      highlighted: false,
      cta: 'Start Free Trial',
      features: [
        { text: 'Up to 5 team members', included: true },
        { text: '10,000 API calls/month', included: true },
        { text: 'Basic AI models', included: true },
        { text: 'Email support', included: true },
        { text: 'Standard analytics', included: true },
        { text: 'Custom workflows', included: false },
        { text: 'Priority support', included: false },
        { text: 'Advanced security', included: false },
      ],
    },
    {
      name: 'Professional',
      description: 'For growing teams that need advanced AI capabilities.',
      baseMonthlyUSD: 79,
      highlighted: true,
      cta: 'Get Started',
      badge: 'Most Popular',
      features: [
        { text: 'Up to 25 team members', included: true },
        { text: '100,000 API calls/month', included: true },
        { text: 'Advanced AI models', included: true },
        { text: 'Priority email & chat', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Custom workflows', included: true },
        { text: 'Priority support', included: true },
        { text: 'Advanced security', included: false },
      ],
    },
    {
      name: 'Enterprise',
      description: 'Unlimited power for organizations at scale.',
      baseMonthlyUSD: 199,
      highlighted: false,
      cta: 'Contact Sales',
      features: [
        { text: 'Unlimited team members', included: true },
        { text: 'Unlimited API calls', included: true },
        { text: 'Custom AI models', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'Enterprise analytics', included: true },
        { text: 'Custom workflows', included: true },
        { text: '24/7 phone support', included: true },
        { text: 'SOC 2 & HIPAA compliance', included: true },
      ],
    },
  ],
};
