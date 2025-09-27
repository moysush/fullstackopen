const loginUser = async (page, username, password) => {
  await page.getByRole('button', { name: /Log In/i }).click()
  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: /login/i }).click()
}

export { loginUser }