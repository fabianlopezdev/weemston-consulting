import React, { useCallback, useState, useEffect } from 'react';
import { NumberInputProps, set, unset, useClient, useFormValue } from 'sanity';
import { Stack, Text, Card, Box, Flex } from '@sanity/ui';

interface SiteColors {
  primary?: { value: string };
  secondary?: { value: string };
  accent?: { value: string };
}

// Default colors for preview when site settings aren't available
const DEFAULT_COLORS = {
  primary: '#0066cc',
  secondary: '#6c757d',
  accent: '#4ecdc4',
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

  const toHex = (n: number) =>
    Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0');
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
  return (
    (DEFAULT_COLORS as Record<string, string>)[colorType] ?? DEFAULT_COLORS.primary
  );
}

// Calculate the preview color based on colorType, shade, and site colors
function getPreviewColor(
  colorType: string,
  shade: number,
  siteColors: SiteColors | null
): string {
  const baseColor = getBaseColor(colorType, siteColors);

  if (shade > 0) {
    // 0 = no change, 100 = 50% lighter
    const amount = shade / 200;
    return lighten(baseColor, amount);
  }

  return baseColor;
}

export function BackgroundShadeInput(props: NumberInputProps) {
  const { value, onChange, path } = props;
  const client = useClient({ apiVersion: '2024-01-01' });

  // Get the colorType - handle various field naming patterns
  // Examples:
  // - ['hero', 'backgroundSettings', 'solidColorShade'] -> solidColorType
  // - ['hero', 'backgroundSettings', 'gradient', 'startColor', 'shade'] -> colorType
  // - ['sections', 0, 'backgroundColorShade'] -> backgroundColorType
  // - ['sections', 0, 'selectedItemColorShade'] -> selectedItemColorType
  const fieldName = path[path.length - 1] as string;
  const parentPath = path.slice(0, -1);

  // Determine the colorType field name based on the shade field name
  let colorTypeFieldName = 'colorType';
  if (fieldName === 'solidColorShade') {
    colorTypeFieldName = 'solidColorType';
  } else if (fieldName === 'backgroundColorShade') {
    colorTypeFieldName = 'backgroundColorType';
  } else if (fieldName === 'selectedItemColorShade') {
    colorTypeFieldName = 'selectedItemColorType';
  } else if (fieldName === 'accentColorShade') {
    colorTypeFieldName = 'accentColorType';
  } else if (fieldName === 'cardBackgroundColorShade') {
    colorTypeFieldName = 'cardBackgroundColorType';
  } else if (fieldName === 'cardBorderColorShade') {
    colorTypeFieldName = 'cardBorderColorType';
  } else if (fieldName === 'iconBackgroundColorShade') {
    colorTypeFieldName = 'iconBackgroundColorType';
  }

  const colorType = (useFormValue([...parentPath, colorTypeFieldName]) as string) || 'primary';

  const [siteColors, setSiteColors] = useState<SiteColors | null>(null);
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
            }
          }
        `);
        setSiteColors(settings?.colors || null);
      } catch (error) {
        console.error('Failed to fetch site settings:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, [client]);

  const shade = value ?? 0;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = parseInt(event.target.value, 10);
      onChange(nextValue ? set(nextValue) : unset());
    },
    [onChange]
  );

  const previewColor = getPreviewColor(colorType, shade, siteColors);
  const baseColor = getBaseColor(colorType, siteColors);

  return (
    <Stack space={3}>
      {/* Slider with labels */}
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
            onChange={handleChange}
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

      {/* Value display */}
      <Text size={1} muted>
        {shade}%
      </Text>

      {/* Color Preview */}
      <Card padding={3} radius={2} shadow={1}>
        {isLoading ? (
          <Text size={1} muted>
            Loading preview...
          </Text>
        ) : (
          <Flex gap={3} align="center">
            {/* Base color swatch */}
            <Stack space={1}>
              <Text size={0} muted>
                Base
              </Text>
              <Box
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: baseColor,
                  borderRadius: '4px',
                  border: '1px solid rgba(0,0,0,0.1)',
                }}
              />
            </Stack>

            {/* Arrow */}
            <Text size={1} muted>
              →
            </Text>

            {/* Result color swatch */}
            <Stack space={1}>
              <Text size={0} muted>
                Result
              </Text>
              <Box
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: previewColor,
                  borderRadius: '4px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  transition: 'background-color 0.2s ease',
                }}
              />
            </Stack>

            {/* Color value */}
            <Text size={0} muted style={{ fontFamily: 'monospace' }}>
              {previewColor}
            </Text>
          </Flex>
        )}
      </Card>
    </Stack>
  );
}
