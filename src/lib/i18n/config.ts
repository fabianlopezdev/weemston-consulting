export const languages = {
  en: 'English',
  // Add more languages as needed:
  // es: 'Español',
  // fr: 'Français',
  // de: 'Deutsch',
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = 'en';

export const languageNames: Record<Language, string> = languages;

export const supportedLanguages = Object.keys(languages) as Language[];

// URL patterns
export function getLanguageFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang && lang in languages) {
    return lang as Language;
  }
  return defaultLanguage;
}

export function isDefaultLanguage(lang: Language): boolean {
  return lang === defaultLanguage;
}

// Prefix URL with language (except default)
export function localizeUrl(path: string, lang: Language): string {
  if (isDefaultLanguage(lang)) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/${lang}${cleanPath}`;
}

// Remove language prefix from URL
export function delocalizeUrl(path: string): string {
  const pathParts = path.split('/').filter(Boolean);
  if (pathParts[0] && pathParts[0] in languages) {
    return '/' + pathParts.slice(1).join('/');
  }
  return path;
}
