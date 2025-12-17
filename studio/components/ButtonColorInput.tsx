import React, { useCallback, useState, useEffect } from 'react';
import { ObjectInputProps, set, useClient, useFormValue } from 'sanity';
import { Stack, Text, Card, Box, Inline, Radio, Flex } from '@sanity/ui';

interface ButtonColorValue {
  colorType?: string;
  shade?: number;
  useBaseTextColor?: boolean;
  customColor?: { label?: string; value?: string };
}

interface SiteColors {
  primary?: { value: string };
  secondary?: { value: string };
  accent?: { value: string };
}

interface ButtonStyles {
  borderRadius?: number;
  verticalPadding?: number;
  horizontalPadding?: number;
}

// Default colors for preview when site settings aren't available
const DEFAULT_COLORS = {
  primary: '#0066cc',
  secondary: '#6c757d',
  accent: '#4ecdc4',
} as const;

// Default button styles
const DEFAULT_BUTTON_STYLES = {
  borderRadius: 4,
  verticalPadding: 12,
  horizontalPadding: 24,
} as const;

// Lighten a hex color by mixing with white
function lighten(hex: string, amount: number): string {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  const newR = Math.round(r + (255 - r) * amount);
  const newG = Math.round(g + (255 - g) * amount);
  const newB = Math.round(b + (255 - b) * amount);

  const toHex = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0');
  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}

// Get the base color from site colors or defaults
function getBaseColor(colorType: string, siteColors: SiteColors | null): string {
  if (siteColors) {
    switch (colorType) {
      case 'primary':
        return siteColors.primary?.value || DEFAULT_COLORS.primary;
      case 'secondary':
        return siteColors.secondary?.value || DEFAULT_COLORS.secondary;
      case 'accent':
        return siteColors.accent?.value || DEFAULT_COLORS.accent;
    }
  }
  return (DEFAULT_COLORS as Record<string, string>)[colorType] ?? DEFAULT_COLORS.accent;
}

// Calculate the preview color based on colorType, shade, site colors, and custom color
function getPreviewColor(
  colorType: string,
  shade: number,
  siteColors: SiteColors | null,
  customColor?: { label?: string; value?: string }
): string {
  // Handle custom color
  if (colorType === 'custom' && customColor?.value) {
    return customColor.value;
  }

  const baseColor = getBaseColor(colorType, siteColors);

  if (shade > 0) {
    // 0 = no change, 100 = 50% lighter
    const amount = shade / 200;
    return lighten(baseColor, amount);
  }

  return baseColor;
}

