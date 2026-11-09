import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

// Вспомогательная функция для добавления ингредиента по его названию
const addIngredient = async (page: Page, name: string) => {
  const card = page.locator('li').filter({ hasText: name }).first();
  await card.getByText('Добавить').click();
};

test.describe('Интеграционные тесты страницы конструктора', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/api.har', {
      url: '**/api/**',
      notFound: 'abort' // Упадет, если запроса нет в HAR
    });
    await page.goto('/'); // Используем baseURL из конфига
    await page.waitForSelector('text=Краторная булка N-200i', { timeout: 10000 });
  });

  test('Добавление ингредиентов в конструктор', async ({ page }) => {
    // 1. Проверяем, что конструктор изначально пуст
    await expect(page.getByText('Выберите булки').first()).toBeVisible();
    await expect(page.getByText('Выберите начинку').first()).toBeVisible();

    // 2. Добавляем булку и начинку
    await addIngredient(page, 'Краторная булка N-200i');
    await addIngredient(page, 'Биокотлета из марсианской Магнолии');

    // 3. Проверяем, что в конструкторе появилась и булка, и начинка
    await expect(page.getByText('Краторная булка N-200i (верх)')).toBeVisible();
    await expect(page.getByText('Краторная булка N-200i (низ)')).toBeVisible();
    
    // ИСПРАВЛЕНИЕ: используем .last(), чтобы проверить начинку именно в конструкторе
    await expect(page.getByText('Биокотлета из марсианской Магнолии').last()).toBeVisible();
  });

  test('Открытие и закрытие модального окна ингредиента', async ({ page }) => {
    const ingredientName = 'Краторная булка N-200i';
    
    // 1. Проверяем, что окно закрыто
    await expect(page.getByText('Детали ингредиента')).not.toBeVisible();

    // 2. Открываем окно
    await page.locator('li').filter({ hasText: ingredientName }).first().locator('a').click();
    
    const modal = page.locator('#modals'); // Корневой контейнер модалок
    await expect(modal.getByText('Детали ингредиента')).toBeVisible();
    
    // 3. Проверяем данные конкретного ингредиента внутри окна
    await expect(modal.getByText(ingredientName)).toBeVisible();
    await expect(modal.getByText('420')).toBeVisible(); // калории из HAR

    // 4. Закрываем по крестику
    await modal.locator('button:has(svg)').first().click();
    await expect(modal.getByText('Детали ингредиента')).not.toBeVisible();
  });

  test('Создание заказа авторизованным пользователем', async ({ page, context }) => {
    // Токены для авторизации
    await context.addCookies([
      { name: 'accessToken', value: 'Bearer-fake-token', domain: 'localhost', path: '/' }
    ]);
    await page.addInitScript(() => {
      window.localStorage.setItem('refreshToken', 'fake-refresh-token');
    });

    await page.goto('/');
    await page.waitForSelector('text=Краторная булка N-200i', { timeout: 10000 });

    // 1. Убеждаемся, что конструктор пуст, и окна заказа нет
    await expect(page.getByText('Выберите булки').first()).toBeVisible();
    await expect(page.getByText('идентификатор заказа')).not.toBeVisible();

    // 2. Собираем бургер
    await addIngredient(page, 'Краторная булка N-200i');
    await addIngredient(page, 'Биокотлета из марсианской Магнолии');

    // Проверяем, что ингредиенты на месте перед оформлением
    await expect(page.getByText('Краторная булка N-200i (верх)')).toBeVisible();
    
    // ИСПРАВЛЕНИЕ: используем .last()
    await expect(page.getByText('Биокотлета из марсианской Магнолии').last()).toBeVisible();

    // 3. Оформляем заказ
    await page.getByText('Оформить заказ').click();

    // 4. Проверяем модалку и конкретный номер заказа из HAR (123456)
    const modal = page.locator('#modals');
    await expect(modal.getByText('идентификатор заказа')).toBeVisible();
    await expect(modal.getByText('123456')).toBeVisible();

    // 5. Закрываем модалку
    await modal.locator('button:has(svg)').first().click();
    await expect(modal.getByText('идентификатор заказа')).not.toBeVisible();

    // 6. Проверяем, что конструктор полностью очистился (и булка, и начинка)
    await expect(page.getByText('Выберите булки').first()).toBeVisible();
    await expect(page.getByText('Выберите начинку').first()).toBeVisible();
  });
});