// ======================================================
// imports
// ======================================================
const {test, after, beforeEach, describe} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const blogMocks = require('./mocks/blogMocks')
const userMocks = require('./mocks/userMocks')

// ======================================================
// initialize app
// ======================================================

const api = supertest(app)

// ======================================================
// pre-test script
// ======================================================

beforeEach(async () => {
  // delete all blogs and users
  await Blog.deleteMany({})
  await User.deleteMany({})
  // save initial users
  const initialUsers = await userMocks.getInitialUsers()
  for (const initialUser of initialUsers) {
    const createdUser = new User(initialUser)
    await createdUser.save()
  }
  // save initial blogs
  const randomUser = (await userMocks.getUsers())[0]
  await Promise.all(
    blogMocks.initialBlogs.map(async blog => {
      const createdBlog = new Blog(blog)
      // user <-> blog mapping
      createdBlog.user = randomUser.id
      // save both objects
      await createdBlog.save()
      await User.findByIdAndUpdate(
        randomUser.id,
        {$push: {blogs: createdBlog.id}},
        {context: 'query'}
      )
    })
  )
})

// ======================================================
// test cases
// ======================================================

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are five blog posts', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 5)
})

test('"id" is used instead of "_id" in server ("_id" is still used in database)', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    assert("id" in blog)
    assert(!("_id" in blog))
  })
})

