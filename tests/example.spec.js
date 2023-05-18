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
  await page.goto('https://www.saucedemo.com/', {timeout: 25000});
  await expect(page).toHaveTitle("Swag Labs");
  await page.locator('[data-test="username"]').type("standard_user", {timeout: 5000});
  await page.locator('[data-test="password"]').type("secret_sauce", {timeout: 5000});
  await page.locator('[data-test="login-button"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click({timeout: 5000});
  await page.getByRole('link', { name: 'Logout' }).click({timeout: 5000});
  await expect(page.locator('[data-test="username"]')).toBeVisible({timeout: 10000});
});

test('add and remove items from cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('a').filter({ hasText: '1' }).click();
  await page.getByText('$29.99').click();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await page.locator('[data-test="continue-shopping"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
});

test('checkout items', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[class="shopping_cart_link"]').click();
  await expect(page.locator('(//*[@class="inventory_item_name"])[1]')).toHaveText("Sauce Labs Backpack", {timeout:7000});
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').type("Prem");
  await page.locator('[data-test="lastName"]').type("Sudheer");
  await page.locator('[data-test="postalCode"]').type("444555");
  await page.locator('[data-test="continue"]').click();
  console.log('Price of the product - 1 finalized :: '+ await page.locator('(//*[@class="inventory_item_price"])[1]').innerText())
  console.log('Price of the product - 2 finalized :: '+ await page.locator('(//*[@class="inventory_item_price"])[2]').innerText())
  await page.locator('[data-test="finish"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click({timeout: 5000});
  await page.getByRole('link', { name: 'Logout' }).click({timeout: 5000});
  await expect(page.locator('[data-test="username"]')).toBeVisible({timeout: 10000});
});