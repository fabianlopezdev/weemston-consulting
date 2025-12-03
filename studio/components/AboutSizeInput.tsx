import { useCallback, type ChangeEvent } from 'react';
import { NumberInputProps, set } from 'sanity';
import { Stack, Text, Card, Box, Flex } from '@sanity/ui';

const MIN_SIZE = 1.5;
const MAX_SIZE = 4;
const STEP = 0.1;
const DEFAULT_SIZE = 2;

export function AboutSizeInput(props: NumberInputProps) {
  const { value, onChange } = props;
  const fontSize = value ?? DEFAULT_SIZE;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = parseFloat(event.target.value);
      onChange(set(nextValue));
    },
    [onChange]
  );

  return (
    <Stack space={4}>
      {/* Size Slider */}
      <Stack space={2}>
        <Text size={1} weight="semibold">
          Tagline Size
        </Text>
        <Flex align="center" gap={3}>
          <Text size={1} muted>
            Small
          </Text>
          <Box style={{ flex: 1 }}>
            <input
              type="range"
              min={MIN_SIZE}
              max={MAX_SIZE}
              step={STEP}
              value={fontSize}
              onChange={handleChange}
              style={{
                width: '100%',
                cursor: 'pointer',
              }}
            />
          </Box>
          <Text size={1} muted>
            Large
          </Text>
        </Flex>
        <Text size={1} muted>
          {fontSize.toFixed(1)}rem
        </Text>
      </Stack>

      {/* Preview */}
      <Card padding={4} radius={2} shadow={1}>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: "'Lora', serif",
              fontSize: `${fontSize}rem`,
              lineHeight: 1.4,
              margin: 0,
              maxWidth: '100%',
            }}
          >
            Preview the tagline font size
          </p>
        </Box>
      </Card>
    </Stack>
  );
}
