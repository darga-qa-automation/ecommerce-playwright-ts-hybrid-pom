
import { type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly shoppingCartLink: Locator;
  readonly backpackAddToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productNames = page.locator('[data-test="inventory-item-name"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');

    this.backpackAddToCartButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    );
  }

  async addBackpackToCart(): Promise<void> {
    await this.backpackAddToCartButton.click();
  }

  async addProductToCart(productName: string): Promise<void> {
    const product = this.page.locator('.inventory_item').filter({ hasText: productName });

    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openShoppingCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  async getProductCount(): Promise<number> {
    return await this.productNames.count();
  }

  async getProductNames(): Promise<string[]> {
    return await this.productNames.allTextContents();
  }
}
