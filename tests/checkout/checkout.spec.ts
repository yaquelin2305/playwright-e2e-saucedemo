import { test, expect } from '../../src/fixtures/test-fixtures';
import { VALID_CUSTOMER, MISSING_FIELD_CASES, TAX_RATE } from '../../src/data/checkout-data';
import { round2, sum } from '../../src/utils/price';

const PRODUCTS = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

test.describe('Checkout', () => {
  test.beforeEach(async ({ inventoryPage, cartPage }) => {
    await inventoryPage.goto();
    await inventoryPage.addToCart(...PRODUCTS);
    await inventoryPage.openCart();
    await cartPage.checkout();
  });

  test('CHK-01 · compra completa de punta a punta (E2E) @smoke', async ({ checkoutPage, page }) => {
    await test.step('Ingresar datos del cliente', async () => {
      await checkoutPage.fillCustomerInfo(VALID_CUSTOMER);
      await expect(page).toHaveURL(/checkout-step-two\.html/);
    });

    await test.step('Confirmar la compra', async () => {
      await checkoutPage.finish();
    });

    await test.step('Validar confirmación y carrito vacío', async () => {
      await expect(page).toHaveURL(/checkout-complete\.html/);
      await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
      await expect(checkoutPage.cartBadge).toBeHidden();
    });
  });

  test('CHK-02 · subtotal, impuesto (8%) y total se calculan correctamente @regression', async ({ checkoutPage }) => {
    await checkoutPage.fillCustomerInfo(VALID_CUSTOMER);

    const itemPrices = await checkoutPage.getItemPrices();
    const { subtotal, tax, total } = await checkoutPage.getSummary();

    const expectedSubtotal = sum(itemPrices);
    const expectedTax = round2(expectedSubtotal * TAX_RATE);

    expect(subtotal).toBe(expectedSubtotal);
    expect(tax).toBe(expectedTax);
    expect(total).toBe(round2(expectedSubtotal + expectedTax));
  });

  test('CHK-03 · cancelar en el resumen vuelve al catálogo y conserva el carrito @regression', async ({
    checkoutPage,
    page,
  }) => {
    await checkoutPage.fillCustomerInfo(VALID_CUSTOMER);
    await checkoutPage.cancelButton.click();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(checkoutPage.cartBadge).toHaveText(String(PRODUCTS.length));
  });

  // Validaciones del formulario: un test por cada campo obligatorio vacío.
  for (const c of MISSING_FIELD_CASES) {
    test(`${c.id} · el formulario exige el campo ${c.field} @regression`, async ({ checkoutPage, page }) => {
      await checkoutPage.fillCustomerInfo(c.data);

      await expect(checkoutPage.errorMessage).toHaveText(c.error);
      await expect(page).toHaveURL(/checkout-step-one\.html/);
    });
  }
});
