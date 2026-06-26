// ============================================================
// Core TypeScript types for FinGuard AI Landing Page
// ============================================================

/** Supported currencies */
export type Currency = 'USD' | 'INR' | 'EUR';

/** Billing cycle */
export type BillingCycle = 'monthly' | 'annual';

/** Pricing tier names */
export type TierName = 'Starter' | 'Professional' | 'Enterprise';

/** Currency display configuration */
export interface CurrencyConfig {
  symbol: string;
  code: Currency;
  locale: string;
}

/** Single feature in a pricing tier */
export interface PricingFeature {
  text: string;
  included: boolean;
}

/** Pricing tier definition */
export interface PricingTier {
  name: TierName;
  description: string;
  baseMonthlyUSD: number;
  features: PricingFeature[];
  highlighted: boolean;
  cta: string;
  badge?: string;
}

/** The complete pricing matrix configuration */
export interface PricingMatrix {
  tiers: PricingTier[];
  currencyRates: Record<Currency, number>;
  regionalTariffs: Record<Currency, number>;
  currencies: Record<Currency, CurrencyConfig>;
  annualDiscountPercent: number;
}

/** Computed price for display */
export interface ComputedPrice {
  amount: number;
  formatted: string;
  symbol: string;
  cycle: BillingCycle;
  currency: Currency;
}

/** Bento/Accordion feature item */
export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  detail: string;
  stat?: string;
  statLabel?: string;
}

/** Testimonial data */
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
}

/** FAQ item */
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

/** Workflow step */
export interface WorkflowStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
}

/** Statistic item */
export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

/** Trusted company */
export interface TrustedCompany {
  name: string;
  id: string;
}

/** Navigation link */
export interface NavLink {
  label: string;
  href: string;
}
