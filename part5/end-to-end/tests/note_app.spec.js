const { test, expect, describe, beforeEach } = require('@playwright/test')
import { loginWith, createNote } from './helper'



describe('Note app', () => {
    beforeEach(async ({ page, request }) => {
        await page.goto('/')
        await request.post('/api/testing/reset')
    })

    test('front page can be opened', async ({ page }) => {
        const locator = page.getByText('Notes')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
    })

    test('user can log in', async ({ page }) => {
        await loginWith(page, "sush", "root")

        await expect(page.getByText('Sushmoy logged in')).toBeVisible()
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, "sush", "root")
        })

        test('a new note can be created', async ({ page }) => {
            await createNote(page, 'a note created with playwright')
            await expect(page.getByText('a note created with playwright')).toBeVisible()
        })

        describe('and several note exists', () => {
            beforeEach(async ({ page }) => {
                await createNote(page, 'first note')
                await createNote(page, 'second note')
                await createNote(page, 'third note')
                // await page.reload() // for some reason the page wont show the new notes without reload; solved now
            })

            test('importance can be changed', async ({ page }) => {
                await page.pause()
                const secondNoteElement = page.getByText('second note').locator('..') // accessing the parent
                
                await secondNoteElement.getByRole('button', { name: 'make not important' }).click()
                await expect(secondNoteElement.getByText('make important')).toBeVisible()
            })
        })
    })

    // test.only() to run a single test
    test('login fails with wrong password', async ({ page }) => {
        await loginWith(page, "sush", "wrong")

        const errorDiv = page.locator('.error') // used for targeting css classname
        await expect(errorDiv).toContainText('wrong credentials')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

        await expect(page.getByText('Sushmoy logged in')).not.toBeVisible()
    })
})
