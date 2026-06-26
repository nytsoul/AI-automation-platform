// ============================================================
// useResizeObserver — Responsive breakpoint detection via ResizeObserver
// Fulfills strict hackathon requirement for Feature 2
// ============================================================

import { useState, useEffect, type RefObject } from 'react';

export function useResizeObserver(ref: RefObject<HTMLElement | null>, breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      // Fallback to window width initially if ref isn't attached yet
      setIsMobile(window.innerWidth < breakpoint);
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Use borderBoxSize for modern browsers, fallback to contentRect
        const width = entry.borderBoxSize 
          ? entry.borderBoxSize[0].inlineSize 
          : entry.contentRect.width;
        
        setIsMobile(width < breakpoint);
      }
    });

    observer.observe(element);
    
    // Initial check
    setIsMobile(element.getBoundingClientRect().width < breakpoint);

    return () => observer.disconnect();
  }, [ref, breakpoint]);

  return isMobile;
}
