import type { Language } from './config';
import { supportedLanguages, localizeUrl, delocalizeUrl } from './config';
import { env } from '@lib/env/validation';

export interface AlternateLink {
  lang: Language | 'x-default';
  href: string;
}

export function getAlternateLinks(currentUrl: string): AlternateLink[] {
  const baseUrl = env.PUBLIC_SITE_URL.replace(/\/$/, '');
  const cleanPath = delocalizeUrl(currentUrl);

  const links: AlternateLink[] = supportedLanguages.map((lang) => ({
    lang,
    href: `${baseUrl}${localizeUrl(cleanPath, lang)}`,
  }));

  // Add x-default (usually points to default language)
  links.push({
    lang: 'x-default',
    href: `${baseUrl}${cleanPath}`,
  });

  return links;
}

export function generateHreflangTags(currentUrl: string): string {
  const links = getAlternateLinks(currentUrl);
  return links
    .map(
      (link) =>
        `<link rel="alternate" hreflang="${link.lang}" href="${link.href}" />`
    )
    .join('\n');
}
