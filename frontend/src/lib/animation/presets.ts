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
 * Magnetic Repulsion Effect
 *
 * Creates a hover effect where elements push away from the cursor,
 * creating a magnetic repulsion feel. Great for buttons, badges, pills.
 *
 * @param selector - CSS selector for elements to apply the effect to
 * @param options - Configuration options
 *
 * @example
 * // Basic usage
 * createMagneticRepulsion('.badge');
 *
 * // With custom strength
 * createMagneticRepulsion('.pill', { strength: 10 });
 */
export function createMagneticRepulsion(
  selector: string,
  options: {
    /** Push strength in pixels (default: 6) */
    strength?: number;
    /** Duration of the push animation in seconds (default: 0.2) */
    duration?: number;
    /** Duration of the return animation in seconds (default: 0.3) */
    returnDuration?: number;
    /** Easing for push animation (default: 'power2.out') */
    ease?: string;
    /** Easing for return animation (default: 'back.out(1.7)') */
    returnEase?: string;
    /** Callback fired on mouseenter */
    onEnter?: (element: Element) => void;
    /** Callback fired on mouseleave */
    onLeave?: (element: Element) => void;
  } = {}
): void {
  const {
    strength = 6,
    duration = 0.2,
    returnDuration = 0.3,
    ease = 'power2.out',
    returnEase = 'back.out(1.7)',
    onEnter,
    onLeave,
  } = options;

  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    let baseX = 0;
    let baseY = 0;
    let rafId: number | null = null;
    let lastMouseX = 0;
    let lastMouseY = 0;

    element.addEventListener('mouseenter', () => {
      // Fire callback if provided
      onEnter?.(element);

      // Capture current GSAP position as base
      const gsapX = gsap.getProperty(element, 'x');
      const gsapY = gsap.getProperty(element, 'y');
      baseX = typeof gsapX === 'number' ? gsapX : 0;
      baseY = typeof gsapY === 'number' ? gsapY : 0;
    });

    element.addEventListener('mousemove', ((e: MouseEvent) => {
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;

      // Throttle with RAF
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate direction from cursor to element center
        const deltaX = centerX - lastMouseX;
        const deltaY = centerY - lastMouseY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance > 0) {
          // Normalize and apply repulsion (push away from cursor)
          const pushX = (deltaX / distance) * strength;
          const pushY = (deltaY / distance) * strength;

          gsap.to(element, {
            x: baseX + pushX,
            y: baseY + pushY,
            duration,
            ease,
            overwrite: true,
          });
        }

        rafId = null;
      });
    }) as EventListener);

    element.addEventListener('mouseleave', () => {
      // Fire callback if provided
      onLeave?.(element);

      // Cancel any pending RAF
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }

      // Return to base position with bouncy easing
      gsap.to(element, {
        x: baseX,
        y: baseY,
        duration: returnDuration,
        ease: returnEase,
        overwrite: true,
      });
    });
  });
}

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
 * Editorial Reveal Animation
 *
 * Creates a refined, typography-focused reveal where text appears
 * word-by-word or character-by-character with subtle vertical movement.
 * Designed for headings and featured text in an editorial context.
 *
 * @param selector - CSS selector for the text elements
 * @param options - Configuration options
 *
 * @example
 * // Basic word-by-word reveal
 * createEditorialReveal('.my-heading');
 *
 * // Character-by-character with custom timing
 * createEditorialReveal('.title', {
 *   splitType: 'chars',
 *   stagger: 0.02,
 *   duration: 0.4,
 * });
 */
export function createEditorialReveal(
  selector: string,
  options: {
    /** Split type: 'words' (default) or 'chars' for character animation */
    splitType?: 'words' | 'chars';
    /** Stagger delay between elements in seconds (default: 0.04) */
    stagger?: number;
    /** Duration per element in seconds (default: 0.6) */
    duration?: number;
    /** Starting Y offset as percentage (default: '100%') */
    y?: string;
    /** Easing function (default: 'power3.out') */
    ease?: string;
    /** Override trigger start position (default: 'top 75%') */
    start?: string;
  } = {}
): gsap.core.Timeline | null {
  const {
    splitType = 'words',
    stagger = 0.04,
    duration = 0.6,
    y = '100%',
    ease = 'power3.out',
    start = ANIMATION_CONFIG.triggers.editorialStyle?.start || 'top 75%',
  } = options;

  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return null;

  // Create a master timeline for all elements
  const masterTl = gsap.timeline();

  elements.forEach((el) => {
    const htmlEl = el as HTMLElement;

    // Split text into words or characters
    const split = new SplitText(htmlEl, { type: splitType });
    const items =
      splitType === 'words'
        ? (split.words as HTMLElement[])
        : (split.chars as HTMLElement[]);

    // Wrap each item for clip overflow
    items.forEach((item) => {
      const wrapper = document.createElement('span');
      wrapper.style.display = 'inline-block';
      wrapper.style.overflow = 'hidden';
      wrapper.style.verticalAlign = 'top';
      wrapper.style.paddingBottom = '0.1em'; // Prevent descender clipping
      wrapper.classList.add('editorial-word-wrapper');

      item.parentNode?.insertBefore(wrapper, item);
      wrapper.appendChild(item);

      // Set initial state on the item
      gsap.set(item, { y, opacity: 0 });
    });

    // Create timeline for this element
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: htmlEl,
        start,
        once: true,
        markers: ANIMATION_CONFIG.scrollTrigger.markers,
      },
    });

    // Animate items with stagger
    tl.to(items, {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease,
    });

    masterTl.add(tl, 0);
  });

  return masterTl;
}

/**
 * Staggered Entrance Animation
 *
 * Creates a choreographed entrance for multiple elements within a container.
 * Commonly used for lists, cards, and sequential content with configurable
 * direction and timing.
 *
 * @param selector - CSS selector for parent container(s)
 * @param childSelector - CSS selector for child elements to animate
 * @param options - Configuration options
 *
 * @example
 * // Basic list animation
 * createStaggeredEntrance('.my-list', 'li');
 *
 * // Horizontal slide with custom timing
 * createStaggeredEntrance('.card-grid', '.card', {
 *   x: 20,
 *   y: 0,
 *   stagger: 0.1,
 * });
 */
export function createStaggeredEntrance(
  selector: string,
  childSelector: string,
  options: {
    /** Stagger delay between children in seconds (default: 0.08) */
    stagger?: number;
    /** Animation duration per child in seconds (default: 0.5) */
    duration?: number;
    /** Starting Y offset in pixels (default: 15) */
    y?: number;
    /** Starting X offset in pixels (default: 0) */
    x?: number;
    /** Starting opacity (default: 0) */
    fromOpacity?: number;
    /** Easing function (default: 'power2.out') */
    ease?: string;
    /** Override trigger start position (default: 'top 75%') */
    start?: string;
  } = {}
): void {
  const {
    stagger = 0.08,
    duration = 0.5,
    y = 15,
    x = 0,
    fromOpacity = 0,
    ease = 'power2.out',
    start = ANIMATION_CONFIG.triggers.editorialStyle?.start || 'top 75%',
  } = options;

  const containers = document.querySelectorAll(selector);

  containers.forEach((container) => {
    const children = container.querySelectorAll(childSelector);
    if (children.length === 0) return;

    // Set initial states
    gsap.set(children, { opacity: fromOpacity, x, y });

    // Create timeline with scroll trigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start,
        once: true,
        markers: ANIMATION_CONFIG.scrollTrigger.markers,
      },
    });

    // Animate children with stagger
    tl.to(children, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      stagger,
      ease,
    });
  });
}
