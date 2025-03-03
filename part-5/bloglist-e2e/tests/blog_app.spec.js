const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    console.log(`Reset test database.`)
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Seungwon Jang',
        username: 'username1',
        password: 'password1'
      }
    })
    // debug logging
    const blogsResponse = await request.get('http://localhost:3001/api/blogs')
    const usersResponse = await request.get('http://localhost:3001/api/users')
    console.log(`There are now ${ (await blogsResponse.json()).length } blogs in database.`)
    console.log(`There are now ${ (await usersResponse.json()).length } users in database.`)
    // navigate to page
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

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('textbox', {name: 'Username'}).fill("username1")
      await page.getByRole('textbox', {name: 'Password'}).fill("password1")
      await page.getByText('login').click()
      await expect(page.getByText('blogs')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('textbox', {name: 'Username'}).fill("wrongUsername")
      await page.getByRole('textbox', {name: 'Password'}).fill("wrongPassword")
      await page.getByText('login').click()
      await expect(page.getByText('Log in to application')).toBeVisible()
    })
  })
})