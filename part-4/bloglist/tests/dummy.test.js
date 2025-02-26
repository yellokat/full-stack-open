// import libraries
const {test, describe} = require("node:test")
const assert = require('node:assert')

// import test targets & scheme
const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe("total likes", () => {
  // mocks
  const blogMock1 = new Blog({
    "title": "test1",
    "author": "tester1",
    "url": "testurl1",
    "likes": 1
  })
  const blogMock2 = new Blog({
    "title": "test1",
    "author": "tester1",
    "url": "testurl1",
    "likes": 2
  })
  const blogMock3 = new Blog({
    "title": "test1",
    "author": "tester1",
    "url": "testurl1",
    "likes": 3
  })

  test("of an empty list", () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })

  test("of a single blog entry", ()=>{
    const blogs = [blogMock1]
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 1)
  })

  test("of multiple blog entries", () => {
    const blogs = [blogMock1, blogMock2, blogMock3]
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 6)
  })
})