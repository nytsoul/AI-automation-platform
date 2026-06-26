// ============================================================
// useCountUp — Animated number counter using WAAPI
// ============================================================

import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  decimals?: number;
  start?: number;
  enabled?: boolean;
}

export function useCountUp({
  end,
  duration = 2000,
  decimals = 0,
  start = 0,
  enabled = true,
}: UseCountUpOptions): string {
  const [value, setValue] = useState(start);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setValue(start);
      return;
    }

    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;

      setValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration, start, enabled, decimals]);

  return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
}
