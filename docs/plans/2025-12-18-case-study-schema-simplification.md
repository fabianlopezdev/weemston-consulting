# Case Study Schema Simplification

## Overview

Reorganize the case study Sanity schema to improve content editor UX by:

1. Removing image/overlay fields (not used)
2. Moving all color controls to page level
3. Simplifying to two clear tabs: "Box" and "Case Study Details"

## Case Study Document Schema

**File:** `studio/schemas/documents/caseStudy.ts`

### Tab: Box

Fields for the grid box appearance:

- `clientLogo` - Image with alt text
- `logoVariant` - dark/light selection

### Tab: Case Study Details

Content fields:

- `client` - Client name (required)
- `tagline` - Optional tagline text
- `date` - Timeline string (e.g., "MARCH 2024 - PRESENT")
- `description` - Rich text (portableText)
- `contributionsTitle` - Section title (default: "KEY CONTRIBUTIONS")
- `contributions` - Array of text items
- `relatedService` - Reference to service
- `language` - i18n field

### Removed

- All `*Color`, `*ColorType`, `*ColorShade`, `*CustomColor` fields
- `mainImage` and all overlay fields
- `icon` and all icon color fields
- `contentBgColor*` fields

## Case Studies Page Schema

**File:** `studio/schemas/singletons/caseStudiesPage.ts`

### New Group: Box Styling

- `boxBgColorType`, `boxBgColorShade`, `boxBgCustomColor`
- `boxHoverBgColorType`, `boxHoverBgColorShade`, `boxHoverBgCustomColor`
- `tagColorType`, `tagColorShade`, `tagCustomColor`
- `ctaTextColor` (base/muted/contrast)

### New Group: Modal Styling

- `modalLeftBgColorType`, `modalLeftBgColorShade`, `modalLeftBgCustomColor`
- `modalBackdropColorType`, `modalBackdropColorShade`, `modalBackdropCustomColor`
- `modalClientNameColor` (base/muted/contrast)
- `modalDateColorType`, `modalDateColorShade`, `modalDateCustomColor`
- `modalDividerColorType`, `modalDividerColorShade`, `modalDividerCustomColor`
- `modalDescriptionColor` (base/muted/contrast)
- `modalContributionsTitleColorType`, `modalContributionsTitleColorShade`, `modalContributionsTitleCustomColor`
- `modalContributionsTextColor` (base/muted/contrast)
- `modalBulletColorType`, `modalBulletColorShade`, `modalBulletCustomColor`

## Frontend Updates

### Queries (`frontend/src/lib/sanity/queries.ts`)

Case study projection (simplified):

```groq
{
  _id,
  client,
  tagline,
  clientLogo { asset->, alt, hotspot, crop },
  logoVariant,
  date,
  description,
  contributionsTitle,
  contributions,
  relatedService->{ _id, title }
}
```

Page query adds all modal color fields.

### Components

`CaseStudyModal.astro` receives colors as props from page, applies uniformly to all case studies.

## Benefits

1. Content editors focus on content, not styling
2. Consistent design across all case studies
3. Schema reduced from ~600 lines to ~50 lines
4. Clear mental model: Box = grid appearance, Details = modal content
