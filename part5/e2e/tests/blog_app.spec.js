// @ts-check
import { test, expect } from '@playwright/test';
import { loginUser } from './helper';

test.describe('Blog App', () => {
  test.beforeEach(async ({ page, request }) => {
    await page.goto('/')
    await request.post('/api/testing/reset')

    await request.post('/api/users', {
      data: {
        name: "Sushmoy",
        username: "sush",
        password: "root"
      }
    })
  })

  test('login form is shown', async ({ page }) => {

    await expect(page.getByRole('button', { name: /Log In/i })).toBeVisible()
    await page.getByRole('button', { name: /Log In/i }).click()
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible()
  });

  test.describe('login', async () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginUser(page, "sush", "root")

      await expect(page.getByText("Sushmoy successfully logged in")).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginUser(page, "sush", "wrong")

      await expect(page.getByText('invalid username or passwor')).toBeVisible()
    })
  })

})
