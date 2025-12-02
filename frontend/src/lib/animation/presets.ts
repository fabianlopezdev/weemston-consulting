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
  const accentColors = GRADIENT_PRESETS.accentOnLight;
  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    const split = new SplitText(el, { type: 'lines' });

    (split.lines as HTMLElement[]).forEach((line) => {
      // Apply gradient styles to the line (for non-highlighted text)
      // Also ensure line divs are block-level and full width for centered text
      Object.assign(line.style, {
        display: 'block',
        width: '100%',
        background: `linear-gradient(to right, ${colors.revealed} 50%, ${colors.hidden} 50%)`,
        backgroundSize: '200% 100%',
        backgroundPositionX: '100%',
        color: 'transparent',
        backgroundClip: 'text',
        webkitBackgroundClip: 'text',
      });

      // Find and style highlight spans within this line
      const highlights = line.querySelectorAll('.highlight');
      highlights.forEach((highlight: Element) => {
        const highlightEl = highlight as HTMLElement;
        Object.assign(highlightEl.style, {
          background: `linear-gradient(to right, ${accentColors.revealed} 50%, ${accentColors.hidden} 50%)`,
          backgroundSize: '200% 100%',
          backgroundPositionX: '100%',
          color: 'transparent',
          backgroundClip: 'text',
          webkitBackgroundClip: 'text',
        });
      });

      // Create shared scroll trigger for the line
      const scrollTriggerConfig = {
        trigger: line,
        scrub,
        start,
        end,
        markers: ANIMATION_CONFIG.scrollTrigger.markers,
      };

      // Animate the line
      gsap.to(line, {
        backgroundPositionX: 0,
        ease: ANIMATION_CONFIG.ease.smooth,
        scrollTrigger: scrollTriggerConfig,
      });

      // Animate highlights in sync with the line
      if (highlights.length > 0) {
        gsap.to(highlights, {
          backgroundPositionX: 0,
          ease: ANIMATION_CONFIG.ease.smooth,
          scrollTrigger: { ...scrollTriggerConfig },
        });
      }
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

  // Set initial theme based on current scroll position
  // Check if we're currently inside any dark element
  const headerRect = header.getBoundingClientRect();
  const headerBottom = headerRect.bottom;

  let isOverDarkElement = false;
  darkElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    // Check if header overlaps with this element
    if (rect.top <= headerBottom && rect.bottom >= 0) {
      isOverDarkElement = true;
    }
  });

  console.log('[Header Theme Debug]', {
    headerBottom,
    darkElementsCount: darkElements.length,
    isOverDarkElement,
    currentTheme: header.getAttribute('data-theme'),
    settingTo: isOverDarkElement ? 'light' : 'dark',
  });

  header.setAttribute('data-theme', isOverDarkElement ? 'light' : 'dark');
}

/**
 * Section Contract Animation
 *
 * Creates a clip-path contraction effect - the inverse of createHeroReveal().
 * The section contracts from full-width to inset/rounded as user scrolls.
 *
 * @param sectionSelector - CSS selector for the section
 * @param options - Configuration options
 *
 * @example
 * // Basic usage
 * createSectionContract('.testimonials-section');
 *
 * // With options
 * createSectionContract('.my-section', {
 *   start: 'top top',
 *   end: 'bottom center',
 * });
 */
export function createSectionContract(
  sectionSelector: string,
  options: {
    /** Override scrub value (default: 1) */
    scrub?: number;
    /** Override trigger start position */
    start?: string;
    /** Override trigger end position */
    end?: string;
  } = {}
): void {
  const {
    scrub = ANIMATION_CONFIG.scrollTrigger.scrub,
    start: _start = 'top bottom', // Start when section enters viewport
    end = 'bottom top', // End when section leaves viewport
  } = options;
  void _start; // Suppress unused variable warning

  const section = document.querySelector(sectionSelector) as HTMLElement;
  if (!section) return;

  // Use ScrollTrigger with onUpdate to directly set clip-path
  ScrollTrigger.create({
    trigger: section,
    scrub,
    start: '25% center', // Start when 25% of section passes viewport center
    end,
    markers: ANIMATION_CONFIG.scrollTrigger.markers,
    onUpdate: (self) => {
      const progress = self.progress;
      const clipValue = progress * 2; // 0vw to 2vw
      const radiusValue = progress * 1.5; // 0rem to 1.5rem
      // inset(top right bottom left) - top stays 0, only horizontal (left/right) and bottom shrink
      section.style.clipPath = `inset(0 ${clipValue}vw ${clipValue}vw ${clipValue}vw round 0 0 ${radiusValue}rem ${radiusValue}rem)`;
    },
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
