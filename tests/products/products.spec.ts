import { test, expect } from '../../fixtures/baseTest';
import { ProductsPage } from '../../pages/ProductsPage';

test('ECOM_TC_003 - Verify user can add a product to the cart', async ({
  page, loginPage,}) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  const productsPage = new ProductsPage(page);

  await expect(productsPage.productNames.first()).toBeVisible();
  await productsPage.addBackpackToCart();

  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

  await productsPage.openShoppingCart();

  await expect(page).toHaveURL(/cart\.html/);
  await expect(productsPage.productNames).toContainText('Sauce Labs Backpack');  

  });

  test('ECOM_TC_004 - Verify product count and names', async ({
  page,
  loginPage,
}) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  const productsPage = new ProductsPage(page);

  await expect(productsPage.productNames.first()).toBeVisible();

  const productCount = await productsPage.getProductCount();
  const productNames = await productsPage.getProductNames();

  expect(productCount).toBeGreaterThan(0);
  expect(productNames.length).toBe(productCount);
  expect(productNames).toContain('Sauce Labs Backpack');
});

test('ECOM_TC_005 - Verify user can add multiple products to cart', async ({ page, loginPage,}) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  const productsPage = new ProductsPage(page);

  await productsPage.addProductToCart('Sauce Labs Backpack');
  await productsPage.addProductToCart('Sauce Labs Bike Light');

  await productsPage.openShoppingCart();

  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.locator('.cart_item')).toHaveCount(2);

await expect(page.locator('.cart_item').nth(0)).toContainText('Sauce Labs Backpack');
await expect(page.locator('.cart_item').nth(1)).toContainText('Sauce Labs Bike Light');
});


