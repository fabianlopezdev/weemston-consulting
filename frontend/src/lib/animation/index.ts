/**
 * Animation Library
 *
 * Centralized GSAP animation system for the site.
 *
 * @example
 * // In a component script:
 * import { setupAnimationLifecycle, createTextReveal } from '@lib/animation';
 *
 * setupAnimationLifecycle(() => {
 *   createTextReveal('.my-text');
 * });
 *
 * // For custom animations:
 * import { setupAnimationLifecycle, gsap, ANIMATION_CONFIG } from '@lib/animation';
 *
 * setupAnimationLifecycle(() => {
 *   gsap.to('.element', {
 *     rotation: 360,
 *     scrollTrigger: {
 *       ...ANIMATION_CONFIG.scrollTrigger,
 *       scrub: 0.5, // Override as needed
 *     },
 *   });
 * });
 */

// Configuration
export {
  ANIMATION_CONFIG,
  GRADIENT_PRESETS,
  type TriggerStyle,
  type EaseType,
  type GradientPreset,
} from './config';

// Utilities
export {
  initGSAP,
  cleanupAnimations,
  setupAnimationLifecycle,
  gsap,
  ScrollTrigger,
  SplitText,
  Draggable,
  InertiaPlugin,
} from './utils';

// Lenis smooth scrolling
export { initLenis, getLenis, destroyLenis } from './lenis';

// Presets
export {
  createTextReveal,
  createHeroReveal,
  createFadeIn,
  createSectionContract,
  createEditorialReveal,
  createStaggeredEntrance,
} from './presets';
