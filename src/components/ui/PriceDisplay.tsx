// ============================================================
// PriceDisplay — Isolated price text component
// This is the ONLY component that re-renders on currency/billing change
// Uses React.memo with strict equality checks
// ============================================================

import React, { useMemo } from 'react';
import { computePrice } from '../../utils/pricing';
import { PRICING_MATRIX } from '../../data/pricing';
import type { Currency, BillingCycle, TierName } from '../../types';

interface PriceDisplayProps {
  tierName: TierName;
  currency: Currency;
  cycle: BillingCycle;
}

const PriceDisplay: React.FC<PriceDisplayProps> = React.memo(({ tierName, currency, cycle }) => {
  const computed = useMemo(
    () => computePrice(PRICING_MATRIX, tierName, currency, cycle),
    [tierName, currency, cycle]
  );

  return (
    <div className="flex items-baseline gap-1">
      <span className="font-heading text-4xl lg:text-5xl font-bold tracking-tight">
        {computed.formatted}
      </span>
      <span className="font-body text-sm text-current opacity-50">
        /{cycle === 'monthly' ? 'mo' : 'mo'}
      </span>
    </div>
  );
});

PriceDisplay.displayName = 'PriceDisplay';

export default PriceDisplay;
