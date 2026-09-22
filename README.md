# 🎭 Playwright E2E · SauceDemo

[![E2E Tests](https://github.com/yaquelin2305/playwright-e2e-saucedemo/actions/workflows/playwright.yml/badge.svg)](https://github.com/yaquelin2305/playwright-e2e-saucedemo/actions/workflows/playwright.yml)
[![Allure Report](https://img.shields.io/badge/Allure-reporte%20en%20vivo-orange?logo=qameta)](https://yaquelin2305.github.io/playwright-e2e-saucedemo/)
![Playwright](https://img.shields.io/badge/Playwright-1.6x-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)

Suite de pruebas **end-to-end automatizadas** para [SauceDemo](https://www.saucedemo.com), una tienda online de práctica.
Cubre los flujos críticos de negocio (login, catálogo, carrito y compra), se ejecuta en **4 navegadores** y
corre sola en **GitHub Actions** con cada cambio y todos los días. Los resultados se publican en un **reporte Allure en vivo**.

> 🇬🇧 *End-to-end test suite for SauceDemo built with Playwright + TypeScript, using Page Object Model, custom fixtures,
> data-driven tests, accessibility checks (axe-core) and a CI/CD pipeline that publishes an Allure report to GitHub Pages.*

---

## ✨ Qué demuestra este proyecto

| Práctica | Cómo se aplica |
|---|---|
| **Page Object Model** | Cada página es una clase en `src/pages/` con sus selectores y acciones. Los tests no tocan selectores. |
| **Fixtures personalizados** | `src/fixtures/test-fixtures.ts` entrega los Page Objects listos a cada prueba. |
| **Sesión reutilizable** | `auth.setup.ts` inicia sesión una vez y guarda el `storageState` → pruebas más rápidas y estables. |
| **Pruebas guiadas por datos** | Login y checkout generan un test por cada fila de datos (`src/data/`). |
| **Selectores robustos** | Uso de atributos `data-test` (`testIdAttribute`), sin XPath ni clases CSS frágiles. |
| **Validación de negocio** | Se recalculan subtotal, impuesto (8 %) y total, no solo "que aparezca un número". |
| **Multi-navegador y móvil** | Chromium, Firefox, WebKit (Safari) y Pixel 7. |
| **Accesibilidad** | Reglas WCAG 2.1 A/AA con `@axe-core/playwright`, con el resultado adjunto como evidencia. |
| **Gestión de defectos** | Bugs reales de `problem_user` automatizados con `test.fail()` y enlazados a su reporte. |
| **Evidencia automática** | Captura, video y *trace* solo cuando una prueba falla. |
| **CI/CD** | GitHub Actions: revisión de tipos → pruebas en paralelo por navegador → reporte Allure en GitHub Pages. |

## 🧪 Cobertura

| Módulo | ID | Casos | Tipo |
|---|---|---|---|
| Login | LOGIN-01 … 07 | Login válido, logout y protección de rutas, 5 casos negativos | Funcional, negativo |
| Catálogo | INV-01 … 06 | Listado, 4 tipos de orden, consistencia del precio en el detalle | Funcional |
| Carrito | CART-01 … 06 | Agregar, quitar, contador, persistencia al recargar, navegación | Funcional |
| Checkout | CHK-01 … 06 | Compra E2E, cálculo de totales, cancelar, 3 campos obligatorios | E2E, negocio, negativo |
| Accesibilidad | A11Y-01 … 02 | Login y catálogo sin violaciones WCAG A/AA | No funcional |
| Defectos conocidos | BUG-01 … 02 | Imágenes duplicadas, campo apellido no editable (`problem_user`) | Regresión de bugs |

**29 casos × 4 navegadores = 116 ejecuciones** en cada corrida.

Etiquetas para ejecutar subconjuntos: `@smoke`, `@regression`, `@a11y`, `@known-bug`.

## 🗂️ Estructura

```
playwright-e2e-saucedemo/
├── .github/workflows/playwright.yml   # Pipeline CI/CD
├── src/
│   ├── pages/        # Page Objects (BasePage, LoginPage, InventoryPage, CartPage, CheckoutPage)
│   ├── fixtures/     # Fixtures personalizados de Playwright
│   ├── data/         # Datos de prueba (usuarios, casos de login, datos de checkout)
│   └── utils/        # Utilidades (parseo y redondeo de precios)
├── tests/
│   ├── setup/        # Login previo y guardado de sesión
│   ├── auth/         # Login y logout
│   ├── inventory/    # Catálogo y ordenamiento
│   ├── cart/         # Carrito
│   ├── checkout/     # Flujo de compra
│   ├── a11y/         # Accesibilidad
│   └── known-bugs/   # Defectos conocidos
└── playwright.config.ts
```

## ▶️ Cómo ejecutarlo

Requisitos: **Node.js 20+**.

```bash
git clone https://github.com/yaquelin2305/playwright-e2e-saucedemo.git
cd playwright-e2e-saucedemo
npm install
npx playwright install

npm test                  # toda la suite en los 4 navegadores
npm run test:chrome       # solo Chromium
npm run test:smoke        # solo pruebas críticas (@smoke)
npm run test:headed       # viendo el navegador
npm run test:ui           # modo interactivo de Playwright
npm run report            # abrir el reporte HTML

# Reporte Allure (requiere Java)
npm run allure:generate && npm run allure:open
```

## 🐞 Defectos encontrados

| ID | Usuario | Descripción | Severidad |
|---|---|---|---|
| BUG-01 | `problem_user` | Todos los productos del catálogo muestran la misma imagen. | Media |
| BUG-02 | `problem_user` | En el checkout, lo que se escribe en *Last Name* se escribe en *First Name* y el apellido queda vacío, lo que bloquea la compra. | Alta |

El detalle de cada reporte (pasos, resultado esperado y obtenido, evidencia) está en el repositorio
[qa-test-design](https://github.com/yaquelin2305/qa-test-design).

## 🛠️ Stack

Playwright · TypeScript · axe-core · Allure Report · GitHub Actions · GitHub Pages

---

👩‍💻 **Yaquelin Rugel Alvarado**, QA Automation Jr ·
[LinkedIn](https://www.linkedin.com/in/yaquelin-rugel-alvarado-67a4a942b) · [GitHub](https://github.com/yaquelin2305)