export function ButtonColorInput(props: ObjectInputProps) {
  const { value, onChange, path } = props;
  const buttonColor = (value as ButtonColorValue) || {};
  const client = useClient({ apiVersion: '2024-01-01' });

  // Get the button text from the parent link object
  // path is like ['hero', 'ctaButton', 'buttonColor'], we need to go up one level to get 'text'
  const parentPath = path.slice(0, -1);
  const buttonText = useFormValue([...parentPath, 'text']) as string | undefined;

  const [siteColors, setSiteColors] = useState<SiteColors | null>(null);
  const [buttonStyles, setButtonStyles] = useState<ButtonStyles | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch site settings on mount
  useEffect(() => {
    async function fetchSettings() {
      try {
        const settings = await client.fetch(`
          *[_type == "siteSettings"][0] {
            colors {
              primary { value },
              secondary { value },
              accent { value }
            },
            buttonStyles {
              borderRadius,
              verticalPadding,
              horizontalPadding
            }
          }
        `);
        setSiteColors(settings?.colors || null);
        setButtonStyles(settings?.buttonStyles || null);
      } catch (error) {
        console.error('Failed to fetch site settings:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, [client]);

  const colorType = buttonColor.colorType || 'accent';
  const shade = buttonColor.shade ?? 0;
  const useBaseTextColor = buttonColor.useBaseTextColor ?? false;
  const customColor = buttonColor.customColor;

  const handleColorTypeChange = useCallback(
    (newColorType: string) => {
      onChange(
        set({
          ...buttonColor,
          colorType: newColorType,
        })
      );
    },
    [onChange, buttonColor]
  );

  const handleShadeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = parseInt(event.target.value, 10);
      onChange(
        set({
          ...buttonColor,
          shade: nextValue,
        })
      );
    },
    [onChange, buttonColor]
  );

  const handleTextColorChange = useCallback(
    (useBase: boolean) => {
      onChange(
        set({
          ...buttonColor,
          useBaseTextColor: useBase,
        })
      );
    },
    [onChange, buttonColor]
  );

  const handleCustomColorChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = event.target.value;
      onChange(
        set({
          ...buttonColor,
          customColor: { value: newColor },
        })
      );
    },
    [onChange, buttonColor]
  );

  const previewColor = getPreviewColor(colorType, shade, siteColors, customColor);
  const textColor = useBaseTextColor ? '#1a1a1a' : '#ffffff';

  // Use real button styles or defaults
  const borderRadius = buttonStyles?.borderRadius ?? DEFAULT_BUTTON_STYLES.borderRadius;
  const verticalPadding = buttonStyles?.verticalPadding ?? DEFAULT_BUTTON_STYLES.verticalPadding;
  const horizontalPadding = buttonStyles?.horizontalPadding ?? DEFAULT_BUTTON_STYLES.horizontalPadding;

  return (
    <Stack space={4}>
      {/* Color Selection */}
      <Stack space={2}>
        <Text size={1} weight="semibold">
          Color
        </Text>
        <Inline space={4}>
          {(['primary', 'secondary', 'accent', 'custom'] as const).map((type) => (
            <Flex key={type} align="center" gap={2}>
              <Radio
                checked={colorType === type}
                onChange={() => handleColorTypeChange(type)}
                name="colorType"
              />
              <Text
                size={1}
                style={{ cursor: 'pointer' }}
                onClick={() => handleColorTypeChange(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </Flex>
          ))}
        </Inline>
      </Stack>

      {/* Custom Color Picker */}
      {colorType === 'custom' && (
        <Stack space={2}>
          <Text size={1} weight="semibold">
            Custom Color
          </Text>
          <Flex align="center" gap={3}>
            <input
              type="color"
              value={customColor?.value || '#4ecdc4'}
              onChange={handleCustomColorChange}
              style={{
                width: '48px',
                height: '32px',
                padding: '2px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            />
            <Text size={1} muted>
              {customColor?.value || '#4ecdc4'}
            </Text>
          </Flex>
        </Stack>
      )}

      {/* Shade Slider (only for theme colors, not custom) */}
      {colorType !== 'custom' && (
        <Stack space={2}>
          <Text size={1} weight="semibold">
            Shade
          </Text>
          <Flex align="center" gap={3}>
            <Text size={1} muted>
              Base
            </Text>
            <Box style={{ flex: 1 }}>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={shade}
                onChange={handleShadeChange}
                style={{
                  width: '100%',
                  cursor: 'pointer',
                }}
              />
            </Box>
            <Text size={1} muted>
              Light
            </Text>
          </Flex>
          <Text size={1} muted>
            {shade}%
          </Text>
        </Stack>
      )}

      {/* Text Color Selection */}
      <Stack space={2}>
        <Text size={1} weight="semibold">
          Text Color
        </Text>
        <Inline space={4}>
          <Flex align="center" gap={2}>
            <Radio
              checked={useBaseTextColor}
              onChange={() => handleTextColorChange(true)}
              name="textColor"
            />
            <Text
              size={1}
              style={{ cursor: 'pointer' }}
              onClick={() => handleTextColorChange(true)}
            >
              Base
            </Text>
          </Flex>
          <Flex align="center" gap={2}>
            <Radio
              checked={!useBaseTextColor}
              onChange={() => handleTextColorChange(false)}
              name="textColor"
            />
            <Text
              size={1}
              style={{ cursor: 'pointer' }}
              onClick={() => handleTextColorChange(false)}
            >
              Contrast
            </Text>
          </Flex>
        </Inline>
      </Stack>

      {/* Color Preview */}
      <Card padding={4} radius={2} shadow={1}>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          {isLoading ? (
            <Text size={1} muted>
              Loading preview...
            </Text>
          ) : (
            <button
              type="button"
              style={{
                paddingTop: `${verticalPadding}px`,
                paddingBottom: `${verticalPadding}px`,
                paddingLeft: `${horizontalPadding}px`,
                paddingRight: `${horizontalPadding}px`,
                backgroundColor: previewColor,
                borderRadius: `${borderRadius}px`,
                color: textColor,
                fontSize: '14px',
                fontWeight: '500',
                border: 'none',
                cursor: 'default',
                transition: 'all 0.2s ease',
                textShadow: useBaseTextColor ? 'none' : '0 1px 2px rgba(0,0,0,0.2)',
              }}
            >
              {buttonText || 'Preview Button'}
            </button>
          )}
        </Box>
      </Card>
    </Stack>
  );
}
