import { test, expect } from '@playwright/test';

test.describe('Интеграционные тесты страницы конструктора', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/api.har', {
      url: '**/api/**',
      notFound: 'fallback'
    });
    await page.goto('http://localhost:4000/');
    await page.waitForSelector('text=Краторная булка N-200i', { timeout: 10000 });
  });

  test('Добавление ингредиентов в конструктор', async ({ page }) => {
    await page.locator('text=Добавить').first().click();
    await page.locator('text=Добавить').nth(1).click();

    await expect(page.locator('text=(верх)')).toBeVisible();
    await expect(page.locator('text=(низ)')).toBeVisible();
  });

  test('Открытие и закрытие модального окна ингредиента', async ({ page }) => {
    await page.locator('text=Краторная булка N-200i').first().click();
    await expect(page.locator('text=Детали ингредиента')).toBeVisible();

    // Закрываем модалку клавишей Escape (это 100% сработает)
    await page.keyboard.press('Escape');
    
    await expect(page.locator('text=Детали ингредиента')).not.toBeVisible();
  });

  test('Создание заказа авторизованным пользователем', async ({ page, context }) => {
    await context.addCookies([
      { name: 'accessToken', value: 'Bearer-fake-token', domain: 'localhost', path: '/' }
    ]);
    await page.addInitScript(() => {
      window.localStorage.setItem('refreshToken', 'fake-refresh-token');
    });

    await page.goto('http://localhost:4000/');
    await page.waitForSelector('text=Краторная булка N-200i', { timeout: 10000 });

    await page.locator('text=Добавить').first().click();
    await page.locator('text=Добавить').nth(1).click();
    await page.locator('text=Оформить заказ').click();

    await expect(page.locator('text=идентификатор заказа')).toBeVisible();

    // Закрываем модалку заказа клавишей Escape
    await page.keyboard.press('Escape');
    
    await expect(page.locator('text=Выберите булки').first()).toBeVisible();
  });
});