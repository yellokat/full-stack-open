// ======================================================
// imports
// ======================================================
const {test, after, beforeEach, describe} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const mocks = require('./mocks')
const {initialBlogs, blogsInDb, getBlogs} = require("./mocks");

// ======================================================
// initialize app
// ======================================================

const api = supertest(app)

// ======================================================
// pre-test script
// ======================================================

beforeEach(async () => {
  await Blog.deleteMany({})
  await Promise.all(
    initialBlogs.map(blog => new Blog(blog).save())
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
  test('creates blog in server and returns same json as created blog', async () => {
    const newBlog = {
      title: "New Blog Post",
      author: "Seungwon Jang",
      url: "https://www.google.com",
      likes: 0
    }

    // return is a JSON, status code 201
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // return value matches the added content
    const createdBlog = response.body
    delete createdBlog.id
    assert.deepStrictEqual(createdBlog, newBlog)

    // number of blogposts in db has increased by one
    const blogsInDb = await getBlogs()
    assert.strictEqual(blogsInDb.length, initialBlogs.length + 1)
  })

  test('default likes is 0', async () => {
    const newBlog = {
      title: "New Blog Post",
      author: "Seungwon Jang",
      url: "https://www.google.com"
    }

    // return is a JSON, status code 201
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // likes is defaulted to 0
    assert.strictEqual(response.body.likes, 0)
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
