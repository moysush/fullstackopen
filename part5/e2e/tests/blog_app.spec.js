// @ts-check
import { test, expect } from '@playwright/test';
import { loginUser, createBlog, likeBlog, viewButton } from './helper';

test.describe('Blog App', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await page.goto('/')

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

      await viewButton(page, "So good they cant ignore you - Cal Newport")
      await likeBlog(page, "So good they cant ignore you - Cal Newport")
      
      await expect(page.getByText('Likes: 1')).toBeVisible()
    })
    test('user can delete a blog', async ({ page }) => {
      await createBlog(page, "Digital Minimalism", "Cal Newport", "https://calnewport.com/deep-work-rules-for-focused-success-in-a-distracted-world/")

      const blog = await page.getByText(/Digital Minimalism - Cal Newport/i)

      await blog.getByRole('button', { name: /view/i }).click()
      // by default dialogs are dismissed automitacally by playwright, thus we need to accept it first
      page.on('dialog', dialog => dialog.accept()); // default is dismiss()
      await page.getByRole('button', { name: /remove/i }).click()

      await expect(page.getByText("blog Digital Minimalism was deleted successfully")).toBeVisible()
    })
    test.describe("another user", () => {
      test.beforeEach(async ({ page, request }) => {
        // creating a blog with current user
        await createBlog(page, "Deep Work", "Cal Newport", "https://calnewport.com/deep-work-rules-for-focused-success-in-a-distracted-world/")

        // creating new user first
        await request.post('/api/users', {
          data: {
            name: "someone",
            username: "some",
            password: "one"
          }
        })
      })
      test("cant see the remove button", async ({ page }) => {
        // logout first
        await page.getByRole('button', { name: /logout/i }).click()
        // login in the new user
        await loginUser(page, "some", "one")
        // blog created by the other user
        const blog = await page.getByText(/Deep Work - Cal Newport/i)
        await blog.getByRole('button', { name: /view/i }).click()
        // ensure remove buttton cant be seen
        await expect(page.getByRole("button", { name: /remove/i })).not.toBeVisible()
      })
    })
  })
  test.describe("blog arrangement", () => {
    test.beforeEach(async ({ page }) => {
      await loginUser(page, "sush", "root")

      // creating the blogs
      await createBlog(page, "Deep Work", "Cal Newport", "https://calnewport.com/deep-work-rules-for-focused-success-in-a-distracted-world/")
      await createBlog(page, "So good they cant ignore you", "Cal Newport", "https://calnewport.com/deep-work-rules-for-focused-success-in-a-distracted-world/")
      await createBlog(page, "Digital Minimalism", "Cal Newport", "https://calnewport.com/deep-work-rules-for-focused-success-in-a-distracted-world/")

      // only cliking the view button once
      await viewButton(page, "Deep Work - Cal Newport")
      await viewButton(page, "So good they cant ignore you - Cal Newport")
      await viewButton(page, "Digital Minimalism - Cal Newport")

      // liking each several times
      await likeBlog(page, "Deep Work - Cal Newport")
      await likeBlog(page, "Deep Work - Cal Newport")
      await likeBlog(page, "So good they cant ignore you - Cal Newport")
      await likeBlog(page, "Digital Minimalism - Cal Newport")
      await likeBlog(page, "Digital Minimalism - Cal Newport")
      await likeBlog(page, "Digital Minimalism - Cal Newport")
    })
    test('correctly sorted', async ({ page }) => {
      // selecting all blogs with the classname blog
      const blogs = await page.locator(".blog")
      // first blog
      await expect(blogs.first()).toContainText("Digital Minimalism - Cal Newport")
      // last blog
      await expect(blogs.last()).toContainText("So good they cant ignore you - Cal Newport")
    })
  })

})
