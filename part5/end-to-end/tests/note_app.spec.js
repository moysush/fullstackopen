const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Note app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })

    test('front page can be opened', async ({ page }) => {
        const locator = page.getByText('Notes')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
    })
    test('user can log in', async ({ page }) => {
        await page.getByRole('button', { name: 'Log In' }).click()

        await page.getByLabel('username').fill('sush')
        await page.getByLabel('password').fill('root')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('Sushmoy logged in')).toBeVisible()
    })
})