describe('create blog', async () => {
  test('a Bearer token must be provided in header', async()=>{
    const newBlog = {
      title: "New Blog Post",
      author: "Seungwon Jang",
      url: "https://www.google.com",
      likes: 0
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })

  test('creates blog in server and returns same json as created blog', async () => {
    // login as a user
    const testUsername = "tester1"
    const testPassword = "tester1"
    const testName = "tester1name"
    const loginBody = {
      username: testUsername,
      password: testPassword
    }
    const loginResponse = await api
      .post('/api/login')
      .send(loginBody)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const token = loginResponse.body.token

    // return is a JSON, status code 201
    const newBlog = {
      title: "New Blog Post",
      author: "Seungwon Jang",
      url: "https://www.google.com",
      likes: 0
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // return value matches the added content
    const createdBlog = response.body
    delete createdBlog.id
    delete createdBlog.user.id
    newBlog.user = {
      name: testName,
      username: testUsername,
    }
    assert.deepStrictEqual(createdBlog, newBlog)

    // number of blogposts in db has increased by one
    const blogsInDb = await blogMocks.getBlogs()
    assert.strictEqual(blogsInDb.length, blogMocks.initialBlogs.length + 1)
  })

  test('default likes is 0', async () => {
    // login as a user
    const testUsername = "tester1"
    const testPassword = "tester1"
    const testName = "tester1name"
    const loginBody = {
      username: testUsername,
      password: testPassword
    }
    const loginResponse = await api
      .post('/api/login')
      .send(loginBody)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const token = loginResponse.body.token

    // return is a JSON, status code 201
    const newBlog = {
      title: "New Blog Post",
      author: "Seungwon Jang",
      url: "https://www.google.com"
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // likes is defaulted to 0
    assert.strictEqual(response.body.likes, 0)
  })

  test('"title" field is required', async () => {
    // login as a user
    const testUsername = "tester1"
    const testPassword = "tester1"
    const testName = "tester1name"
    const loginBody = {
      username: testUsername,
      password: testPassword
    }
    const loginResponse = await api
      .post('/api/login')
      .send(loginBody)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const token = loginResponse.body.token

    // returns status code 400
    const newBlog = {
      author: "Seungwon Jang",
      url: "https://www.google.com"
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
  })

  test('"url" field is required', async () => {
    // login as a user
    const testUsername = "tester1"
    const testPassword = "tester1"
    const testName = "tester1name"
    const loginBody = {
      username: testUsername,
      password: testPassword
    }
    const loginResponse = await api
      .post('/api/login')
      .send(loginBody)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const token = loginResponse.body.token

    // returns status code 400
    const newBlog = {
      title: "New Blog Post",
      author: "Seungwon Jang",
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
  })
})

describe('delete blog', async () => {
  test('number of blog posts in database decreases by one', async () => {
    // login as a user
    const testUsername = "tester1"
    const testPassword = "tester1"
    const testName = "tester1name"
    const loginBody = {
      username: testUsername,
      password: testPassword
    }
    const loginResponse = await api
      .post('/api/login')
      .send(loginBody)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const token = loginResponse.body.token

    // get ID of target blog to delete
    let blogsInDb = await blogMocks.getBlogs()
    const targetBlogId = blogsInDb[0].id

    // perform deletion
    await api
      .delete(`/api/blogs/${targetBlogId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    // number of blog posts in database decreases by one
    blogsInDb = await blogMocks.getBlogs()
    assert.strictEqual(blogsInDb.length, blogMocks.initialBlogs.length - 1)
  })

  test('returns 400 when id is invalid', async () => {
    // login as a user
    const testUsername = "tester1"
    const testPassword = "tester1"
    const testName = "tester1name"
    const loginBody = {
      username: testUsername,
      password: testPassword
    }
    const loginResponse = await api
      .post('/api/login')
      .send(loginBody)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const token = loginResponse.body.token

    // perform deletion
    await api
      .delete('/api/blogs/999')
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
  })

  test('returns 404 when no blog post of given id exists', async () => {
    // login as a user
    const testUsername = "tester1"
    const testPassword = "tester1"
    const testName = "tester1name"
    const loginBody = {
      username: testUsername,
      password: testPassword
    }
    const loginResponse = await api
      .post('/api/login')
      .send(loginBody)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const token = loginResponse.body.token

    // perform deletion
    const randomId = "65dcdafe1234567890abcdef"
    await api
      .delete(`/api/blogs/${randomId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
  })
})

describe('update blog', async () => {
  test('returns status code 200 on success', async () => {
    // login as a user
    const testUsername = "tester1"
    const testPassword = "tester1"
    const testName = "tester1name"
    const loginBody = {
      username: testUsername,
      password: testPassword
    }
    const loginResponse = await api
      .post('/api/login')
      .send(loginBody)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const token = loginResponse.body.token

    // get ID of target blog to delete
    let blogsInDb = await blogMocks.getBlogs()
    const targetBlogId = blogsInDb[0].id

    // perform update, should return 200
    const updatedBlog = {
      title: "Updated Title",
      author: "Updated Author",
      url: "Updated URL",
      likes: 999
    }
    await api
      .put(`/api/blogs/${targetBlogId}`)
      .send(updatedBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
  })

  test('returns json of updated object on success', async () => {
    // login as a user
    const testUsername = "tester1"
    const testPassword = "tester1"
    const testName = "tester1name"
    const loginBody = {
      username: testUsername,
      password: testPassword
    }
    const loginResponse = await api
      .post('/api/login')
      .send(loginBody)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const token = loginResponse.body.token

    // get ID of target blog to delete
    let blogsInDb = await blogMocks.getBlogs()
    const targetBlogId = blogsInDb[0].id

    // perform update, should return JSON
    const updatedBlog = {
      title: "Updated Title",
      author: "Updated Author",
      url: "Updated URL",
      likes: 999
    }
    const response = await api
      .put(`/api/blogs/${targetBlogId}`)
      .send(updatedBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)

    // returned json should be equal to update request data
    const updateResult = response.body
    delete updateResult.id
    delete updateResult.user.id
    updatedBlog.user = {
      name: testName,
      username: testUsername,
    }
    assert.deepStrictEqual(updateResult, updatedBlog)
  })

  test('target resource is updated', async () => {
    // login as a user
    const testUsername = "tester1"
    const testPassword = "tester1"
    const testName = "tester1name"
    const loginBody = {
      username: testUsername,
      password: testPassword
    }
    const loginResponse = await api
      .post('/api/login')
      .send(loginBody)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const token = loginResponse.body.token

    // get ID of target blog to delete
    let blogsInDb = await blogMocks.getBlogs()
    const targetBlogId = blogsInDb[0].id

    // perform update
    const updatedBlog = {
      title: "Updated Title",
      author: "Updated Author",
      url: "Updated URL",
      likes: 999
    }
    await api
      .put(`/api/blogs/${targetBlogId}`)
      .send(updatedBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // fetch updated object from database
    blogsInDb = await blogMocks.getBlogs()
    const filteredBlogs = blogsInDb.filter(blog => (blog.id === targetBlogId))
    assert.strictEqual(filteredBlogs.length, 1)

    // data of object fetched from database should match data of update request
    const updateResult = filteredBlogs[0]
    delete updateResult.id
    delete updateResult.user.id
    updatedBlog.user = {
      name: testName,
      username: testUsername,
    }
    assert.deepStrictEqual(updateResult, updatedBlog)
  })

  test('number of blog posts in database stays the same', async () => {
    // login as a user
    const testUsername = "tester1"
    const testPassword = "tester1"
    const testName = "tester1name"
    const loginBody = {
      username: testUsername,
      password: testPassword
    }
    const loginResponse = await api
      .post('/api/login')
      .send(loginBody)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const token = loginResponse.body.token

    // get ID of target blog to delete
    let blogsInDb = await blogMocks.getBlogs()
    const targetBlogId = blogsInDb[0].id

    // perform update
    const updatedBlog = {
      title: "Updated Title",
      author: "Updated Author",
      url: "Updated URL",
      likes: 999
    }
    await api
      .put(`/api/blogs/${targetBlogId}`)
      .send(updatedBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // number of blog posts in database decreases by one
    blogsInDb = await blogMocks.getBlogs()
    assert.strictEqual(blogsInDb.length, blogMocks.initialBlogs.length)
  })

  test('returns 400 when id is invalid', async () => {
    // login as a user
    const testUsername = "tester1"
    const testPassword = "tester1"
    const testName = "tester1name"
    const loginBody = {
      username: testUsername,
      password: testPassword
    }
    const loginResponse = await api
      .post('/api/login')
      .send(loginBody)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const token = loginResponse.body.token

    await api
      .put('/api/blogs/999')
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
  })

  test('returns 404 when no blog post of given id exists', async () => {
    // login as a user
    const testUsername = "tester1"
    const testPassword = "tester1"
    const testName = "tester1name"
    const loginBody = {
      username: testUsername,
      password: testPassword
    }
    const loginResponse = await api
      .post('/api/login')
      .send(loginBody)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const token = loginResponse.body.token

    const randomId = "65dcdafe1234567890abcdef"
    await api
      .put(`/api/blogs/${randomId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
  })
})

// test('the first note is about HTTP methods', async () => {
//   const response = await api.get('/api/notes')
//
//   const contents = response.body.map(e => e.content)
//   assert.strictEqual(contents.includes('HTML is easy'), true)
// })

// ======================================================
// post-test script
// ======================================================

after(async () => {
  await mongoose.connection.close()
})
