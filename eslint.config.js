import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,astro}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  ...tseslint.configs.strict.map((config) => ({
    ...config,
    files: config.files || ['**/*.{js,mjs,cjs,ts,tsx,mts,cts}'],
  })),
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: {
      'jsx-a11y': jsxA11y,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...jsxA11y.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/unified-signatures': 'off',
    },
  },
  {
    ignores: [
      'dist/',
      '.astro/',
      'node_modules/',
      'frontend/dist/',
      'frontend/.astro/',
      'studio/dist/',
      '*.config.js',
      '*.config.ts',
      '*.config.mjs',
    ],
  },
];
