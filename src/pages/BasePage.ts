import { type Locator, type Page } from '@playwright/test';

/**
 * Clase base de todas las páginas: agrupa lo que se comparte (header, carrito y menú lateral).
 */
export abstract class BasePage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly resetAppLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
        // Ojo: data-test="open-menu" es la IMAGEN del ícono, tapada por el <button>. Se hace clic en el botón real.
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByTestId('logout-sidebar-link');
    this.resetAppLink = page.getByTestId('reset-sidebar-link');
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  /** Deja la app en estado limpio (carrito vacío) usando la opción "Reset App State". */
  async resetAppState(): Promise<void> {
    await this.menuButton.click();
    await this.resetAppLink.click();
  }
}
