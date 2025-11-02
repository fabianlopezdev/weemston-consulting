# Testing Guide

This project uses a comprehensive testing strategy with multiple tools and approaches.

## Test Types

### 1. Unit Tests (Vitest)

Unit tests for utilities, functions, and components.

```bash
# Run unit tests
bun test

# Run with coverage
bun test:coverage

# Run in watch mode
bun test:watch
```

**Location:** `tests/unit/`

**Example:**

```typescript
import { describe, it, expect } from 'vitest';
import { t } from '@lib/i18n/translations';

describe('translations', () => {
  it('should return translated string', () => {
    expect(t('en', 'common.skip_to_content')).toBe('Skip to main content');
  });
});
```

### 2. E2E Tests (Playwright)

End-to-end tests with automated accessibility checks using axe-core.

```bash
# Run E2E tests
bun test:e2e

# Run in UI mode for debugging
bun test:e2e:ui

# Run specific browser
bun test:e2e --project=chromium
```

**Location:** `tests/e2e/`

**Features:**

- Multi-browser testing (Chrome, Firefox, Safari, Mobile)
- Automatic accessibility scanning with axe-core
- Screenshot on failure
- Trace recording on first retry

**Example:**

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('should not have accessibility violations', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});
```

### 3. Performance Tests (Unlighthouse)

Lighthouse CI for performance, accessibility, and SEO audits.

```bash
# Run performance tests
bun unlighthouse

# Run on production
UNLIGHTHOUSE_SITE=https://example.com bun unlighthouse
```

**Features:**

- Performance budgets enforcement
- Accessibility scoring (target: 95%)
- SEO audits (target: 95%)
- Best practices checks (target: 90%)
- Mobile-first configuration

### 4. Exploratory Testing (Playwright MCP)

For ad-hoc testing and debugging, use the Playwright MCP server alongside standard tests.

**Use Cases:**

- Quick manual testing during development
- Debugging specific user flows
- Visual regression testing
- Interactive exploration of edge cases

**Workflow:**

1. Start your dev server: `bun dev`
2. Use Playwright MCP tools to interact with the browser
3. Document findings as new test cases in `tests/e2e/`
4. Convert exploratory tests into automated tests

**Example scenarios to explore:**

- Form validation edge cases
- Navigation flows with different languages
- Mobile viewport interactions
- Keyboard-only navigation
- Screen reader compatibility

## Accessibility Testing

All pages MUST pass WCAG 2.1 AA standards.

**Automated checks:**

- Color contrast (WCAG AA)
- Heading hierarchy
- Landmark regions (main, nav, footer)
- Form labels and descriptions
- Keyboard navigation
- ARIA attributes

**Manual checks required:**

- Screen reader testing
- Keyboard-only navigation
- Focus management
- Live regions announcements

## Performance Budgets

Enforced via Unlighthouse:

| Resource Type | Budget     |
| ------------- | ---------- |
| Document      | 50 KB      |
| Scripts       | 250 KB     |
| Stylesheets   | 50 KB      |
| Images        | 250 KB     |
| Fonts         | 100 KB     |
| **Total**     | **700 KB** |

| Metric                   | Budget |
| ------------------------ | ------ |
| Interactive (TTI)        | 3000ms |
| First Contentful Paint   | 1500ms |
| Largest Contentful Paint | 2500ms |

## CI/CD Integration

All tests run on every PR via GitHub Actions:

```yaml
- Type checking (astro check)
- Linting (ESLint)
- Unit tests (Vitest)
- E2E tests (Playwright on Chromium)
- Build validation
- Performance audits (on main branch only)
```

## Coverage Requirements

Minimum coverage thresholds (enforced):

- Lines: 80%
- Functions: 80%
- Branches: 80%
- Statements: 80%

## Writing Tests

### Test Organization

```
tests/
├── setup.ts              # Vitest setup
├── unit/                 # Unit tests
│   └── *.test.ts
├── e2e/                  # E2E tests
│   └── *.spec.ts
└── TESTING.md            # This file
```

### Naming Conventions

- Unit tests: `*.test.ts`
- E2E tests: `*.spec.ts`
- Use descriptive names: `contact-form.spec.ts`, `i18n.test.ts`

### Best Practices

**Unit Tests:**

- Test one thing at a time
- Use descriptive test names
- Arrange-Act-Assert pattern
- Mock external dependencies

**E2E Tests:**

- Test user flows, not implementation
- Include accessibility checks in every test
- Use proper selectors (role, label, text)
- Avoid brittle selectors (CSS classes, IDs)
- Test across different viewports

**Accessibility:**

- Every page MUST have axe-core scan
- Test keyboard navigation
- Verify focus management
- Check ARIA labels and descriptions

## Debugging Tests

### Vitest

```bash
# Run specific test file
bun test i18n.test.ts

# Debug in VS Code
# Add breakpoint and press F5
```

### Playwright

```bash
# UI Mode (recommended)
bun test:e2e:ui

# Debug mode
bun test:e2e --debug

# Headed mode
bun test:e2e --headed

# Generate test code
bun dlx playwright codegen http://localhost:4321
```

### Unlighthouse

```bash
# Open results in browser
bun unlighthouse --open

# Disable throttling for faster testing
UNLIGHTHOUSE_THROTTLE=false bun unlighthouse
```

## Common Issues

### Issue: Tests fail in CI but pass locally

**Solution:** Check for timing issues, use `waitFor` helpers, ensure proper cleanup

### Issue: Accessibility violations

**Solution:** Review axe-core output, check WCAG guidelines, ensure proper semantic HTML

### Issue: Performance budget exceeded

**Solution:** Analyze bundle size, optimize images, check for unused code

### Issue: Flaky tests

**Solution:** Add proper waits, avoid hard-coded delays, ensure deterministic state

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Unlighthouse Documentation](https://unlighthouse.dev/)
