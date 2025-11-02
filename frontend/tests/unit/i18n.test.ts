import { describe, it, expect } from 'vitest';
import { t, createTranslator } from '@lib/i18n/translations';

describe('i18n translations', () => {
  describe('t() function', () => {
    it('should return translated string for valid key', () => {
      const result = t('en', 'common.skip_to_content');
      expect(result).toBe('Skip to main content');
    });

    it('should return key if translation not found', () => {
      // @ts-expect-error - Testing invalid key
      const result = t('en', 'invalid.key');
      expect(result).toBe('invalid.key');
    });

    it('should replace placeholders correctly', () => {
      const result = t('en', 'form.min_length', { count: 5 });
      expect(result).toBe('Minimum 5 characters required');
    });

    it('should handle multiple placeholders', () => {
      const result = t('en', 'form.max_length', { count: 100 });
      expect(result).toBe('Maximum 100 characters allowed');
    });
  });

  describe('createTranslator()', () => {
    it('should create a translator function bound to language', () => {
      const translator = createTranslator('en');
      const result = translator('nav.home');
      expect(result).toBe('Home');
    });

    it('should support replacements in created translator', () => {
      const translator = createTranslator('en');
      const result = translator('form.min_length', { count: 3 });
      expect(result).toBe('Minimum 3 characters required');
    });
  });
});
