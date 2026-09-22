import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('Catálogo de productos', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('INV-01 · el catálogo muestra 6 productos con nombre, precio e imagen @smoke', async ({ inventoryPage }) => {
    await expect(inventoryPage.items).toHaveCount(6);

    const prices = await inventoryPage.getPrices();
    expect(prices.every((p) => p > 0)).toBeTruthy();

    for (const name of await inventoryPage.getNames()) {
      expect(name.trim()).not.toBe('');
    }
  });

  test('INV-02 · ordenar por nombre A→Z (orden por defecto) @regression', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getNames();
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  test('INV-03 · ordenar por nombre Z→A @regression', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getNames();
    expect(names).toEqual([...names].sort((a, b) => b.localeCompare(a)));
  });

  test('INV-04 · ordenar por precio de menor a mayor @regression', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('INV-05 · ordenar por precio de mayor a menor @regression', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('INV-06 · el detalle de producto muestra el mismo precio que el catálogo @regression', async ({
    inventoryPage,
    page,
  }) => {
    const product = 'Sauce Labs Fleece Jacket';
    const catalogPrice = await inventoryPage.getPriceOf(product);

    await inventoryPage.openProduct(product);

    await expect(page).toHaveURL(/inventory-item\.html\?id=\d+/);
    await expect(page.getByTestId('inventory-item-name')).toHaveText(product);
    await expect(page.getByTestId('inventory-item-price')).toHaveText(`$${catalogPrice}`);
  });
});
