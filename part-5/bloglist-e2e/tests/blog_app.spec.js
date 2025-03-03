const {test, expect, beforeEach, describe} = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({page, request}) => {
    await request.post('http://localhost:3001/api/testing/reset')
    console.log(`Reset test database.`)
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'user1',
        username: 'username1',
        password: 'password1'
      }
    })
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'user2',
        username: 'username2',
        password: 'password2'
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
      const createButton = page.getByRole('button', {name: 'create new'})
      await expect(createButton).toBeVisible()
      await createButton.click()

      // locate and fill textfields
      const textFields = await page.getByRole('textbox').all()
      expect(textFields).toHaveLength(3)
      await textFields[0].fill('new title')
      await textFields[1].fill('new author')
      await textFields[2].fill('new url')

      // locate and click submit button
      const submitButton = await page.getByRole('button', {name: 'create'})
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
      const createButton = page.getByRole('button', {name: 'create new'})
      await createButton.click()
      const textFields = await page.getByRole('textbox').all()
      await textFields[0].fill('new title')
      await textFields[1].fill('new author')
      await textFields[2].fill('new url')
      const submitButton = await page.getByRole('button', {name: 'create'})
      await submitButton.click()
    })

    test('a blog post can be liked', async ({page}) => {
      // locate and click expand blog button
      const viewButton = page.getByRole('button', {name: 'view'})
      await expect(viewButton).toBeVisible()
      await viewButton.click()

      // get current number of likes
      let likesText = await page.getByText('likes', {exact: false}).textContent()
      let match = likesText.match(/likes (\d+)/);
      const prevLikes = parseInt(match[1], 10)

      // locate and click like button
      const likeButton = page.getByRole('button', {name: 'like'})
      await expect(likeButton).toBeVisible()
      await likeButton.click()
      await page.waitForTimeout(2000); // Wait for 2 seconds

      // check that number of likes increases by 1
      likesText = await page.getByText('likes', {exact: false}).textContent()
      match = likesText.match(/likes (\d+)/);
      const updatedLikes = parseInt(match[1], 10)
      expect(updatedLikes).toStrictEqual(prevLikes + 1)
    })
  })

  describe('when logged in & one blog post exists for each user', async () => {
    beforeEach(async ({page}) => {
      // login as user 2
      await page.getByRole('textbox', {name: 'Username'}).fill("username2")
      await page.getByRole('textbox', {name: 'Password'}).fill("password2")
      await page.getByText('login').click()

      // create a blog post
      let createButton = page.getByRole('button', {name: 'create new'})
      await createButton.click()
      let textFields = await page.getByRole('textbox').all()
      await textFields[0].fill('post by username 2')
      await textFields[1].fill('username 2')
      await textFields[2].fill('http://www.username2.com')
      let submitButton = await page.getByRole('button', {name: 'create'})
      await submitButton.click()
      // wait for creation
      await page.waitForTimeout(2000); // Wait for 2 seconds
      console.log('user 2 created a blog post.')

      // logout
      await page.getByRole('button', {name: 'logout'}).click()

      // login as user 1
      await page.getByRole('textbox', {name: 'Username'}).fill("username1")
      await page.getByRole('textbox', {name: 'Password'}).fill("password1")
      await page.getByText('login').click()

      // create a blog post
      createButton = page.getByRole('button', {name: 'create new'})
      await createButton.click()
      textFields = await page.getByRole('textbox').all()
      await textFields[0].fill('post by username 1')
      await textFields[1].fill('username 1')
      await textFields[2].fill('http://www.username1.com')
      submitButton = await page.getByRole('button', {name: 'create'})
      await submitButton.click()
      // wait for creation
      await page.waitForTimeout(2000); // Wait for 2 seconds
      console.log('user 1 created a blog post.')
    })

    test('a blog post can be deleted', async ({page}) => {
      // should a dialog should popup during this test, handle it once
      await page.once('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept();  // Accepts the confirm
      });

      // locate and click expand blog buttons
      // noinspection DuplicatedCode
      const viewButtons = await page.getByRole('button', {name: 'view'}).all()
      await expect(viewButtons).toHaveLength(2)
      await expect(viewButtons[0]).toBeVisible()
      await expect(viewButtons[1]).toBeVisible()
      await page.getByRole('button', {name: 'view'}).nth(0).click()
      await page.getByRole('button', {name: 'view'}).nth(0).click()

      // only one delete button should be visible
      const deleteButton = await page.getByRole('button', {name: 'delete'})
      await deleteButton.click()
      await page.waitForTimeout(2000); // Wait for 2 seconds

      // only one blog entry should remain now
      const hideButtons = await page.getByRole('button', {name: 'hide'}).all()
      expect(hideButtons).toHaveLength(1)
    })

    test('delete button must only appear to posts written by the current user', async ({page}) => {
      // locate and click expand blog buttons
      // noinspection DuplicatedCode
      const viewButtons = await page.getByRole('button', {name: 'view'}).all()
      await expect(viewButtons[0]).toBeVisible()
      await expect(viewButtons[1]).toBeVisible()
      await page.getByRole('button', {name: 'view'}).nth(0).click()
      await page.getByRole('button', {name: 'view'}).nth(0).click()

      // only one delete button should be visible
      const deleteButtons = await page.getByRole('button', {name: 'delete'}).all()
      expect(deleteButtons).toHaveLength(1)
    })
  })

  describe('When logged in & 5 blog posts exist', () => {
    beforeEach(async ({page}) => {
      // login
      await page.getByRole('textbox', {name: 'Username'}).fill("username1")
      await page.getByRole('textbox', {name: 'Password'}).fill("password1")
      await page.getByText('login').click()

      // create 5 blog posts
      for (let i = 1; i <= 5; i++) {
        let createButton = page.getByRole('button', {name: 'create new'})
        await createButton.click()
        const textFields = await page.getByRole('textbox').all()
        await textFields[0].fill(`new title ${i}`)
        await textFields[1].fill(`new author ${i}`)
        await textFields[2].fill(`new url ${i}`)
        const submitButton = await page.getByRole('button', {name: 'create'})
        await submitButton.click()
        await page.waitForTimeout(2000);
      }
    })

    test('blog posts are sorted by likes', async ({page}) => {
      // locate and click all 5 blogs
      for (let i = 1; i <= 5; i++) {
        await page.getByRole('button', {name: 'view'}).nth(0).click()
      }

      // randomly like posts 10 times
      let randomNumber
      for (let i = 1; i <= 10; i++) {
        randomNumber = Math.floor(Math.random() * 5);
        await page.getByRole('button', {name: 'like'}).nth(randomNumber).click()
        await page.waitForTimeout(2000);
      }

      // verify that posts are sorted by likes
      let likesTexts = await page.getByText('likes', {exact: false}).all()
      const observedLikes = await Promise.all(
        likesTexts.map(async likesText => {
          const txt = await likesText.textContent()
          let match = txt.match(/likes (\d+)/)
          return match[1]
        })
      )
      console.log(`observed likes is ${observedLikes}`)
      const sortedLikes = [...observedLikes]
      sortedLikes.sort((a, b) => b - a)
      console.log(`sorted likes is ${sortedLikes}`)
      expect(sortedLikes).toStrictEqual(observedLikes)
    })
  })
})