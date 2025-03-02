// import libraries
const {test, describe} = require("node:test")
const assert = require('node:assert')

// import test targets & scheme
const listHelper = require('../utils/list_helper')
const mocks = require('./mocks/blogMocks')
const Blog = require('../models/blog')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe("total likes", () => {
  test("of an empty list", () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })

  test("of a single blog entry", () => {
    const blogs = [
      mocks.blogMock1
    ].map(blog => new Blog(blog))
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 1)
  })

  test("of multiple blog entries", () => {
    const blogs = [
      mocks.blogMock1,
      mocks.blogMock2,
      mocks.blogMock3
    ].map(blog => new Blog(blog))
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 6)
  })
})

describe("favorite blog", () => {
  test("of an empty list", () => {
    const blogs = []
    const result = listHelper.favoriteBlog(blogs)
    assert.strictEqual(result, null)
  })

  test("of a single blog entry", () => {
    const blogs = [
      mocks.blogMock1
    ].map(blog => new Blog(blog))
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[0])
  })

  test("of multiple blog entries", () => {
    const blogs = [
      mocks.blogMock1,
      mocks.blogMock2,
      mocks.blogMock3,
    ].map(blog => new Blog(blog))
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[2])
  })
})

describe("most blogs", () => {
  test("of an empty list", () => {
    const blogs = []
    const result = listHelper.mostBlogs(blogs)
    assert.strictEqual(result, null)
  })

  test("of a single blog entry", () => {
    const blogs = [
      mocks.blogMock1
    ].map(blog => new Blog(blog))
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: mocks.blogMock1.author,
      blogs: 1
    })
  })

  test("of multiple blog entries", () => {
    const blogs = [
      mocks.blogMock1,
      mocks.blogMock1,
      mocks.blogMock2,
      mocks.blogMock2,
      mocks.blogMock2,
      mocks.blogMock3
    ].map(blog => new Blog(blog))
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: mocks.blogMock2.author,
      blogs: 3
    })
  })
})

describe("most liked blogs", () => {
  test("of an empty list", () => {
    const blogs = []
    const result = listHelper.mostLikes(blogs)
    assert.strictEqual(result, null)
  })

  test("of a single blog entry", () => {
    const blogs = [
      mocks.blogMock1
    ].map(blog => new Blog(blog))
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, {
      author: mocks.blogMock1.author,
      likes: mocks.blogMock1.likes
    })
  })

  test("of multiple blog entries", () => {
    const blogs = [
      mocks.blogMock1,
      mocks.blogMock1,
      mocks.blogMock2,
      mocks.blogMock2,
      mocks.blogMock2,
      mocks.blogMock3
    ].map(blog => new Blog(blog))
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, {
      author: mocks.blogMock2.author,
      likes: 6
    })
  })
})