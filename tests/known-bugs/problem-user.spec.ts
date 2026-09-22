import { test, expect } from '../../src/fixtures/test-fixtures';
import { USERS, PASSWORD } from '../../src/data/users';

/**
 * Defectos conocidos detectados con el usuario "problem_user".
 * Se marcan con test.fail(): la suite sigue verde, pero si el bug se corrige
 * la prueba avisará (pasará a "fallar") para retirar la marca.
 * Cada caso está documentado como reporte de bug en el repositorio qa-test-design.
 */
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Defectos conocidos · problem_user', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.problem, PASSWORD);
  });

  test('BUG-01 · cada producto debe mostrar su propia imagen @known-bug', async ({ inventoryPage }) => {
    test.fail(true, 'BUG-01: con problem_user todos los productos muestran la misma imagen.');
    test.info().annotations.push({ type: 'issue', description: 'qa-test-design/bugs/BUG-01' });

    const sources = await inventoryPage.itemImages.evaluateAll((imgs) =>
      imgs.map((img) => img.getAttribute('src')),
    );
    expect(new Set(sources).size).toBe(sources.length);
  });

  test('BUG-02 · el campo apellido del checkout debe aceptar texto @known-bug', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    test.fail(true, 'BUG-02: con problem_user el apellido no se puede escribir (se sobrescribe el nombre).');
    test.info().annotations.push({ type: 'issue', description: 'qa-test-design/bugs/BUG-02' });

    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.checkout();

    await checkoutPage.lastNameInput.fill('Rugel');
    await expect(checkoutPage.lastNameInput).toHaveValue('Rugel', { timeout: 2_000 });
  });
});
