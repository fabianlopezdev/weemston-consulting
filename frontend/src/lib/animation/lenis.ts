/**
 * Lenis Smooth Scrolling Integration
 *
 * Provides premium smooth scrolling experience while
 * integrating seamlessly with GSAP ScrollTrigger.
 */

import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

/**
 * Initialize Lenis smooth scrolling
 * Automatically connects to GSAP ScrollTrigger
 *
 * @returns The Lenis instance
 */
export function initLenis(): Lenis {
  // Return existing instance if already initialized
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.2, // Scroll animation duration (lower = snappier)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
    orientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 2,
  });

  // Connect Lenis scroll events to GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Animation frame loop for Lenis
  function raf(time: number) {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);

  return lenisInstance;
}

/**
 * Get the current Lenis instance
 * Useful for manual scroll control
 *
 * @example
 * // Scroll to element
 * getLenis()?.scrollTo('#section');
 *
 * // Scroll to position
 * getLenis()?.scrollTo(500);
 *
 * // Stop scrolling (e.g., for modals)
 * getLenis()?.stop();
 * getLenis()?.start();
 */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Destroy Lenis instance and cleanup
 * Called automatically on Astro page transitions
 */
export function destroyLenis(): void {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}
