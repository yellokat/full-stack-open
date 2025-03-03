const {test, expect, beforeEach, describe} = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({page, request}) => {
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
    console.log(`There are now ${(await blogsResponse.json()).length} blogs in database.`)
    console.log(`There are now ${(await usersResponse.json()).length} users in database.`)
    // navigate to page
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({page}) => {
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
    test('succeeds with correct credentials', async ({page}) => {
      await page.getByRole('textbox', {name: 'Username'}).fill("username1")
      await page.getByRole('textbox', {name: 'Password'}).fill("password1")
      await page.getByText('login').click()
      await expect(page.getByText('blogs')).toBeVisible()
    })

    test('fails with wrong credentials', async ({page}) => {
      await page.getByRole('textbox', {name: 'Username'}).fill("wrongUsername")
      await page.getByRole('textbox', {name: 'Password'}).fill("wrongPassword")
      await page.getByText('login').click()
      await expect(page.getByText('Log in to application')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({page}) => {
      await page.getByRole('textbox', {name: 'Username'}).fill("username1")
      await page.getByRole('textbox', {name: 'Password'}).fill("password1")
      await page.getByText('login').click()
    })

    test('a new blog can be created', async ({page}) => {
      // locate and click create button
      const createButton = page.getByRole('button', {name:'create new'})
      await expect(createButton).toBeVisible()
      await createButton.click()

      // locate and fill textfields
      const textFields = await page.getByRole('textbox').all()
      expect(textFields).toHaveLength(3)
      await textFields[0].fill('new title')
      await textFields[1].fill('new author')
      await textFields[2].fill('new url')

      // locate and click submit button
      const submitButton = await page.getByRole('button', {name:'create'})
      await expect(submitButton).toBeVisible()
      await submitButton.click()

      // new blog contents should render
      const createdBlog = await page.getByText('new title new author')
      await expect(createdBlog).toBeVisible()
    })
  })

  describe('When logged in & a blog post exists', () => {
    beforeEach(async ({page}) => {
      // login
      await page.getByRole('textbox', {name: 'Username'}).fill("username1")
      await page.getByRole('textbox', {name: 'Password'}).fill("password1")
      await page.getByText('login').click()

      // create a blog post
      const createButton = page.getByRole('button', {name:'create new'})
      await createButton.click()
      const textFields = await page.getByRole('textbox').all()
      await textFields[0].fill('new title')
      await textFields[1].fill('new author')
      await textFields[2].fill('new url')
      const submitButton = await page.getByRole('button', {name:'create'})
      await submitButton.click()
    })

    test('a blog post can be liked', async ({page}) => {
      // locate and click expand blog button
      const viewButton = page.getByRole('button', {name:'view'})
      await expect(viewButton).toBeVisible()
      await viewButton.click()

      // get current number of likes
      let likesText = await page.getByText('likes', {exact: false}).textContent()
      let match = likesText.match(/likes (\d+)/);
      const prevLikes = parseInt(match[1], 10)

      // locate and click like button
      const likeButton = page.getByRole('button', {name:'like'})
      await expect(likeButton).toBeVisible()
      await likeButton.click()
      await page.waitForTimeout(2000); // Wait for 2 seconds

      // check that number of likes increases by 1
      likesText = await page.getByText('likes', {exact: false}).textContent()
      match = likesText.match(/likes (\d+)/);
      const updatedLikes = parseInt(match[1], 10)
      expect(updatedLikes).toBe(prevLikes+1)
    })
  })
})