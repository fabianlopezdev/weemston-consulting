import { createClient } from '@sanity/client';
import type { SanityClient } from '@sanity/client';
import { env } from '@lib/env/validation';

/**
 * Sanity client configured for production use.
 *
 * PREVIEW MODE DECISION (2024-11):
 * We intentionally do NOT implement Sanity's Visual Editing / Presentation Tool preview.
 *
 * Why:
 * - Preview requires server-side rendering (SSR) or hybrid mode
 * - SSR means every page request hits the server, reducing performance
 * - Preview also requires React for the VisualEditing overlay component
 * - The complexity and performance trade-offs outweigh the benefits for this project
 *
 * Current workflow:
 * 1. Editor makes changes in Sanity Studio
 * 2. Editor clicks "Publish"
 * 3. Site rebuilds with new content (via webhook or manual deploy)
 * 4. Editor sees published changes on live site
 *
 * If preview is needed in the future:
 * - Change astro.config.mjs output to 'hybrid' or 'server'
 * - Install @astrojs/react, react, react-dom
 * - Add VisualEditing component to layout
 * - Create loadQuery helper that switches between published/draft based on URL param
 * - Configure Sanity Studio's Presentation Tool
 *
 * References:
 * - https://www.sanity.io/docs/visual-editing/configuring-the-presentation-tool
 * - https://islandwebdesign.net/blog/sanity-and-astro-visual-editor-tutorial/
 */
export const client: SanityClient = createClient({
  projectId: env.PUBLIC_SANITY_PROJECT_ID,
  dataset: env.PUBLIC_SANITY_DATASET,
  apiVersion: env.PUBLIC_SANITY_API_VERSION,
  useCdn: import.meta.env.PROD,
  perspective: 'published',
  token: env.SANITY_API_TOKEN,
});
