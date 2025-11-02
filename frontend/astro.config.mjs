import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://example.com',
  output: 'static',
  adapter: node({
    mode: 'standalone',
  }),
  i18n: {
    defaultLocale: 'en',
    locales: ['en'], // Add more: ['en', 'es', 'fr']
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
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
  vite: {
    ssr: {
      noExternal: ['@sanity/client', '@sanity/image-url'],
    },
  },
  security: {
    checkOrigin: true,
  },
});
