import type { Language } from './config';
import en from '@i18n/locales/en.json';

const translations: Record<Language, typeof en> = {
  en,
  // Import additional languages here:
  // es: () => import('@i18n/locales/es.json').then(m => m.default),
};

export function getTranslations(lang: Language): typeof en {
  return translations[lang] || translations.en;
}

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

export type TranslationKey = NestedKeyOf<typeof en>;

export function t(
  lang: Language,
  key: TranslationKey,
  replacements?: Record<string, string | number>
): string {
  const translations = getTranslations(lang);
  const keys = key.split('.');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations;
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }

  if (typeof value !== 'string') {
    console.warn(`Translation key is not a string: ${key}`);
    return key;
  }

  // Replace placeholders like {count}
  if (replacements) {
    return value.replace(/\{(\w+)\}/g, (_, key) => {
      return String(replacements[key] ?? `{${key}}`);
    });
  }

  return value;
}

// Helper for Astro components
export function createTranslator(lang: Language) {
  return (
    key: TranslationKey,
    replacements?: Record<string, string | number>
  ) => t(lang, key, replacements);
}
