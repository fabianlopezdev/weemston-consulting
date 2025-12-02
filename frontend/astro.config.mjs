import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import icon from 'astro-icon';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables from .env file
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '.env');
let env = {};

try {
  const envFile = readFileSync(envPath, 'utf-8');
  envFile.split('\n').forEach((line) => {
    const match = line.match(/^([^=:#]+?)\s*=\s*(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      // Remove quotes if present
      value = value.replace(/^["'](.*)["']$/, '$1');
      env[key] = value;
    }
  });
} catch (error) {
  console.warn('Could not load .env file:', error.message);
}

// Merge with process.env (process.env takes precedence)
env = { ...env, ...process.env };

// https://astro.build/config
export default defineConfig({
  site: env.PUBLIC_SITE_URL || 'https://example.com',
  // TODO: Change back to 'static' when content is finalized
  output: 'server',
  adapter: netlify(),
  server: {
    open: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'], // Add more: ['en', 'es', 'fr']
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    icon(),
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET,
      apiVersion: env.PUBLIC_SANITY_API_VERSION || '2024-05-01',
      // TODO: Change back to `process.env.NODE_ENV === 'production'` for static builds
      useCdn: false,
      // Studio is hosted separately in the /studio workspace
    }),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          // Add more locales as needed
          // es: 'es',
          // fr: 'fr',
        },
      },
    }),
  ],
  security: {
    checkOrigin: true,
  },
});
