const loginWith = async (page, username, password) => {
    await page.getByRole('button', { name: 'Log In' }).click()
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
}

const createNote = async (page, note) => {
    await page.getByRole('button', { name: /new note/i }).click()
    await page.getByRole('textbox', { name: /new note/i }).fill(note)
    await page.getByRole('button', { name: /save/i }).click()
    await page.getByText(note).waitFor() // to wait before procceding with the next task
}

export { loginWith, createNote }