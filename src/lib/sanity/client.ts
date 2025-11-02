import { createClient } from '@sanity/client';
import type { SanityClient } from '@sanity/client';
import { env } from '@lib/env/validation';

export const client: SanityClient = createClient({
  projectId: env.PUBLIC_SANITY_PROJECT_ID,
  dataset: env.PUBLIC_SANITY_DATASET,
  apiVersion: env.PUBLIC_SANITY_API_VERSION,
  useCdn: import.meta.env.PROD,
  perspective: 'published',
  token: env.SANITY_API_TOKEN,
});

export const previewClient: SanityClient = createClient({
  projectId: env.PUBLIC_SANITY_PROJECT_ID,
  dataset: env.PUBLIC_SANITY_DATASET,
  apiVersion: env.PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  perspective: 'previewDrafts',
  token: env.SANITY_API_TOKEN,
});
