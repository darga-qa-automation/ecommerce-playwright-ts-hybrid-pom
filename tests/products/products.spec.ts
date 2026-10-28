import { test, expect } from '../../fixtures/baseTest';
import { ProductsPage } from '../../pages/ProductsPage';

test('ECOM_TC_003 - Verify user can add a product to the cart', async ({
  page,
  loginPage,
}) => {
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