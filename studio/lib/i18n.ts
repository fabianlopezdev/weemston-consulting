// Sanity i18n configuration for field-level translations
export const supportedLanguages = [
  { id: 'en', title: 'English', isDefault: true },
  // Add more languages:
  // { id: 'es', title: 'Español' },
  // { id: 'fr', title: 'Français' },
];

export const baseLanguage = supportedLanguages.find((l) => l.isDefault);

// Check if multiple languages are configured
export const isMultiLanguage = supportedLanguages.length > 1;

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

// Helper to create consistent language field for documents
// Hidden when only one language is configured
export function defineLanguageField() {
  return {
    name: 'language',
    title: 'Language',
    type: 'string',
    options: {
      list: supportedLanguages.map((lang) => ({
        title: lang.title,
        value: lang.id,
      })),
    },
    initialValue: baseLanguage?.id,
    validation: (Rule) =>
      Rule.custom((value) => {
        // Only require language field in multi-language setups where it's visible
        if (isMultiLanguage && !value) {
          return 'Language is required';
        }
        return true;
      }),
    readOnly: true,
    hidden: !isMultiLanguage,
    description: isMultiLanguage
      ? 'Language for this document version'
      : undefined,
  };
}
