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

test('drag and drop test - 1', async ({ page }) => {
  await page.goto('https://demo.automationtesting.in/Static.html', {timeout: 25000});
  await expect(page).toHaveTitle("Drag and Drop");
  let sourceElement = page.locator("#angular");
  let targetElement = page.locator('#droparea');
  await expect(sourceElement).toBeAttached({timeout: 10000});
  await expect(targetElement).toBeVisible({timeout: 10000});
  // Perform drag and drop operation
  await sourceElement.dragTo(targetElement);
  //await sourceElement.dragTo(targetElement);
  await page.waitForTimeout(5000);
});

test('drag and drop test - 2', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/demo-site/draganddrop/', {timeout: 25000});
  await expect(page).toHaveTitle("Drag and Drop Demo Sites | Testing Site - GlobalSQA");
  let sourceElement = page.frameLocator("[class='demo-frame lazyloaded']").locator("//*[contains(@alt,'The peaks of High Tatras')]");
  let targetElement = page.frameLocator("[class='demo-frame lazyloaded']").locator('#trash');
  await expect(sourceElement).toBeAttached({timeout: 10000});
  await expect(targetElement).toBeVisible({timeout: 10000});
  // Perform drag and drop operation
  await sourceElement.dragTo(targetElement);
  //await sourceElement.dragTo(targetElement);
  await page.waitForTimeout(5000);
});

test('multiple drag and drop test - 1', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/demo-site/draganddrop/', {timeout: 25000});
  await expect(page).toHaveTitle("Drag and Drop Demo Sites | Testing Site - GlobalSQA");
  let sourceElementArr = page.frameLocator("[class='demo-frame lazyloaded']").locator("//ul[@id='gallery']//*[contains(@src,'.jpg')]");
  let targetElement = page.frameLocator("[class='demo-frame lazyloaded']").locator('#trash');
  await expect(targetElement).toBeVisible({timeout: 15000});
  console.log("total draggable elements found :: "+ await sourceElementArr.count())
  for(let i = await sourceElementArr.count() - 1; i>-1; i--){
    // Perform drag and drop operation
      await sourceElementArr.nth(i).dragTo(targetElement);
      await page.waitForTimeout(500);
  }
  await page.waitForTimeout(5000);
});

test('upload file', async ({ page }) => {
  await page.goto('http://www.fileconvoy.com/', {timeout: 25000});
  await expect(page).toHaveTitle("Free file sharing without registration and size limits");
  await page.locator("#upfile_0").setInputFiles("./inputData/ps.txt")
  await page.waitForTimeout(5000);
});

test('Slider', async ({ page }) => {
  await page.goto('https://www.w3.org/WAI/ARIA/apg/patterns/slider/examples/slider-color-viewer/', {timeout: 25000});
  let usrVal = 0
  while(await page.locator("//div[@class='color-slider red']").getAttribute("aria-valuenow") != usrVal.toString()){
    let cmprVal = await page.locator("//div[@class='color-slider red']").getAttribute("aria-valuenow")
    console.log("Current slider position :: " + cmprVal)
    if(parseInt(cmprVal) < usrVal){
      await page.locator("//div[@class='color-slider red']//*[@class='focus']").click()
      await page.locator("//div[@class='color-slider red']//*[@class='focus']").press("ArrowRight")
    }
    else if(parseInt(cmprVal) > usrVal){
      await page.locator("//div[@class='color-slider red']//*[@class='focus']").click()
      await page.locator("//div[@class='color-slider red']//*[@class='focus']").press("ArrowLeft")
    }
    else
      break
  }
  await page.waitForTimeout(5000);
});