import { test, expect } from '../../src/fixtures/test-fixtures';

const BACKPACK = 'Sauce Labs Backpack';
const BIKE_LIGHT = 'Sauce Labs Bike Light';
const ONESIE = 'Sauce Labs Onesie';

test.describe('Carrito de compras', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('CART-01 · agregar un producto actualiza el contador y el botón @smoke', async ({ inventoryPage }) => {
    await inventoryPage.addToCart(BACKPACK);

    await expect(inventoryPage.cartBadge).toHaveText('1');
    await expect(inventoryPage.removeButton(BACKPACK)).toBeVisible();
  });

  test('CART-02 · agregar varios productos y verlos en el carrito @regression', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(BACKPACK, BIKE_LIGHT, ONESIE);
    await expect(inventoryPage.cartBadge).toHaveText('3');

    await inventoryPage.openCart();

    await expect(cartPage.items).toHaveCount(3);
    expect(await cartPage.getNames()).toEqual([BACKPACK, BIKE_LIGHT, ONESIE]);
  });

  test('CART-03 · quitar un producto desde el carrito @regression', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(BACKPACK, BIKE_LIGHT);
    await inventoryPage.openCart();

    await cartPage.remove(BACKPACK);

    await expect(cartPage.items).toHaveCount(1);
    await expect(cartPage.cartBadge).toHaveText('1');
    expect(await cartPage.getNames()).toEqual([BIKE_LIGHT]);
  });

  test('CART-04 · quitar el último producto oculta el contador @regression', async ({ inventoryPage }) => {
    await inventoryPage.addToCart(BACKPACK);
    await inventoryPage.removeFromCart(BACKPACK);

    await expect(inventoryPage.cartBadge).toBeHidden();
    await expect(inventoryPage.addToCartButton(BACKPACK)).toBeVisible();
  });

  test('CART-05 · el carrito se mantiene al recargar la página @regression', async ({ inventoryPage, cartPage, page }) => {
    await inventoryPage.addToCart(BACKPACK);
    await page.reload();

    await expect(inventoryPage.cartBadge).toHaveText('1');
    await inventoryPage.openCart();
    expect(await cartPage.getNames()).toEqual([BACKPACK]);
  });

  test('CART-06 · "Continue Shopping" vuelve al catálogo sin perder productos @regression', async ({
    inventoryPage,
    cartPage,
    page,
  }) => {
    await inventoryPage.addToCart(BACKPACK);
    await inventoryPage.openCart();
    await cartPage.continueShoppingButton.click();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});
