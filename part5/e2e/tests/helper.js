const loginUser = async (page, username, password) => {
  await page.getByRole('button', { name: /Log In/i }).click()
  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: /login/i }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: /create new blog/i }).click()

  await page.getByLabel(/title/i).fill(title)
  await page.getByLabel(/author/i).fill(author)
  await page.getByLabel(/url/i).fill(url)
  await page.getByRole('button', { name: /create/i }).click()
}

const viewButton = async(page, blog) => {
  const selectBlog = await page.getByText(blog)
  await selectBlog.getByRole('button', { name: /view/i }).click()
}

const likeBlog = async (page, blog) => {
  const selectBlog = await page.getByText(blog)

  // const likeButton = page.getByRole('button', { name: /like/i }).click()

  const container = await selectBlog.locator("..")
  await container.getByRole('button', { name: /like/i }).click()
  await page.waitForTimeout(500) // waits 0.5 seconds
}

export { loginUser, createBlog, likeBlog, viewButton }