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
  colorType: string;
  shade?: number;
  useBaseTextColor?: boolean;
  // Legacy fields for backwards compatibility
  customColor?: ColorData;
}

interface ColorSelectionData {
  colorType?: string;
  shade?: number;
  customColor?: { label?: string; value: string } | undefined;
}

interface GradientData {
  direction?: string;
  startColor?: ColorSelectionData;
  endColor?: ColorSelectionData;
}

// Sanity image reference structure
interface SanityImageData {
  asset?: { _ref?: string; _type?: string };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

// Flat structure for background settings (no nesting)
interface BackgroundSettingsData {
  backgroundType?: 'image' | 'color';
  image?: SanityImageData;
  colorMode?: 'solid' | 'gradient';
  // Flattened solid color fields
  solidColorType?: string;
  solidColorShade?: number;
  solidCustomColor?: { label?: string; value: string };
  // Legacy nested structure (backwards compatibility)
  solidColor?: ColorSelectionData;
  gradient?: GradientData;
}

/**
 * Lightens a hex color by mixing with white
 * @param hex - Hex color string (with or without #)
 * @param amount - Amount to lighten (0-1, default 0.3 = 30%)
 */
export function lighten(hex: string, amount = 0.3): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const r = Math.round(rgb.r + (255 - rgb.r) * amount);
  const g = Math.round(rgb.g + (255 - rgb.g) * amount);
  const b = Math.round(rgb.b + (255 - rgb.b) * amount);

  return rgbToHex(r, g, b);
}

/**
 * Darkens a hex color by mixing with black
 * @param hex - Hex color string (with or without #)
 * @param amount - Amount to darken (0-1, default 0.2 = 20%)
 */
export function darken(hex: string, amount = 0.2): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const r = Math.round(rgb.r * (1 - amount));
  const g = Math.round(rgb.g * (1 - amount));
  const b = Math.round(rgb.b * (1 - amount));

  return rgbToHex(r, g, b);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length !== 6) return null;

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;

  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Gets the base color for a color type
 */
function getBaseColor(
  colorType: string,
  siteColors: SiteColors | null | undefined
): string {
  // Extract base color type (handle legacy '-light' and '-dark' suffixes)
  const baseType = colorType.replace(/-light$/, '').replace(/-dark$/, '');

  switch (baseType) {
    case 'primary':
      return siteColors?.primary?.value || '#0066cc';
    case 'secondary':
      return siteColors?.secondary?.value || '#6c757d';
    case 'accent':
    default:
      return siteColors?.accent?.value || '#4ecdc4';
  }
}

/**
 * Resolves button text color based on useBaseTextColor setting
 * @param buttonColor - The button color object from Sanity
 * @returns CSS color value (hex string)
 */
export function resolveButtonTextColor(
  buttonColor: ButtonColorData | null | undefined
): string {
  // true = base (dark text), false/undefined = contrast (white text)
  return buttonColor?.useBaseTextColor ? '#1a1a1a' : '#ffffff';
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
    return siteColors?.accent?.value || 'var(--color-accent, #4ecdc4)';
  }

  const { colorType, shade, customColor } = buttonColor;

  // Handle legacy 'custom' color type
  if (colorType === 'custom' && customColor?.value) {
    return customColor.value;
  }

  // Get base color
  const baseColor = getBaseColor(colorType, siteColors);

  // Handle legacy '-light' and '-dark' suffixes (backwards compatibility)
  if (colorType.endsWith('-light')) {
    return lighten(baseColor, 0.3); // 30% lighter
  }
  if (colorType.endsWith('-dark')) {
    return baseColor; // Dark was the base, so just return base
  }

  // Handle new shade system (0 = base, 100 = lightest)
  const shadeValue = shade ?? 0;
  if (shadeValue > 0) {
    // 0 = no change, 100 = 50% lighter
    const amount = shadeValue / 200;
    return lighten(baseColor, amount);
  }

  return baseColor;
}

/**
 * Resolves a color selection (used for background colors)
 * @param colorSelection - The color selection object from Sanity
 * @param siteColors - The site colors from settings
 * @returns CSS color value (hex string)
 */
export function resolveColorSelection(
  colorSelection: ColorSelectionData | null | undefined,
  siteColors: SiteColors | null | undefined
): string {
  if (!colorSelection) {
    return siteColors?.primary?.value || '#0066cc';
  }

  const { colorType, shade, customColor } = colorSelection;

  // Handle custom color
  if (colorType === 'custom' && customColor?.value) {
    return customColor.value;
  }

  // Get base color
  const baseColor = getBaseColor(colorType || 'primary', siteColors);

  // Apply shade if specified
  const shadeValue = shade ?? 0;
  if (shadeValue > 0) {
    const amount = shadeValue / 200;
    return lighten(baseColor, amount);
  }

  return baseColor;
}

/**
 * Resolves background settings to CSS background value (flat structure)
 * @param backgroundSettings - The background settings object from Sanity
 * @param siteColors - The site colors from settings
 * @returns Object with backgroundType and CSS background value (or null for image)
 */
export function resolveBackgroundStyle(
  backgroundSettings: BackgroundSettingsData | null | undefined,
  siteColors: SiteColors | null | undefined
): {
  type: 'image' | 'color';
  css: string | null;
  image?: SanityImageData | undefined;
} {
  // Default to image if no settings
  if (!backgroundSettings || backgroundSettings.backgroundType === 'image') {
    return {
      type: 'image',
      css: null,
      image: backgroundSettings?.image,
    };
  }

  // Handle color background (flat structure)
  const colorMode = backgroundSettings.colorMode || 'solid';

  if (colorMode === 'solid') {
    // Handle new flattened structure
    if (backgroundSettings.solidColorType) {
      const colorSelection: ColorSelectionData = {
        colorType: backgroundSettings.solidColorType,
        ...(backgroundSettings.solidColorShade !== undefined
          ? { shade: backgroundSettings.solidColorShade }
          : {}),
        ...(backgroundSettings.solidCustomColor
          ? { customColor: backgroundSettings.solidCustomColor }
          : {}),
      };
      const solidColor = resolveColorSelection(colorSelection, siteColors);
      return {
        type: 'color',
        css: solidColor,
      };
    }
    // Fallback to legacy nested structure
    const solidColor = resolveColorSelection(
      backgroundSettings.solidColor,
      siteColors
    );
    return {
      type: 'color',
      css: solidColor,
    };
  }

  // Gradient mode
  const gradient = backgroundSettings.gradient;
  const direction = gradient?.direction || '135deg';
  const startColor = resolveColorSelection(gradient?.startColor, siteColors);
  const endColor = resolveColorSelection(gradient?.endColor, siteColors);

  return {
    type: 'color',
    css: `linear-gradient(${direction}, ${startColor}, ${endColor})`,
  };
}
