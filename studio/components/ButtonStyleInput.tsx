import React, { useCallback } from 'react';
import { ObjectInputProps, set, unset } from 'sanity';
import { Stack, Text, Card, Box, Grid } from '@sanity/ui';

interface ButtonStyleValue {
  borderRadius?: number;
  verticalPadding?: number;
  horizontalPadding?: number;
}

export function ButtonStyleInput(props: ObjectInputProps) {
  const { value, onChange } = props;
  const buttonStyle = (value as ButtonStyleValue) || {};

  const handleBorderRadiusChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = parseFloat(event.target.value);
      onChange(
        set({
          ...buttonStyle,
          borderRadius: nextValue,
        })
      );
    },
    [onChange, buttonStyle]
  );

  const handleVerticalPaddingChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = parseFloat(event.target.value);
      onChange(
        set({
          ...buttonStyle,
          verticalPadding: nextValue,
        })
      );
    },
    [onChange, buttonStyle]
  );

  const handleHorizontalPaddingChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = parseFloat(event.target.value);
      onChange(
        set({
          ...buttonStyle,
          horizontalPadding: nextValue,
        })
      );
    },
    [onChange, buttonStyle]
  );

  const borderRadius = buttonStyle.borderRadius ?? 4;
  const verticalPadding = buttonStyle.verticalPadding ?? 12;
  const horizontalPadding = buttonStyle.horizontalPadding ?? 24;

  return (
    <Stack space={4}>
      {/* Border Radius Slider */}
      <Stack space={2}>
        <Text size={1} weight="semibold">
          Border Radius
        </Text>
        <input
          type="range"
          min="0"
          max="50"
          step="1"
          value={borderRadius}
          onChange={handleBorderRadiusChange}
          style={{
            width: '100%',
            cursor: 'pointer',
          }}
        />
        <Text size={1} muted>
          {borderRadius}px
        </Text>
      </Stack>

      {/* Padding Sliders */}
      <Grid columns={2} gap={3}>
        {/* Vertical Padding */}
        <Stack space={2}>
          <Text size={1} weight="semibold">
            Vertical Padding
          </Text>
          <input
            type="range"
            min="0"
            max="40"
            step="1"
            value={verticalPadding}
            onChange={handleVerticalPaddingChange}
            style={{
              width: '100%',
              cursor: 'pointer',
            }}
          />
          <Text size={1} muted>
            {verticalPadding}px
          </Text>
        </Stack>

        {/* Horizontal Padding */}
        <Stack space={2}>
          <Text size={1} weight="semibold">
            Horizontal Padding
          </Text>
          <input
            type="range"
            min="0"
            max="60"
            step="1"
            value={horizontalPadding}
            onChange={handleHorizontalPaddingChange}
            style={{
              width: '100%',
              cursor: 'pointer',
            }}
          />
          <Text size={1} muted>
            {horizontalPadding}px
          </Text>
        </Stack>
      </Grid>

      {/* Visual Preview */}
      <Card padding={4} radius={2} shadow={1}>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <button
            type="button"
            style={{
              paddingTop: `${verticalPadding}px`,
              paddingBottom: `${verticalPadding}px`,
              paddingLeft: `${horizontalPadding}px`,
              paddingRight: `${horizontalPadding}px`,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: `${borderRadius}px`,
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              border: 'none',
              cursor: 'default',
              transition: 'all 0.2s ease',
            }}
          >
            Preview Button
          </button>
        </Box>
      </Card>
    </Stack>
  );
}
