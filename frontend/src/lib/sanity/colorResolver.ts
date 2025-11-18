/**
 * Resolves button colors from Sanity data
 */

interface ColorData {
  label?: string;
  value: string;
}

interface SiteColors {
  primary?: ColorData;
  secondary?: ColorData;
  accent?: ColorData;
}

interface ButtonColorData {
  colorType: 'primary' | 'secondary' | 'accent' | 'custom';
  customColor?: ColorData;
}

/**
 * Resolves button color to a CSS color value
 * @param buttonColor - The button color object from Sanity
 * @param siteColors - The site colors from settings
 * @returns CSS color value (hex string)
 */
export function resolveButtonColor(
  buttonColor: ButtonColorData | null | undefined,
  siteColors: SiteColors | null | undefined
): string {
  // Default to accent color if no button color specified
  if (!buttonColor) {
    return siteColors?.accent?.value || 'var(--color-accent, #0066cc)';
  }

  const { colorType, customColor } = buttonColor;

  switch (colorType) {
    case 'primary':
      return siteColors?.primary?.value || 'var(--color-primary, #0066cc)';
    case 'secondary':
      return siteColors?.secondary?.value || 'var(--color-secondary, #6c757d)';
    case 'accent':
      return siteColors?.accent?.value || 'var(--color-accent, #0066cc)';
    case 'custom':
      return customColor?.value || 'var(--color-accent, #0066cc)';
    default:
      return siteColors?.accent?.value || 'var(--color-accent, #0066cc)';
  }
}
