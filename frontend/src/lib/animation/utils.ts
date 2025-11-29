/**
 * GSAP Animation Utilities
 *
 * Provides centralized GSAP initialization, lifecycle management,
 * and cleanup functions for Astro page transitions.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Track if plugins have been registered
let registered = false;

/**
 * Initialize GSAP and register plugins (once)
 * Called automatically by setupAnimationLifecycle
 */
export function initGSAP(): void {
  if (registered) return;

  gsap.registerPlugin(ScrollTrigger, SplitText);
  registered = true;
}

/**
 * Cleanup all ScrollTrigger instances
 * Called automatically on Astro page transitions to prevent memory leaks
 */
export function cleanupAnimations(): void {
  ScrollTrigger.getAll().forEach((st) => st.kill());
  ScrollTrigger.refresh();
}

/**
 * Setup animation lifecycle with proper Astro integration
 *
 * Handles:
 * - GSAP plugin registration
 * - Initial page load
 * - Astro page transitions (cleanup + reinit)
 *
 * @param initFn - Function that creates your animations
 *
 * @example
 * setupAnimationLifecycle(() => {
 *   gsap.to('.element', { opacity: 1 });
 * });
 */
export function setupAnimationLifecycle(initFn: () => void): void {
  initGSAP();

  // Handle initial page load
  if (document.readyState === 'complete') {
    initFn();
  } else {
    document.addEventListener('DOMContentLoaded', initFn);
  }

  // Handle Astro page transitions
  document.addEventListener('astro:page-load', initFn);
  document.addEventListener('astro:before-swap', cleanupAnimations);
}

/**
 * Re-export gsap for convenience
 * Components can import gsap from this module for custom animations
 */
export { gsap, ScrollTrigger, SplitText };
