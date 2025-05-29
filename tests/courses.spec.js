import { test, expect } from '@playwright/test';

test.describe('Курсы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.getByTestId('home-login').click();
    await page.fill('input[placeholder="Логин"]', 'testuser');
    await page.fill('input[placeholder="Пароль"]', 'password123');
    await page.getByTestId('login-submit').click();
    await page.click('button:has-text("Перейти к курсам")');
    await expect(page).toHaveURL(/.*\/courses/);
  });

  test('Просмотр курсов', async ({ page }) => {
    const courseCards = await page.locator('[data-testid^="course-card-"]').count();
    expect(courseCards).toBeGreaterThan(0);
  });

  test('Переход в курс', async ({ page }) => {
    await page.getByTestId('course-card-english').click();
    await expect(page).toHaveURL(/.*\/courses\/english/);
  });
});
