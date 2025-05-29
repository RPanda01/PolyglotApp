import { test, expect } from '@playwright/test';

test.describe('Аутентификация', () => {
  test('Успешный логин', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await page.getByTestId('home-login').click();
    await page.fill('input[placeholder="Логин"]', 'testuser');
    await page.fill('input[placeholder="Пароль"]', 'password123');
    await page.getByTestId('login-submit').click();

    await expect(page).toHaveURL(/.*\/profile/);
    await expect(page.locator('h2.heading')).toContainText('testuser');
  });

  test('Ошибка логина', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await page.getByTestId('home-login').click();
    await page.fill('input[placeholder="Логин"]', 'wronguser');
    await page.fill('input[placeholder="Пароль"]', 'wrongpass');
    await page.getByTestId('login-submit').click();

    await expect(page.getByTestId('login-error')).toContainText(/Пользователь не найден|ошибка/i);

  });
});
