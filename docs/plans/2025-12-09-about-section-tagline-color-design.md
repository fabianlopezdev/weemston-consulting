# About Section Tagline Color Control Design

**Date:** 2025-12-09
**Status:** Approved

## Overview

Add independent color control for the tagline in the About Us section, allowing users to set a different color for the tagline than the rest of the section text.

## Current State

The About section has:

- Background color selection (default, primary, secondary, accent, custom + shade)
- Section-wide text color selection (base vs contrast)
- Tagline currently inherits the section text color

## Proposed Changes

### 1. Sanity Schema Changes

**File:** `studio/schemas/objects/sections/aboutSection.ts`

Add three new fields to the `textSettings` fieldset, positioned after the `tagline` field:

```typescript
{
  name: 'taglineColorType',
  title: 'Tagline Color',
  type: 'string',
  fieldset: 'textSettings',
  options: {
    list: [
      { title: 'Default', value: 'default' },
      { title: 'Primary', value: 'primary' },
      { title: 'Secondary', value: 'secondary' },
      { title: 'Accent', value: 'accent' },
      { title: 'Custom', value: 'custom' },
    ],
  },
  initialValue: 'default',
}

{
  name: 'taglineColorShade',
  title: 'Tagline Color Shade',
  type: 'number',
  fieldset: 'textSettings',
  validation: (Rule) => Rule.min(0).max(100).integer(),
  components: {
    input: BackgroundShadeInput,
  },
  hidden: ({ parent }) =>
    parent?.taglineColorType === 'custom' ||
    parent?.taglineColorType === 'default',
}

{
  name: 'taglineCustomColor',
  title: 'Tagline Custom Color',
  type: 'simplerColor',
  fieldset: 'textSettings',
  hidden: ({ parent }) => parent?.taglineColorType !== 'custom',
}
```

### 2. Frontend Component Changes

**File:** `frontend/src/components/sections/AboutSection.astro`

**Color Resolution:**
Add tagline color resolution after background color resolution:

```typescript
const taglineColorValue =
  aboutSection.taglineColorType && aboutSection.taglineColorType !== 'default'
    ? resolveColorSelection(
        {
          colorType: aboutSection.taglineColorType,
          colorShade: aboutSection.taglineColorShade,
          customColor: aboutSection.taglineCustomColor,
        },
        siteColors
      )
    : null;
```

**CSS Variables:**
Add new CSS variable to the style object:

```typescript
style={{
  '--about-font-size': `${fontSize}rem`,
  '--about-bg': bgColorValue || 'transparent',
  '--about-text': textColorValue,
  '--tagline-color': taglineColorValue || 'inherit',
}}
```

**Styling:**
Update tagline wrapper to use the CSS variable:

```css
.tagline {
  color: var(--tagline-color, var(--about-text));
}
```

### 3. Type Definitions

Add to the About section type definition:

```typescript
taglineColorType?: 'default' | 'primary' | 'secondary' | 'accent' | 'custom';
taglineColorShade?: number;
taglineCustomColor?: { value: string };
```

### 4. Groq Query Update

Add fields to the Sanity query that fetches the About section:

```groq
"aboutSection": aboutSection {
  enabled,
  title,
  showTitle,
  tagline,
  taglineColorType,
  taglineColorShade,
  taglineCustomColor,
  description,
  // ... rest of fields
}
```

## Implementation Notes

### Color Fallback Behavior

- When `taglineColorType` is 'default' or unset → inherits section text color
- When set to a specific color → uses resolved color value
- Shade calculation: `lighten(baseColor, shade / 200)` (0-100% → 0-50% lighter)

### Highlight Behavior

Bold text in the tagline (`.highlight` class) will continue to use accent color for emphasis, maintaining visual hierarchy.

### Backwards Compatibility

All new fields are optional. Existing content will:

- Default to 'default' color type
- Inherit section text color
- Require no migration

## Files to Modify

1. `studio/schemas/objects/sections/aboutSection.ts` - Add three color fields
2. `frontend/src/components/sections/AboutSection.astro` - Add color resolution and CSS variable
3. `frontend/src/queries/homepage.ts` (or similar) - Add fields to Groq query

## Testing Checklist

- [ ] Verify color preview in Sanity studio shade slider
- [ ] Test all 5 color types (default, primary, secondary, accent, custom)
- [ ] Test shade variations (0%, 50%, 100%)
- [ ] Test custom color picker
- [ ] Verify 'default' option inherits section text color
- [ ] Confirm highlights still show accent color
- [ ] Test backwards compatibility with existing content
- [ ] Verify responsive behavior across breakpoints
