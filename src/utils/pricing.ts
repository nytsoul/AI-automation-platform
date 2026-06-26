// ============================================================
// Pricing utility functions
// Compute prices dynamically from the matrix configuration
// ============================================================

import type { Currency, BillingCycle, ComputedPrice, PricingMatrix, TierName } from '../types';

/**
 * Compute the final price for a given tier, currency, and billing cycle
 * from the pricing matrix. No hardcoded values.
 */
export function computePrice(
  matrix: PricingMatrix,
  tierName: TierName,
  currency: Currency,
  cycle: BillingCycle
): ComputedPrice {
  const tier = matrix.tiers.find((t) => t.name === tierName);
  if (!tier) throw new Error(`Tier "${tierName}" not found in pricing matrix`);

  const rate = matrix.currencyRates[currency];
  const tariff = matrix.regionalTariffs[currency];
  const config = matrix.currencies[currency];

  // Base computation: base rate * exchange rate * regional tariff
  let amount = tier.baseMonthlyUSD * rate * tariff;

  if (cycle === 'annual') {
    amount = amount * (1 - matrix.annualDiscountPercent / 100);
  }

  // Round to appropriate precision based on currency
  const precision = currency === 'INR' ? 0 : 2;
  amount = Math.round(amount * Math.pow(10, precision)) / Math.pow(10, precision);

  const formatted = formatPrice(amount, config.symbol, currency);

  return {
    amount,
    formatted,
    symbol: config.symbol,
    cycle,
    currency,
  };
}

/**
 * Format a price with the correct currency symbol and locale conventions
 */
function formatPrice(amount: number, symbol: string, currency: Currency): string {
  if (currency === 'INR') {
    return `${symbol}${amount.toLocaleString('en-IN')}`;
  }
  if (currency === 'EUR') {
    return `${symbol}${amount.toFixed(2)}`;
  }
  return `${symbol}${amount.toFixed(2)}`;
}

/**
 * Get the annual savings amount for a tier
 */
export function computeAnnualSavings(
  matrix: PricingMatrix,
  tierName: TierName,
  currency: Currency
): string {
  const monthlyPrice = computePrice(matrix, tierName, currency, 'monthly');
  const annualPrice = computePrice(matrix, tierName, currency, 'annual');
  const savings = (monthlyPrice.amount - annualPrice.amount) * 12;

  const config = matrix.currencies[currency];
  const precision = currency === 'INR' ? 0 : 2;
  const rounded = Math.round(savings * Math.pow(10, precision)) / Math.pow(10, precision);

  return formatPrice(rounded, config.symbol, currency);
}
