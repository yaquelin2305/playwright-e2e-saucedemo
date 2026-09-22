import { test, expect } from '../../src/fixtures/test-fixtures';
import { USERS, PASSWORD } from '../../src/data/users';
import loginCases from '../../src/data/login-cases.json';

// Las pruebas de login necesitan partir SIN sesión iniciada.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('LOGIN-01 · login exitoso con usuario estándar @smoke', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.login(USERS.standard, PASSWORD);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.title).toHaveText('Products');
    await expect(inventoryPage.items).toHaveCount(6);
  });

  test('LOGIN-02 · logout vuelve al login y protege las páginas internas @regression', async ({
    loginPage,
    inventoryPage,
    page,
  }) => {
    await loginPage.login(USERS.standard, PASSWORD);
    await inventoryPage.logout();

    await expect(loginPage.loginButton).toBeVisible();

    // Después del logout no se debe poder entrar directo a la tienda.
    await inventoryPage.goto();
    await expect(loginPage.errorMessage).toContainText("You can only access '/inventory.html' when you are logged in.");
  });

  // Pruebas guiadas por datos (data-driven): un test por cada fila de login-cases.json
  for (const c of loginCases) {
    test(`${c.id} · login rechazado: ${c.title} @regression`, async ({ loginPage, page }) => {
      await loginPage.login(c.username, c.password);

      await expect(loginPage.errorMessage).toHaveText(c.expectedError);
      await expect(page).not.toHaveURL(/inventory\.html/);
    });
  }
});
