# Architecture Documentation

This document explains the technical architecture, design decisions, and patterns used in this boilerplate.

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Architecture Overview](#architecture-overview)
3. [Design Decisions](#design-decisions)
4. [Internationalization Strategy](#internationalization-strategy)
5. [Content Management](#content-management)
6. [Styling Architecture](#styling-architecture)
7. [Testing Strategy](#testing-strategy)
8. [Security Measures](#security-measures)
9. [Performance Optimizations](#performance-optimizations)
10. [Accessibility Implementation](#accessibility-implementation)

## Technology Stack

### Core Framework: Astro 5.x

**Why Astro?**

- **Zero JavaScript by default:** Ships only necessary JavaScript
- **Component Islands:** Selective hydration for interactive components
- **Built-in i18n:** Native routing and content collection support
- **Flexible:** Use React, Vue, Svelte, or no framework at all
- **Performance-first:** Optimized for Core Web Vitals
- **Static + Dynamic:** Hybrid rendering with SSR when needed

**Configuration:**

- **Output mode:** Hybrid (static + SSR)
- **Adapter:** Node.js for API routes and server-rendered pages
- **Build:** Static HTML with minimal JavaScript

### CMS: Sanity v3

**Why Sanity?**

- **Structured content:** Portable Text for rich content
- **Real-time collaboration:** Multiple editors can work simultaneously
- **Flexible schema:** Customizable content models
- **Developer-friendly:** GraphQL & GROQ query languages
- **Asset pipeline:** Built-in image optimization
- **Localization:** Both document and field-level i18n support

### Package Manager: Bun

**Why Bun?**

- **Performance:** 3x+ faster than npm/pnpm
- **All-in-one:** Package manager, test runner, bundler
- **Drop-in replacement:** Compatible with Node.js
- **Native TypeScript:** No transpilation needed for scripts
- **Built-in test runner:** Vitest compatibility

### TypeScript

**Configuration:**

- **Strict mode enabled:** All strict checks active
- **Path aliases:** Clean imports with `@` prefixes
- **No `any` types:** Enforced via ESLint
- **Full type safety:** From database to UI

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌────────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │   HTML     │  │  CSS (light- │  │ Minimal JS         │  │
│  │   (SSG)    │  │  dark mode)  │  │ (progressive       │  │
│  │            │  │              │  │  enhancement)      │  │
│  └────────────┘  └──────────────┘  └────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                    HTTP Requests
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Astro Application                         │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Middleware (Language Detection)                    │    │
│  └─────────────────────────────────────────────────────┘    │
│                            │                                 │
│  ┌─────────────────────────┴────────────────────────────┐   │
│  │                                                       │   │
│  ▼                                          ▼            │   │
│  ┌──────────────────┐              ┌──────────────────┐ │   │
│  │  Static Pages    │              │   API Routes     │ │   │
│  │  (Pre-rendered)  │              │   (SSR)          │ │   │
│  │                  │              │  - Contact form  │ │   │
│  │  - Home          │              │  - Dynamic data  │ │   │
│  │  - Blog          │              └──────────────────┘ │   │
│  │  - Services      │                                    │   │
│  │  - Case Studies  │                                    │   │
│  └──────────────────┘                                    │   │
└───────────────────────────────────────────────────────────┘ │
                            │                                  │
                 Fetches content at build                      │
                            │                                  │
                            ▼                                  │
┌─────────────────────────────────────────────────────────────┐
│                    Sanity CMS                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Content Lake (GROQ Queries)                         │   │
│  │  - Pages (document-level i18n)                       │   │
│  │  - Blog Posts (document-level i18n)                  │   │
│  │  - Services (document-level i18n)                    │   │
│  │  - Case Studies (document-level i18n)                │   │
│  │  - Site Settings (field-level i18n)                  │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Sanity Studio (Content Management UI)               │   │
│  │  - Visual editor                                      │   │
│  │  - Real-time collaboration                            │   │
│  │  - Asset management                                   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Design Decisions

### 1. Hybrid Rendering (Static + SSR)

**Decision:** Use Astro's hybrid mode instead of pure SSG or SSR.

**Rationale:**

- **Static by default:** Most pages are pre-rendered at build time for maximum performance
- **SSR when needed:** API routes and dynamic features use server-side rendering
- **Best of both worlds:** Performance of static + flexibility of dynamic

**Implementation:**

- Pages: Static generation (SSG)
- API routes: Server-side rendering (SSR)
- Contact form: Client-side JS + SSR API endpoint

### 2. Hybrid i18n Approach

**Decision:** Split translations between JSON files (UI) and Sanity CMS (content).

**Rationale:**

- **Performance:** JSON files are bundled, no API calls for UI strings
- **Type safety:** TypeScript ensures all translation keys exist
- **Content flexibility:** Editors can manage content without code changes
- **Clear separation:** Developers own UI strings, editors own content

**Trade-offs:**

- More complex setup initially
- Two systems to maintain
- ✅ Better performance, type safety, and editor experience

### 3. Document-level i18n for Content

**Decision:** Use separate Sanity documents per language instead of field-level i18n.

**Rationale:**

- **Easier for editors:** One document per language, no switching between fields
- **Better previews:** Each language document has its own preview
- **Flexible content:** Different content structure per language if needed
- **Simpler queries:** `language == $language` filter is straightforward

**Exception:** Site Settings use field-level i18n to avoid duplication.

### 4. Modern CSS with light-dark()

**Decision:** Use native CSS `light-dark()` function instead of JavaScript or CSS classes.

**Rationale:**

- **Zero JavaScript:** Respects user's system preference automatically
- **Future-proof:** Native CSS feature with growing browser support
- **Simpler code:** No theme switching logic needed
- **Performance:** Instant, no FOUC (Flash of Unstyled Content)

**Browser support:** Modern browsers (Safari 17.5+, Chrome 123+, Firefox 120+)

### 5. Bun as Package Manager

**Decision:** Mandate Bun over npm/pnpm/yarn.

**Rationale:**

- **Speed:** Significantly faster installations and script execution
- **Consistency:** Everyone uses the same tool
- **Modern:** Built for TypeScript and modern JavaScript
- **Simplicity:** One tool for packages, tests, and scripts

### 6. ESLint 9 Flat Config

**Decision:** Use ESLint 9's new flat config format.

**Rationale:**

- **Simpler:** Single config file, no extends/plugins complexity
- **Type-safe:** Better TypeScript support
- **Future-proof:** New standard going forward
- **Performance:** Faster than legacy config

## Internationalization Strategy

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    i18n System                               │
│                                                              │
│  ┌────────────────────────────┐  ┌──────────────────────┐  │
│  │    UI Strings (JSON)       │  │  Content (Sanity)    │  │
│  │                            │  │                      │  │
│  │  src/i18n/locales/         │  │  Document-level:     │  │
│  │  ├── en.json               │  │  - Pages             │  │
│  │  ├── es.json               │  │  - Blog Posts        │  │
│  │  └── fr.json               │  │  - Services          │  │
│  │                            │  │  - Case Studies      │  │
│  │  Used for:                 │  │                      │  │
│  │  - Navigation              │  │  Field-level:        │  │
│  │  - Forms                   │  │  - Site Settings     │  │
│  │  - Error messages          │  │                      │  │
│  │  - ARIA labels             │  │  Managed by editors  │  │
│  │  - Common UI elements      │  │  in Sanity Studio    │  │
│  └────────────────────────────┘  └──────────────────────┘  │
│              │                              │               │
│              └──────────────┬───────────────┘               │
│                             │                               │
│                  ┌──────────▼──────────┐                    │
│                  │   Middleware        │                    │
│                  │  (Language detect)  │                    │
│                  └─────────────────────┘                    │
└─────────────────────────────────────────────────────────────┘
```

### URL Structure

```
/                    → English (default)
/es                  → Spanish
/fr                  → French
/es/blog             → Spanish blog
/fr/services/web     → French web service
```

### Language Detection

1. **URL path:** Check first segment (`/es/`, `/fr/`)
2. **Fallback:** Use default language if not specified
3. **Stored:** In `Astro.locals.lang` for all components

### Translation Function

```typescript
// Type-safe translation
import { createTranslator } from '@lib/i18n/translations';

const t = createTranslator(lang);
const text = t('nav.home'); // ✅ TypeScript checks key exists
const invalid = t('invalid.key'); // ❌ TypeScript error
```

### Sanity Content Queries

```groq
// Document-level: Filter by language
*[_type == "page" && slug.current == $slug && language == $language][0]

// Field-level: Access localized field
*[_type == "siteSettings"][0] {
  footerText {
    en,
    es,
    fr
  }
}
```

## Content Management

### Content Architecture

```
Sanity Studio
├── Documents (document-level i18n)
│   ├── Pages
│   ├── Blog Posts
│   ├── Services
│   ├── Case Studies
│   └── Legal Pages
│
├── Singletons (field-level i18n)
│   └── Site Settings
│
├── Supporting Documents
│   ├── Authors
│   └── Categories
│
└── Objects (reusable)
    ├── SEO
    ├── Media (Image/Video)
    ├── Portable Text
    └── Links
```

### GROQ Query Patterns

```groq
// Single document
*[_type == "page" && slug.current == $slug && language == $language][0]

// List with references
*[_type == "blogPost" && language == $language] | order(publishedAt desc) {
  _id,
  title,
  slug,
  author-> { name, image },
  categories[]-> { title, slug }
}

// Count query
count(*[_type == "blogPost" && language == $language])
```

## Styling Architecture

### CSS Custom Properties

```css
:root {
  color-scheme: light dark;

  /* Colors with light-dark() */
  --color-text: light-dark(#1a1a1a, #f5f5f5);
  --color-background: light-dark(#ffffff, #1a1a1a);

  /* Spacing */
  --space-xs: clamp(0.5rem, 2vw, 0.75rem);

  /* Typography */
  --font-size-base: clamp(1rem, 2.5vw, 1.125rem);
}
```

### Design Token System

- **Colors:** Semantic naming (primary, secondary, accent)
- **Spacing:** Consistent scale (2xs → 3xl)
- **Typography:** Fluid sizing with `clamp()`
- **Transitions:** Consistent timing functions
- **Borders:** Standardized widths and radii

### CSS Methodology

- **Logical properties:** `margin-block-end` instead of `margin-bottom`
- **Container queries:** For component-based responsive design
- **Modern selectors:** `:has()`, `:where()`, `:is()`
- **No preprocessor:** Native CSS is powerful enough

## Testing Strategy

### Three-Layer Approach

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 1: Unit Tests (Vitest)                               │
│  - Utilities and functions                                   │
│  - Translation system                                        │
│  - Form validation logic                                     │
│  - Environment validation                                    │
│  Coverage target: 80%+                                       │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│  Layer 2: E2E Tests (Playwright + axe-core)                 │
│  - User flows and interactions                               │
│  - Automated accessibility scanning                          │
│  - Cross-browser testing                                     │
│  - Keyboard navigation                                       │
│  - Form submissions                                          │
│  Coverage: Critical user paths                               │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│  Layer 3: Performance Tests (Unlighthouse)                  │
│  - Lighthouse audits                                         │
│  - Performance budgets                                       │
│  - Accessibility scoring                                     │
│  - SEO validation                                            │
│  Target: 90+ across all metrics                              │
└─────────────────────────────────────────────────────────────┘
```

### Automated Accessibility

Every E2E test includes axe-core scanning:

```typescript
const results = await new AxeBuilder({ page }).withTags(['wcag2aa']).analyze();

expect(results.violations).toEqual([]);
```

## Security Measures

### 1. Form Bot Protection

**Dual-layer protection:**

```typescript
// Honeypot: Hidden field
<input type="text" name="website" style="display:none" />

// Time-trap: Minimum time to fill form
const timestamp = Date.now();
// Server validates: (now - timestamp) > 3000ms
```

### 2. Secrets Detection

Pre-commit hook scans for:

- API keys with values (not just variable names)
- Access tokens
- Private keys
- Database credentials

**Excluded files:**

- `.env.example` (template only)
- `package.json` (package names)
- Validation schemas (variable names)

### 3. Environment Validation

Zod schema validates all environment variables at startup:

```typescript
const envSchema = z.object({
  PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  SANITY_API_TOKEN: z.string().min(1),
  // ... all required variables
});
```

### 4. Content Security Policy

Configure CSP headers in your deployment platform:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://cdn.sanity.io;
  font-src 'self';
  connect-src 'self' https://api.sanity.io;
```

## Performance Optimizations

### 1. Static Generation

- All content pages pre-rendered at build time
- No server round-trips for page content
- CDN-friendly (can be edge-cached)

### 2. Image Optimization

```typescript
// Sanity image pipeline
const imageBuilder = imageUrlBuilder(client)
  .image(source)
  .width(800)
  .format('webp')
  .auto('format')
  .quality(80);
```

- Automatic WebP/AVIF conversion
- Responsive images with srcset
- Lazy loading by default
- DPR-aware sizing

### 3. Code Splitting

- Astro automatically splits code per route
- Minimal JavaScript shipped
- No framework runtime (pure HTML/CSS)

### 4. CSS Optimization

- No runtime CSS-in-JS overhead
- Modern CSS (smaller than preprocessed)
- Scoped styles (no global pollution)
- Automatic critical CSS inlining

### 5. Performance Budgets

Enforced via Unlighthouse:

| Metric                   | Target   |
| ------------------------ | -------- |
| Total Page Size          | < 700 KB |
| JavaScript               | < 250 KB |
| Time to Interactive      | < 3s     |
| Largest Contentful Paint | < 2.5s   |

## Accessibility Implementation

### WCAG 2.1 AA Compliance

**Semantic HTML:**

```html
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main id="main-content">
  <!-- Page content -->
</main>

<footer role="contentinfo">
  <!-- Footer content -->
</footer>
```

**Skip Links:**

```html
<a href="#main-content" class="skip-link"> Skip to main content </a>
```

**ARIA Labels:**

```html
<form aria-label="Contact form">
  <label for="name">Name</label>
  <input id="name" type="text" required />

  <button type="submit">
    Submit
    <span class="sr-only">contact form</span>
  </button>
</form>
```

**Keyboard Navigation:**

- All interactive elements focusable
- Visible focus indicators
- Logical tab order
- Escape key closes modals

**Color Contrast:**

- All text meets WCAG AA standards
- Tested with axe-core
- Enforced in E2E tests

### Accessibility Testing

**Automated:**

- axe-core in every E2E test
- Lighthouse accessibility audits
- HTML validation

**Manual (required):**

- Screen reader testing (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation
- Zoom testing (up to 200%)
- High contrast mode

## Deployment Architecture

### Recommended: Vercel

```
Developer → Git Push → GitHub → Vercel
                                   ↓
                            Build Process:
                            - bun install
                            - bun build
                            - Deploy to CDN
                                   ↓
                            Production:
                            - Static files on CDN
                            - API routes on Edge
                            - Auto-scaling
```

### Environment Variables

```
Production:   PUBLIC_SITE_URL=https://example.com
Staging:      PUBLIC_SITE_URL=https://staging.example.com
Development:  PUBLIC_SITE_URL=http://localhost:4321
```

### Sanity Studio

Deploy separately to Sanity:

```bash
bun sanity:build
bun sanity:deploy
```

Access at: `https://your-project.sanity.studio/`

## Maintenance & Updates

### Dependency Updates

**Automated with Renovate:**

- Daily checks for updates
- Grouped PRs by update type
- Auto-merge for patch updates
- Security updates prioritized

**Manual review needed for:**

- Major version updates
- Breaking changes
- Framework updates (Astro, Sanity)

### Monitoring

Recommended monitoring:

- **Performance:** Lighthouse CI, Vercel Analytics
- **Errors:** Sentry, LogRocket
- **Uptime:** UptimeRobot, Pingdom
- **Analytics:** Plausible, Google Analytics

### Backup Strategy

- **Code:** Git repository (GitHub)
- **Content:** Sanity automatic backups (daily)
- **Environment:** Document all environment variables
- **Media:** Sanity asset CDN (permanent)

## Future Enhancements

Potential improvements for future iterations:

1. **Portable Text Rendering:** Add component for rendering Sanity portable text
2. **Image Gallery Component:** Lightbox for case study galleries
3. **Search Functionality:** Algolia or Pagefind integration
4. **Newsletter Signup:** Email capture with validation
5. **Related Content:** Automatic related posts/services
6. **Share Buttons:** Social media sharing
7. **Print Styles:** Optimized print CSS
8. **Offline Support:** Service worker for PWA
9. **Animation Library:** Framer Motion or similar
10. **A/B Testing:** Feature flags and experiments

---

**Last Updated:** 2025-01-02
**Version:** 1.0.0
**Maintained by:** Fabulous Apps
