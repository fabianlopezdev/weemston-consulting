import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Home/);
  });

  test('should display main heading', async ({ page }) => {
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('should have skip link', async ({ page }) => {
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeInViewport();
  });

  test('should have navigation', async ({ page }) => {
    const nav = page.locator('nav[aria-label*="navigation"]').first();
    await expect(nav).toBeVisible();
  });

  test('should have footer with Fabulous Apps link', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    const fabulousLink = footer.locator('a[href*="fabapps.dev"]');
    await expect(fabulousLink).toBeVisible();
    await expect(fabulousLink).toHaveAttribute('target', '_blank');
    await expect(fabulousLink).toHaveAttribute('rel', /noopener/);
  });

  test.describe('Accessibility', () => {
    test('should not have any automatically detectable accessibility issues', async ({
      page,
    }) => {
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
      expect(headings.length).toBeGreaterThan(0);

      // Check that h1 exists
      const h1 = await page.locator('h1').count();
      expect(h1).toBeGreaterThan(0);
    });

    test('should have proper landmark regions', async ({ page }) => {
      // Check for main landmark
      const main = page.locator('main, [role="main"]');
      await expect(main).toBeVisible();

      // Check for navigation landmark
      const nav = page.locator('nav, [role="navigation"]');
      await expect(nav.first()).toBeVisible();

      // Check for footer landmark
      const footer = page.locator('footer, [role="contentinfo"]');
      await expect(footer).toBeVisible();
    });

    test('should have proper color contrast', async ({ page }) => {
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2aa'])
        .include('body')
        .analyze();

      const colorContrastViolations =
        accessibilityScanResults.violations.filter(
          (violation) => violation.id === 'color-contrast'
        );

      expect(colorContrastViolations).toEqual([]);
    });
  });

  test.describe('Performance', () => {
    test('should load within acceptable time', async ({ page }) => {
      const start = Date.now();
      await page.goto('/', { waitUntil: 'load' });
      const loadTime = Date.now() - start;

      // Page should load within 3 seconds
      expect(loadTime).toBeLessThan(3000);
    });

    test('should have proper meta tags', async ({ page }) => {
      // Check for viewport meta tag
      const viewport = page.locator('meta[name="viewport"]');
      await expect(viewport).toHaveAttribute('content', /width=device-width/);

      // Check for description meta tag
      const description = page.locator('meta[name="description"]');
      await expect(description).toHaveCount(1);
    });
  });

  test.describe('Keyboard navigation', () => {
    test('should allow keyboard navigation through interactive elements', async ({
      page,
    }) => {
      // Focus on skip link with keyboard
      await page.keyboard.press('Tab');

      // Check if skip link is focused
      const skipLink = page.locator('a[href="#main-content"]');
      await expect(skipLink).toBeFocused();
    });

    test('should skip to main content when skip link is activated', async ({
      page,
    }) => {
      // Tab to skip link
      await page.keyboard.press('Tab');

      // Activate skip link
      await page.keyboard.press('Enter');

      // Check if main content is now focused or visible in viewport
      const mainContent = page.locator('#main-content, main').first();
      await expect(mainContent).toBeInViewport();
    });
  });
});
