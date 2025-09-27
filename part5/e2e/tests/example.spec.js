// @ts-check
import { test, expect } from '@playwright/test';


test.describe('Blog App', () => {
  test.beforeEach( async ({ page }) => {
    await page.goto('/')
  })
  test('login form is shown', async ({ page }) => {

    await expect(page.getByRole('button', {name: /Log In/i})).toBeVisible()
  });

})
