import { env } from '@lib/env/validation';

export function getAbsoluteUrl(path: string): string {
  const baseUrl = env.PUBLIC_SITE_URL.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

export function getCanonicalUrl(path: string): string {
  return getAbsoluteUrl(path);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function localizeUrl(path: string, locale: string): string {
  if (locale === 'en') return path;
  return `/${locale}${path}`;
}
