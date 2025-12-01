/**
 * Centralized GSAP Animation Configuration
 *
 * This file contains all shared animation constants and presets.
 * Override any value by spreading the config and adding your own values.
 *
 * @example
 * // Use defaults
 * gsap.to(el, { scrollTrigger: ANIMATION_CONFIG.scrollTrigger });
 *
 * // Override specific values
 * gsap.to(el, { scrollTrigger: { ...ANIMATION_CONFIG.scrollTrigger, scrub: 0.5 } });
 */

export const ANIMATION_CONFIG = {
  /**
   * Default ScrollTrigger settings
   * - scrub: 1 = animation follows scroll with 1 second delay (smooth feel)
   * - markers: false = hide debug markers in production
   */
  scrollTrigger: {
    scrub: 1,
    markers: false,
  },

  /**
   * Common trigger positions for different animation styles
   */
  triggers: {
    /**
     * Hero-style: Animation starts when element hits top of viewport
     * Good for: Hero sections, full-screen reveals
     */
    heroStyle: {
      start: 'top top',
      end: 'bottom center',
    },

    /**
     * Content-style: Animation starts as element approaches viewport
     * Good for: Text reveals, content sections, cards
     */
    contentStyle: {
      start: 'top bottom-=20%',
      end: 'bottom bottom-=10%',
    },

    /**
     * Fade-in style: Animation starts earlier for subtle entrance
     * Good for: Images, cards, staggered content
     */
    fadeInStyle: {
      start: 'top bottom-=10%',
      end: 'top center',
    },
  },

  /**
   * Common easing functions
   */
  ease: {
    /** For scroll-synced animations (linear, no easing) */
    smooth: 'none',
    /** For entrance animations */
    reveal: 'power2.out',
    /** For exit animations */
    exit: 'power2.in',
    /** For bouncy/playful animations */
    bounce: 'back.out(1.7)',
  },
} as const;

/**
 * Gradient presets for text reveal animations
 */
export const GRADIENT_PRESETS = {
  /**
   * Dark text revealing from washed-out primary (for light backgrounds)
   */
  darkOnLight: {
    revealed: 'rgb(37, 37, 37)',
    hidden: 'color-mix(in srgb, var(--color-primary), rgb(180, 180, 180) 20%)',
  },

  /**
   * Accent text revealing from washed-out accent (for highlighted words)
   */
  accentOnLight: {
    revealed: 'var(--color-accent)',
    hidden: 'color-mix(in srgb, var(--color-accent), rgb(200, 200, 200) 60%)',
  },

  /**
   * White text revealing from dark gray (for dark backgrounds)
   */
  lightOnDark: {
    revealed: 'rgb(255, 255, 255)',
    hidden: 'rgb(37, 37, 37)',
  },
} as const;

/**
 * Type exports for TypeScript support
 */
export type TriggerStyle = keyof typeof ANIMATION_CONFIG.triggers;
export type EaseType = keyof typeof ANIMATION_CONFIG.ease;
export type GradientPreset = keyof typeof GRADIENT_PRESETS;
