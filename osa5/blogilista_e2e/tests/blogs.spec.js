const { test, describe, expect, beforeEach } = require('@playwright/test');

describe('Blogi lista', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      name: 'superuser',
      username: 'root',
      password: 'salainen'
    })

    await page.goto('/')
  })

  test('login form is shown', async ({ page }) => {
    const usernameLocator = await page.getByText('username')
    const passwordLocator = await page.getByText("password")
    const loginButtonLocator = await page.getByText('login')

    await expect(usernameLocator).toBeVisible()
    await expect(passwordLocator).toBeVisible()
    await expect(loginButtonLocator).toBeVisible()
  })

})