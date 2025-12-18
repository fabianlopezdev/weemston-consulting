# About Page Redesign

## Overview

Redesign the About page with 5 distinct sections, each with background mode selection (solid/gradient), following existing codebase patterns.

## Section Structure

1. **Hero Section** - Reuse `InternalPageHero` (same as Services/Approach)
2. **Bio Section** - Image left, founder info right
3. **Info Grid Section** - Flexible array of icon cards
4. **Global Perspective Section** - Full-width highlight
5. **Trusted By Section** - Client logos from case studies

---

## Section Details

### 1. Hero Section

Reuse existing `InternalPageHero` component with inline fields (same pattern as `servicesPage.ts`):
- Background mode (solid/gradient)
- Heading + highlight
- Divider + tagline
- All color customizations

### 2. Bio Section

**Content:**
- `bioImage` - Image with hotspot
- `bioLabel` - String (e.g., "Founder & Lead Consultant")
- `bioName` - String (e.g., "Jessica Weeman")
- `bioDescription` - Text (paragraph about the person)

**Colors:**
- Background mode (solid/gradient)
- Label color (colorType + shade + custom)
- Name color (colorType + shade + custom)
- Description color (base/muted/contrast)

**Layout:** Image left (flex: 5), content right (flex: 7). Decorative circles derived from site colors.

### 3. Info Grid Section

**Section-Level:**
- `infoGridTitle` - Optional section title
- `infoGridShowTitle` - Boolean toggle
- Background mode (solid/gradient)
- `infoCards` - Array of `aboutInfoCard` objects

**Card Object (`aboutInfoCard`):**
- `icon` - Type 'icon' (iconify picker)
- `iconColorType` + `iconColorShade` + `iconCustomColor`
- `title` - String
- `titleColorType` + `titleColorShade` + `titleCustomColor`
- `content` - Portable text (multiple paragraphs with formatting)

**Layout:** CSS Grid with `auto-fit, minmax(320px, 1fr)`

### 4. Global Perspective Section

**Content:**
- `globalIcon` - Type 'icon' (iconify picker)
- `globalTitle` - String
- `globalDescription` - Text

**Colors:**
- Background mode (solid/gradient)
- Icon color (colorType + shade + custom)
- Title color (colorType + shade + custom)
- Description color (base/muted/contrast)

**Layout:** Centered, max-width 900px, icon above title

### 5. Trusted By Section

**Content:**
- `trustedByTitle` - String
- `trustedByShowTitle` - Boolean
- `trustedByCaseStudies` - Array of references to caseStudy documents

**Colors:**
- Background mode (solid/gradient)
- Title color (colorType + shade + custom)

**Layout:** Centered title, logos in flex-wrap row

---

## Files to Create/Modify

### New Files

1. `studio/schemas/objects/aboutInfoCard.ts` - Card object for info grid
2. `frontend/src/components/sections/AboutBio.astro` - Bio section
3. `frontend/src/components/sections/AboutInfoGrid.astro` - Info grid section
4. `frontend/src/components/sections/AboutGlobal.astro` - Global highlight
5. `frontend/src/components/sections/AboutTrustedBy.astro` - Trusted by section

### Modified Files

1. `studio/schemas/singletons/aboutPage.ts` - Complete rewrite
2. `studio/schemas/index.ts` - Register new aboutInfoCard type
3. `frontend/src/pages/about.astro` - Use new components
4. `frontend/src/lib/sanity/queries.ts` - Update aboutPageQuery

---

## Schema Organization

**Fieldsets:**
- `seo` - SEO fields (collapsed)
- `ogImage` - Social preview (collapsed)
- `heroFields` - 🎯 Hero Section
- `bioFields` - 👤 Bio Section
- `infoGridFields` - 📋 Info Grid Section
- `globalFields` - 🌍 Global Perspective Section
- `trustedByFields` - 🤝 Trusted By Section

**Groups:** Hero, Bio, Info Grid, Global, Trusted By

---

## Implementation Order

1. Create `aboutInfoCard.ts` schema object
2. Register in `studio/schemas/index.ts`
3. Rewrite `aboutPage.ts` with all fields
4. Update `queries.ts` with new query
5. Create `AboutBio.astro` component
6. Create `AboutInfoGrid.astro` component
7. Create `AboutGlobal.astro` component
8. Create `AboutTrustedBy.astro` component
9. Update `about.astro` page to use new components
