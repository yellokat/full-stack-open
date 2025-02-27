// ======================================================
// imports
// ======================================================
const {test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const mocks = require('./mocks')
const {initialBlogs} = require("./mocks");

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

test.only('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only('there are five blog posts', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 5)
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
