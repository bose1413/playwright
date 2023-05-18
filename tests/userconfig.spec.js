// @ts-check
const { test, expect } = require('@playwright/test');

/*test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});*/

test('swaglabs services login-logout', async ({ page }) => {
  await page.goto('/', {timeout: 25000});
  await expect(page).toHaveTitle("Swag Labs");
  await page.locator('[data-test="username"]').type("standard_user", {timeout: 5000});
  await page.locator('[data-test="password"]').type("secret_sauce", {timeout: 5000});
  await page.locator('[data-test="login-button"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click({timeout: 5000});
  await page.getByRole('link', { name: 'Logout' }).click({timeout: 5000});
  await expect(page.locator('[data-test="username"]')).toBeVisible({timeout: 10000});
});