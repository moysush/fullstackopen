// @ts-check
import { test, expect } from '@playwright/test';
import { loginUser, createBlog } from './helper';
import { beforeEach } from 'node:test';

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

  test.describe('when logged in', () => {
    test.beforeEach(async ({ page }) => {
      await loginUser(page, "sush", "root")
    })
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, "Deep Work", "Cal Newport", "https://calnewport.com/deep-work-rules-for-focused-success-in-a-distracted-world/")

      await expect(page.getByText('a new blog, Deep Work by Cal Newport was added successfully')).toBeVisible()
      await expect(page.getByText(/Deep Work - Cal Newport/i)).toBeVisible()
    })
    test('blog can be liked', async ({ page }) => {
      await createBlog(page, "So good they cant ignore you", "Cal Newport", "https://calnewport.com/deep-work-rules-for-focused-success-in-a-distracted-world/")

      const blog = await page.getByText(/So good they cant ignore you - Cal Newport/i)

      await blog.getByRole('button', {name: /view/i}).click()
      await page.getByRole('button', {name: /like/i}).click()
      await expect(page.getByText('Likes: 1')).toBeVisible()
    })
  })

})
