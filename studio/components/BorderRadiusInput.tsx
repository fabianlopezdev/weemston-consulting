import React, { useCallback } from 'react';
import { NumberInputProps, set, unset } from 'sanity';
import { Stack, Text, Card, Box } from '@sanity/ui';

export function BorderRadiusInput(props: NumberInputProps) {
  const { value, onChange, elementProps } = props;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = parseFloat(event.target.value);
      onChange(nextValue ? set(nextValue) : unset());
    },
    [onChange]
  );

  return (
    <Stack space={3}>
      {/* Slider Input */}
      <input
        {...elementProps}
        type="range"
        min="0"
        max="50"
        step="1"
        value={value || 4}
        onChange={handleChange}
        style={{
          width: '100%',
          cursor: 'pointer',
        }}
      />

      {/* Value Display */}
      <Text size={1} muted>
        {value || 4}px
      </Text>

      {/* Visual Preview */}
      <Card padding={4} radius={2} shadow={1}>
        <Box
          style={{
            width: '100%',
            height: '60px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: `${value || 4}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'border-radius 0.2s ease',
          }}
        >
          Preview: {value || 4}px radius
        </Box>
      </Card>
    </Stack>
  );
}
