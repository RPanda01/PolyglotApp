import { test, expect } from '@playwright/test';

test.describe('Профиль', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.getByTestId('home-login').click();
    await page.fill('input[placeholder="Логин"]', 'testuser');
    await page.fill('input[placeholder="Пароль"]', 'password123');
    await page.getByTestId('login-submit').click();
    await expect(page).toHaveURL(/.*\/profile/);
  });

  test('Редактирование никнейма', async ({ page }) => {
    await page.getByTestId('edit-nickname').click()
    await page.fill('input', 'NewNickname');
    await page.getByTestId('save-nickname').click();

    await expect(page.locator('h2.heading')).toContainText('NewNickname');
  });
});
