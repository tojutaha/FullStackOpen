const loginWith = async (page, username, password) => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'Create new blog' }).click()
    await page.getByRole('textbox', { name: 'title' }).fill(title)
    await page.getByRole('textbox', { name: 'author' }).fill(author)
    await page.getByRole('textbox', { name: 'url' }).fill(url)
    await page.getByRole('button', { name: 'create' }).click()
}

export { loginWith, createBlog }