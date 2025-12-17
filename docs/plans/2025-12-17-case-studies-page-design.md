# Case Studies Page Enhancement - Design Document

## Overview

Enhance the case studies page with a hero section, intro section, and service-based filtering. Content is CMS-editable via a new Sanity singleton.

## Requirements

1. **Hero Section** - Heading, tagline, divider (using existing `InternalPageHero` component)
2. **Intro Section** - Title and description text (CMS-editable)
3. **Filter Bar** - "All" + service buttons (pill-style, CMS-configurable colors)
4. **Filtered Grid** - Only show case studies with a `relatedService` assigned

## Sanity Schema: `caseStudiesPage` Singleton

### Hero Section Fields

- `heroHeading` (string) - Main heading text
- `heroHeadingHighlight` (string, optional) - Text within heading to italicize
- `heroHighlightColorType` ('primary' | 'secondary' | 'accent' | 'custom')
- `heroHighlightColorShade` (number, 0-100)
- `heroHighlightCustomColor` (simplerColor)
- `heroShowDivider` (boolean, default: true)
- `heroDividerColorType` ('primary' | 'secondary' | 'accent' | 'custom')
- `heroDividerColorShade` (number)
- `heroDividerCustomColor` (simplerColor)
- `heroTagline` (string, optional)
- `heroTaglineColor` ('base' | 'muted' | 'contrast')
- `heroBackgroundColorType` ('primary' | 'secondary' | 'accent' | 'custom')
- `heroBackgroundColorShade` (number, default: 90)
- `heroBackgroundCustomColor` (simplerColor)

### Intro Section Fields

- `introTitle` (string) - Section title
- `introDescription` (text) - Description paragraph
- `introTitleColorType` ('primary' | 'secondary' | 'accent' | 'custom')
- `introTitleColorShade` (number)
- `introTitleCustomColor` (simplerColor)
- `introDescriptionColor` ('base' | 'muted' | 'contrast')

### Filter Section Fields

- `filterActiveColorType` ('primary' | 'secondary' | 'accent' | 'custom')
- `filterActiveColorShade` (number)
- `filterActiveCustomColor` (simplerColor)
- `filterActiveTextColor` ('base' | 'muted' | 'contrast')
- `filterInactiveColorType` ('primary' | 'secondary' | 'accent' | 'custom')
- `filterInactiveColorShade` (number)
- `filterInactiveCustomColor` (simplerColor)
- `filterInactiveTextColor` ('base' | 'muted' | 'contrast')

### SEO Fields

- `metaDescription` (text)
- `ogImage` (image)

## Query Updates

### Update `allCaseStudiesQuery`

Add `relatedService` reference and filter to only include case studies with a service:

```groq
*[_type == "caseStudy" && language == $language && defined(relatedService)] | order(_createdAt desc) {
  // ... existing caseStudyProjection fields ...
  relatedService-> {
    _id,
    title
  }
}
```

### New `caseStudiesPageQuery`

```groq
*[_type == "caseStudiesPage"][0] {
  // Hero
  heroHeading,
  heroHeadingHighlight,
  heroHighlightColorType,
  heroHighlightColorShade,
  heroHighlightCustomColor { label, value },
  heroShowDivider,
  heroDividerColorType,
  heroDividerColorShade,
  heroDividerCustomColor { label, value },
  heroTagline,
  heroTaglineColor,
  heroBackgroundColorType,
  heroBackgroundColorShade,
  heroBackgroundCustomColor { label, value },
  // Intro
  introTitle,
  introDescription,
  introTitleColorType,
  introTitleColorShade,
  introTitleCustomColor { label, value },
  introDescriptionColor,
  // Filter
  filterActiveColorType,
  filterActiveColorShade,
  filterActiveCustomColor { label, value },
  filterActiveTextColor,
  filterInactiveColorType,
  filterInactiveColorShade,
  filterInactiveCustomColor { label, value },
  filterInactiveTextColor,
  // SEO
  metaDescription,
  ogImage
}
```

