// Sanity i18n configuration for field-level translations
export const supportedLanguages = [
  { id: 'en', title: 'English', isDefault: true },
  // Add more languages:
  // { id: 'es', title: 'Español' },
  // { id: 'fr', title: 'Français' },
];

export const baseLanguage = supportedLanguages.find((l) => l.isDefault);

// Helper to create field-level i18n objects
export function createI18nField(
  type: string,
  options: Record<string, unknown> = {}
) {
  return {
    type: 'object',
    fields: supportedLanguages.map((lang) => ({
      type,
      name: lang.id,
      title: lang.title,
      ...options,
    })),
  };
}
