import { defineMiddleware } from 'astro:middleware';
import { getLanguageFromUrl, type Language } from '@lib/i18n/config';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, locals } = context;

  // Detect language from URL
  const lang = getLanguageFromUrl(url);

  // Make language available to all pages via locals
  locals.lang = lang;

  // Optional: Redirect root to default language if needed
  // Uncomment if you want /en/ instead of /
  // if (url.pathname === '/' && !isDefaultLanguage(lang)) {
  //   return context.redirect(`/${defaultLanguage}/`);
  // }

  return next();
});

// Type augmentation for locals
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace App {
    interface Locals {
      lang: Language;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */
