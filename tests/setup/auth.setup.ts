import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { USERS, PASSWORD } from '../../src/data/users';

const AUTH_FILE = 'playwright/.auth/standard_user.json';

/**
 * Se ejecuta UNA vez antes de todas las pruebas: inicia sesión y guarda la sesión.
 * Las demás pruebas reutilizan esa sesión y parten directo en la tienda (más rápido y estable).
 */
setup('iniciar sesión como standard_user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERS.standard, PASSWORD);
  await expect(page).toHaveURL(/inventory\.html/);
  await page.context().storageState({ path: AUTH_FILE });
});
