const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    // exactly two textfields must exist
    expect(await page.getByRole('textbox').all()).toHaveLength(2)
    // exactly one button must exist
    expect(await page.getByRole('button').all()).toHaveLength(1)

    await page.pause()
    // there should be one textfield of name "Username" and one textfield of name "Password"
    await expect(page.getByRole('textbox', {name: 'Username'})).toBeVisible()
    await expect(page.getByRole('textbox', {name: 'Password'})).toBeVisible()

    // there should be one button of name "submit"
    await expect(page.getByText('login')).toBeVisible()
  })
})