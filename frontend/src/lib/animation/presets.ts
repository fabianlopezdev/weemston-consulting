/**
 * Reusable Animation Presets
 *
 * Pre-built animation functions for common patterns.
 * Use these for consistency, or write custom GSAP animations.
 */

import { gsap, SplitText, ScrollTrigger } from './utils';
import {
  ANIMATION_CONFIG,
  GRADIENT_PRESETS,
  type GradientPreset,
} from './config';

/**
 * Text Reveal Animation
 *
 * Creates a gradient-based text reveal effect where text appears
 * to be "painted" from left to right as the user scrolls.
 *
 * @param selector - CSS selector for the text elements
 * @param options - Configuration options
 *
 * @example
 * // Basic usage
 * createTextReveal('.about-section__paragraph');
 *
 * // With options
 * createTextReveal('.my-text', {
 *   gradient: 'lightOnDark',
 *   scrub: 0.5,
 * });
 */
export function createTextReveal(
  selector: string,
  options: {
    /** Gradient preset: 'darkOnLight' or 'lightOnDark' */
    gradient?: GradientPreset;
    /** Override scrub value (default: 1) */
    scrub?: number;
    /** Override trigger start position */
    start?: string;
    /** Override trigger end position */
    end?: string;
  } = {}
): void {
  const {
    gradient = 'darkOnLight',
    scrub = ANIMATION_CONFIG.scrollTrigger.scrub,
    start = ANIMATION_CONFIG.triggers.contentStyle.start,
    end = ANIMATION_CONFIG.triggers.contentStyle.end,
  } = options;

  const colors = GRADIENT_PRESETS[gradient];
  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    const split = new SplitText(el, { type: 'lines' });

    split.lines.forEach((line) => {
      // Apply gradient styles to the line
      Object.assign(line.style, {
        background: `linear-gradient(to right, ${colors.revealed} 50%, ${colors.hidden} 50%)`,
        backgroundSize: '200% 100%',
        backgroundPositionX: '100%',
        color: 'transparent',
        backgroundClip: 'text',
        webkitBackgroundClip: 'text',
      });

      gsap.to(line, {
        backgroundPositionX: 0,
        ease: ANIMATION_CONFIG.ease.smooth,
        scrollTrigger: {
          trigger: line,
          scrub,
          start,
          end,
          markers: ANIMATION_CONFIG.scrollTrigger.markers,
        },
      });
    });
  });
}

/**
 * Hero Reveal Animation
 *
 * Creates a clip-path expansion effect with background zoom.
 * The hero section expands from rounded/inset to full-screen as user scrolls.
 *
 * @param heroSelector - CSS selector for the hero section
 * @param bgSelector - CSS selector for the background element (optional)
 * @param options - Configuration options
 *
 * @example
 * // Basic usage
 * createHeroReveal('.hero', '.hero__background');
 *
 * // With options
 * createHeroReveal('.hero', '.hero__background', {
 *   finalScale: 1.2,
 *   scrub: 0.5,
 * });
 */
export function createHeroReveal(
  heroSelector: string,
  bgSelector?: string,
  options: {
    /** Final background scale (default: 1.15) */
    finalScale?: number;
    /** Override scrub value (default: 1) */
    scrub?: number;
    /** Override trigger start position */
    start?: string;
    /** Override trigger end position */
    end?: string;
  } = {}
): void {
  const {
    finalScale = 1.15,
    scrub = ANIMATION_CONFIG.scrollTrigger.scrub,
    start = ANIMATION_CONFIG.triggers.heroStyle.start,
    end = ANIMATION_CONFIG.triggers.heroStyle.end,
  } = options;

  const hero = document.querySelector(heroSelector) as HTMLElement;
  const bg = bgSelector
    ? (document.querySelector(bgSelector) as HTMLElement)
    : null;

  if (!hero) return;

  const sharedTrigger = {
    trigger: hero,
    scrub,
    start,
    end,
    markers: ANIMATION_CONFIG.scrollTrigger.markers,
  };

  // Animate clip-path: hero expands outward
  gsap.to(hero, {
    scrollTrigger: sharedTrigger,
    '--hero-clip': '0vw',
    '--hero-radius': '0rem',
  });

  // Background zoom with same timing
  if (bg) {
    gsap.to(bg, {
      scrollTrigger: { ...sharedTrigger },
      scale: finalScale,
    });
  }
}

