import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Contact page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display contact form', async ({ page }) => {
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  test('should have all required form fields', async ({ page }) => {
    // Check for name field
    const nameField = page.locator('input[name="name"], input[id*="name"]');
    await expect(nameField).toBeVisible();

    // Check for email field
    const emailField = page.locator('input[name="email"], input[type="email"]');
    await expect(emailField).toBeVisible();

    // Check for message field
    const messageField = page.locator('textarea[name="message"]');
    await expect(messageField).toBeVisible();

    // Check for submit button
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
  });

  test('should have proper form labels', async ({ page }) => {
    // Check that all inputs have associated labels
    const inputs = await page.locator('input, textarea').all();

    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const name = await input.getAttribute('name');

      // Skip honeypot fields
      if (name === 'website') continue;

      // Check if input has aria-label or associated label
      const ariaLabel = await input.getAttribute('aria-label');
      const hasLabel =
        ariaLabel || (id && (await page.locator(`label[for="${id}"]`).count()));

      expect(hasLabel).toBeTruthy();
    }
  });

  test('should validate required fields', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Form should not submit if required fields are empty
    // Check for validation messages or that form is still visible
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    const emailField = page.locator('input[name="email"], input[type="email"]');
    await emailField.fill('invalid-email');

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Should show validation error or not submit
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  test('should have honeypot field for bot protection', async ({ page }) => {
    // Honeypot field should exist but be hidden
    const honeypot = page.locator('input[name="website"]');

    if ((await honeypot.count()) > 0) {
      // Check if honeypot is hidden (display: none or visibility: hidden)
      const isVisible = await honeypot.isVisible();
      expect(isVisible).toBe(false);
    }
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

    test('should support keyboard navigation', async ({ page }) => {
      // Tab through form fields
      await page.keyboard.press('Tab');

      // Should be able to reach all form fields with keyboard
      const nameField = page.locator('input[name="name"], input[id*="name"]');
      await nameField.focus();
      await expect(nameField).toBeFocused();

      await page.keyboard.press('Tab');
      const emailField = page.locator(
        'input[name="email"], input[type="email"]'
      );
      await expect(emailField).toBeFocused();

      await page.keyboard.press('Tab');
      const messageField = page.locator('textarea[name="message"]');
      await expect(messageField).toBeFocused();
    });

    test('should have proper form fieldset and legend if applicable', async ({
      page,
    }) => {
      // If form uses fieldsets, they should have legends
      const fieldsets = await page.locator('fieldset').all();

      for (const fieldset of fieldsets) {
        const legend = fieldset.locator('legend');
        await expect(legend).toBeAttached();
      }
    });
  });

  test.describe('Form submission', () => {
    test('should show loading state during submission', async ({ page }) => {
      // Fill out form
      await page.fill('input[name="name"], input[id*="name"]', 'Test User');
      await page.fill(
        'input[name="email"], input[type="email"]',
        'test@example.com'
      );
      await page.fill('textarea[name="message"]', 'This is a test message');

      // Mock the API response
      await page.route('**/api/contact', async (route) => {
        // Delay response to see loading state
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            message: 'Message sent successfully',
          }),
        });
      });

      // Submit form
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();

      // Check for loading indicator (disabled button or loading text)
      await expect(submitButton).toBeDisabled();
    });

    test('should show success message on successful submission', async ({
      page,
    }) => {
      // Fill out form
      await page.fill('input[name="name"], input[id*="name"]', 'Test User');
      await page.fill(
        'input[name="email"], input[type="email"]',
        'test@example.com'
      );
      await page.fill('textarea[name="message"]', 'This is a test message');

      // Mock successful API response
      await page.route('**/api/contact', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            message: 'Thank you! Your message has been sent.',
          }),
        });
      });

      // Submit form
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();

      // Wait for success message
      await expect(page.locator('text=/success|sent|thank you/i')).toBeVisible({
        timeout: 5000,
      });
    });

    test('should show error message on failed submission', async ({ page }) => {
      // Fill out form
      await page.fill('input[name="name"], input[id*="name"]', 'Test User');
      await page.fill(
        'input[name="email"], input[type="email"]',
        'test@example.com'
      );
      await page.fill('textarea[name="message"]', 'This is a test message');

      // Mock failed API response
      await page.route('**/api/contact', async (route) => {
        await route.fulfill({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({
            success: false,
            message: 'Something went wrong. Please try again.',
          }),
        });
      });

      // Submit form
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();

      // Wait for error message
      await expect(page.locator('text=/error|wrong|failed/i')).toBeVisible({
        timeout: 5000,
      });
    });
  });
});
