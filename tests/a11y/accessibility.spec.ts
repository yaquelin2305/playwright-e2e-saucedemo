import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '../../src/fixtures/test-fixtures';

/**
 * Pruebas de accesibilidad automatizadas con axe-core (reglas WCAG 2.0/2.1 nivel A y AA).
 * El resultado completo se adjunta al reporte como evidencia.
 */
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

test.describe('Accesibilidad (WCAG A/AA)', () => {
  test('A11Y-01 · la página de login no tiene violaciones WCAG @a11y', async ({ page, loginPage }, testInfo) => {
    await page.context().clearCookies();
    await loginPage.goto();

    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    await testInfo.attach('axe-login.json', { body: JSON.stringify(results, null, 2), contentType: 'application/json' });

    expect(results.violations).toEqual([]);
  });

  test('A11Y-02 · el catálogo de productos no tiene violaciones WCAG @a11y', async ({ page, inventoryPage }, testInfo) => {
    await inventoryPage.goto();

    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    await testInfo.attach('axe-inventory.json', { body: JSON.stringify(results, null, 2), contentType: 'application/json' });

    expect(results.violations).toEqual([]);
  });
});
