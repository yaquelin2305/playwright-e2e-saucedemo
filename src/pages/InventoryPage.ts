import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { parsePrice } from '../utils/price';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage extends BasePage {
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly itemImages: Locator;
  readonly sortSelect: Locator;

  constructor(page: Page) {
    super(page);
    this.items = page.getByTestId('inventory-item');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.itemImages = page.locator('.inventory_item_img img');
    this.sortSelect = page.getByTestId('product-sort-container');
  }

  async goto(): Promise<void> {
    await this.page.goto('/inventory.html');
  }

  /** Convierte "Sauce Labs Backpack" en el sufijo que usa el data-test: "sauce-labs-backpack". */
  static slug(productName: string): string {
    return productName.toLowerCase().replace(/\s+/g, '-');
  }

  addToCartButton(productName: string): Locator {
    return this.page.getByTestId(`add-to-cart-${InventoryPage.slug(productName)}`);
  }

  removeButton(productName: string): Locator {
    return this.page.getByTestId(`remove-${InventoryPage.slug(productName)}`);
  }

  async addToCart(...productNames: string[]): Promise<void> {
    for (const name of productNames) {
      await this.addToCartButton(name).click();
    }
  }

  async removeFromCart(...productNames: string[]): Promise<void> {
    for (const name of productNames) {
      await this.removeButton(name).click();
    }
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortSelect.selectOption(option);
  }

  async getNames(): Promise<string[]> {
    return this.itemNames.allInnerTexts();
  }

  async getPrices(): Promise<number[]> {
    const texts = await this.itemPrices.allInnerTexts();
    return texts.map(parsePrice);
  }

  async getPriceOf(productName: string): Promise<number> {
    const card = this.items.filter({ hasText: productName });
    return parsePrice(await card.getByTestId('inventory-item-price').innerText());
  }

  async openProduct(productName: string): Promise<void> {
    await this.itemNames.filter({ hasText: productName }).click();
  }
}