### Services Query (for filter options)

```groq
*[_type == "service" && language == $language] | order(title asc) {
  _id,
  title
}
```

## Frontend Page Structure

```astro
<BaseLayout title={page.metaDescription || t('seo.case_studies_title')}>
  <!-- Hero -->
  <InternalPageHero
    heading={page.heroHeading}
    headingHighlight={page.heroHeadingHighlight}
    ...
    all
    hero
    color
    props
    ...
  />

  <!-- Intro Section -->
  <section class="case-studies-intro">
    <div class="container">
      <h2 class="intro-title">{page.introTitle}</h2>
      <p class="intro-description">{page.introDescription}</p>
    </div>
  </section>

  <!-- Filter Bar -->
  <div class="filter-bar" style={filterCssVars}>
    <div class="container">
      <div class="filter-buttons">
        <button data-filter="all" class="filter-btn active">All</button>
        {
          services.map((service) => (
            <button data-filter={service._id} class="filter-btn">
              {service.title}
            </button>
          ))
        }
      </div>
    </div>
  </div>

  <!-- Case Studies Grid -->
  <section class="case-studies-content">
    <div class="container">
      <div class="case-studies-grid" data-animate="case-study-grid">
        {
          caseStudies.map((cs) => (
            <div data-service-id={cs.relatedService._id}>
              <CaseStudyCard ... />
            </div>
          ))
        }
      </div>
    </div>
  </section>
</BaseLayout>
```

## Filter Button Styling

**CSS Variables from CMS:**

- `--filter-active-bg` - Active button background
- `--filter-active-text` - Active button text color
- `--filter-inactive-border` - Inactive button border
- `--filter-inactive-text` - Inactive button text color

**Button Styles:**

```css
.filter-btn {
  padding-inline: var(--space-md);
  padding-block: var(--space-sm);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-sm);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  transition: all var(--transition-base);
  cursor: pointer;

  /* Inactive state */
  background: transparent;
  border: 1px solid var(--filter-inactive-border);
  color: var(--filter-inactive-text);
}

.filter-btn.active,
.filter-btn:hover {
  background: var(--filter-active-bg);
  border-color: var(--filter-active-bg);
  color: var(--filter-active-text);
}

/* Horizontal scroll on mobile */
.filter-buttons {
  display: flex;
  gap: var(--space-sm);
  overflow-x: auto;
  padding-block-end: var(--space-sm);
  -webkit-overflow-scrolling: touch;
}
```

## Filter JavaScript Logic

```javascript
setupAnimationLifecycle(() => {
  const filterButtons = document.querySelectorAll('[data-filter]');
  const cardWrappers = document.querySelectorAll('[data-service-id]');

  if (!filterButtons.length || !cardWrappers.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active state
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards with animation
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      cardWrappers.forEach((wrapper) => {
        const serviceId = wrapper.dataset.serviceId;
        const shouldShow = filter === 'all' || serviceId === filter;

        if (shouldShow) {
          wrapper.style.display = '';
          if (!prefersReducedMotion) {
            gsap.fromTo(
              wrapper,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
            );
          }
        } else {
          wrapper.style.display = 'none';
        }
      });
    });
  });
});
```

## Data Flow

1. Page fetches `caseStudiesPageQuery` for hero/intro/filter config
2. Page fetches `allCaseStudiesQuery` for case studies (filtered by `defined(relatedService)`)
3. Page fetches services for filter buttons
4. All case studies render initially (or only those with services if "All" selected)
5. JavaScript handles client-side filtering based on button clicks

## Key Decisions

- **Only case studies with `relatedService` appear** - Ensures clean filtering
- **All services shown in filter** - Even if no case studies linked yet
- **CMS-configurable filter colors** - Maximum flexibility for styling
- **Client-side filtering** - No page reload, smooth GSAP animations
- **Pill-style buttons** - Matches React design reference