/**
 * Fade In Animation
 *
 * Simple fade-in with optional upward movement.
 * Good for cards, images, and general content.
 *
 * @param selector - CSS selector for elements to animate
 * @param options - Configuration options
 *
 * @example
 * // Basic fade in
 * createFadeIn('.card');
 *
 * // With upward movement
 * createFadeIn('.card', { y: 50 });
 *
 * // Staggered animation
 * createFadeIn('.card', { stagger: 0.1 });
 */
export function createFadeIn(
  selector: string,
  options: {
    /** Starting Y offset in pixels (default: 30) */
    y?: number;
    /** Starting opacity (default: 0) */
    fromOpacity?: number;
    /** Stagger delay between elements (default: 0) */
    stagger?: number;
    /** Override scrub value (default: 1) */
    scrub?: number;
    /** Override trigger start position */
    start?: string;
    /** Override trigger end position */
    end?: string;
  } = {}
): void {
  const {
    y = 30,
    fromOpacity = 0,
    stagger = 0,
    scrub = ANIMATION_CONFIG.scrollTrigger.scrub,
    start = ANIMATION_CONFIG.triggers.fadeInStyle.start,
    end = ANIMATION_CONFIG.triggers.fadeInStyle.end,
  } = options;

  const elements = document.querySelectorAll(selector);

  elements.forEach((el, index) => {
    gsap.fromTo(
      el,
      {
        opacity: fromOpacity,
        y,
      },
      {
        opacity: 1,
        y: 0,
        ease: ANIMATION_CONFIG.ease.reveal,
        scrollTrigger: {
          trigger: el,
          scrub,
          start,
          end,
          markers: ANIMATION_CONFIG.scrollTrigger.markers,
        },
        delay: stagger * index,
      }
    );
  });
}

// Track elements that already have ScrollTriggers for header theme
const registeredDarkElements = new WeakSet<Element>();

/**
 * Register dark elements for header theme switching
 *
 * Creates ScrollTriggers for elements with dark backgrounds so the header
 * nav links change to white when overlapping them. Can be called multiple
 * times - will only create triggers for new elements.
 *
 * @param selector - CSS selector for dark elements (default: '[data-header-theme="dark"]')
 * @param headerSelector - CSS selector for the header element
 *
 * @example
 * // Register all elements with data-header-theme="dark"
 * registerDarkElements();
 *
 * // Register specific elements
 * registerDarkElements('.my-dark-section');
 */
export function registerDarkElements(
  selector: string = '[data-header-theme="dark"]',
  headerSelector: string = '.site-header'
): void {
  const header = document.querySelector(headerSelector) as HTMLElement;
  if (!header) return;

  const darkElements = document.querySelectorAll(selector);

  darkElements.forEach((element) => {
    // Skip if already registered
    if (registeredDarkElements.has(element)) return;
    registeredDarkElements.add(element);

    ScrollTrigger.create({
      trigger: element,
      // Start when element top meets viewport top (where sticky header is)
      start: 'top top',
      // End when element bottom meets viewport top
      end: 'bottom top',
      onEnter: () => header.setAttribute('data-theme', 'light'),
      onLeave: () => header.setAttribute('data-theme', 'dark'),
      onEnterBack: () => header.setAttribute('data-theme', 'light'),
      onLeaveBack: () => header.setAttribute('data-theme', 'dark'),
    });
  });
}

/**
 * Header Theme Switcher
 *
 * Automatically switches header nav link colors based on which sections
 * the header overlaps with. Uses ScrollTrigger for precise detection.
 *
 * Sections with dark backgrounds should have data-header-theme="dark"
 * to trigger light-colored nav links when the header overlaps them.
 *
 * @param headerSelector - CSS selector for the header element
 * @param options - Configuration options
 *
 * @example
 * // Basic usage
 * createHeaderThemeSwitcher('.site-header');
 *
 * // With custom dark section selector
 * createHeaderThemeSwitcher('.site-header', {
 *   darkSectionSelector: '.dark-section',
 * });
 */
export function createHeaderThemeSwitcher(
  headerSelector: string = '.site-header',
  options: {
    /** CSS selector for dark background sections */
    darkSectionSelector?: string;
  } = {}
): void {
  const { darkSectionSelector = '[data-header-theme="dark"]' } = options;

  // Register all dark elements found at this time
  registerDarkElements(darkSectionSelector, headerSelector);
}
