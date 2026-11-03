import { test, expect } from '../../fixtures/baseTest';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';

test('ECOM_TC_006 - Verify multiple products are displayed in the cart', async ({
  page,
  loginPage,
}) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  const productsPage = new ProductsPage(page);

  await productsPage.addProductToCart('Sauce Labs Backpack');
  await productsPage.addProductToCart('Sauce Labs Bike Light');

  await productsPage.openShoppingCart();

  const cartPage = new CartPage(page);

  await expect(cartPage.cartItems.first()).toBeVisible();

  const cartItemCount = await cartPage.getCartItemCount();
  const cartItemNames = await cartPage.getCartItemNames();

  expect(cartItemCount).toBe(2);
  expect(cartItemNames).toContain('Sauce Labs Backpack');
  expect(cartItemNames).toContain('Sauce Labs Bike Light');
});

test('ECOM_TC_007 - Verify user can remove a product from the cart', async ({
  page,
  loginPage,
}) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  const productsPage = new ProductsPage(page);

  await productsPage.addProductToCart('Sauce Labs Backpack');
  await productsPage.addProductToCart('Sauce Labs Bike Light');

  await productsPage.openShoppingCart();

  const cartPage = new CartPage(page);

  await expect(cartPage.cartItems).toHaveCount(2);

  await cartPage.removeProduct('Sauce Labs Backpack');

  await expect(cartPage.cartItems).toHaveCount(1);

  const cartItemNames = await cartPage.getCartItemNames();

  expect(cartItemNames).not.toContain('Sauce Labs Backpack');
  expect(cartItemNames).toContain('Sauce Labs Bike Light');
});